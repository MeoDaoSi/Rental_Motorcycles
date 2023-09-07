const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        lowercase: true,
        require: true,
        minlength: 7,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }   
}, {
    timestamps: true
})

const Users = mongoose.model('users', userSchema)

module.exports = Users