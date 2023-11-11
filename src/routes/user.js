const express = require('express');
const router = express.Router();

// Get Controller
const userController = require('../app/controllers/userController');

router.get('/', userController.user_getAll);
router.patch('/:id',userController.user_edit);
router.delete('/:id',userController.user_deleteOne);

module.exports = router;