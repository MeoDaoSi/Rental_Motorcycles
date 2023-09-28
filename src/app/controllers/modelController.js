const BaseController = require('./factories');
const Model = require('../models/models');

const model_createOne = BaseController.createOne(Model)
const model_getOne = BaseController.getOne(Model);
const model_getAll = BaseController.getAll(Model);
const model_edit = BaseController.edit(Model);
const model_delete = BaseController.deleteOne(Model);

module.exports = {
    model_createOne,
    model_getOne,
    model_getAll,
    model_edit,
    model_delete,
}