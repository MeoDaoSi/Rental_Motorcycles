const express = require('express')
const router = express.Router();
const {
    rental_createOne,
    rental_getOne,
    rental_getAll,
    rental_edit,
    rental_delete,
} = require('../app/controllers/rentalController')

router.get('/', rental_getAll)
router.get('/:id', rental_getOne)


module.exports = router