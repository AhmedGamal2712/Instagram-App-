const Joi = require("joi");


const signUp = {
  body: Joi.object()
    .required()
    .keys({
      userName: Joi.string().required().min(3).max(15),
      email: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[A-Z][a-z]{1,8}/)),
      age: Joi.number().required().min(16).max(60),
      cPassword: Joi.ref("password"),
    }),
};

const signIn = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[A-Z][a-z]{1,8}/)),    })
};
module.exports = {
  signUp,
  signIn,
};