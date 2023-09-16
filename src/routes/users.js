const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get Controller
const userController = require('../app/controllers/userController');

router.post('/login',userController.user_login);

// [middleware] - authorization user
router.use(auth)

router.post('/', userController.user_createOne);
router.get('/getAll', userController.user_getAll);
router.get('/get/me',userController.user_getOne);
router.patch('/:id',userController.user_editOne);
router.delete('/:id',userController.user_deleteOne);

module.exports = router;