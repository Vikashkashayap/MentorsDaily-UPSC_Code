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
    seoKeyword: {
      type: String,
      trim: true,
      default: "",
    },
    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 320,
      default: "",
    },
    metaImage: {
      type: String,
      trim: true,
      default: "",
    },
    imageAlt: {
      type: String,
      trim: true,
      default: "",
    },
    template: {
      type: String,
      enum: ["standard", "listicle", "comparison", "landing"],
      default: "standard",
    },
    ctaText: {
      type: String,
      trim: true,
      default: "",
    },
    ctaLink: {
      type: String,
      trim: true,
      default: "",
    },
    publishDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["draft", "published", "scheduled"],
      default: "published",
    },
  },
  {
    timestamps: true, // ✅ Correct place & spelling
  }
);

module.exports = mongoose.model("PreparationBlog", blogSchema);
