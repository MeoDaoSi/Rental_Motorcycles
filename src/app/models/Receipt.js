const mongoose = require('mongoose');
const { Schema } = mongoose;

const receiptSchema = new Schema({
    total_price: {
        type: Number,
        require: true,
        trim: true,
    }
}, {
    timestamps: true
})

const Receipt = mongoose.model('receipts', receiptSchema)

module.exports = Receipt