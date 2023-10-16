const express = require('express')
const router = express.Router();

const auth = require('./auth');
const reservation = require('./reservation');

// Route welcome!
router.get('/', (req, res) => {
    req.session.rental = {}
    console.log(req.session);
    res.render('home', {
        user: req.session.user
    })
})

router.use('/reservation', reservation);
router.use('/user', auth);

// router.all('*', (req, res) => {
//     res.json('Error');
// })

module.exports = router