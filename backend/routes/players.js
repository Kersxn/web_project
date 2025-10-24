const express = require('express');
const Player = require('../models/Player');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all players (accessible to all authenticated users)
router.get('/', auth, async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single player
router.get('/:id', auth, async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new player (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json({
      message: 'Player created successfully',
      player
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update player (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    res.json({
      message: 'Player updated successfully',
      player
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete player (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search players
router.get('/search/:query', auth, async (req, res) => {
  try {
    const query = req.params.query;
    const players = await Player.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { team: { $regex: query, $options: 'i' } },
        { position: { $regex: query, $options: 'i' } },
        { nationality: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
