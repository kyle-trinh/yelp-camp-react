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

      const { description, title, image, coverImage, price } = req.body;

      const campgroundFields = {};

      campgroundFields.user = req.user.id;
      campgroundFields.title = title;
      campgroundFields.description = description;

      if (image) campgroundFields.image = image;
      if (coverImage) campgroundFields.coverImage = coverImage;
      if (price) campgroundFields.price = price;

      const newCampground = new Campground(campgroundFields);

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

// @route   DELETE api/campgrounds/:id
// @desc    Delete campground with id
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id);

    if (!campground) {
      return res.status(404).json({ msg: 'Campground not found' });
    }

    if (campground.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await campground.remove();

    res.json({ msg: 'Campground removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Campground not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/campgrounds/:id
// @desc    Edit campground with id
// @access  Private

router.put(
  '/:id',
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
      let campground = await Campground.findById(req.params.id);
      if (!campground) {
        return res.status(404).json({ msg: 'Campground not found' });
      }

      if (campground.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      const { description, title, image, coverImage, price } = req.body;

      const campgroundFields = {};

      campgroundFields.user = req.user.id;
      campgroundFields.title = title;
      campgroundFields.description = description;

      if (image) campgroundFields.image = image;
      if (coverImage) campgroundFields.coverImage = coverImage;
      if (price) campgroundFields.price = price;

      campground = await Campground.findOneAndUpdate(
        {
          _id: req.params.id
        },
        { $set: campgroundFields },
        { new: true }
      );
      return res.json(campground);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
