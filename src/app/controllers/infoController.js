const BaseController = require('./factories');
const Info = require('../models/infos');

const info_createOne = BaseController.createOne(Info)
const info_getOne = BaseController.getOne(Info);
const info_getAll = BaseController.getAll(Info);
const info_edit = BaseController.edit(Info);
const info_delete = BaseController.deleteOne(Info);

module.exports = {
    info_createOne,
    info_getOne,
    info_getAll,
    info_edit,
    info_delete,
}