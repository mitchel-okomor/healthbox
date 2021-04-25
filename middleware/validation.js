const { Joi } = require('express-validation')


const validation ={
loginValidation: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(/[a-zA-Z]/)
        .required(),
    }),
  }  
}

module.exports = validation;