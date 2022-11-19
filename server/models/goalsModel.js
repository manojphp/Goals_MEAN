const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    deadline: Date,
    steps: [{
        title: String,
        description: String,
        status: String,
        deadline: Date
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Goals', userSchema)