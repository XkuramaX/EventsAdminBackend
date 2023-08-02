let mongoose = require('mongoose')

let Member = new mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: false
    },
    isSuper: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }, 
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Images'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Member', Member)