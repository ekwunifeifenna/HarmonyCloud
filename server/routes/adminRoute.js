const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');
const Client = require('../models/clientModel');
const bcrypt = require('bcryptjs');
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

  router.get('/get-all-clients', authMiddleware, async(req, res) => {

    try {
        const clients = await Client.find({});
        res.status(200).send({
            message: 'Clients fetched successfully', 
            success: true, 
            data: clients
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error fetching clients',
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

  router.post('/change-client-account-status', authMiddleware, async(req, res) => {

    try {
        const { clientId, status, userId } = req.body;
        const client = await Client.findByIdAndUpdate(clientId, {status: status});
      

        const user = await User.findOne({_id: userId});
        const unseenNotifications = user.unseenNotifications

        unseenNotifications.push({
            type: "new client application status",
            message: `Client application status updated to ${status} for ${client.firstName} ${client.lastName}`,
            onClickPath: '/notifications',
        })
        await user.save();
        const clients = await Client.find({});

        res.status(200).send({
            message: 'Client status updated successfully', 
            success: true, 
            data: client
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

  router.post('/add-client-account', authMiddleware, async (req, res) => {
    try { 
        const newclient = new Client(req.body);
        await newclient.save();
        const adminUser = await User.findOne({isAdmin: true});

        const unseenNotifications = adminUser.unseenNotifications

        //notification sent to admin
        unseenNotifications.push({
            type: "new doctor application",
            message: `New client application from ${newclient.firstName} ${newclient.lastName}`,
            data: {
                clientId: newclient._id,
                name: newclient.firstName + ' ' + newclient.lastName,
            },
            onClickPath: '/admin/clients'
        })
        await User.findOneAndUpdate(adminUser._id, { unseenNotifications});
        res.status(200).send({message: 'Client account application submitted successfully', success: true});

      
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error creating client account', success: false});
          
    }
});

router.post('/apply-doctor-account', authMiddleware, async (req, res) => {
    try { 
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        
        // const newdoctor = new Doctor(req.body);
        
        const newdoctor = new Doctor({
            ...req.body,
            userId: req.body.userId,
        });
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
