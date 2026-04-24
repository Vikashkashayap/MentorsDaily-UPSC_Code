const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    discount_type: {
      type: String,
      enum: ["percent", "flat"],
      required: true,
    },
    discount_value: {
      type: Number,
      required: true,
      min: 0,
    },
    max_discount: {
      type: Number,
      min: 0,
      default: null,
    },
    min_order_value: {
      type: Number,
      min: 0,
      default: null,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    auto_apply: {
      type: Boolean,
      default: false,
    },
    applicable_courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
      default: [],
    },
    applicable_years: {
      type: [String],
      default: [],
    },
    applies_to_all: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

couponSchema.index({ is_active: 1, expiry_date: 1 });
couponSchema.index({ auto_apply: 1, is_active: 1 });

module.exports = mongoose.model("Coupon", couponSchema);
