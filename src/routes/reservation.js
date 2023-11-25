const express = require('express');
const router = express.Router();
const Location = require('../app/models/Location')
const Motorcycle = require('../app/models/Motorcycle')
const Rental = require('../app/models/Rental')
const Info = require('../app/models/Info')
const { VND_format, duration } = require('../helpers/index');
const moment = require('moment');

router.get('/schedule', async (req, res) => {
    try {
        const location = await Location.find();
        res.render('reservation_schedule',{
            location
        });
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/motorcycle', async (req, res) => {
    const address  = req.session.rental?.schedule?.pickup_location;
    try {
        const location_id = await Location.findOne({address})
        const motor = await Motorcycle.find({
            location: location_id,
            status: "ACTIVE",
        });
        res.render('reservation_motorcycle', {
            schedule: req.session.rental?.schedule,
            motor: motor
        });
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/accessory', async (req, res) => {
    console.log(req.session.rental);
    try {
        res.render('reservation_accessory');
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/infos', async (req, res) => {
    const total = req.session.rental?.total
    total_cost = VND_format(total);
    console.log(req.session.rental);
    res.render('reservation_infos', {
        schedule: req.session.rental?.schedule,
        motor: req.session.rental?.motor,
        total: total_cost
    })
})

router.get('/confirm', async (req, res) => {
    res.render('reservation_confirm', {
        ...req.session.rental
    })
})

router.post('/infos', async (req, res) => {
    console.log(req.body);
    req.session.rental = {
        ...req.session.rental,
        infos: {
            ...req.body
        }
    }
    res.redirect('/reservation/confirm')
})

router.post('/schedule',(req, res) => {
    const { email, start, end, time_rental, pickup_location, return_location } = req.body
    req.session.rental = {
        schedule: {
            email,
            start_date : start,
            end_date : end,
            start_time: time_rental[0],
            end_time: time_rental[1],
            pickup_location,
            return_location,
        }
    }
    console.log(req.session.rental);
    res.redirect('/reservation/motorcycle')
})

router.post('/motorcycles', async (req, res) => {
    const motor_id = req.body.id;
    const start_date = req.session.rental.schedule.start_date;
    const end_date = req.session.rental.schedule.end_date;
    const days = duration(start_date, end_date)
    console.log(days);
    try {
        const motor = await Motorcycle.findById(motor_id);
        const total = days * motor.price_per_day;
        req.session.rental = {
            ...req.session.rental,
            motor,
            total,
        }
        res.redirect('/reservation/infos')
    } catch (error) {
        res.redirect('/')
    }
    
})

router.post('/rental', async (req, res) => {
    const { email, start_date, end_date, start_time, end_time, pickup_location, return_location } = req.session.rental.schedule;
    const id  = req.session.rental.motor._id;
    const { last_name, address, first_name, phone, birth_date, note, gender } = req.session.rental.infos;
    const total = req.session.rental.total
    try {
        const infos = new Info({
            first_name,
            last_name,
            address,
            phone,
            birthDate: birth_date,
            gender,
        })
        await infos.save();
        const rental = new Rental({
            rental_start_date: start_date,
            rental_end_date: end_date,
            pickup: pickup_location,
            return: return_location,
            note,
            motor: id,
            info: infos._id,
            total
        })
        const motor = await Motorcycle.findByIdAndUpdate(id,{
            status: "INACTIVE"
        })
        await rental.save();
        res.redirect('/')
    } catch (error) {
        res.redirect('/')
    }
})


module.exports = router