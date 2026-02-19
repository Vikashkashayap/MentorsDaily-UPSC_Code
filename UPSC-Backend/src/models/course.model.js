const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  sellingPrice: {
    type: Number,
  },

  duration: { type: String },
  mode: {
    type: String,
    enum: ["Online", "Offline", "Hybrid"],
    default: "Online",
  },
  startDate: { type: Date },
  endDate: { type: Date },
  language: { type: String, default: "English" },
  thumbnail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UploadedDocuments",
  },
  createdAt: { type: Date, default: Date.now },
});

courseSchema.pre("save", function (next) {
  if (this.isModified("basePrice") || this.isModified("discountPercentage")) {
    if (this.basePrice > 0 && this.discountPercentage > 0) {
      const discountAmount = (this.basePrice * this.discountPercentage) / 100;
      this.sellingPrice = this.basePrice - discountAmount;
    } else {
      this.sellingPrice = this.basePrice;
    }
  }
  next();
});

courseSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Course", courseSchema);