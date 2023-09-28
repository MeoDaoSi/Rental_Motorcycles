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
    info: {
        type: Schema.ObjectId,
        ref: 'infos',
        require: true,
    }
}, {
    timestamps: true
})

const License = mongoose.model('licenses', licenseSchema)

module.exports = License