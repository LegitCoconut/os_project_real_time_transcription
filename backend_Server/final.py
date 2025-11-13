#!/usr/bin/env python3

import os
import sys
import json
import queue
import requests
import sounddevice as sd
import numpy as np
import torch
import soundfile as sf
import threading
import time
import re
from collections import deque
from threading import Thread, Lock, Event

# ---- Color Output ----
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

# ---- Configuration Management ----
CONFIG_PATH = "config.json"
DEFAULT_CONFIG = {
    "apiurl": "",
    "room_id": "",
    "whisper_model_size": "small"
}

class CONFIG:
    apiurl = None
    room_id = None
    whisper_model_size = None
    whispermodel = None
    device = 'cuda' if torch.cuda.is_available() else 'cpu'

def printf(text, color=Colors.ENDC):
    print(f"{color}{text}{Colors.ENDC}")

def load_saved_config():
    if os.path.exists(CONFIG_PATH):
        try:
            with open(CONFIG_PATH, 'r') as f:
                data = json.load(f)
                return data
        except Exception:
            return DEFAULT_CONFIG.copy()
    return DEFAULT_CONFIG.copy()

def save_config(apiurl, room_id, whisper_model_size):
    new_data = {
        "apiurl": apiurl,
        "room_id": room_id,
        "whisper_model_size": whisper_model_size
    }
    with open(CONFIG_PATH, 'w') as f:
        json.dump(new_data, f, indent=2)

def setupserver():
    saved = load_saved_config()
    printf(f"{Colors.BOLD}API Configuration:{Colors.ENDC}", Colors.HEADER)
    printf(f"Loaded config: {saved}", Colors.OKCYAN)
    # Select/override API URL
    apiurl = input(f"Base API URL [{saved['apiurl']}]: ").strip()
    if not apiurl:
        apiurl = saved['apiurl']
    # Prompt for 6-letter room_id
    while True:
        room_id = input(f"Room ID (6 letters/numbers) [{saved['room_id']}]: ").strip()
        if not room_id:
            room_id = saved['room_id']
        if room_id and len(room_id) == 6 and re.match(r'^[A-Za-z0-9]{6}$', room_id):
            break
        printf("Room ID must be exactly 6 letters/numbers.", Colors.WARNING)
    # Select/override whisper model size
    model_size = input(f"Whisper model size (tiny/small/medium/large) [{saved['whisper_model_size']}]: ").strip()
    if not model_size:
        model_size = saved['whisper_model_size']
    # Save
    save_config(apiurl, room_id, model_size)
    CONFIG.apiurl = apiurl
    CONFIG.room_id = room_id
    CONFIG.whisper_model_size = model_size
    printf(f"Configured API: {CONFIG.apiurl}", Colors.OKGREEN)
    printf(f"room_id: {CONFIG.room_id}", Colors.OKBLUE)
    printf(f"whisper_model_size: {CONFIG.whisper_model_size}", Colors.OKCYAN)

# ---- Load Whisper Model ----
def loadmodels():
    printf("Loading Models...", Colors.BOLD)
    try:
        import whisper
    except ImportError:
        printf("Error: whisper module not found", Colors.FAIL)
        printf("Please install: pip install openai-whisper", Colors.WARNING)
        return
    CONFIG.whispermodel = whisper.load_model(CONFIG.whisper_model_size, device=CONFIG.device)
    printf("Whisper model loaded successfully.", Colors.OKGREEN)
    printf(f"Using device: {CONFIG.device}", Colors.OKGREEN)

# ---- Audio & Threading Setup ----
SAMPLERATE = 16000
CHUNKDURATION = 3  # seconds
OUTPUTDIR = "segments"
os.makedirs(OUTPUTDIR, exist_ok=True)

audioq = queue.Queue()
processingq = queue.Queue(maxsize=20)
apiq = queue.Queue(maxsize=50)
stopevent = Event()
threadslist = []

def callback(indata, frames, time, status):
    if status:
        printf(f"Audio Status: {status}", Colors.WARNING)
    audioq.put(indata.copy())

def audiobufferingthread():
    printf("AUDIO Buffering thread started", Colors.OKGREEN)
    buffer = np.zeros(0, dtype=np.float32)
    try:
        deviceinfo = sd.query_devices(kind='input')
        printf(f"Using input device: {deviceinfo['name']}", Colors.OKCYAN)
    except Exception as e:
        printf(f"Error accessing microphone: {e}", Colors.FAIL)
        return
    try:
        with sd.InputStream(samplerate=SAMPLERATE, channels=1, callback=callback):
            printf("Recording... Press Ctrl+C to stop.", Colors.OKGREEN)
            while not stopevent.is_set():
                try:
                    data = audioq.get(timeout=0.5)
                    buffer = np.concatenate([buffer, data.flatten()])
                    if len(buffer) >= SAMPLERATE * CHUNKDURATION:
                        chunk = buffer[:SAMPLERATE * CHUNKDURATION]
                        buffer = buffer[SAMPLERATE * CHUNKDURATION:]
                        try:
                            processingq.put_nowait(chunk)
                        except queue.Full:
                            printf("Processing queue full, skipping chunk", Colors.WARNING)
                except queue.Empty:
                    continue
                except KeyboardInterrupt:
                    printf("Recording stopped by user", Colors.WARNING)
                    stopevent.set()
                except Exception as e:
                    printf(f"Error in audio buffering: {e}", Colors.FAIL)
                    stopevent.set()
    except Exception as e:
        printf(f"Error opening audio input: {e}", Colors.FAIL)
        stopevent.set()

