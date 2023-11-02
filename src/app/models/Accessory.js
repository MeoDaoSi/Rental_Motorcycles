const mongoose = require('mongoose');
const { Schema } = mongoose;

const accessorySchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
        require: true,
        trim: true,
    },
    image: {
        type: String,
    },
    price_per_day: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        enum: ['ACTIVE','INACTIVE'],
        default: 'ACTIVE'
    }   
}, {
    timestamps: true
})

const Accessory = mongoose.model('accessories', accessorySchema)

module.exports = Accessory