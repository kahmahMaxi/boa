const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    userfullname: {
        type: String,
    },
    useremail: {
        type: String,
        required: true
    },
    userpassword: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    },
    gender: {
        type: String
    },
    userdob: {
        type: String
    },
    mstatus: {
        type: String
    },
    address: {
        type: String
    },
    acct_one: {
        type: Number
    },
    acct_two: {
        type: Number
    },
    tran_in_english: {
        type: String
    },
    tran_in_french: {
        type: String
    },
    tran_in_japan: {
        type: String
    },
    
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)