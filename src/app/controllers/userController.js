// Get Model
const Users = require('../models/users');

const userController = async (req, res) => {
    try {
        const user = await Users.find({username:"test"});
        console.log(user);
        res.json(user)
    } catch (error) {
        res.json('error')
    }
}

const userController_test = async (req, res) => {
    try {
        res.json('test')
    } catch (error) {
        
    }
}

module.exports = { userController, userController_test }