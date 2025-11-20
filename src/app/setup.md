# Project Setup Guide

This guide will walk you through setting up both the backend and frontend components of the EchoVault real-time transcription service.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Python 3.8 or higher**: Required for the backend transcription server.
-   **Node.js v18 or higher**: Required for the frontend web application.
-   **A MongoDB Database**: The application uses MongoDB to store messages. You can get a free cluster from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
-   **Git**: For cloning the project repository.

---

## 1. Backend Setup (Python Transcription Server)

The backend is a Python script that runs locally on your machine. It captures audio from your microphone, uses the Whisper AI model to transcribe it, and sends the text to the web app.

### Step 1: Navigate to the Backend Directory

From the root of the project, move into the `backend_Server` directory:

```bash
cd backend_Server
```

### Step 2: Install Dependencies

Install all the required Python packages using the `requirements.txt` file. It's recommended to do this in a virtual environment.

```bash
# Create and activate a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Configure the Backend

The backend is configured using the `config.json` file. The first time you run the script, it will guide you through the setup process.

1.  **Run the script:**
    ```bash
    python final.py
    ```

2.  **Follow the on-screen prompts:**
    -   **Setup server URL & room_id (Option 1)**:
        -   **Base API URL**: Set this to the URL of your deployed web app, followed by `/api/message`. For local testing, this will likely be `http://localhost:9002/api/message`.
        -   **Room ID**: Enter a unique 6-digit ID that will be used to create a private transcription room.
        -   **Whisper model size**: Choose a model size (`tiny`, `small`, `medium`, `large`). Smaller models are faster but less accurate.
    -   **Load Whisper model (Option 2)**: This will download and load the selected Whisper model into memory. This may take some time on the first run.
    -   **Start transcribing (Option 3)**: This will start capturing audio from your microphone and sending transcriptions to the configured room.

Your settings will be saved in `config.json` for future sessions.

---

## 2. Frontend Setup (Next.js Web App)

The frontend is a Next.js application that displays the real-time transcriptions.

### Step 1: Install Dependencies

From the root of the project directory, install the necessary npm packages:

```bash
npm install
```

### Step 2: Set Up Environment Variables

You need to create a `.env.local` file in the root of the project to store your MongoDB connection string.

1.  Create the file:
    ```bash
    touch .env.local
    ```

2.  Add your MongoDB connection string to the file. Replace `<your-connection-string>` with the actual URI you get from MongoDB Atlas.

    ```env
    MONGODB_URI=<your-connection-string>
    DB_NAME=echovault
    ```

### Step 3: Run the Development Server

Start the Next.js development server to run the web app locally. By default, it will run on port 9002.

```bash
npm run dev
```

You can now access the web application at [http://localhost:9002](http://localhost:9002).

### Step 4: Join a Room

-   Open your browser to [http://localhost:9002](http://localhost:9002).
-   Enter the same 6-digit **Room ID** you configured in the backend Python script.
-   Click "Join Room".

You are now ready to start transcribing! Any audio captured and transcribed by the Python script will appear on this page in real-time.
