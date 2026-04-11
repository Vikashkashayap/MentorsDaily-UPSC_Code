const courseService =require ("../services/course.service");
const logger = require("../utility/logger");
const { setBadRequest, setCreateSuccess, setServerError, setNotFoundError, setSuccess } = require("../utility/responseHelper");
const  {uploadFileService}  =require ('../services/uploadFiles.service.js');

/** @returns {object|undefined|false} parsed object, undefined if absent, false if invalid JSON */
function parseDetailPageField(body) {
  const v = body.detailPage;
  if (v === undefined || v === null) return undefined;
  if (typeof v === "object" && v !== null) return v;
  if (typeof v !== "string") return undefined;
  const raw = v.trim();
  if (raw === "" || raw === "null") return undefined;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return false;
  }
}

exports.createCourse = async (req, res) => {
  logger.info('courseController.js << createCourse');
  try {
    const thumbnailFile = req.file;
    const title = String(req.body.title ?? "").trim();
    const description = String(req.body.description ?? "").trim();
    const category = String(req.body.category ?? "").trim();
    const basePriceRaw = req.body.basePrice;

    if (!title || !description || !category) {
      return setBadRequest(res, { message: "Required fields are missing." });
    }
    if (basePriceRaw === undefined || basePriceRaw === null || basePriceRaw === "") {
      return setBadRequest(res, { message: "Required fields are missing." });
    }

    const basePrice = parseFloat(basePriceRaw);
    if (!Number.isFinite(basePrice) || basePrice < 0) {
      return setBadRequest(res, { message: "basePrice must be a valid non-negative number." });
    }

    const discountRaw = req.body.discountPercentage;
    const discountPercentage = Math.min(
      100,
      Math.max(0, parseFloat(discountRaw) || 0)
    );

    const mode = ["Online", "Offline", "Hybrid"].includes(req.body.mode)
      ? req.body.mode
      : "Hybrid";

    const courseData = {
      title,
      description,
      category,
      basePrice,
      discountPercentage,
      duration: String(req.body.duration ?? "").trim(),
      mode,
      language: String(req.body.language ?? "English").trim(),
    };

    const slug = req.body.slug != null ? String(req.body.slug).trim() : "";
    if (slug) {
      courseData.slug = slug;
    }

    const parsedDetail = parseDetailPageField(req.body);
    if (parsedDetail === false) {
      return setBadRequest(res, { message: "detailPage must be valid JSON" });
    }
    if (parsedDetail !== undefined) {
      courseData.detailPage = parsedDetail;
    }

    let thumbnailId = null;
    if (thumbnailFile) {
      const uploadedImage = await uploadFileService(thumbnailFile, req.user?._id);
      thumbnailId = uploadedImage._id;
    }
    if (thumbnailId) {
      courseData.thumbnail = thumbnailId;
    }

    const newCourse = await courseService.createCourse(courseData);
    
    setCreateSuccess(res, { message: 'Course created successfully', data: newCourse });
  } catch (err) {
    const msg = err?.message || String(err);
    if (msg.includes("space quota") || msg.includes("over your space")) {
      logger.error(`Error creating course (storage quota): ${msg}`);
      return res.status(507).json({
        success: false,
        data: {
          message:
            "Database storage limit reached (MongoDB Atlas). Delete old data or upgrade the cluster, then try again.",
        },
      });
    }
    if (msg.includes('E11000')) {
      if (msg.includes('slug')) {
        return setBadRequest(res, { message: "A course with this slug already exists." });
      }
      return setBadRequest(res, { message: `A course with this title already exists.` });
    }
    logger.error(`Error creating course: ${msg}`);
    setServerError(res, { message: msg || 'Internal server error' });
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

/** Public: landing page by slug (no auth) */
exports.findCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const course = await courseService.findCourseBySlug(slug);
    if (!course) {
      return setNotFoundError(res, { message: 'Course not found' });
    }
    setSuccess(res, { message: 'Course fetched successfully', data: course });
  } catch (err) {
    logger.error(`courseController.js <<findCourseBySlug<< ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};
exports.updateCourse = async (req, res) => { 
    logger.info('courseController.js << updateCourse');
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (updateData.detailPage !== undefined && typeof updateData.detailPage === 'string') {
            const raw = updateData.detailPage.trim();
            if (raw === '' || raw === 'null') {
                updateData.detailPage = undefined;
            } else {
                try {
                    updateData.detailPage = JSON.parse(raw);
                } catch (e) {
                    return setBadRequest(res, { message: 'detailPage must be valid JSON' });
                }
            }
        }
        
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
        const msg = err?.message || String(err);
        if (msg.includes("space quota") || msg.includes("over your space")) {
          logger.error(`Error updating course (storage quota): ${msg}`);
          return res.status(507).json({
            success: false,
            data: {
              message:
                "Database storage limit reached (MongoDB Atlas). Delete old data or upgrade the cluster, then try again.",
            },
          });
        }
        logger.error(`Error updating course: ${msg}`);
        setServerError(res, { message: msg || 'Internal server error' });
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
