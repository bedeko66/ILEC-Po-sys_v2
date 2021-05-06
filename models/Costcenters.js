const mongoose = require('mongoose')

const CostcentersSchema = new mongoose.Schema({
    no: {
        type: Number
    },
    CC: {
        type: String,
    },
    CC_description: {
        type: String,
    },
    DPT: {
        type: String,
    },
    section: {
        type: String,
    },
    department: {
        type: String
    },
    section_name: {
        type: String
    }
})

module.exports = mongoose.model('Costcenters', CostcentersSchema)