const mongoose = require('mongoose')

const LinkedDocItemSchema = new mongoose.Schema({
    documnet_name: {
        type: String,
    }
})

const InvoicesSchema = new mongoose.Schema({
    no: {
        type: Number
    },
    company: {
        type: String,
    },
    supplier_num: {
        type: Number,
    },
    supplier_site_name: {
        type: String,
    },
    invoice_date: {
        type: String,
    },
    invoice_num: {
        type: String
    },
    invoice_curr: {
        type: String
    },
    description: {
        type: String
    },
    invoice_amount: {
        type: Number
    },
    net_amount: {
        type: Number
    },
    tax_amount: {
        type: Number
    },
    GL_date: {
        type: Date
    },
    account: {
        type: String
    },
    account_name: {
        type: String
    },
    CC: {
        type: String
    },
    CC_description: {
        type: String
    },
    DPT: {
        type: String
    },
    section_name: {
        type: String
    },
    HOD: {
        type: String
    },
    file_name: {
        type: String
    },
    invoice_accepted_at: {
        type: String
    },
    invoice_accepted_by: {
        type: String
    },
    uploaded_file_name: {
        type: String
    },
    linked_documents: {
        type: [LinkedDocItemSchema]
    }
})

module.exports = mongoose.model('Invoices', InvoicesSchema)

