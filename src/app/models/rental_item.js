const mongoose = require('mongoose');
const { Schema } = mongoose;

const rental_item = new Schema({
    accessory: {
        type: Schema.ObjectId,
        ref: 'accessories',
        require: true,
    },
    rental: {
        type: Schema.ObjectId,
        ref: 'rentals',
        require: true,
    }
}, {
    timestamps: true
})

const Rental_Item = mongoose.model('rental_item',rental_item);

module.exports = Rental_Item