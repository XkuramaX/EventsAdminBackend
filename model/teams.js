let mongoose = require('mongoose')

let Team = new mongoose.Schema({
    name: {
        type: String
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Images'
    },
})

module.exports = mongoose.model('Team', Team);