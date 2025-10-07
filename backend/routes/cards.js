const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Card = require('../models/Card');
const { ensureAuthenticated } = require('../middleware/auth');

// @route   GET /api/cards
// @desc    Get all cards for current user
// @access  Private
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const cards = await Card.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-imageData'); // Exclude full image data for list view, keep thumbnail

    const total = await Card.countDocuments({ userId: req.user._id });

    res.json({
      cards,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).json({ error: { message: 'Error fetching cards' } });
  }
});

// @route   GET /api/cards/:id
// @desc    Get single card by ID
// @access  Private
router.get('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!card) {
      return res.status(404).json({
        error: { message: 'Card not found' }
      });
    }

    res.json({ card });
  } catch (err) {
    console.error('Error fetching card:', err);
    res.status(500).json({ error: { message: 'Error fetching card' } });
  }
});

// @route   POST /api/cards
// @desc    Create new card
// @access  Private
router.post('/',
  ensureAuthenticated,
  [
    body('imageData').notEmpty().withMessage('Image data is required'),
    body('template').optional().isIn([
      // UNC Style
      'donruss1985', 'topps1990',
      // Textured
      'sandstone', 'canvas', 'concrete', 'woodgrain', 'leather', 'denim',
      'marble', 'carbon', 'brushedmetal',
      // Classic & Vintage
      'classic', 'vintage', 'polaroid', 'newspaper',
      // Modern & Premium
      'modern', 'minimalist', 'chrome', 'gold', 'diamond',
      // Artistic
      'watercolor', 'sketch', 'comic', 'grunge', 'chalkboard', 'blueprint',
      // Neon & Bright
      'neon', 'retro80s', 'cyberpunk', 'holographic', 'rainbow', 'lightning',
      // Nature & Elemental
      'galaxy', 'nebula', 'sunset', 'ocean', 'fire', 'ice',
      // Specialty
      'camo'
    ]),
    body('title').optional().isString().trim().isLength({ max: 100 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: { message: 'Validation error', errors: errors.array() } });
    }

    try {
      const {
        imageData,
        backImageData,
        animatedGif,
        template,
        title,
        settings,
        thumbnail,
        backThumbnail,
        cardData,
        featuredStats
      } = req.body;

      const card = await Card.create({
        userId: req.user._id,
        imageData,
        backImageData,
        animatedGif,
        template: template || 'classic',
        title: title || 'Untitled Card',
        settings: settings || {},
        thumbnail,
        backThumbnail,
        cardData,
        featuredStats
      });

      res.status(201).json({
        card,
        message: 'Card created successfully'
      });
    } catch (err) {
      console.error('Error creating card:', err);
      res.status(500).json({ error: { message: 'Error creating card' } });
    }
  }
);

// @route   PUT /api/cards/:id
// @desc    Update card
// @access  Private
router.put('/:id',
  ensureAuthenticated,
  [
    body('imageData').optional().notEmpty(),
    body('template').optional().isIn([
      // UNC Style
      'donruss1985', 'topps1990',
      // Textured
      'sandstone', 'canvas', 'concrete', 'woodgrain', 'leather', 'denim',
      'marble', 'carbon', 'brushedmetal',
      // Classic & Vintage
      'classic', 'vintage', 'polaroid', 'newspaper',
      // Modern & Premium
      'modern', 'minimalist', 'chrome', 'gold', 'diamond',
      // Artistic
      'watercolor', 'sketch', 'comic', 'grunge', 'chalkboard', 'blueprint',
      // Neon & Bright
      'neon', 'retro80s', 'cyberpunk', 'holographic', 'rainbow', 'lightning',
      // Nature & Elemental
      'galaxy', 'nebula', 'sunset', 'ocean', 'fire', 'ice',
      // Specialty
      'camo'
    ]),
    body('title').optional().isString().trim().isLength({ max: 100 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: { message: 'Validation error', errors: errors.array() } });
    }

    try {
      const {
        imageData,
        backImageData,
        animatedGif,
        template,
        title,
        settings,
        thumbnail,
        backThumbnail,
        cardData,
        featuredStats
      } = req.body;

      const card = await Card.findOne({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!card) {
        return res.status(404).json({
          error: { message: 'Card not found' }
        });
      }

      // Update fields
      if (imageData !== undefined) card.imageData = imageData;
      if (backImageData !== undefined) card.backImageData = backImageData;
      if (animatedGif !== undefined) card.animatedGif = animatedGif;
      if (template) card.template = template;
      if (title !== undefined) card.title = title;
      if (settings) card.settings = { ...card.settings, ...settings };
      if (thumbnail) card.thumbnail = thumbnail;
      if (backThumbnail !== undefined) card.backThumbnail = backThumbnail;
      if (cardData !== undefined) card.cardData = cardData;
      if (featuredStats !== undefined) card.featuredStats = featuredStats;

      await card.save();

      res.json({
        card,
        message: 'Card updated successfully'
      });
    } catch (err) {
      console.error('Error updating card:', err);
      res.status(500).json({ error: { message: 'Error updating card' } });
    }
  }
);

// @route   DELETE /api/cards/:id
// @desc    Delete card
// @access  Private
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!card) {
      return res.status(404).json({
        error: { message: 'Card not found' }
      });
    }

    res.json({ message: 'Card deleted successfully' });
  } catch (err) {
    console.error('Error deleting card:', err);
    res.status(500).json({ error: { message: 'Error deleting card' } });
  }
});

module.exports = router;
