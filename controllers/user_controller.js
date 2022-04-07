const { json } = require('express')

const res = require('express/lib/response')
const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const { registerValidation } = require('../validation/userSchema')
const jwt = require('jsonwebtoken')
module.exports = {


    /* 
    1 - validation
    2 - tester l'existance par mail
    3 - cryptage du mot de passe
    4 - création 
    */

    register: async (req, res, next) => {


        // validation

        const { error } = await registerValidation(req.body)
console.log(req.body)
        if (error) {
            return res.status(422).json(error)
        }

        const user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(422).json('user with this email exist')
        }

        const hash = await bcrypt.hash(req.body.password, 10)
        req.body.password = hash
        User.create(req.body, (err, user) => {
            if (err) {
                res.status(500).json('error adding new user')

            } else {
                res.status(201).json('user succ')
            }
        })

    },

    login: async (req, res, next) => {

        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).json({
                message: "user with this does not exist",
                field: "email"
            })



        }
        const ismatch = await bcrypt.compare(req.body.password, user.password)
        if (!ismatch) {
            res.status(400).json({
                message: "invalid password",
                field: "password"
            })
        } else {
            const token = await jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: { id: user._id, role: user.role },
            }, process.env.JWT_SECRET)
            res.status(200).json({
                message: "you are succ con",
                token: token
            })

        }

    },
    /*
    delete api
    url http/://localhost:5000/users/{id} 
    */
    deleteUser: (req, res) => {
        User.findByIdAndDelete({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.status(500).json('error del')
            } else {
                res.status(200).json({
                    message: 'user succ del',
                    data: user
                })
            }
        })
    },
    updateUser: (req, res) => {
        User.findByIdAndUpdate({ _id: req.params.id } , req.body , {new: true}, (err, user) => {

            if (err) {
                res.status(500).json('error updating user')

            }
            else {
                res.status(200).json({
                    message: 'user update',
                    data: user
                })
            }

        })



    },
    getAll : (req , res) => {
        User.find({} , (err , users) => {
            if (err) {
                res.status(500).json('err fetching users')
            } else {
                res.status(200).json({
                    message: 'users in sys',
                    data: users
                })
            }
        })
    },
    uploadAvatar : (req , res) => {
        User.findByIdAndUpdate({_id : req.params.id} , {avatar: req.file.filename }, { new: true }, (err, user)=> {
            if (err) {
                res.status(500).json('err uploading avatar')
        } else {
            res.status(200).json({
                message: 'avatar succ ',
                data: user
            })
        }
        })

}
}
