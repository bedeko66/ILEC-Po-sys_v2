const mongoose = require('mongoose')

const AccountsSchema = new mongoose.Schema({
    No: {
        type: Number
    },
    ACCOUNT: {
        type: String,
    },
    ACCOUNT_DESCRIPTION: {
        type: String,
    },
    CC: {
        type: String,
    },
    DPT: {
        type: String,
    },
    DPT_MAIN: {
        type: String
    }
})

module.exports = mongoose.model('Accounts', AccountsSchema)