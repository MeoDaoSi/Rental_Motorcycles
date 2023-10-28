const mongoose = require('mongoose');
const { Schema } = mongoose;

const motorSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    license_plate: {
        type: String,
        require: true,
        trim: true,
    },
    status: {
        type: String,
        require: true,
        trim: true,
        enum: ['ACTIVE','INACTIVE'],
        default: 'ACTIVE'
    },
    location: {
        type: Schema.ObjectId,
        ref: 'Location',
        require: true,
    }
}, {
    timestamps: true
})

const Motorcycle = mongoose.model('motorcycles', motorSchema)

module.exports = Motorcycle