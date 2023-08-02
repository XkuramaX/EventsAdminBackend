let mongoose = require('mongoose')

let Images = new mongoose.Schema({
    url: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Images', Images);