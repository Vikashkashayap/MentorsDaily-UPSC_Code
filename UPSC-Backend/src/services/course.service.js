const courseRepository = require("../repositories/course.repository.js");
const logger = require("../utility/logger.js");

exports.createCourse = async (courseData) => {
  try {
    logger.info(`courseService.js <<create<< Starting course creation for title: ${courseData.title}`);
    
    const createdCourse = await courseRepository.createCourse(courseData);
    
    logger.info(`courseService.js <<create<< Course created successfully for title: ${courseData.title}`);
    return createdCourse;
  } catch (err) {
    logger.error(`courseService.js <<create<< Error creating course: ${err.message}`);
    throw new Error(err.message);
  }
};

exports.findCourseById = async (courseId) => {
  try {
    logger.info(`courseService.js <<find<< Searching for course with ID: ${courseId}`);
    
    const course = await courseRepository.findCourseById(courseId);
    
    if (course) {
      logger.info(`courseService.js <<find<< Course found for ID: ${courseId}`);
      return course;
    } else {
      logger.info(`courseService.js <<find<< No course found for ID: ${courseId}`);
      return null;
    }
  } catch (err) {
    logger.error(`courseService.js <<find<< Error finding course by ID: ${err.message}`);
    throw new Error(err.message);
  }
};

exports.findAllCourse = async () => {
  try {
    logger.info('courseService.js <<findAll<< Fetching all courses');
    
    const courses = await courseRepository.findAllCourse();
    
    logger.info(`courseService.js <<findAll<< Successfully fetched ${courses.length} courses`);
    return courses;
  } catch (err) {
    logger.error(`courseService.js <<findAll<< Error fetching all courses: ${err.message}`);
    throw new Error(err.message);
  }
};

exports.updateCourse = async (courseId, updateData) => {
  try {
    logger.info(`courseService.js <<updateCourse<< Updating course with ID: ${courseId}`);
    
    const updatedCourse = await courseRepository.updateCourse(courseId, updateData);
    
    if (updatedCourse) {
      logger.info(`courseService.js <<updateCourse<< Course updated successfully for ID: ${courseId}`);
      return updatedCourse;
    } else {
      logger.info(`courseService.js <<updateCourse<< No course found for ID: ${courseId}`);
      return null;
    }
  } catch (err) {
    logger.error(`courseService.js <<updateCourse<< Error updating course: ${err.message}`);
    throw new Error(err.message);
  }
};

exports.deleteCourse = async (courseId) => {
  try {
    logger.info(`courseService.js <<deleteCourse<< Deleting course with ID: ${courseId}`);
    
    const deletedCourse = await courseRepository.deleteCourse(courseId);
    
    if (deletedCourse) {
      logger.info(`courseService.js <<deleteCourse<< Course deleted successfully for ID: ${courseId}`);
      return deletedCourse;
    } else {
      logger.info(`courseService.js <<deleteCourse<< No course found for ID: ${courseId}`);
      return null;
    }
  } catch (err) {
    logger.error(`courseService.js <<deleteCourse<< Error deleting course: ${err.message}`);
    throw new Error(err.message);
  }
};