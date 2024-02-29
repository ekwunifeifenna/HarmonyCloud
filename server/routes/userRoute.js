const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
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
        user.password = undefined
        if(!user) {
            return res.status(200).send({message: 'User not found', success: false});
        }else {
            res.status(200).send({ success: true, user: user});
        }
        
    } catch (error) {
        res.status(500).send({message: 'Error getting user info', success: false});
        
    }
})

router.post('/apply-doctor-account', authMiddleware, async (req, res) => {
    try {
        const newdoctor = new Doctor(req.body);
        await newdoctor.save();
        const adminUser = await User.findOne({isAdmin: true});

        const unseenNotifications = adminUser.unseenNotifications

        //notification sent to admin
        unseenNotifications.push({
            type: "new doctor application",
            message: `New doctor application from ${newdoctor.firstName} ${newdoctor.lastName}`,
            data: {
                doctorId: newdoctor._id,
                name: newdoctor.firstName + ' ' + newdoctor.lastName,
            },
            onClickPath: '/admin/doctors'
        })
        await User.findOneAndUpdate(adminUser._id, { unseenNotifications});
        res.status(200).send({message: 'Doctor account application submitted successfully', success: true});

      
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error applying doctor account', success: false});
        
    }
});

router.post('/mark-all-notifications-as-seen', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        const unseenNotifications = user.unseenNotifications;

        const seenNotifications = user.seenNotifications

        seenNotifications.push(...unseenNotifications);
        
        user.unseenNotifications = []
        user.seenNotifications = seenNotifications

        const updatedUser = await user.save()  
        updatedUser.password = undefined    
        res.status(200).send({message: 'Notifications marked as read', success: true, data: updatedUser});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error applying doctor account', success: false});
        
    }
});

router.post('/delete-all-notifications', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});

        user.unseenNotifications = []
        user.seenNotifications = []

        const updatedUser = await user.save() 
        updatedUser.password = undefined    
        res.status(200).send({message: 'Notifications deleted', success: true, data: updatedUser});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error applying doctor account', success: false});
        
    }
});


module.exports = router;
