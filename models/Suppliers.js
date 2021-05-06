const mongoose = require('mongoose')

const SuppliersSchema = new mongoose.Schema({
    no: {
        type: Number
    },
    supplier_number: {
        type: Number,
    },
    supplier: {
        type: String,
    },
    supplier: {
        type: String,
    },
    supplier_site: {
        type: String,
    },
    supplier_address: {
        type: String
    }
})

module.exports = mongoose.model('Suppliers', SuppliersSchema)