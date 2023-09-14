const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        minLength: 7,
        maxLength: 50,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        lowercase: true,
        minLength: 7,
        maxLength: 50,
        require: true,
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

const User = mongoose.model('users', userSchema)

module.exports = User