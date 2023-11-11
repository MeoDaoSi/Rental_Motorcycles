// Get Model
const User = require('../models/User');
const BaseController = require('./factories/index');

const user_getAll = async (req, res) => {
    try {
        const users = await User.find();
        const new_users = users.map((user) => {
            const date = user.createdAt.toLocaleDateString();
            user._doc.date = date
            return user
        })
        console.log(new_users);
        return res.render('user',{
            new_users
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