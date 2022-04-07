const joi = require('@hapi/joi')

const registerValidation = (data) => {

    const schema = joi.object({
        name: joi
            .string()
            .min(3)
            .max(20)
            .required()
    })

return schema.validate(data, { abortEarly: false })

}

module.exports = {
    registerValidation
}