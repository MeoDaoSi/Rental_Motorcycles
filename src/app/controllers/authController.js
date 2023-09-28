const User = require("../models/users");
const AppError = require("../../utils/AppError");

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByCredentials(username, password);
        const token = await user.generateAuthToken();
        res.status(200).json({user, token});
    } catch (error) {
        res.status(500).json("err");
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
    res.status(200).json(req.user);
};

module.exports = { 
    login,
    logout,
    register,
    getMe,
}