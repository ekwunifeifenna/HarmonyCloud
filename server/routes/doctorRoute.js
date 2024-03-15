const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');
const authMiddleware = require('../middlewares/authMiddleware');
const Joi = require('joi');

const doctorSchema = Joi.object({
    userId: Joi.string().required(),
    profilePicture: Joi.string(),
    taxType: Joi.array().items(Joi.string()),
    therapistType: Joi.array().items(Joi.string()).required(),
    therapistLevel: Joi.string(),
    companyName: Joi.string(),
    fein: Joi.string(),
    npi: Joi.string(),
    providerID: Joi.string(),
    stateLicenseNumber: Joi.string(),
    caqhID: Joi.string(),
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.date(),
    education: Joi.array().items(Joi.string()),
    gender: Joi.array().items(Joi.string()),
    ssn: Joi.string(),
    languages: Joi.array().items(Joi.string()),
    email: Joi.string().email().required(),
    password: Joi.string(),
    phoneNumber: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string(),
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    hireDate: Joi.date(),
    role: Joi.string(),
  });

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

// router.post('/get-doctor-info-by-user-id/:userId', authMiddleware, async(req, res)=>{
    router.post('/get-doctor-info-by-user-id', authMiddleware, async(req, res)=>{
        const { userId } = req.body;
        console.log(userId)
    try {
        
        const doctor = await Doctor.findOne({userId: userId});
        
        
        res.status(200).send({message: 'Doctor info fetched successfully', success: true, data: doctor})
        
        
    } catch (error) {
        res.status(500).send({message: 'Error getting doctor info', success: false, error});
        
    }
})


router.post('/update-doctor-info', authMiddleware, async(req, res)=>{
    console.log(req.body)
    try {
        const { error } = doctorSchema.validate(req.body);
        console.log(error)
        if (error) {
            return res.status(400).send({message: error.details[0].message, success: false});
        }

        // const doctor = await Doctor.findOneAndUpdate({userId: req.body.userId}, req.body, {new: true});
        const doctor = await Doctor.findOneAndUpdate({userId: req.body.userId}, req.body, {new: true});
        res.status(200).send({message: 'Doctor info updated successfully', success: true, data: doctor});
    } catch (error) {
        res.status(500).send({message: 'Error updating doctor info', success: false, error});
    }
})

router.post('/upload-profile-picture', authMiddleware, upload.single('file'), async(req, res)=>{
    try {
        // req.file is the 'file' file
        // Here, you should upload the file to a storage service and get the URL of the uploaded file
        // For now, we'll just return the filename
        res.status(200).send({message: 'Profile picture uploaded successfully', success: true, url: req.file.filename})
    } catch (error) {
        res.status(500).send({message: 'Error uploading profile picture', success: false});
    }
})

module.exports = router;
