const joi = require('@hapi/joi')

const ProductValidation = (data) => {

    const schema = joi.object({
        Name: joi
            .string()
            .required()
        ,
        Description: joi
        .string()
        .min(20)
        .max(200)
        .required()
        ,
        prix: joi
        .number()
        .required()
        ,
        Image: joi
        .string()
        .allow()
        ,
        Quantite: joi
        .number()
        .required()
        ,
        Categorie: joi
        .string()
        .required()
    })
    return schema.validate(data, { abortEarly: false })
}
module.exports ={ProductValidation}