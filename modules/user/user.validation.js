const Joi = require("joi")

const getDetails = {
  headers: Joi.object().required().keys({
    authorization:Joi.string().required(),
  }).options({allowUnknown:true}),
};


module.exports = {
  getDetails,
};