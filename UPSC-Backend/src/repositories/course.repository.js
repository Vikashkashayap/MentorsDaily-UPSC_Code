const Course = require("../models/course.model");

exports.createCourse = async (courseData) => {
  try {
    const newCourse = await Course.create(courseData);
    return await Course.findById(newCourse._id).populate('thumbnail', '_id filename contentType');
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findCourseById = async (id) => {
  try {
    return await Course.findById(id).populate('thumbnail', '_id filename contentType');
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findBy = async (query) => {
  try {
    return await Course.findOne(query).populate('thumbnail', '_id filename contentType');
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findAllCourse = async () => {
  try {
    return await Course.find({}).populate('thumbnail', '_id filename contentType');
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findAllCoursePaginated = async (page = 1, limit = 12) => {
  try {
    const skip = (Math.max(1, page) - 1) * limit;
    const [data, total] = await Promise.all([
      Course.find({})
        .populate('thumbnail', '_id filename contentType')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Course.countDocuments({}),
    ]);
    return { data, total, page: Math.max(1, page), limit, totalPages: Math.ceil(total / limit) };
  } catch (err) {
    throw new Error(err.message);
  }
};
// exports.updateCourse = async (id, updateData) => {
//   try {
//     return await Course.findByIdAndUpdate(id, updateData, { new: true }).populate('thumbnail');
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

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
    return await Course.findById(updatedCourse._id).populate("thumbnail", '_id filename contentType');
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