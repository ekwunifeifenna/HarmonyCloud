const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema(
{
    userId: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies',
        required: [true, 'Please enter your company id'],
    },
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter your phone number'],
        unique: true,
    },
    address: {
        type: String,
        required: [true, 'Please enter your address'],
    },
    specialization:{
        type: String,
        required: [true, 'Please enter your specialization']
    },
    experience:{
        type: String,
        required: [true, 'Please enter your experience']
    },
    feePerConsultation: {
        type: Number,
        required: [true, 'Please enter your fee per consultation'],
    },
    time: {
        type: Array,
        required: [true, 'Please enter your time'],
    },
    status: {
        type: String,
        default: 'pending',
    },
},
    {
        timestamps: true
    }

);

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;
