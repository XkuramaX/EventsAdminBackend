let mongoose = require('mongoose')
const member = require('./members')

let Event = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    details: {
        type:String,
        required: false
    },
    registrations: [{
            member :{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Member'
            },
            transaction: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Transaction'
            },
            confirm: {
                type: Boolean,
                default:false
            } 
        }
    ],
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    },
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }
    ],
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Images'
        }
    ],
    price: {
        type: Number,
        required: true
    },
    upiId: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Event', Event)