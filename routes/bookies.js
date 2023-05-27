const express = require('express')
const { 
    getBookies,
    getBookie,
    getBookieByID,
    getBookieByEmail,
    createBookie,
    bookieAuth,
    deleteBookie,
    updateBookie
} = require('../controllers/bookiesController')

const router = express.Router()
const multer = require('multer')
const fs = require('fs')

// GET all bookies
router.get('/', getBookies)

// GET a single bookie
router.get('/:id', getBookie)

// GET a single bookie
router.get('/bookid/:id', getBookieByID)

// GET a single bookie by email
router.get('/emailfind/:email', getBookieByEmail)

// POST a new bookie
router.post('/', createBookie)

// Auth a bookie
router.post('/authbookie', bookieAuth)

// DELETE a bookie
router.delete('/:id', deleteBookie)

// UPDATE a bookie
// const bookiesimgstorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'bookiesimgs')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const uploadbookietitleimg = multer({ storage: bookiesimgstorage })
router.patch('/:id', updateBookie)

module.exports = router