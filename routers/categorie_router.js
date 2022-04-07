const express = require('express')

const route = express.Router()

const categorie_controller = require('../controllers/categorie_controller')
const { checkAuth , isAdmin } = require('../middlewares/auth')
route.post('/' ,checkAuth , isAdmin, categorie_controller.create)
route.delete('/:id',checkAuth , isAdmin, categorie_controller.deleteCategorie)
route.get('/', categorie_controller.getALLCategorie)
module.exports = route

