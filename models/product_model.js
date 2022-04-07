/* name
description
image
qté
prix
*/
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Image: String,
    Categorie : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'categorie'
    },
    Quantité: Number, 
    prix: Number
})
module.exports = new mongoose.model('product', productSchema)

