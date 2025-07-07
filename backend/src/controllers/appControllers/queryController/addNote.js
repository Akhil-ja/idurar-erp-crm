const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const addNote = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      success: false,
      message: 'Note content is required',
    });
  }

  const result = await Model.findOneAndUpdate(
    { _id: req.params.id, removed: false },
    {
      $push: {
        notes: {
          content,
          date: new Date(),
        },
      },
    },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Query not found',
    });
  }

  return res.status(200).json({
    success: true,
    result,
    message: 'Note added successfully',
  });
};

module.exports = addNote;
