const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)