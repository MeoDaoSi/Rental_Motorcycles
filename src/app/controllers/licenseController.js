const BaseController = require('./factories');
const License = require('../models/licenses');

const license_createOne = BaseController.createOne(License)
const license_getOne = BaseController.getOne(License);
const license_getAll = BaseController.getAll(License);
const license_edit = BaseController.edit(License);
const license_delete = BaseController.deleteOne(License);

module.exports = {
    license_createOne,
    license_getOne,
    license_getAll,
    license_edit,
    license_delete,
}