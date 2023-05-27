const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookiesSchema = new Schema({
    bookid: {
        type: String,
        required: true
    },
    bookname: {
        type: String,
        required: true
    },
    bookadminemail: {
        type: String,
        required: true
    },
    booktype: {
        type: String,
    },
    bookadminpassword: {
        type: String,
        required: true
    },
    booktitleimgpath: {
        type: String,
    },
    bookwho: {
        type: String,
    },
    bookformprice: {
        type: Number,
    },
    bookservices: {
        type: Array,
    },
    bookpackages: {
        type: Array,
    },
    booktotalspaces: {
        type: Number,
    },
    bookavailablespaces: {
        type: Number,
    },
    bookblocks: {
        type: Array,
    },
    bookinfo: {
        type: String,
    },
    bookacctdet: {
        type: Object,
    },
    bookformpayacct: {
        type: Object,
    },
    bookstatus: {
        type: Boolean,
    },
    startingprice: {
        type: Number,
    },
    packcont: {
        type: String,
    },
    amt_wifi: {
        type: Boolean,
    },
    amt_buttery: {
        type: Boolean,
    },
    amt_rest: {
        type: Boolean,
    },
    amt_mosque: {
        type: Boolean,
    },
    amt_laund: {
        type: Boolean,
    },
}, { timestamps: true })

module.exports = mongoose.model('Bookies', bookiesSchema)