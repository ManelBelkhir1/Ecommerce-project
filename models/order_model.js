/* 
user : 
total  :
products : []
sttaus : boolean 
*/
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    User: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    Total: Number,
    products: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    }],
    status: Boolean
})
module.exports = new mongoose.model('order', orderSchema)