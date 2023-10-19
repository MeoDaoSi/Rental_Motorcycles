const express = require('express');
const router = express.Router();
const location = require('./location')

router.get('/dashboard',(req, res) => {
    res.render('dashboard');
})

router.use('/locations',location);

module.exports = router