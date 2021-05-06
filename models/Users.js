const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    No: {
        type: Number
    },
    DPT_MAIN: {
        type: String,
    },
    DPT: {
        type: String,
    },
    HOD: {
        type: String,
    },
    Role: {
        type: String,
    } 
})

module.exports = mongoose.model('Users', UsersSchema)