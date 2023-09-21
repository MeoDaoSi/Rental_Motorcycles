// Get Model
const User = require('../models/users');
const BaseController = require('./factories/index');

const user_login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByCredentials(username, password);
        const token = await user.generateAuthToken();
        res.status(200).json({user, token});
    } catch (error) {
        res.status(500).json('error');
    }
}

const user_logout = async (req, res) => {
    try {
        req.user.token = "";
        await req.user.save();
        res.status(200).json();
    } catch (error) {
        res.status(400).json();
    }
}

const user_createOne = async (req, res) => {
    try {
        const user = await new User(req.body);
        if(!user){
            return res.status(500).json('error');
        }
        const token = await user.generateAuthToken();
        res.status(201).json({user, token});
    } catch (error) {
        res.status(400).json(error);
    }
};
const user_getAll = BaseController.getAll(User);

const user_getOne = (req, res) => {
    res.status(200).json(req.user);
};
const user_editOne = BaseController.editOne(User);
const user_deleteOne = BaseController.deleteOne(User);

module.exports = { 
    user_createOne,
    user_getAll,
    user_getOne,
    user_editOne,
    user_deleteOne,
    user_login,
    user_logout
}