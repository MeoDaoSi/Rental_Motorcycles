const express = require('express');
const router = express.Router();

// Get Controller
const { userController, userController_test } = require('../app/controllers/userController');

router.get('/get_all', userController)
router.get('/test', userController_test)

module.exports = router;