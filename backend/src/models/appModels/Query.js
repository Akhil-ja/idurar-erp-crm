const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'InProgress', 'Closed'],
      default: 'Open',
    },
    resolution: {
      type: String,
      default: '',
    },
    notes: [
      {
        content: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    removed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Query', QuerySchema);
