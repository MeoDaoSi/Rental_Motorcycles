// Get Model
const User = require('../models/users');
const ControllerMethod = require('./factories/index');

// const user_create = async (req, res) => {
//     const user = await new User(req.body);
//     try {
//         console.log(user);
//         if(!user){
//             res.status(500).json('error');
//         }
//         await user.save();
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(400).json(error);
//     }
// }
const user_createOne = ControllerMethod.createOne(User);
const user_getAll = ControllerMethod.getAll(User);
const user_getOne = ControllerMethod.getOne(User);
const user_editOne = ControllerMethod.editOne(User);
const user_deleteOne = ControllerMethod.deleteOne(User);

// const user_getAll = async (req, res) => {
//     try {
//         const users = await User.find();
//         if(!users){
//             res.status(500).json('error');
//         }
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json('error');
//     }
// }

// const user_get = async (req, res) => {
//     const user_id = req.params.id;
//     try {
//         const user = await User.findById(user_id);
//         if(!user){
//             res.status(400).json('error');
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json('error');
//     }
// }

// const user_patch = async (req, res) => {
//     const user_id = req.params.id
//     const updates = Object.keys(req.body);
//     try {
//         const user = await User.findById(user_id);
//         updates.forEach((update) => {
//             user[update] = req.body[update];
//         })
//         await user.save();
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(500).json('error');
//     }
// }

// const user_delete = async (req, res) => {
//     const user_id = req.params.id;
//     try {
//         const user = await User.findOneAndDelete({_id: user_id});
//         // if(!user){
//         //     res.status(400).json('error');
//         // }
//         // console.log(user);
//         res.status(200).json('delete successfully!');
//     } catch (error) {
//         res.status(500).json('error');
//     }
// }

module.exports = { user_createOne , user_getAll, user_getOne, user_editOne, user_deleteOne }