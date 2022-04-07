const express = require('express')

const route = express.Router()
const upload = require('../middlewares/uploads')
const user_controller = require('../controllers/user_controller')
const { checkAuth, isAdmin } = require('../middlewares/auth')
route.post('/', user_controller.register)
route.post('/login', user_controller.login)


route.delete('/:id',checkAuth , isAdmin ,  user_controller.deleteUser)
route.put('/:id',checkAuth , user_controller.updateUser)
route.get('/',checkAuth, isAdmin, user_controller.getAll)
route.put('/upload/:id',checkAuth, upload.single('avatar'), user_controller.uploadAvatar)
module.exports = route