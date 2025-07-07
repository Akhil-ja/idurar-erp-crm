const mongoose = require('mongoose');
const schema = require('./schemaValidate');
const Model = mongoose.model('Query');

const create = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const query = new Model({
    ...value,
    createdBy: req.admin._id,
  });

  const result = await query.save();

  return res.status(200).json({
    success: true,
    result,
    message: 'Query created successfully',
  });
};

module.exports = create;
