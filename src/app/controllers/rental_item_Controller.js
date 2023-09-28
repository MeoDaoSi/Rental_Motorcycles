const BaseController = require('./factories');
const Rental_Item = require('../model/rental_item');

const rental_item_createOne = BaseController.createOne(Rental_Item)
const rental_item_getOne = BaseController.getOne(Rental_Item);
const rental_item_getAll = BaseController.getAll(Rental_Item);
const rental_item_edit = BaseController.edit(Rental_Item);
const rental_item_delete = BaseController.deleteOne(Rental_Item);

module.exports = {
    rental_item_createOne,
    rental_item_getOne,
    rental_item_getAll,
    rental_item_edit,
    rental_item_delete,
}