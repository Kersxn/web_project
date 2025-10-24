# ⚽ Football Stats Management System

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing football player statistics with role-based access control.

## 🚀 Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Password change functionality
- Role-based access control (Admin/User)

### 🧑‍💼 Admin Capabilities
- **Dashboard**: View system statistics and recent activity
- **Player Management**: 
  - Add new players
  - Edit player information
  - Delete players
  - View all player statistics
- **User Management**:
  - Add new users
  - Edit user details and roles
  - Remove users
  - View all system users

### 🙋‍♂️ User Capabilities
- View player statistics
- Search and filter players
- View player details
- Change personal password
- Responsive design for mobile and desktop

## 🛠️ Technology Stack

- **Frontend**: React.js, Bootstrap, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Bootstrap 5 with custom CSS

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local installation or MongoDB Atlas account)

## 🚀 Installation & Setup

### 1. Clone or Download the Project
The project is located in your Desktop/football folder.

### 2. Backend Setup
```bash
cd ~/Desktop/football/backend
npm install
```

### 3. Frontend Setup
```bash
cd ~/Desktop/football/frontend
npm install
```

### 4. Environment Configuration

#### Option A: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
NODE_ENV=development
```

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Update the `MONGODB_URI` in `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/football-stats
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
NODE_ENV=development
```

### 5. Running the Application

#### Start the Backend Server
```bash
cd ~/Desktop/football/backend
npm run dev
```
The backend will run on `http://localhost:5000`

#### Start the Frontend Development Server
```bash
cd ~/Desktop/football/frontend
npm start
```
The frontend will run on `http://localhost:3000`

## 👤 Default Users

After starting the application, you can register new users through the registration page. The first user you create with admin role will have full system access.

### Creating an Admin User
1. Go to the registration page
2. Fill in your details
3. Select "Admin" as the role
4. Complete registration

## 📱 Usage

### For Admins
1. **Dashboard**: View system overview and statistics
2. **Players**: Manage all player data (add, edit, delete)
3. **Users**: Manage system users and their roles
4. **Profile**: Update personal information and change password

### For Regular Users
1. **Dashboard**: View player statistics overview
2. **Players**: Browse and search player data (read-only)
3. **Profile**: Change personal password

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/change-password` - Change password

### Players
- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get single player
- `POST /api/players` - Create player (Admin only)
- `PUT /api/players/:id` - Update player (Admin only)
- `DELETE /api/players/:id` - Delete player (Admin only)
- `GET /api/players/search/:query` - Search players

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🎨 Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive interface using Bootstrap
- **Real-time Updates**: Immediate feedback on all operations
- **Search & Filter**: Advanced player search and filtering
- **Role-based Security**: Different access levels for admins and users
- **Data Validation**: Comprehensive form validation and error handling

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- Protected routes and API endpoints

## 📁 Project Structure

```
football/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   ├── App.js       # Main app component
│   │   └── App.css      # Custom styles
│   └── package.json     # Frontend dependencies
└── README.md           # This file
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running (if using local installation)
   - Check your connection string in `.env` file
   - Verify network access (if using MongoDB Atlas)

2. **Port Already in Use**
   - Change the PORT in `backend/.env` file
   - Kill existing processes using the port

3. **CORS Issues**
   - Ensure backend is running on port 5000
   - Check that frontend is making requests to the correct backend URL

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify for your own use.

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.

---

**Happy Coding! ⚽**
