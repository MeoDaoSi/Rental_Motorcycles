const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const { roleEnum, statusEnum } = require('../../enums/User');
const AppError = require('../../utils/AppError')

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        lowercase: true,
        minLength: 7,
        maxLength: 255,
        require: true,
        trim: true,
    },
    status: {
        type: String,
        require: true,
        enum: Object.values(statusEnum),
        default: "ACTIVE"
    },
    role: {
        type: String,
        enum: Object.values(roleEnum),
        default: "USER"
    }   
}, {
    timestamps: true
})

// [Method] - hidden password, token when response to client
// userSchema.methods.toJSON = function(){
//     const user = this;

//     const userObject = user.toObject();

//     delete userObject.token;
//     delete userObject.password;

//     return userObject;
// }
// [Method] - Generate token
// userSchema.methods.generateAuthToken = function(){
//     const user = this;
//     const token = jwt.sign({_id: user._id.toString()}, process.env.PRIVATE_KEY_TOKEN)
//     res.cookie("SignedCookies",token);
// }

// [Middleware] - hash password before save
// userSchema.pre('save', async function(next){
//     const user = this;
//     // hash password if field password modified
//     if(user.isModified('password')){
//         user.password = await bcrypt.hash(user.password,8);
//     }
//     return next();
// })

const User = mongoose.model('users', userSchema)

module.exports = User