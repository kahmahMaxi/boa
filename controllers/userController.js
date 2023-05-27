const User = require('../models/userModel')
const mongoose = require('mongoose')

// GET all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })

    res.status(200).json(users)
}

// GET a single user by :id
const getUser = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such user' })
    }

    const user = await User.findById(id)

    if(!user) {
        return res.status(404).json({ error: 'no such user' })
    }

    res.status(200).json(user)
}

// GET a single user by email
const getUserByEmail = async (req, res) => {
    const {email} = req.params

    if(email) {
        const emailQuery = { useremail: email }
        const user = await User.findOne(emailQuery)

        if(!user) {
            return res.status(404).json({ no_user_error: 'no such user' })
        }

        res.status(200).json(user)

        // const { userpassword } = req.body
        // if(userpassword === user.userpassword) {
        //     return res.status(200).json(user)
        // } else {
        //     return res.status(400).json({ password_match_error: 'user password is no match' })
        // }
    }
}

// GET all book users by book_id
const getBookUsers = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no book id' })
    }

    // const query = { bookies: {bookid: `${id}`} }
    const users = await User.find({
        bookies: { $elemMatch:{bookid: id} }
    })

    if(!users) {
        return res.status(404).json({ no_user_error: 'no users found' })
    }

    res.status(200).json(users)
}

// create a new user
const createUser = async (req, res) => {
    const { 
        username, 
        userfullname, 
        useremail, 
        userpassword,
        mobile, 
        gender,
    } = req.body

    let emptyFields = []

    if(!username) {
        emptyFields.push('userName')
    }
    // if(!userfullname) {
    //     emptyFields.push('userFullName')
    // }
    if(!useremail) {
        emptyFields.push('userEmail')
    }
    if(!userpassword) {
        emptyFields.push('userPassword')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // check if user exists then add doc to db
    try {
        const nameQuery = { username: username }
        const emailQuery = { useremail: useremail }
        const nameCheck = await User.findOne(nameQuery)
        const emailCheck = await User.findOne(emailQuery)
        if(nameCheck) {
            res.status(400).json({ name_error: 'username already exists' })
        } else if(emailCheck) {
            res.status(400).json({ email_error: 'email already exists' })
        } else {
            const  user = await User.create({ 
                username, 
                userfullname, 
                useremail, 
                userpassword,
                mobile, 
                gender,
            })
            res.status(200).json(user)
        }
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a user
const deleteUser = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such user' })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if(!user) {
        return res.status(404).json({ error: 'no such user' })
    }

    res.status(200).json(user)
}


// update a user
const updateUser = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such user' })
    }

    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if(!user) {
        return res.status(404).json({ error: 'no such user' })
    }

    res.status(200).json(user)
}


module.exports = {
    getUsers,
    getUser,
    getUserByEmail,
    getBookUsers,
    createUser,
    deleteUser,
    updateUser
}