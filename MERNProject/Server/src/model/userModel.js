const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profileImg: {
        asset_id: { type: String, trim: true, default: null },
        secure_url: { type: String, trim: true, default: null }
    },

    name: { type: String, required: false, trim: true },
    email: { type: String, required: false, trim: true, unique: true, lowercase: true },
    password: { type: String, required: false, trim: true },
    role: { type: String, required: true, enum: ['user', 'admin'] },
    verification: {
        email: {
            isVerify: { type: Boolean, trim: true, default: false },
            isDeleted: { type: Boolean, trim: true, default: false },
            userOtp: { type: String, trim: true },
            otpExpiry: { type: String, trim: true }
        },
        Newemail: {
            email: { type: String, trim: true, default: null },
            userOtp: { type: String, trim: true },
            otpExpiry: { type: String, trim: true }
        },
        admin: {
            isUserAccountActive: { type: Boolean, trim: true },
            reason: { type: String, trim: true }
        }
    }
})

module.exports = mongoose.model('userTableDB', userSchema) 