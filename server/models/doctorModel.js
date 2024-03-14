const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema(
{
    userId: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'default-profile-picture-url', // Replace with the URL of your default profile picture
    },
  
    // company: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'companies',
    //     required: [true, 'Please enter your company id'],
    // },
    taxType:{
        type: Array,
        // required: [true, 'Please enter your tax type'],
    },
    therapistType:{
        type: Array,
        required: [true, 'Please enter your therapist type'],
    },
    therapistLevel:{
        type: String,
        // required: [true, 'Please enter your therapist level'],
    },
    companyName:{
        type: String,
        // required: [true, 'Please enter your company name'],
    },
    fein:{
        type: String,
        // required: [true, 'Please enter your fein'],
    },
    npi:{
        type: String,
        // required: [true, 'Please enter your npi'],
    },
    providerID:{
        type: String,
        // required: [true, 'Please enter your provider id'],
    },
    stateLicenseNumber:{
        type: String,
        // required: [true, 'Please enter your state license number'],
    },
    caqhID:{
        type: String,
        // required: [true, 'Please enter your caqh id'],
    },
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    middleName: {
        type: String,
        // required: [true, 'Please enter your middle name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
    },
    dateOfBirth: {
        type: Date,
        // required: [true, 'Please enter your date of birth'],
    },
    education:{
        type: Array,
        // required: [true, 'Please enter your education'],
    },
    gender:{
        type: Array,
        // required: [true, 'Please enter your gender'],
    },
    ssn:{
        type: String,
        // required: [true, 'Please enter your ssn'],
    },
    languages:{
        type: [String],
        // required: [true, 'Please enter your languages'],
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter your phone number'],
    },
    address1: {
        type: String,
        required: [true, 'Please enter your address'],
    },
    address2: {
        type: String,
        // required: [true, 'Please enter your address'],
    },
    country:{
        type: String,
        // required: [true, 'Please enter your country'],
    },
    state:{
        type: String,
        // required: [true, 'Please enter your state'],
    },
    city:{
        type: String,
        // required: [true, 'Please enter your city'],
    },
    hireDate:{
        type: Date,
        // required: [true, 'Please enter your hire date'],
    },
    role: {
        type: String,
        default: 'doctor',

    },

},
    {
        timestamps: true
    }

);

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;
