const BaseController = require('./factories');
const Location = require('../models/locations');

const location_createOne = BaseController.createOne(Location)
const location_getOne = BaseController.getOne(Location);
const location_getAll = BaseController.getAll(Location);
const location_edit = BaseController.edit(Location);
const location_delete = BaseController.deleteOne(Location);

module.exports = {
    location_createOne,
    location_getOne,
    location_getAll,
    location_edit,
    location_delete,
}