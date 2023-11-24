const BaseController = require('./factories');
const Rental = require('../models/Rental');

const rental_createOne = BaseController.createOne(Rental)
const rental_getAll = async (req, res) => {
    try {
        const rental = await Rental.find();
        res.render('rental',{
            rental
        });
    } catch (error) {
        res.redirect('/')
    }
}

const rental_getOne = async (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    try {
        const rental = await Rental.findById(_id)
        .populate(
            'info'
        )
        .populate(
            'motor'
        )
        .exec();
        console.log(rental);
        res.render('rental_detail', {
            rental
        })
        
    } catch (error) {
        res.redirect('/');
    }
}

const rental_edit = BaseController.edit(Rental);
const rental_delete = BaseController.deleteOne(Rental);

module.exports = {
    rental_createOne,
    rental_getAll,
    rental_getOne,
    rental_edit,
    rental_delete,
}