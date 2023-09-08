const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
}, {
    timestamps: true
})

const Locations = mongoose.model('locations', locationSchema)

module.exports = Locations