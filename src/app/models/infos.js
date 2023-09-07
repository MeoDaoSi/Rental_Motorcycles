const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const infosSchema = new Schema({
    first_name: {
        type: String,
        require: true,
        trim: true 
    },
    last_name: {
        type: String,
        require: true,
        trim: true 
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(e){
            if(!validator.isEmail(e)){
                throw new Error('Email is invalid!');
            }
        }
    },
    address: {
        type: String,
        require: true,
        trim: true 
    },
    phone: {
        type: Number,
        unique: true,
        require: [true, 'Phone number required'],
        validate(n){
            if(!/\d{3}-\d{3}-\d{4}/.test(n)){
                throw new Error('The number is not valid!')
            }
        }
    },
    birthdate: {
        type: Date,
        require: true
    },
    gender: {
        type: String,
        require: false,
        trim: true,
        enum: ['M','F','U']
    }
}, {
    timestamps: true
})

const Infos = mongoose.model('infosSchema', userSchema)

module.exports = Infos