const User = require("../models/users");
const AppError = require("../../utils/AppError");
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // const user = await User.findByCredentials(username, password);
        const user = await User.findOne({username})
        console.log(user);
        if (!user) {
            throw new AppError('401',"Unauthorized")
        }
        const isMatch = bcrypt.compare(password,user.password)
        const token = await user.generateAuthToken();
        res.render('user',user);
    } catch (error) {
        res.redirect('/login');
    }
}

const logout = async (req, res) => {
    try {
        req.user.token = "";
        await req.user.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json();
    }
}

const register = async (req, res) => {
    try {
        // Create new user
        const user = await new User(req.body);
        await user.save();
        // Get token
        const token = await user.generateAuthToken();
        res.status(201).json({user, token});
    } catch (error) {
        res.status(500).json(error);
    }
};

const getMe = (req, res) => {
    res.render('user');
    // res.status(200).json(req.user);
};

module.exports = { 
    login,
    logout,
    register,
    getMe,
}