const Joi = require('joi');

const createPosterSchema = Joi.object({
  image: Joi.string().required(),
  content: Joi.string().min(0).max(1000).required(),
  link: Joi.string().min(0).max(150).required()
});

module.exports = {
  createPosterSchema
};