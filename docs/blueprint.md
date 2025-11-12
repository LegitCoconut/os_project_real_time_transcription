# **App Name**: EchoVault

## Core Features:

- Message Ingestion API: An API endpoint that accepts JSON payloads with room_id and message, saving the data to MongoDB.
- Database Management: Dynamically create or append to MongoDB collections based on the provided room_id.
- Real-time Message Display: Display messages in a chat-like interface.
- Room ID Input: Input field to enter a 6-digit room ID to fetch and display corresponding messages.
- Real-time Updates: Push new messages to all connected clients in real time using server sent events (SSE).
- Server Actions: Implement server actions using actions.ts file to handle database interactions.

## Style Guidelines:

- Primary color: Midnight blue (#2C3E50) for a sophisticated and secure feel.
- Background color: Light gray (#F4F4F8) for a clean and modern look.
- Accent color: Teal (#008080) for highlights and interactive elements.
- Body and headline font: 'Inter' sans-serif for a neutral, modern look, suitable for both headlines and body text.
- Use simple, line-based icons for room navigation and settings.
- Clean and intuitive layout with a focus on readability. Messages should be clearly separated and easy to follow.
- Subtle animations for new message alerts and transitions between rooms.