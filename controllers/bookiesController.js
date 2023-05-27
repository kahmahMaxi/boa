const Bookies = require('../models/bookiesModel')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser')
const fs = require('fs')

// const bookiesimgstorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'bookiesimgs')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const uploadbookietitleimg = multer({ storage: bookiesimgstorage })

// GET all bookies
const getBookies = async (req, res) => {
    const bookies = await Bookies.find({}).sort({ createdAt: -1 })

    res.status(200).json(bookies)
}

// GET a single bookie by _id
const getBookie = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such bookie' })
    }

    const bookie = await Bookies.findById(id)

    if(!bookie) {
        return res.status(404).json({ error: 'no such bookie' })
    }

    res.status(200).json(bookie)
}
// GET a single bookie by bookid
const getBookieByID = async (req, res) => {
    const {id} = req.params

    const pheelIDQuery = { bookid: id }
    const bookie = await Bookies.findOne(pheelIDQuery)

    if(!bookie) {
        return res.status(404).json({ error: 'no such bookie' })
    }

    res.status(200).json(bookie)
}

// GET a single bookie by email
const getBookieByEmail = async (req, res) => {
    const {email} = req.params

    if(email) {
        const emailQuery = { bookadminemail: email }
        const bookie = await Bookies.findOne(emailQuery)

        if(!bookie) {
            return res.status(404).json({ no_user_error: 'no such bookie' })
        }

        res.status(200).json(bookie)
    }
}

// create a new bookie
const createBookie = async (req, res) => {
    const { 
        bookid,
        bookname, 
        bookadminemail, 
        booktype, 
        bookadminpassword,
        booktitleimgpath, 
        bookservices,
        bookpackages,
        booktotalspaces,
        bookavailablespaces,
        bookblocks,
        bookinfo,
        bookacctdet,
        bookformpayacct,
        bookstatus
    } = req.body

    let emptyFields = []

    if(!bookname) {
        emptyFields.push('bookname')
    }
    if(!bookadminemail) {
        emptyFields.push('bookadminemail')
    }
    if(!bookid) {
        emptyFields.push('id')
    }
    if(!bookadminpassword) {
        emptyFields.push('bookadminpassword')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill the required fields', emptyFields })
    }

    // check if book exists then add doc to db
    try {
        const bookemailQuery = { bookadminemail: bookadminemail }
        const bookemailCheck = await Bookies.findOne(bookemailQuery)
        if(bookemailCheck) {
            res.status(400).json({ name_error: 'email already exists' })
        } else {
            const  bookie = await Bookies.create({ 
                bookid,
                bookname, 
                bookadminemail, 
                booktype, 
                bookadminpassword,
                booktitleimgpath, 
                booktitleimgbuffer, 
                bookservices,
                bookpackages,
                booktotalspaces,
                bookavailablespaces,
                bookblocks,
                bookinfo,
                bookacctdet,
                bookformpayacct,
                bookstatus
            })
            res.status(200).json(bookie)
        }
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

// bookie auth
const bookieAuth = async (req, res) => {
    const { 
        bookid,
        userpassword,
    } = req.body

    try {
        // check if bookid exists
        const bookIdQuery = { bookid: bookid }
        const bookIdCheck = await Bookies.findOne(bookIdQuery)
        if(!bookIdCheck) {
            res.status(400).json({ id_error: 'bookid do not exists' })
        } else {
            // validate password
            if(bookIdCheck.bookadminpassword !== userpassword) {
                res.status(401).json({ password_error: 'password is no match' })
            } else if(bookIdCheck.bookadminpassword === userpassword) {
                res.status(200).json({ password_success: 'password match' })
            }
        }
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a bookie
const deleteBookie = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such bookie' })
    }

    const bookie = await Bookies.findOneAndDelete({ _id: id })

    if(!bookie) {
        return res.status(404).json({ error: 'no such bookie' })
    }

    res.status(200).json(user)
}


// update a bookie
const updateBookie = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such bookie' })
    }

    
    const bookie = await Bookies.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    
    if(!bookie) {
        return res.status(404).json({ error: 'no such bookie' })
    }
    
    res.status(200).json(bookie)
}


module.exports = {
    getBookies,
    getBookie,
    getBookieByID,
    getBookieByEmail,
    createBookie,
    bookieAuth,
    deleteBookie,
    updateBookie,
}