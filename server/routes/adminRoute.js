const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/get-all-doctors', authMiddleware, async(req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).send({
            message: 'Doctors fetched successfully', 
            success: true, 
            data: doctors
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error fetching doctors',
            success: false,
            error
        });

        }
    
    })

router.get('/get-all-users', authMiddleware, async(req, res) => {

    try {
        const users = await User.find({});
        res.status(200).send({
            message: 'Users fetched successfully', 
            success: true, 
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error fetching users',
            success: false,
            error
        });
        
    }
  })


  router.post('/change-doctor-account-status', authMiddleware, async(req, res) => {

    try {
        const { doctorId, status, userId } = req.body;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, {status: status});
      

        const user = await User.findOne({_id: userId});
        const unseenNotifications = user.unseenNotifications

        unseenNotifications.push({
            type: "new doctor application status",
            message: `Doctor application status updated to ${status} for ${doctor.firstName} ${doctor.lastName}`,
            onClickPath: '/notifications',
        })
        await user.save();
        const doctors = await Doctor.find({});

        res.status(200).send({
            message: 'Doctor status updated successfully', 
            success: true, 
            data: doctor
        });
     
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error fetching users',
            success: false,
            error
        });
        
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
            message: `New Therapist application from ${newdoctor.firstName} ${newdoctor.lastName}`,
            data: {
                doctorId: newdoctor._id,
                name: newdoctor.firstName + ' ' + newdoctor.lastName,
            },
            onClickPath: '/admin/doctors'
        })
        await User.findOneAndUpdate(adminUser._id, { unseenNotifications});
        res.status(200).send({message: 'Therapist account application submitted successfully', success: true});

      
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error applying therapist account', success: false});
        
    }
});

  module.exports = router;
