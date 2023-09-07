const express = require('express')
const router = express.Router();

const userRouter = require('./users');

router.use('/users', userRouter);

// router.all('*', (req, res) => {
//     res.json('Error');
// })

module.exports = router