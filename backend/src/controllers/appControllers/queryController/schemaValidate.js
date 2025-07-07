const Joi = require('joi');

const createSchema = Joi.object({
  customer: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('Open', 'InProgress', 'Closed'),
  resolution: Joi.string().allow(''),
});

const updateSchema = Joi.object({
  customer: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid('Open', 'InProgress', 'Closed'),
  resolution: Joi.string().allow(''),
}).min(1);

module.exports = { createSchema, updateSchema };
