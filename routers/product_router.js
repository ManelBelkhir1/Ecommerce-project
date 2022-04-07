const express = require('express')

const route = express.Router()

const product_controller = require('../controllers/product_controller')
const upload = require('../middlewares/uploads')
const { checkAuth, isAdmin } = require('../middlewares/auth')
route.post('/',checkAuth , isAdmin, upload.single('Image') , product_controller.create)
route.delete('/:id',checkAuth , isAdmin, product_controller.deleteProduct)
route.put('/:id',checkAuth , isAdmin,product_controller.updateProduct)
route.get('/', product_controller.getAllProduct)
route.put('/updateImage/:id' ,checkAuth , isAdmin,  upload.single('image') , product_controller.UpdateImage )
route.post('/search', product_controller.search)
module.exports=route
