const mongoose = require("mongoose");

const upscPreviousYearPaperSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },

    examName: {
      type: String,
      required: true,
      trim: true,
    },

    examType: {
      type: String,
      required: true,
      enum: ["Prelims", "Mains", "Compulsory"],
    },

    paperType: {
      type: String,
      required: true,
    },

    googleDriveLink: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "upscPreviousYearPaper",
  upscPreviousYearPaperSchema
);
