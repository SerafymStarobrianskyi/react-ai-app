# AI Chat App – React Project
A modern AI chat application built with React + Vite and a Node.js backend.  
The app allows users to send messages to an AI model, receive streamed responses, and manage chat interactions in a clean 
interface.

## Live Demo
https://react-ai-app-ten.vercel.app

## Features
- Send messages to an AI model
- Stream responses in real time
- Stop response generation
- Clear chat history
- Auto-resizing textarea
- Markdown rendering in messages
- Express backend proxy for secure API requests

## Tech Stack
- React
- Vite
- TypeScript
- Node.js
- Express
- CSS
- Ollama API

## Project Structure
```
client/
└── src/
  ├── components/ # UI components (Chat, Header, Input)
  ├── hooks/ # Custom React hooks (chat logic)
  ├── services/ # API communication with backend
  ├── styles/ # Global styles
  ├── types/ # TypeScript types
  ├── App.tsx
  └── main.tsx
server/
└── server.js # Express backend for AI requests
```

## Scripts

- `npm install` - Install dependencies
- `npm run dev` - Start Vite development server
- `npm run server` - Start backend server
- `npm run dev:full` - Run frontend and backend together
- `npm run build` - Build the application
- `npm run preview` - Preview production build
