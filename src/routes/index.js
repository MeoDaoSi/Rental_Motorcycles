const express = require('express')
const router = express.Router();

const auth = require('./auth');
const reservation = require('./reservation');
const admin = require('./admin');

// Route welcome!
router.get('/', (req, res) => {
    req.session.rental = {}
    console.log(req.session);
    res.render('home', {
        user: req.session.user
    })
})

router.use('/user', auth);
router.use('/reservation', reservation);
router.use('/admin', admin);

// router.all('*', (req, res) => {
//     res.json('Error');
// })

module.exports = router