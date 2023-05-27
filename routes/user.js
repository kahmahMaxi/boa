const express = require('express')
const { 
    getUsers,
    getUser,
    getUserByEmail,
    getBookUsers,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET a single user
router.get('/:id', getUser)

// GET a single user by email
router.get('/emailfind/:email', getUserByEmail)

// GET book users
router.get('/user/:id', getBookUsers)

// POST a new user
router.post('/', createUser)

// DELETE a user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)

module.exports = router