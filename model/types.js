let mongoose = require('mongoose')
const member = require('./members')

let Types = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Type', Types)