const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const remove = async (req, res) => {
  const result = await Model.findOneAndUpdate(
    { _id: req.params.id },
    { removed: true },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({ success: false, message: 'Query not found' });
  }

  return res.status(200).json({
    success: true,
    result,
    message: 'Query deleted successfully',
  });
};

module.exports = remove;
