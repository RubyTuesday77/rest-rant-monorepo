const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')  // require bcrypt (to hash user password)

const { User } = db

router.post('/', async (req, res) => {
    // Use bcrypt in route handler to define passwordDigest column
    let { password, ...rest } = req.body;
    const user = await User.create({ 
        ...rest,
        passwordDigest: await bcrypt.hash(password, 10)
    })
    res.json(user)
})


router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router