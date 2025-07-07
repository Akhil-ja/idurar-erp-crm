const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const paginatedList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = { removed: false };

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const [result, count] = await Promise.all([
    Model.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name')
      .populate('customer', 'name')
      .exec(),
    Model.countDocuments(filter),
  ]);

  return res.status(200).json({
    success: true,
    result,
    pagination: {
      page,
      pages: Math.ceil(count / limit),
      count,
    },
    message: 'Successfully fetched query list',
  });
};

module.exports = paginatedList;
