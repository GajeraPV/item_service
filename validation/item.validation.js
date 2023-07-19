const { Joi } = require('express-validation')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    body: Joi.object({
        name: Joi.string().require(),
        category: Joi.string().require()
    })
}