const BaseController = require('./factories');
const Motor = require('../model/motors');

const motor_createOne = BaseController.createOne(Motor)
const motor_getOne = BaseController.getOne(Motor);
const motor_getAll = BaseController.getAll(Motor);
const motor_edit = BaseController.edit(Motor);
const motor_delete = BaseController.deleteOne(Motor);

module.exports = {
    motor_createOne,
    motor_getOne,
    motor_getAll,
    motor_edit,
    motor_delete,
}