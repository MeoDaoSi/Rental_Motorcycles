const BaseController = require('./factories');
const Receipt = require('../model/receipts');

const receipt_createOne = BaseController.createOne(Receipt)
const receipt_getOne = BaseController.getOne(Receipt);
const receipt_getAll = BaseController.getAll(Receipt);
const receipt_edit = BaseController.edit(Receipt);
const receipt_delete = BaseController.deleteOne(Receipt);

module.exports = {
    receipt_createOne,
    receipt_getOne,
    receipt_getAll,
    receipt_edit,
    receipt_delete,
}