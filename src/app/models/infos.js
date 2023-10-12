const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;
const { genderEnum } = require('../../enums/Infos');

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
    birthDate: {
        type: Date,
        require: true
    },
    gender: {
        type: String,
        require: false,
        trim: true,
        enum: Object.values(genderEnum),
    },
    user: {
        type: Schema.ObjectId,
        ref: 'users',
        require: true,
    }
}, {
    timestamps: true
})

const Info = mongoose.model('infosSchema', userSchema)

module.exports = Info