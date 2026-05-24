# Task Tracker

A full-stack web application for managing and tracking tasks. Built with FastAPI for the backend and React for the frontend.

## Features

- ✅ Create new tasks
- ✅ View all tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Task descriptions support
- ✅ Real-time updates with REST API
- ✅ Responsive UI with Tailwind CSS

## Technology Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Database
- **Pydantic** - Data validation

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React DOM** - React rendering

## Project Structure

```
task-tracker/
├── backend/
│   ├── main.py           # FastAPI application and endpoints
│   ├── models.py         # SQLAlchemy models
│   ├── database.py       # Database configuration
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── main.jsx      # React entry point
│   │   ├── index.css     # Styles
│   │   └── assets/       # Static assets
│   ├── public/           # Public files
│   ├── package.json      # Node dependencies
│   ├── vite.config.js    # Vite configuration
│   └── eslint.config.js  # ESLint configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Start the Frontend

From the `frontend` directory:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port)

## API Endpoints

### Create a Task
```
POST /tasks
Content-Type: application/json

{
  "title": "Task title"
}
```

### Get All Tasks
```
GET /tasks
```

### Mark Task as Complete
```
PUT /tasks/{task_id}
```

## Development

### Backend Commands
- `uvicorn main:app --reload` - Run development server
- `pip freeze > requirements.txt` - Update dependencies file

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Database

The application uses SQLite as the default database. The database file is created automatically when the backend starts.

### Task Model

```python
- id: Integer (Primary Key)
- title: String (Required)
- completed: Boolean (Default: False)
- description: Text (Optional)
```

## CORS Configuration

The backend is configured with CORS enabled for all origins (`*`). This allows the frontend to make requests to the API. For production, consider restricting the allowed origins.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

Created as a learning project for full-stack web development with FastAPI and React.

---

**Happy task tracking! 🚀**
