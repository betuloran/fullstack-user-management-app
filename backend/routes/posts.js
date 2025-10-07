const express = require('express');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts (optional userId query)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { userId } = req.query;
    
    const query = userId ? { userId } : {};
    const posts = await Post.find(query)
      .populate('userId', 'name username email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/posts/:id
// @desc    Get single post
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('userId', 'name username email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, body, userId } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and body'
      });
    }

    const post = await Post.create({
      title,
      body,
      userId: userId || req.user._id
    });

    const populatedPost = await Post.findById(post._id)
      .populate('userId', 'name username email');

    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/posts/:id
// @desc    Update post
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, body } = req.body;

    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check ownership (own post or admin)
    if (post.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    post.title = title || post.title;
    post.body = body || post.body;

    post = await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('userId', 'name username email');

    res.json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check ownership (own post or admin)
    if (post.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;