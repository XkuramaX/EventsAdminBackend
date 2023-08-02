let mongoose = require('mongoose')

let Transaction = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Images'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', Transaction)