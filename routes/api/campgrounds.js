const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Campground = require('../../models/Campground');
const Comment = require('../../models/Comment');

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
      campgroundFields.name = user.name;

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
    const campgrounds = await Campground.find()
      .sort({ date: -1 })
      .populate('comments');
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
    const campground = await Campground.findById(req.params.id).populate(
      'comments'
    );
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

// @route   POST api/campgrounds/comment/:id
// @desc    Comment on a campground
// @access  Private

router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const campground = await Campground.findById(req.params.id).populate(
        'comments'
      );

      const newComment = new Comment({
        text: req.body.text,
        name: user.name,
        author: req.user.id,
        avatar: user.avatar
      });

      const comment = await newComment.save();
      campground.comments.unshift(comment);

      await campground.save();

      res.json(campground.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/campgrounds/comment/:id/:comment_id
// @desc    Delete a comment on post
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id);
    const comment = await Comment.findById(req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await comment.remove();

    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/campgrounds/like/:id
// @desc    Like a campground
// @access  Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id);

    // check if campground has already been liked by this user

    if (
      campground.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Campground already liked' });
    }

    campground.likes.unshift({ user: req.user.id });

    await campground.save();

    res.json(campground.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/campgrounds/unlike/:id
// @desc    UnLike a campground
// @access  Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id);

    if (
      campground.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Campground has not yet been liked' });
    }

    const removeIndex = campground.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    campground.likes.splice(removeIndex, 1);
    await campground.save();
    res.json(campground.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
