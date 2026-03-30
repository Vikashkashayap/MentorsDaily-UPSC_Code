const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      maxlength: 300,
      default: "",
    },

    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    tags: [
      {
        type: String,
      },
    ],

    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UploadedDocuments",
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // ✅ Correct place & spelling
  }
);

module.exports = mongoose.model("PreparationBlog", blogSchema);
