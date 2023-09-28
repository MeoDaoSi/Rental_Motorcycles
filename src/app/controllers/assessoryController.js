const BaseController = require('./factories');
const Accessory = require('../models/accessories');

const accessory_createOne = BaseController.createOne(Accessory)
const accessory_getOne = BaseController.getOne(Accessory);
const accessory_getAll = BaseController.getAll(Accessory);
const accessory_edit = BaseController.edit(Accessory);
const accessory_delete = BaseController.deleteOne(Accessory);

module.exports = {
    accessory_createOne,
    accessory_getOne,
    accessory_getAll,
    accessory_edit,
    accessory_delete,
}