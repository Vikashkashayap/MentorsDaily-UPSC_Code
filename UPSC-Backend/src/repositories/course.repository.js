const Course = require("../models/course.model");

/** Courses visible on public UI (missing isActive counts as active). */
const PUBLIC_ACTIVE_FILTER = { isActive: { $ne: false } };

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

exports.findCourseBySlug = async (slug, { activeOnly = false } = {}) => {
  try {
    if (!slug) return null;
    const query = { slug: String(slug).trim() };
    if (activeOnly) Object.assign(query, PUBLIC_ACTIVE_FILTER);
    return await Course.findOne(query).lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findAllCourse = async ({ activeOnly = false } = {}) => {
  try {
    const filter = activeOnly ? PUBLIC_ACTIVE_FILTER : {};
    return await Course.find(filter).sort({ createdAt: -1 }).lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findAllCoursePaginated = async (page = 1, limit = 12, { activeOnly = false } = {}) => {
  try {
    const filter = activeOnly ? PUBLIC_ACTIVE_FILTER : {};
    const safePage = Math.max(1, parseInt(page, 10) || 1);
    const safeLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (safePage - 1) * safeLimit;
    const [data, total] = await Promise.all([
      Course.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit)
        .lean(),
      Course.countDocuments(filter),
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
      if (updateData[key] !== undefined && key !== "_id" && key !== "__v") {
        course[key] = updateData[key];
      }
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
