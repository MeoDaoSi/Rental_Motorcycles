// Get Model
const User = require('../models/User');
const BaseController = require('./factories/index');

const user_getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.render('user',{
            users
        });
    } catch (error) {
        res.redirect('/')
    }
}

const user_edit = BaseController.edit(User);
const user_deleteOne = BaseController.deleteOne(User);


module.exports = {
    user_getAll,
    user_edit,
    user_deleteOne,
}