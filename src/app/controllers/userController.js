// Get Model
const User = require('../models/users');
const BaseController = require('./factories/index');


const user_getAll = BaseController.getAll(User);
const user_edit = BaseController.edit(User);
const user_deleteOne = BaseController.deleteOne(User);


module.exports = {
    user_getAll,
    user_edit,
    user_deleteOne,
}