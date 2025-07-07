const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const removeNote = async (req, res) => {
  const { id, noteId } = req.params;

  const result = await Model.findOneAndUpdate(
    { _id: id, removed: false },
    {
      $pull: { notes: { _id: noteId } },
    },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Query or note not found',
    });
  }

  return res.status(200).json({
    success: true,
    result,
    message: 'Note removed successfully',
  });
};

module.exports = removeNote;
