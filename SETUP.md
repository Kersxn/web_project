# Quick Setup Guide

## Current Status
✅ Backend server is running on port 5000  
✅ Frontend is running on port 3000  
✅ JSX syntax error has been fixed  

## MongoDB Setup Options

### Option 1: MongoDB Atlas (Recommended - No Local Installation)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Get your connection string
5. Update `backend/.env` file with your connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/football-stats?retryWrites=true&w=majority
```

### Option 2: Local MongoDB (Requires Installation)
1. Update Command Line Tools: `sudo xcode-select --install`
2. Install MongoDB: `brew install mongodb-community`
3. Start MongoDB: `brew services start mongodb-community`
4. The current .env file is already configured for local MongoDB

## Testing the Application

1. **Backend**: http://localhost:5000 (should show API message)
2. **Frontend**: http://localhost:3000 (should show login page)

## First Steps After Setup

1. Register a new user with "Admin" role
2. Login with your admin account
3. Add some sample players
4. Test all features

## Troubleshooting

- If MongoDB connection fails, check your connection string
- If frontend shows errors, check browser console
- Both servers should be running simultaneously
