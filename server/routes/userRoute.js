const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({email: req.body.email});
        if(userExists) {
            res.status(200).send({message: 'User already exists', success: false});
        } 
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({message: 'User registered successfully', success: true});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error creating user', success: false});
        
    }
});


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            res.status(200).send({message: 'User not found', success: false});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) {
            res.status(200).send({message: 'Invalid credentials', success: false});
        } else {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
            res.status(200).send({message: 'Login successful', success: true, token: token});   
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error logging in', success: false});
        
    }
});

router.post('/get-user-info-by-id', authMiddleware, async(req, res)=>{
    try {
        console.log(req.body);
        console.log(req.body.userId);
        const user = await User.findOne({_id: req.body.userId});
        if(!user) {
            return res.status(200).send({message: 'User not found', success: false});
        }else {
            res.status(200).send({ success: true, user: {
                name: user.name,
                email: user.email,
            }});
        }
        
    } catch (error) {
        res.status(500).send({message: 'Error getting user info', success: false});
        
    }
})

module.exports = router;