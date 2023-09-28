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

const Location = mongoose.model('locations', locationSchema)

module.exports = Location