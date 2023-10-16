const express = require('express');
const router = express.Router();

router.get('/schedule',(req, res) => {
    res.render('reservation_schedule');
})

router.get('/motorcycle',(req, res) => {
    console.log(req.session.rental);
    res.render('reservation_motorcycle');
})

router.post('/schedule',(req, res) => {
    console.log(req.body);
    // req.session.rental = {
    //     ...req.body
    // }
    res.redirect('/reservation/motorcycle')
})

module.exports = router