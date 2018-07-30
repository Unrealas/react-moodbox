const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const userAuth = require('../auth/authUser');

// @route   GET /api/users
// @access  Test
// @desc     Get all users
router.get('/api/users', async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users)
});

// @route   GET /api/users/:id
// @access  Current user
// @desc     Get current user data
router.get('/api/users/:id', async (req, res) => {
    try {
        const user = User.findById(req.params.id);
        const posts = Post.find({user:req.params.id});

        const data = await Promise.all([user,posts]);
        console.log(data);
        if (!data[0]) return res.status(404).send('user not found');
        res.json(data)
    } catch (e) {
        if (e) res.status(404).send('user not found');
    }
});

// @route   DELETE /api/users/
// @access  Current user
// @desc     Delete current user data
router.delete('/api/users/', userAuth, async (req, res) => {
    try {
        // user delete
        await User.findByIdAndRemove(req.user._id);
        // deleting all posts created by this user
        await Post.deleteMany({user: req.user._id});
        res.json({message: `user ${req.user.email} is deleted!`})
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'user not found'});
    }
});

module.exports = router;
