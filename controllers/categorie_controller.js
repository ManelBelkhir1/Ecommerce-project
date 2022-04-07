const Categorie = require('../models/categorie_model')

module.exports = {
    //create
    //1 checher category par name
    
    create: async (req, res) => {
        console.log(req.body.name)
        const categorie = await Categorie.findOne({ CategorieName: req.body.CategorieName })

        if (categorie) {

            res.status(400).json('category is already exist')

        } else {

            Categorie.create(req.body, (err, cat) => {

                if (err) {

                    res.status(500).json('error adding new category')

                } else {

                    res.status(201).json({

                        message: 'category successfuly created',

                        data: cat

                    })

                }

            })

        }



    },

    deleteCategorie : (req , res) => {
        Categorie.findByIdAndDelete({ _id: req.params.id }, (err, Cat) => {
            if (err) {
                res.status(500).json('error del')
            } else {
                res.status(200).json({
                    message: 'user succ del',
                    data: Cat
                })
            }
        })
    },
    getALLCategorie : (req , res) => {
        Categorie.find({} , (err , categories) => {
        if (err) {
            res.status(500).json('err fetching categories')
        } else {
            res.status(200).json({
                message: 'categorie in sys',
                data: categories
            })
        }
    })
}


    }
