# RBAC Blog Platform

A full-stack blog platform with Role-Based Access Control (RBAC), featuring different permissions for administrators and regular users. This platform allows admins to create, edit, and delete blog posts, while regular users can browse and read content.

## Project Structure

```
RBAC/
├── backend/     # Node.js/Express.js backend server
└── frontend/    # React frontend application
```

## Features

- 🔐 Role-based access control (RBAC) system
- 🔑 JWT Authentication
- 👤 User management (register, login)
- 📝 Blog post management
- 🛡️ Protected routes based on user roles
- 💻 Admin dashboard for content management

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd RBAC/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables (see `.env.example` for reference):
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rbac-blog
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

5. The server should now be running at http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd RBAC/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend application:
   ```
   npm run dev
   ```

4. The application should now be running at http://localhost:3000 (or whichever port is specified by Vite)
