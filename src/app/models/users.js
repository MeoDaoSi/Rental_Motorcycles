const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const { roleEnum } = require('../../enums/User');
const AppError = require('../../utils/AppError')

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
        maxLength: 255,
        require: true,
        trim: true,
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
userSchema.methods.toJSON = function(){
    const user = this;

    const userObject = user.toObject();

    delete userObject.token;
    delete userObject.password;

    return userObject;
}
// [Method] - Generate token
userSchema.methods.generateAuthToken = function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.PRIVATE_KEY_TOKEN)
    res.cookie("SignedCookies",token);
}

// [Statics] - Authentication user
userSchema.statics.findByCredentials = async function(username,password){
    const user = await User.findOne({username});
    if(!user){
        throw new AppError('401',"Unauthorized")
    }
    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new AppError('401',"Unauthorized")
    }
    return user
}

// [Middleware] - hash password before save
userSchema.pre('save', async function(next){
    const user = this;
    // hash password if field password modified
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    return next();
})

const User = mongoose.model('users', userSchema)

module.exports = User