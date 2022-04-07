const { Router } = require('express')
const express = require('express')
const order_controller = require('../controllers/order_controller')

const route = express.Router()
const { checkAuth , isAdmin } = require('../middlewares/auth')
const categorie_controller = require('../controllers/order_controller')


route.post('/',checkAuth, order_controller.create)
route.put('/:id',checkAuth , isAdmin, order_controller.updateStatus)
route.get('/', checkAuth, order_controller.getOrders)
module.exports = route