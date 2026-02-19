const mongoose = require('mongoose');

const CurrentAffairSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    trim: true,
    sparse: true,
    index: true
  },
  content: String,
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  thumbnailUrl: String,
  paperName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  subject: {
    type: String,
    trim: true
  },
  source: String
}, {
  timestamps: true
});

CurrentAffairSchema.index({ paperName: 1, subject: 1 });
CurrentAffairSchema.index({ slug: 1 });
CurrentAffairSchema.index({ date: -1 });

module.exports = mongoose.model('CurrentAffair', CurrentAffairSchema);