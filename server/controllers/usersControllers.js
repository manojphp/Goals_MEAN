const usersModel = require('../models/usersModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb');
const { PRIVATE_KEY } = require('../config.json')

module.exports.login = async(req, res, next) => {
    try {
        //receive username & password from body
        const { email, password } = req.body
            //find user & compare the password
        const user = await usersModel.findOne({ email }) //this is shortcut of {email: email}
        if (!user) throw new Error('User not found')
            // const match = bcrypt.compareSync(password, user.password)
        if (password == user.password) {
            //generate JWT
            const token = {...user, password: '***' }
            const tokenHash = jwt.sign(token, PRIVATE_KEY)
            res.json({ success: true, data: user._id })
        } else {
            throw new Error('Wrong password')
        }

    } catch (e) {
        next(e)
    }
}

module.exports.signup = async(req, res, next) => {
    try {
        //const { password } = req.body
        //hash the password
        //const hash = await bcrypt.hash(password, 5)
        //persist the user
        const results = await usersModel.create({...req.body }) //spread req.body, replace password by hash
        res.json({ success: true, msg: req.body })
    } catch (e) {
        next(e)
    }
}