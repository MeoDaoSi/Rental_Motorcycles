const mongoose = require('mongoose');
const { Schema } = mongoose;
const { rental_status_enum } = require('../../enums/rental');

const rentalSchema = new Schema({
    rental_start_day: {
        type: Date,
        require: true,
        trim: true,
    },
    rental_end_day: {
        type: Date,
        require: true,
        trim: true,
    },
    pickup: {
        type: String,
        trim: true,
    },
    return: {
        type: String,
        trim: true,
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        require: true,
        trim: true,
        enum: Object.values(rental_status_enum),
        default: "PENDING"
    },
    motor: {
        type: Schema.ObjectId,
        ref: 'motorcycles',
        require: true,
    },
    info: {
        type: Schema.ObjectId,
        ref: 'infos',
        require: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'users',
    },
}, {
    timestamps: true
})

const Rental = mongoose.model('rentals', rentalSchema)

module.exports = Rental