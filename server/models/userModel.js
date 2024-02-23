/**
 * This is the user model 
 * The goal for this model is to create a user schema that will be used to create a user collection in the database
 * 
 * This schema will also include multi-tenancy, where the user will be associated with a company
 * which is identified by the companyId field
 * There is also a role of the superAdmin, which is the highest role in the system which can create companies and assign admin roles to users
 * 
 * 
 * I would need to implement access control to the routes in the system where the super admin can access all routes and create admins for companies
 * which also have more access than the normal user for each company
 * 
 * My role will be super admin
 */

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    role:{
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'doctor', 'superAdmin']
    },
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',

    },
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
    seenNotifications: {
        type: Array,
        default: [],
    },
    unseenNotifications: {
        type: Array,
        default: [],
    
    },

    
},{
    timestamps: true
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;