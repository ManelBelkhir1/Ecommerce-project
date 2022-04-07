const express = require('express')

const app = express()
require('dotenv').config()
require('./config/database')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.use('/users' , require('./routers/user_router'))
app.use('/categories' , require('./routers/categorie_router'))
app.use('/product', require('./routers/product_router'))
app.use('/orders', require('./routers/order_router'))
app.listen(5000, () => {
    console.log('server is runing on port 5000');
})


//http://localhost:5000/apiul

// apiurl : parentroute + childroute

// http://lcoalhost:5000/users/ => register

