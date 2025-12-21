# Where’s Waldo — Photo Tagging App 🕹️ [Jeu Où est Charlie?](https://fr.wikipedia.org/wiki/O%C3%B9_est_Charlie_%3F) 
A photo tagging game inspired by the classic Where’s Waldo? built with React, Node.js, Express, and a backend database. This project challenges you to combine frontend interaction with backend validation to create an interactive and engaging full‑stack experience. 

## 🚀 Project Summary
The goal of this app is to let users find characters hidden inside a large image, similar to a photo tagging experience. When a user clicks on the image:
- A targeting box appears where they clicked.
- A list of characters is shown for the user to select.
- The backend validates whether the selected character’s coordinates are correct.
- If correct, a persistent marker is shown on the image.
- The app tracks how long it takes the user to find all characters.
- When the game is complete, the user can enter their name to record their score. 
This requires coordinating front‑end click handling, coordinate normalization, backend validation, and persistent scoring — a powerful combination of skills you’ll likely use in real applications. 

## 🎨 Live preview
The server will take a few second to start as it'is deployed on free plan (Le serveur prendra un peu de temps pour demarer car l'app est deploye sur un plan gratuit de Render).
[Try The game (Voir le jeu)](https://waldogame.vercel.app/)

## ✨ Key Features & Concepts
🖼️  **Image Interaction**
The user can click anywhere on the image to attempt a find. 

🎯 **Targeting Box & Character Selection**
On click, show a selection box plus a dropdown of hidden characters. 

🧠 **Backend Validation**
Click coordinates are sent to the backend to verify whether the choice matches stored character locations. 

⏱️ **Timing & Scoring**
The app measures how long it takes a user to find all characters and records their score. 

📊 **Leaderboard**
Store names and times for users who complete the game 

## 🧠 What I Learned
This project brought together frontend events and backend logic in a cohesive way:
- How to capture user clicks and normalize coordinates across different screen sizes. 
- How to design and validate game logic on the server, rather than trusting client data. 
- How to persist game data and scores with a database , session and cookies. 
- How to build an interface that interacts seamlessly with backend APIs. 
This project mimics real‑world applications where user interaction is validated and managed by the backend, such as tagging systems or interactive UIs.

## 🛠️ Technologies Used

Node.js & Express — backend routes and logic

React + Vite + react-router — image interaction & UI logic

Prisma — store image metadata, character positions, and scores

Deployment — hosting on a PaaS (Render)

## 📁 Project Structure
```
.
├── README.md
├── apps
│   ├── api
│   │   ├── babel.config.js
│   │   ├── package.json
│   │   ├── prisma.config.ts
│   │   └── src
│   │       ├── app.js
│   │       ├── config/
│   │       ├── controllers/
│   │       ├── errors/
│   │       ├── generated/
│   │       ├── middlewares/
│   │       ├── prisma/
│   │       ├── routes/
│   │       └── tests/
│   └── game
│       ├── README.md
│       ├── dist/
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── public/
│       ├── src
│       │   ├── App.jsx
│       │   ├── assets/
│       │   ├── features/
│       │   ├── layout/
│       │   ├── main.jsx
│       │   ├── routes.jsx
│       │   ├── styles
│       │   └── tests/
│       ├── vercel.json
│       └── vite.config.js
├── eslint.config.js
├── package.json
├── packages
│   ├── apiclient
│   │   ├── package.json
│   │   └── src/
│   ├── ui
│   │   ├── package.json
│   │   └── src/
│   └── utils
│       ├── package.json
│       └── src/
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```
