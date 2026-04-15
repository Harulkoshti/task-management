# Task Management Application

A full-stack task management app built with:

- **Frontend:** React + TypeScript + Redux Toolkit + Axios + React Router
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL with Sequelize ORM
- **Auth:** JWT-based authentication

Each user can register/login and manage their own tasks (create, update, view, delete), with filtering and sorting support.

## Project Structure

```text
task-management/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      types/
  frontend/
    src/
      components/
      pages/
      redux/
      services/
      types/
```

## Features

- User registration and login
- JWT-secured APIs
- Task CRUD operations
- Per-user task isolation
- Filter tasks by status and priority
- Sort tasks by created date, due date, or priority

## Tech Stack

### Backend

- Express
- Sequelize
- PostgreSQL (`pg`, `pg-hstore`)
- `bcryptjs` for password hashing
- `jsonwebtoken` for JWT handling
- TypeScript

### Frontend

- React
- Redux Toolkit + React Redux
- React Router
- Axios
- TypeScript
- Vite

## Prerequisites

- Node.js (18+ recommended)
- npm
- PostgreSQL running locally or remotely

## Backend Setup

1. Go to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` from example:

```bash
cp .env.example .env
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Update `.env` values:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=replace-with-secure-secret
```

5. Ensure the PostgreSQL database exists (`task_management` by default).

6. Start backend in dev mode:

```bash
npm run dev
```

Backend runs at `http://localhost:4000`.

## Frontend Setup

1. Go to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend:

```bash
npm run dev
```

Frontend runs on Vite dev server (usually `http://localhost:5173`).

## Available Scripts

### Backend

- `npm run dev` - start backend with ts-node-dev
- `npm run build` - compile TypeScript to `dist`
- `npm start` - run compiled backend from `dist`

### Frontend

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build production assets
- `npm run preview` - preview production build

## API Endpoints

### Auth

- `POST /register`
- `POST /login`

### Tasks (Require `Authorization: Bearer <token>`)

- `GET /tasks` - list tasks for logged-in user
- `GET /tasks/:id` - get single task (owned by logged-in user)
- `POST /tasks` - create task
- `PUT /tasks/:id` - update task
- `DELETE /tasks/:id` - delete task

## Task Query Parameters (`GET /tasks`)

- `status`: `pending` | `completed`
- `priority`: `low` | `medium` | `high`
- `sortBy`: `createdAt` | `dueDate` | `priority`

Example:

```http
GET /tasks?status=pending&priority=high&sortBy=dueDate
```

## Data Model

### Users

- `id`
- `email` (unique)
- `password_hash`
- `created_at`

### Tasks

- `id`
- `user_id` (FK to users)
- `title`
- `description`
- `priority`
- `due_date`
- `status`
- `created_at`

## Notes

- Backend currently uses `sequelize.sync()` in startup to keep schema in sync.
- For production, prefer Sequelize migrations instead of sync-based schema management.
- Frontend API base URL is set to `http://localhost:4000` in `frontend/src/services/api.ts`.

## Future Improvements

- Add refresh tokens and persistent login
- Add form/schema validation
- Add pagination for large task lists
- Add automated tests (backend + frontend)
- Dockerize backend/frontend/PostgreSQL
