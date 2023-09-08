const mongoose = require('mongoose');
const { Schema } = mongoose;

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
        enum: ['pending','approve','reject','complete']
    },
}, {
    timestamps: true
})

const Rentals = mongoose.model('rentals', rentalSchema)

module.exports = Rentals