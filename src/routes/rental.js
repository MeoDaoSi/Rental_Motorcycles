const express = require('express')
const router = express.Router();
const Rental = require('../app/models/Rental');
const Motorcycle = require('../app/models/Motorcycle');

const {
    rental_createOne,
    rental_getOne,
    rental_getAll,
    rental_edit,
    rental_delete,
} = require('../app/controllers/rentalController')

router.get('/', rental_getAll)
router.get('/:id', rental_getOne)
router.post('/:id', async (req, res) => {
    const _status = req.body._status;
    try {
        const _id = req.params.id
        console.log(_status);
        const rental = await Rental.findByIdAndUpdate(_id, {
            status: _status
        })
        if  ( _status == "REJECT" ) {
            motor = await Motorcycle.findByIdAndUpdate(
                rental.motor,
                {
                    status: "ACTIVE"
                }
            )
        }
        res.redirect('/admin/rental')
    } catch (error) {
        res.redirect('/')
    }
})


module.exports = router