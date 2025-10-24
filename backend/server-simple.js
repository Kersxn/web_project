const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// In-memory storage for demo purposes
let users = [];
let players = [];

// Middleware to check authentication
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
  next();
};

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Football Stats Management System API - Demo Mode' });
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      createdAt: new Date()
    };

    users.push(user);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/auth/me', auth, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

app.put('/api/auth/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, req.user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    const userIndex = users.findIndex(u => u.id === req.user.id);
    users[userIndex].password = hashedPassword;

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Player routes
app.get('/api/players', auth, (req, res) => {
  res.json(players);
});

app.get('/api/players/:id', auth, (req, res) => {
  const player = players.find(p => p._id === req.params.id);
  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }
  res.json(player);
});

app.post('/api/players', auth, adminAuth, (req, res) => {
  try {
    const player = {
      _id: Date.now().toString(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    players.push(player);
    res.status(201).json({
      message: 'Player created successfully',
      player
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/players/:id', auth, adminAuth, (req, res) => {
  try {
    const playerIndex = players.findIndex(p => p._id === req.params.id);
    if (playerIndex === -1) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    players[playerIndex] = {
      ...players[playerIndex],
      ...req.body,
      updatedAt: new Date()
    };
    
    res.json({
      message: 'Player updated successfully',
      player: players[playerIndex]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/players/:id', auth, adminAuth, (req, res) => {
  try {
    const playerIndex = players.findIndex(p => p._id === req.params.id);
    if (playerIndex === -1) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    players.splice(playerIndex, 1);
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/players/search/:query', auth, (req, res) => {
  const query = req.params.query.toLowerCase();
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(query) ||
    player.team.toLowerCase().includes(query) ||
    player.position.toLowerCase().includes(query) ||
    player.nationality.toLowerCase().includes(query)
  );
  res.json(filteredPlayers);
});

// User management routes (Admin only)
app.get('/api/users', auth, adminAuth, (req, res) => {
  const usersWithoutPasswords = users.map(u => ({
    _id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt
  }));
  res.json(usersWithoutPasswords);
});

app.get('/api/users/:id', auth, adminAuth, (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  });
});

app.post('/api/users', auth, adminAuth, async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash default password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create new user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      createdAt: new Date()
    };

    users.push(user);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/users/:id', auth, adminAuth, (req, res) => {
  try {
    const { name, email, role } = req.body;
    const userIndex = users.findIndex(u => u.id === req.params.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      role
    };
    
    res.json({
      message: 'User updated successfully',
      user: {
        _id: users[userIndex].id,
        name: users[userIndex].name,
        email: users[userIndex].email,
        role: users[userIndex].role,
        createdAt: users[userIndex].createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/users/:id', auth, adminAuth, (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} - Demo Mode (In-Memory Storage)`);
  console.log('Note: Data will be lost when server restarts. This is for demo purposes only.');
});
