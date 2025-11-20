# EchoVault: Real-Time Transcription Service

EchoVault is a real-time transcription service that captures audio from a user's microphone, transcribes it using OpenAI's Whisper model, and displays the text live on a web interface. This project demonstrates a powerful integration between a local Python backend for audio processing and a modern web application for real-time data display.

## Core Features

### Backend (Python Script)

- **Real-Time Audio Capture**: Captures live audio input directly from the microphone.
- **Whisper AI Integration**: Utilizes OpenAI's powerful Whisper model for highly accurate, on-device speech-to-text conversion.
- **Configurable Setup**: Allows users to configure the API endpoint, a unique Room ID, and the Whisper model size (from `tiny` to `large`) to balance performance and accuracy.
- **Multi-Threaded Processing**: Employs a multi-threaded architecture to handle audio buffering, transcription, and API communication concurrently, ensuring a smooth and responsive experience without bottlenecks.
- **Web API Communication**: Sends the transcribed text segments to the frontend application via a POST request.

### Frontend (Web App)

- **Real-Time Updates**: Displays transcribed messages instantly using Server-Sent Events (SSE), eliminating the need for page refreshes.
- **Room-Based Sessions**: Organizes transcriptions into private, six-digit rooms, ensuring users only see messages from their active session.
- **Message Grouping**: Automatically groups messages sent within the same minute, improving readability and providing better context.
- **Modern & Responsive UI**: Built with Next.js, React, and ShadCN UI components for a clean, intuitive, and mobile-friendly user experience.
- **Dark Mode**: Features a sleek dark theme for comfortable viewing in low-light environments.

## How It Works

The system is split into two main components:

1.  **The Backend (`backend_Server/final.py`)**: A Python script that runs on the user's local machine. It captures microphone audio, breaks it into chunks, transcribes each chunk using the Whisper AI model, and sends the resulting text to the frontend's API endpoint.
2.  **The Frontend (Next.js App)**: A web application that receives the transcribed text. When a message is received, it's stored in a MongoDB database and simultaneously broadcast to all clients connected to the same room using Server-Sent Events (SSE). This allows for a live, real-time feed of the transcription.

## Tech Stack

### Backend

- **Language**: Python
- **AI Model**: `openai-whisper` for speech-to-text.
- **Audio**: `sounddevice` for capturing microphone input and `soundfile` for handling audio data.
- **Networking**: `requests` for making HTTP requests to the web app.
- **Core Libraries**: `numpy`, `torch` (for Whisper).

### Frontend

- **Framework**: Next.js (with App Router)
- **Language**: TypeScript
- **UI**: React, ShadCN UI, Tailwind CSS
- **Real-Time Communication**: Server-Sent Events (SSE)
- **Database**: MongoDB
- **State Management**: React Hooks (`useState`, `useEffect`, `useTransition`)
- **Deployment**: Configured for Firebase App Hosting.

## Project Authors

This project was built by:

- **Adithyan P**: [GitHub Profile](https://github.com/legitcoconut)
- **Rohit Anil Kumar**: [GitHub Profile](https://github.com/RohitAnilKumar)

The complete source code is available on GitHub:
- **Project Repository**: [https://github.com/LegitCoconut/os_project_real_time_transcription](https://github.com/LegitCoconut/os_project_real_time_transcription)
