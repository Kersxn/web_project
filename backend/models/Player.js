const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Player name is required'],
    trim: true,
    minlength: [2, 'Player name must be at least 2 characters long']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Striker']
  },
  team: {
    type: String,
    required: [true, 'Team is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [16, 'Age must be at least 16'],
    max: [50, 'Age must be at most 50']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true
  },
  stats: {
    goals: {
      type: Number,
      default: 0,
      min: 0
    },
    assists: {
      type: Number,
      default: 0,
      min: 0
    },
    matches: {
      type: Number,
      default: 0,
      min: 0
    },
    yellowCards: {
      type: Number,
      default: 0,
      min: 0
    },
    redCards: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  marketValue: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
playerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Player', playerSchema);
