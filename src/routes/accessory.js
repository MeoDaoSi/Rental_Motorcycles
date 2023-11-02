const express = require('express');
const router = express.Router();
const Accessory = require('../app/models/Accessory');

router.get('/', async (req, res) => {
    try {
        const accessory = await Accessory.find();
        console.log(accessory);
        res.render('accessory', {
            accessory
        })
    } catch (error) {
        res.redirect('/')
    }
    
})

router.get('/create', (req, res) => {
    res.render('accessory_create')
})

router.post('/create', async (req, res) => {
    try {
        const accessory = new Accessory(req.body);
        await accessory.save();
        console.log(accessory);
        res.redirect('/admin/accessory');
    } catch (error) {
        res.redirect('/')
    }
    
})


module.exports = router