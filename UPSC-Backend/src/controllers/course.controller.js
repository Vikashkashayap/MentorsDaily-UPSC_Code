const courseService =require ("../services/course.service");
const logger = require("../utility/logger");
const { setBadRequest, setCreateSuccess, setServerError, setNotFoundError, setSuccess } = require("../utility/responseHelper");
const  {uploadFileService}  =require ('../services/uploadFiles.service.js');

exports.createCourse = async (req, res) => {
  logger.info('courseController.js << createCourse');
  try {
    const { title, description, category, basePrice } = req.body;
    const thumbnailFile = req.file;

    if (!title || !description || !category || !basePrice) {
      return setBadRequest(res, { message: "Required fields are missing." });
    }
    
    let thumbnailId = null;
    if (thumbnailFile) {
      const uploadedImage = await uploadFileService(thumbnailFile, req.user?._id);
      thumbnailId = uploadedImage._id;
    }

    const courseData = { ...req.body, thumbnail: thumbnailId };
    const newCourse = await courseService.createCourse(courseData);
    
    setCreateSuccess(res, { message: 'Course created successfully', data: newCourse });
  } catch (err) {
    if (err.message.includes('E11000')) {
      return setBadRequest(res, { message: `A course with this title already exists.` });
    }
    logger.error(`Error creating course: ${err.message}`);
    setServerError(res, { message: 'Internal server error' });
  }
};

exports.findAllCourse = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const usePagination = Number.isInteger(page) && Number.isInteger(limit) && page >= 1 && limit >= 1;

    // Always use pagination: explicit (page, limit) or default (1, 100) to avoid unbounded response
    const pageNum = usePagination ? page : 1;
    const limitNum = usePagination ? limit : 100;

    logger.info(`courseController.js <<findAllCourse<< Fetching courses page=${pageNum} limit=${limitNum}`);
    const result = await courseService.findAllCoursePaginated(pageNum, limitNum);
    setSuccess(res, {
      message: 'Courses fetched successfully',
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    });
  } catch (err) {
    logger.error(`courseController.js <<findAllCourse<< Error fetching courses: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};

exports.findCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`courseController.js <<findCourseById () << Fetching course by ID: ${id}`);
    
    const course = await courseService.findCourseById(id);
    
    if (!course) {
      logger.error(`courseController.js <<findCourseById () << Course not found for ID: ${id}`);
      return setNotFoundError(res, {
        message: 'Course not found'
      });
    }
    
    logger.info(`courseController.js <<findCourseById () << Course fetched successfully for ID: ${id}`);
    setSuccess(res, {
      message: 'Course fetched successfully',
      data: course
    });
  } catch (err) {
    logger.error(`courseController.js <<findCourseById () << Error fetching course: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};
exports.updateCourse = async (req, res) => { 
    logger.info('courseController.js << updateCourse');
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        
        if (req.file) {
            const uploadedImage = await uploadFileService(req.file, req.user?._id);
            updateData.thumbnail = uploadedImage._id;
        }

        const updatedCourse = await courseService.updateCourse(id, updateData);
        if (!updatedCourse) {
            return setNotFoundError(res, { message: 'Course not found' });
        }
        setSuccess(res, { message: 'Course updated successfully', data: updatedCourse });

    } catch(err) {
        logger.error(`Error updating course: ${err.message}`);
        setServerError(res, { message: 'Internal server error' });
    }
};
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`courseController.js <<deleteCourse<< Deleting course with ID: ${id}`);
    
    const deletedCourse = await courseService.deleteCourse(id);
    
    if (!deletedCourse) {
      logger.error(`courseController.js <<deleteCourse<< Course not found for ID: ${id}`);
      return setNotFoundError(res, {
        message: 'Course not found'
      });
    }
    
    logger.info(`courseController.js <<deleteCourse<< Course deleted successfully for ID: ${id}`);
    setSuccess(res, {
      message: 'Course deleted successfully',
      data: deletedCourse
    });
  } catch (err) {
    logger.error(`courseController.js <<deleteCourse<< Error deleting course: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};
