const express = require('express');
const router = express.Router();
const Location = require('../app/models/Location')
const Motorcycle = require('../app/models/Motorcycle')

router.get('/schedule', async (req, res) => {
    try {
        const location = await Location.find();
        console.log(location);
        res.render('reservation_schedule',{
            location
        });
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/motorcycle', async (req, res) => {
    const address  = req.session.rental?.schedule?.pickup_location[0];
    console.log(address);
    try {
        const location_id = await Location.findOne({address})
        const motor = await Motorcycle.find({location: location_id});
        res.render('reservation_motorcycle', {
            schedule: req.session.rental?.schedule,
            motor: motor
        });
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/accessory', async (req, res) => {
    const address  = req.session.rental?.schedule?.pickup_location[0];
    console.log(address);
    try {
        const location_id = await Location.findOne({address})
        const motor = await Motorcycle.find({location: location_id});
        res.render('reservation_motorcycle', {
            schedule: req.session.rental?.schedule,
            motor: motor
        });
    } catch (error) {
        res.redirect('/')
    }
})

router.post('/schedule',(req, res) => {
    console.log(req.body);
    req.session.rental = {
        schedule: {
            ...req.body
        }
    }
    res.redirect('/reservation/motorcycle')
})

module.exports = router