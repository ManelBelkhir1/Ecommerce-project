const joi = require('@hapi/joi')

const registerValidation = (data) => {

    const schema = joi.object({
        username: joi
            .string()
            .min(3)
            .max(20)
            .required()
        ,
        email: joi
            .string()
            .email()
            .required()
        ,
        password: joi
            .string()
            .min(6)
            .max(20)
            .alphanum()
            .required()
        ,
        phone: joi
            .string()
            .length(8)
            .pattern(/^[0-9]+$/)
            .required()
        ,
        role: joi 
        .string()
        .allow()   

    })

    return schema.validate(data, { abortEarly: false })

}

module.exports = {
    registerValidation
}