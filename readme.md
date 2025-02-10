# Full-Stack Event Management Platform

## Overview

The **Full-Stack Event Management Platform** is a web application that allows users to create, manage, and attend events. It features real-time attendee count updates using **Socket.io** and is built with a **MERN stack** (MongoDB, Express.js, React.js, Node.js). The application supports user authentication with JWT and is deployed on free-tier hosting services.

## Features

- **User Authentication** (JWT-based login and registration)
- **Event Management** (Create, edit, delete events with ownership restrictions)
- **Attendee Management** (Register and unregister for events)
- **Real-Time Updates** (Live attendee count updates via **Socket.io**)
- **Responsive UI** with **React & Tailwind CSS**
- **Global State Management** using `useContext`
- **Notifications** with `react-toastify`

## Tech Stack

### **Frontend:**

- React.js (Vite-based setup)
- Tailwind CSS for styling
- Axios for API requests
- React Router for navigation
- React Toastify for notifications
- useContext for global state management
- Lucide React for icons

### **Backend:**

- Node.js with Express.js
- MongoDB (using Mongoose)
- JWT-based authentication
- Socket.io for real-time updates
- CORS for security
- **Deployed on Vercel**

## Installation & Setup

### **Prerequisites:**

- Node.js & npm installed
- MongoDB Atlas (or local MongoDB instance)

### **1. Clone the repository:**

```sh
git clone https://github.com/yourusername/event-management-platform.git
cd event-management-platform
```

### **2. Backend Setup:**

```sh
cd backend
npm install
```

#### **Create a ****`.env`**** file:**

```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

#### **Run the backend server:**

```sh
npm start
```

### **3. Frontend Setup:**

```sh
cd frontend
npm install
```

#### **Create a ****`.env`**** file:**

```ini
VITE_BACKEND_URL=http://localhost:3000
```

#### **Run the frontend server:**

```sh
npm run dev
```

## API Endpoints

### **Authentication**

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| POST   | /api/auth/register | Register a new user           |
| POST   | /api/auth/login    | Authenticate user & get token |

### **Events**

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| GET    | /api/events      | Fetch all events                   |
| POST   | /api/events      | Create a new event (auth required) |
| PUT    | /api/events/:id | Edit an event (owner only)         |
| DELETE | /api/events/:id | Delete an event (owner only)       |

### **Attendees**

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| POST   | /api/events/:id/register   | Register for an event    |
| POST   | /api/events/:id/unregister | Unregister from an event |

## Deployment

- **Frontend:** Vercel
- **Backend:** Vercel
- **Database:** MongoDB Atlas

## Future Improvements

- Event image uploads
- Email notifications for event updates
- Admin dashboard for managing users & events

## License

This project is open-source under the MIT License.

## Contributors

- **Argh Jain** ([@arghjain29](https://github.com/arghjain29))

