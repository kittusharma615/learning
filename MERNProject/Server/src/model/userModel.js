const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profileImg: { type: String, required: false, trim: true },
    name: { type: String, required: false, trim: true },
    email: { type: String, required: false, trim: true, unique: true, lowercase: true },
    password: { type: String, required: false, trim: true },
    verification: {
        email: {
            isVerify: { type: Boolean, trim: true, default:false },
            isDeleted: { type: Boolean, trim: true, default:false },
        },
        admin: {
            isUserAccountActive:{type: Boolean, trim: true, default:true},
            reason:{type:String,trim:true}
        }
    }
})

module.exports = mongoose.model('userTableDB', userSchema) 