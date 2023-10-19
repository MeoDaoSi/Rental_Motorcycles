const express = require('express')
const router = express.Router();
const location = require('../app/controllers/locationController');

router.get('/', location.location_getAll)

router.get('/create', (req, res) => {
    res.render('location_create');
})

router.post('/create', location.location_createOne )

module.exports = router