const express = require('express');
const router = express.Router();

// Get Controller
const userController = require('../app/controllers/userController');

router.post('/', userController.user_createOne)
router.get('/getAll', userController.user_getAll)
router.get('/get/:id',userController.user_getOne)
router.patch('/:id',userController.user_editOne)
router.delete('/:id',userController.user_deleteOne)

module.exports = router;