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
    motor: {
        type: Schema.ObjectId,
        ref: 'motorcycles',
        require: true,
    },
    info: {
        type: Schema.ObjectId,
        ref: 'infos',
        require: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'users',
        require: true,
    },
    receipt: {
        type: Schema.ObjectId,
        ref: 'receipts',
        require: true,
    }
}, {
    timestamps: true
})

const Rentals = mongoose.model('rentals', rentalSchema)

module.exports = Rentals