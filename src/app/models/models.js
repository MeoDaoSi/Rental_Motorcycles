const mongoose = require('mongoose');
const { Schema } = mongoose;

const modelSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    price_per_day: {
        type: Number,
        require: true,
        trim: true,
    },
}, {
    timestamps: true
})

const Models = mongoose.model('models', modelSchema)

module.exports = Models