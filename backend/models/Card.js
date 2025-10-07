const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'Untitled Card'
  },
  imageData: {
    type: String,
    required: true
  },
  backImageData: {
    type: String,
    required: true
  },
  animatedGif: {
    type: String
  },
  thumbnail: {
    type: String
  },
  backThumbnail: {
    type: String
  },
  template: {
    type: String,
    enum: ['classic', 'modern', 'vintage', 'minimalist', 'neon', 'retro80s', 'chrome', 'holographic', 'galaxy', 'rainbow', 'grunge', 'polaroid', 'woodgrain', 'carbon', 'watercolor', 'sketch', 'cyberpunk', 'gold', 'diamond', 'marble', 'sunset', 'nebula', 'fire', 'ice', 'lightning', 'camo', 'newspaper', 'comic', 'chalkboard', 'blueprint', 'leather', 'denim', 'ocean'],
    default: 'classic'
  },
  featuredStats: {
    type: [String],
    default: [],
    validate: {
      validator: function(arr) {
        return arr.length <= 3;
      },
      message: 'Featured stats can have maximum of 3 items'
    }
  },
  cardData: {
    playerName: String,
    teamName: String,
    position: String,
    year: Number,
    hometown: String,
    height: String,
    weight: String,
    batsThrows: String,
    stats: {
      avg: String,
      hr: String,
      rbi: String,
      games: String,
      hits: String,
      sb: String,
      atBats: String,
      doubles: String,
      triples: String,
      walks: String,
      strikeouts: String,
      obp: String,
      slg: String,
      era: String,
      wins: String,
      losses: String,
      saves: String,
      ip: String,
      strikeoutsP: String,
      whip: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
cardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
cardSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Card', cardSchema);
