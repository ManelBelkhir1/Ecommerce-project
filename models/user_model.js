/* 
user model 
username
email
password
phone
avatar
*/

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    avatar: String,
    role: {
        type: String,
        enum: ['client', "admin"],
        default: 'client',
        required: true  
    }
})

module.exports = new mongoose.model('user', userSchema)