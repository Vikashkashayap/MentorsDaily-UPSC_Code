const Course = require("../models/course.model");

exports.createCourse = async (courseData) => {
  try {
    const newCourse = await Course.create(courseData);
    return await Course.findById(newCourse._id).lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findCourseById = async (id) => {
  try {
    return await Course.findById(id).lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findBy = async (query) => {
  try {
    return await Course.findOne(query).lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findCourseBySlug = async (slug) => {
  try {
    if (!slug) return null;
    return await Course.findOne({ slug: String(slug).trim() }).lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findAllCourse = async () => {
  try {
    return await Course.find({}).sort({ createdAt: -1 }).lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findAllCoursePaginated = async (page = 1, limit = 12) => {
  try {
    const safePage = Math.max(1, parseInt(page, 10) || 1);
    const safeLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (safePage - 1) * safeLimit;
    const [data, total] = await Promise.all([
      Course.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit)
        .lean(),
      Course.countDocuments({}),
    ]);
    return {
      data,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateCourse = async (id, updateData) => {
  try {
    const course = await Course.findById(id);
    if (!course) {
      return null;
    }

    Object.keys(updateData).forEach((key) => {
      course[key] = updateData[key];
    });

    const updatedCourse = await course.save();
    return await Course.findById(updatedCourse._id).lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteCourse = async (id) => {
  try {
    return await Course.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err.message);
  }
};
