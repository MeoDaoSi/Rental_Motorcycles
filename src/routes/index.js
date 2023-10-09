const express = require('express')
const router = express.Router();

const user = require('./users');


router.use('/', user);

// router.all('*', (req, res) => {
//     res.json('Error');
// })

module.exports = router