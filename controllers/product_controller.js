const Product = require('../models/product_model')

const { ProductValidation } = require('../validation/productSchema')
const user_controller = require('./user_controller')
module.exports = {
    /* teste de validation 
    collection de données
    creation
    */


    create: async (req, res) => {

        const { error } = await ProductValidation(req.body)

        if (error) {
            return res.status(422).json(error)
        }

        let data = {
            Name: req.body.Name,
            Description: req.body.Description,
            prix: req.body.prix,
            Image: req.file.filename,
            Quantite: req.body.Quantite,
            Categorie: req.body.Categorie
        }

        Product.create(data, (err, product) => {
            if (err) {
                res.status(500).json('error adding product')

            } else {
                res.status(200).json({
                    message: 'succ adding product',
                    data: product
                })

            }
        })
    },
    //delete 
    //update (name , desc , prix , qte ) / image 
    // getAll 
    deleteProduct: (req, res) => {
        Product.findByIdAndDelete({ _id: req.params.id }, (err, product) => {
            if (err) {
                res.status(500).json('err delete produc')

            } else {
                res.status(200).json({
                    message: 'user succefully deleted',
                    data: product
                })
            }

        })
    },
    UpdateImage: (req, res) => {
        Product.findByIdAndUpdate({ _id: req.params.id }, { image: req.file.filename }, { new: true }, (err, product) => {
            if (err) {
                res.status(500).json('errorupdateimage')
            } else {
                res.status(200).json({
                    message: 'image successfuly upadted',
                    data: product
                })
            }
        })
    },
    updateProduct: (req, res) => {
        Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, product) => {
            if (err) {
                res.status(500).json('error updating product')

            } else {
                res.status(200).json({
                    message: 'product updated',
                    data: product
                })
            }
        })
    },
    getAllProduct: (req, res) => {
        Product.find({}, (err, product) => {
            if (err) {
                res.status(500).json('err fetching product')
            } else {
                res.status(200).json({
                    message: 'product in system',
                    data: product
                })
            }
        })
    },

    search: (req, res) => {

        //category id
        //name ,description
        //prixmax

        const { categorie, keyword, price } = req.body
        console.log(req.body);
        const query = {
            $and: [
                categorie === 'all' ? {} : { Categorie: categorie },
                keyword !== ''
                    ? //if else 
                    {
                        $or: [
                            { $regex: { Name: keyword } },
                            { $regex: { Description: keyword } },
                        ]
                    }
                    :
                    {}
                ,
                { prix: price }

            ]


        }


        Product.find(query, (err, products) => {
            if (err) {
                res.status(500).json('err search')
            } else {
                res.status(200).json({
                    message: 'products in system',
                    data: products
                })
            }
        })

    }
    // order 

}