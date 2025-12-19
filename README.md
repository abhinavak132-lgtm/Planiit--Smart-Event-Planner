# PlanIt - Smart Event Planning Website

A modern MERN stack application for smart event planning with dark theme UI.

## Features

- **User Authentication**: Simple login/register system with JWT
- **Event Management**: Create, view, and manage events
- **Smart Event Suggestions**: AI-powered suggestions based on user history
- **Quick Checklist Generator**: Auto-generated checklists for events
- **Event Reminder Toggle**: Enable/disable reminders for events
- **Dark Theme UI**: Clean, modern interface using Tailwind CSS

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS (as Vite plugin)
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens

## Project Structure

```
PlanIt/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── eventController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Event.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── eventRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── EventCard.jsx
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── CreateEvent.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Login.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Compass (for local development)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your MongoDB connection:
```
MONGODB_URI=mongodb://localhost:27017/planit
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Start MongoDB Compass and create a database named `planit`

5. Run the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard**: View upcoming events and smart suggestions
3. **Create Event**: Add new events with automatic checklist generation
4. **Manage Events**: Toggle reminders and view event checklists

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Events
- `GET /api/events` - Get user events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `GET /api/events/suggestions` - Get smart suggestions

## Unique Features

### Smart Event Suggestions
The app analyzes your past events and suggests similar event types based on patterns in your event history.

### Quick Checklist Generator
When creating an event, the system automatically generates a relevant checklist based on the event name and type (birthday, meeting, party, etc.).

### Event Reminder Toggle
Each event has a reminder toggle that can be enabled/disabled, with the state stored in the database.

## Development Notes

- Uses Tailwind CSS as a Vite plugin for seamless integration
- Simple, clean code structure without unnecessary abstractions
- Dark theme throughout the application
- Responsive design for mobile and desktop
- Basic error handling and validation

## License

MIT License