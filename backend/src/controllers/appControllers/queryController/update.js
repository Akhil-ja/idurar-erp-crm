const mongoose = require('mongoose');
const { updateSchema } = require('./schemaValidate');
const Model = mongoose.model('Query');

const update = async (req, res) => {
  const { error, value } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, value, {
    new: true,
  });

  if (!result) {
    return res.status(404).json({ success: false, message: 'Query not found' });
  }

  return res.status(200).json({
    success: true,
    result,
    message: 'Query updated successfully',
  });
};

module.exports = update;
