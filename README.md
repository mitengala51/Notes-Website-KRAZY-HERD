# Notes App - Full Stack Application

A modern, full-stack notes application built with React, Node.js, Express, and MongoDB. Features include creating, editing, deleting, searching, and tagging notes.

## Features

- ✅ Create, read, update, and delete notes
- 🔍 Search notes by title and content
- 🏷️ Tag system for organizing notes
- 📱 Responsive design with modern UI
- 🔄 Real-time updates
- 📊 Clean, organized component structure

## Tech Stack

### Frontend
- React 18
- Axios for API calls
- Lucide React for icons
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Validator
- CORS enabled

## Project Structure

```
notes-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NoteForm.jsx
│   │   │   ├── NotesList.jsx
│   │   │   └── SearchAndFilter.jsx
│   │   ├── services/
│   │   │   └── noteService.js
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://mitengala51:IHi9T8Bfkx1EmJlL@cluster0.tfyrn00.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   NODE_ENV=development
   ```

4. **Start the server:**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

   The server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
3. **Setup Tailwind CSS:**
   Create `tailwind.config.js`:
   ```javascript
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

   Update `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4️⃣ To run the backend locally while using the frontend:

1️⃣ Open:

swift
Copy
Edit
Notes-Website-KRAZY-HERD/frontend/src/services/noteService.js
2️⃣ Find:

js
Copy
Edit
const API_BASE_URL = "https://notes-website-krazy-herd-production.up.railway.app/api";
3️⃣ Replace it with:

js
Copy
Edit
const API_BASE_URL = "http://localhost:5000/api";
✅ This will connect your frontend to your local backend for development and testing.

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will open on `http://localhost:5173/`

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes (supports search and tag filtering)
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Tags
- `GET /api/tags` - Get all unique tags

### Health Check
- `GET /api/health` - API health status

## API Usage Examples

### Create a Note
```javascript
POST /api/notes
{
  "title": "My Note",
  "content": "This is the content of my note",
  "tags": ["work", "important"]
}
```

### Search Notes
```javascript
GET /api/notes?search=meeting&tag=work
```

## Component Structure

### Reusable Components

- **Button.jsx**: Flexible button component with variants (primary, secondary, danger, ghost)
- **Header.jsx**: Application header with branding
- **NoteCard.jsx**: Individual note display card with edit/delete actions
- **NoteForm.jsx**: Form for creating and editing notes
- **NotesList.jsx**: Grid layout for displaying notes
- **SearchAndFilter.jsx**: Search input and tag filter dropdown

### Services

- **noteService.js**: Axios-based API service with interceptors for error handling

## Key Features Implementation

### Search and Filter
- Real-time search by title and content
- Tag-based filtering
- Positioned above the notes list for better UX

### Tags System
- Comma-separated input for tags
- Automatic tag extraction and display
- Tag-based filtering in search

### Error Handling
- Comprehensive error handling with user-friendly messages
- Network error detection
- Validation error display

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly interface

## Development Tips

1. **Hot Reloading**: Both frontend and backend support hot reloading during development
2. **Error Logging**: Check browser console and server logs for debugging
3. **API Testing**: Use tools like Postman or curl to test API endpoints
4. **Component Testing**: Each component is isolated and can be tested independently

## Deployment

### Backend Deployment
1. Set production environment variables
2. Update CORS settings for production domain
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages
3. Update API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
