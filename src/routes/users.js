const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get Controller
const userController = require('../app/controllers/userController');
const authController = require('../app/controllers/authController');

// Login user
router.post('/login',authController.login);
// Create user
router.post('/', authController.register);

// [middleware] - authorization user
router.use(auth)
// Logout user
router.post('/logout',authController.logout);
// Get user
router.get('/me',authController.getMe);

router.get('/getAll', userController.user_getAll);
router.patch('/:id',userController.user_edit);
router.delete('/:id',userController.user_deleteOne);

module.exports = router;