def processingthread():
    printf("PROCESS Processing thread started", Colors.OKGREEN)
    chunkcount = 0
    while not stopevent.is_set():
        try:
            chunk = processingq.get(timeout=1.0)
            chunkcount += 1
            filepath = os.path.join(OUTPUTDIR, f"temp_{chunkcount}.wav")
            sf.write(filepath, chunk, SAMPLERATE)
            try:
                result = CONFIG.whispermodel.transcribe(filepath, language="en", fp16=False)
                transcriptiontext = result['text'].strip()
                if not transcriptiontext or len(transcriptiontext) < 3:
                    continue
                printf(f"Transcribed: {transcriptiontext}", Colors.OKCYAN)

                apiq.put_nowait({
                    "room_id": CONFIG.room_id,
                    "message": transcriptiontext,
                })
            except Exception as e:
                printf(f"Error processing chunk: {e}", Colors.FAIL)
        except queue.Empty:
            continue
        except Exception as e:
            printf(f"Error in processing thread: {e}", Colors.FAIL)

def apisenderthread():
    printf("API Sender thread started", Colors.OKGREEN)
    while not stopevent.is_set():
        try:
            payload = apiq.get(timeout=1.0)
            sendtoapi(payload)
        except queue.Empty:
            continue
        except Exception as e:
            printf(f"Error in API sender thread: {e}", Colors.FAIL)

def sendtoapi(payload):
    if not CONFIG.apiurl or not CONFIG.room_id:
        printf("API URL or room_id not set, skipping API send.", Colors.WARNING)
        return
    try:
        response = requests.post(CONFIG.apiurl, json=payload, timeout=5)
        if response.ok:
            printf("Sent to server successfully.", Colors.OKGREEN)
        else:
            printf(f"Server error {response.status_code}: {response.text}", Colors.FAIL)
    except requests.exceptions.Timeout:
        printf("Request timeout", Colors.WARNING)
    except Exception as e:
        printf(f"Error sending to server: {e}", Colors.FAIL)

def cleanupthreads():
    printf("Stopping all threads...", Colors.WARNING)
    stopevent.set()
    for thread in threadslist:
        thread.join(timeout=5.0)
        if thread.is_alive():
            printf(f"Thread {thread.name} did not stop gracefully.", Colors.WARNING)
    printf("All threads stopped.", Colors.OKGREEN)

def starttranscribing():
    printf("Starting Multi-Threaded Transcription System", Colors.BOLD)
    global threadslist
    stopevent.clear()
    t1 = Thread(target=audiobufferingthread, name="AudioBuffer", daemon=False)
    t2 = Thread(target=processingthread, name="Processing", daemon=False)
    t3 = Thread(target=apisenderthread, name="APISender", daemon=False)
    threadslist = [t1, t2, t3]
    for thread in threadslist:
        thread.start()
    try:
        for thread in threadslist:
            thread.join()
    except KeyboardInterrupt:
        printf("Interrupt detected, cleaning up...", Colors.WARNING)
        cleanupthreads()
        sys.exit(0)
    except Exception as e:
        printf(f"FATAL ERROR: {e}", Colors.FAIL)
        cleanupthreads()
        sys.exit(1)

def menu():
    while True:
        printf("--- Main Menu ---", Colors.HEADER)
        print("1. Setup server URL & room_id")
        print("2. Load Whisper model")
        print("3. Start transcribing from microphone")
        print("0. Exit")
        choice = input("choice > ").strip()
        if choice == "1":
            setupserver()
        elif choice == "2":
            loadmodels()
        elif choice == "3":
            if CONFIG.whispermodel is None:
                printf("Please load models first (option 2).", Colors.WARNING)
            else:
                starttranscribing()
        elif choice == "0":
            printf("Exiting...", Colors.OKGREEN)
            cleanupthreads()
            sys.exit(0)
        else:
            printf("Invalid choice. Try again.", Colors.FAIL)

if __name__ == "__main__":
    printf("\n" + "="*70, Colors.HEADER)
    printf(" Real-Time Transcription System ", Colors.BOLD)
    printf("="*70 + "\n", Colors.HEADER)
    try:
        menu()
    except KeyboardInterrupt:
        printf("Application terminated by user", Colors.WARNING)
        cleanupthreads()
        sys.exit(0)
    except Exception as e:
        printf(f"FATAL ERROR: {e}", Colors.FAIL)
        cleanupthreads()
        sys.exit(1)
