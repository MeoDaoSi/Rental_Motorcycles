const mongoose = require('mongoose');
const { Schema } = mongoose;

const motorSchema = new Schema({
    color: {
        type: String,
        require: true,
        trim: true,
    },
    year: {
        type: Date,
        require: true,
        trim: true,
    },
    license_plates: {
        type: String,
        require: true,
        trim: true,
    },
    status: {
        type: String,
        require: true,
        trim: true,
        enum: ['active','inactive']
    },
    model: {
        type: Schema.ObjectId,
        ref: 'models',
        require: true,
    },
    location: {
        type: Schema.ObjectId,
        ref: 'locations',
        require: true,
    }
}, {
    timestamps: true
})

const Motorcycles = mongoose.model('motorcycles', motorSchema)

module.exports = Motorcycles