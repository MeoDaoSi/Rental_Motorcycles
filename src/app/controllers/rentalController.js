const BaseController = require('./factories');
const Rental = require('../model/rentals');

const rental_createOne = BaseController.createOne(Rental)
const rental_getOne = BaseController.getOne(Rental);
const rental_getAll = BaseController.getAll(Rental);
const rental_edit = BaseController.edit(Rental);
const rental_delete = BaseController.deleteOne(Rental);

module.exports = {
    rental_createOne,
    rental_getOne,
    rental_getAll,
    rental_edit,
    rental_delete,
}