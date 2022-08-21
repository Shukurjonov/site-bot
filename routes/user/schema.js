const Joi = require('joi');

const deleteUserSchema = Joi.object({
  userId: Joi.number().required()
});

const updateUserSchema = Joi.object({
  userId: Joi.number().required()
})

module.exports = { deleteUserSchema, updateUserSchema };
