const mongoose = require('mongoose')

const categorieSchema = new mongoose.Schema({
    CategorieName: String
})

module.exports = new mongoose.model('categorie' , categorieSchema)