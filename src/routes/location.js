const express = require('express')
const router = express.Router();
const location = require('../app/controllers/locationController');
const Motorcycle = require('../app/models/Motorcycle')
const Location = require('../app/models/Location')

router.get('/', location.location_getAll)

router.get('/create', (req, res) => {
    res.render('location_create');
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const location = await Location.findById(_id);
        res.render('location_edit', {
            location,
        })
    } catch (error) {
        res.redirect('/')
    }
})

// router.post('/:id', async (req, res) => {
//     const _id = req.params.id;
//     const method = req.body._method;
//     console.log(method);
//     res.redirect('/')
//     // try {
//     //     const location = await Location.findById(_id);
//     //     res.render('location_edit', {
//     //         location,
//     //     })
//     // } catch (error) {
//     //     res.redirect('/')
//     // }
// })

router.get('/:id/motorcycle', async (req, res) => {
    console.log(req.params);
    const _id = req.params.id
    try {
        const motorcycle = await Motorcycle.find({location:_id})
        console.log(motorcycle);
        
        return res.render('motorcycle',{
            motorcycle,
            location_id: _id
        })
    } catch (error) {
        return res.redirect('/')
    }
})

router.get('/:id/motorcycle/create', (req, res) => {
    const _id = req.params.id
    res.render('motorcycle_create',{
        location_id: _id
    })
})

router.post('/:id/motorcycle/create', async (req, res) => {
    try {
        const motorcycle = new Motorcycle(req.body);
        console.log(motorcycle);
        await motorcycle.save();
        return res.redirect('./')
    } catch (error) {
        return res.redirect('/')
    }

})

router.post('/create', location.location_createOne )

module.exports = router