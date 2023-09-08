const mongoose = require('mongoose');
const { Schema } = mongoose;

const licenseSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    number: {
        type: Number,
        require: true,
        trim: true,
    },
    date_of_issue: {
        type: Date,
    },
    date_of_expiration: {
        type: Date,
        require: true,
    },
}, {
    timestamps: true
})

const Licenses = mongoose.model('licenses', licenseSchema)

module.exports = Licenses