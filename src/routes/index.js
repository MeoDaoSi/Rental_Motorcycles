const express = require('express')
const router = express.Router();

const user = require('./users');


router.use('/users', user);

// router.all('*', (req, res) => {
//     res.json('Error');
// })

module.exports = router