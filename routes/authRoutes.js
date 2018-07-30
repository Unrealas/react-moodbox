const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

// @route   /api/register
// @access  Public
// @desc    Register new user

router.post('/api/register', async (req, res) => {
    console.log(req.body);
    const {email, firstname, lastname, password} = req.body;

    const errors = {};
    if(!email) errors.email= 'The email is required';
    if(!firstname) errors.firstname= 'The firstname is required';
    if(!lastname) errors.lastname= 'The lastname is required';
    if(!password) errors.password= 'The password is required';
    // check if !=errors
    if (!_.isEmpty(errors)) return res.status(400).json(errors);
    const match = await User.findOne({email});
    if (match) {
        return res.status(400).json({email: 'That user already registered'})
    }
    console.log(errors);

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        firstname,
        lastname,
        password: hash,
        followers: [],
        following: []
    });
    try {
        await user.save();
        res.json(user)
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
});

// @route   POST /api/login
// @access  Public
// @desc    User login

router.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    // search for user in DB
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: 'Bad login'});
    // check password with DB hash password
    const match = await bcrypt.compare(password, user.password);
    // console.log(match);
    if (!match) return res.status(400).json({message: 'Bad password'});
    const userData = _.pick(user,['_id', 'firstname', 'lastname', 'created_at', 'followers', 'following', 'email']);
    const token = jwt.sign(userData, process.env.JWT_KEY);
    res.json(token);
});


module.exports = router;