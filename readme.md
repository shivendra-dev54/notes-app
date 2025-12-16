# Heart Notes

Heart Notes is a note-taking application built with a React frontend and an Express backend. The frontend is powered by Vite and TypeScript, while the backend uses Node.js, Express, and MongoDB.

## Features

- User registration and login
- JWT-based authentication
- Create, read, update, and delete notes
- Responsive design

## Project Structure
```
notes-app-api/
├── .env
├── Config/
│ └── dbConnect.js
├── controllers/
│ ├── notesController.js
│ └── userController.js
├── Middleware/
│ ├── corsHandler.js
│ ├── errorHandler.js
│ └── tokenHandler.js
├── Models/
│ ├── noteSchema.js
│ └── userSchema.js
├── Routes/
│ ├── notesRouter.js
│ └── userRouter.js
├── package.json
├── readme.md
└── server.js

notes-app-frontend/
├── .gitignore
├── components/
│ ├── HomePage.tsx
│ ├── LogIn.tsx
│ ├── MainPageLoggedIn.tsx
│ └── SignIn.tsx
├── eslint.config.js
├── index.html
├── package.json
├── public/
├── README.md
├── src/
│ ├── App.tsx
│ ├── index.css
│ ├── main.tsx
│ └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Navigate to the `notes-app-api` directory:
    cd notes-app-api

2. Install the dependencies:
    npm install


3. Create a .env file in the notes-app-api directory and add the following environment variables:
    PORT=64001
    DB_STRING=<your_mongodb_connection_string>
    JWT_SECRET_TOKEN=<your_jwt_secret>
    VALIDATION_ERROR=400
    UNAUTHORIZED=401
    FORBIDDEN=403
    NOT_FOUND=404
    INTERNAL_SERVER_ERROR=500


4. Start the backend server:
    npm run dev



### Frontend Setup

1. Navigate to the notes-app-frontend directory:
    cd notes-app-frontend


2. Install the dependencies:
    npm install


3. Start the frontend development server:
    npm run dev



### API Endpoints

1. User Routes

POST /api/user/register - Register a new user
POST /api/user/login - Login a user
GET /api/user/current - Get current user information (requires authentication)


2. Notes Routes

GET /api/notes - Get all notes (requires authentication)
POST /api/notes - Add a new note (requires authentication)
PUT /api/notes/:id - Update a note (requires authentication)
DELETE /api/notes/:id - Delete a note (requires authentication)

