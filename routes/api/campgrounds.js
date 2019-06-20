const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Campground = require('../../models/Campground');

// @route   POST api/campgrounds
// @desc    Create a campground
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required')
        .not()
        .isEmpty(),
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newCampground = new Campground({
        description: req.body.description,
        title: req.body.title,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const campground = await newCampground.save();
      res.json(campground);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/campgrounds
// @desc    Get all campgrounds
// @access  Public

router.get('/', async (req, res) => {
  try {
    const campgrounds = await Campground.find().sort({ date: -1 });
    res.json(campgrounds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/campgrounds/:id
// @desc    Get a campground with id
// @access  Public

router.get('/:id', async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
      return res.status(404).json({ msg: 'Campground not found' });
    }
    res.json(campground);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Campground not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
