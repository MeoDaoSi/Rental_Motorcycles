const express = require('express');
const router = express.Router();

router.get('/dashboard',(req, res) => {
    res.render('admin');
})

module.exports = router