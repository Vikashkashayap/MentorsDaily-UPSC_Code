const CurrentAffair = require('../models/CurrentAffair');
const logger = require('../utility/logger');
const { slugify } = require('../utility/slugUtils');

/** Fields for list/cards: no full content to keep payload small */
const LIST_PROJECTION = 'title slug date thumbnailUrl paperName subject description _id createdAt';
/** Fields for single detail: full content, no base64 (thumbnailUrl is URL only) */
const DETAIL_PROJECTION = 'title slug content description date createdAt thumbnailUrl paperName subject source _id';

const createAffair = async (data) => {
  try {
    if (!data.slug && data.title) {
      data.slug = slugify(data.title);
    }
    logger.info('currentAffairsRepository.js <<createAffair<< Creating new current affair');
    const result = await CurrentAffair.create(data);
    logger.info(`currentAffairsRepository.js <<createAffair<< Current affair created successfully with ID: ${result._id}`);
    return result;
  } catch (error) {
    logger.error(`currentAffairsRepository.js <<createAffair<< Error creating current affair: ${error.message}`);
    throw error;
  }
};

/**
 * Get single affair by slug (detail page). Returns one record with required fields only.
 * Tries slug index first; if no slug in DB (legacy), falls back to matching slugified title.
 */
const getAffairBySlug = async (slug) => {
  try {
    if (!slug) return null;
    logger.info(`currentAffairsRepository.js <<getAffairBySlug<< Fetching affair by slug: ${slug}`);
    let affair = await CurrentAffair.findOne({ slug })
      .select(DETAIL_PROJECTION)
      .lean();
    if (affair) {
      logger.info(`currentAffairsRepository.js <<getAffairBySlug<< Found affair for slug: ${slug}`);
      return affair;
    }
    // Fallback for records without slug: match by slugified title (limited to avoid heavy scan)
    const candidates = await CurrentAffair.find({})
      .select('title _id')
      .sort({ date: -1 })
      .limit(100)
      .lean();
    const match = candidates.find((d) => slugify(d.title) === slug);
    if (match) {
      affair = await CurrentAffair.findById(match._id).select(DETAIL_PROJECTION).lean();
      logger.info(`currentAffairsRepository.js <<getAffairBySlug<< Found affair by title fallback for slug: ${slug}`);
      return affair;
    }
    logger.warn(`currentAffairsRepository.js <<getAffairBySlug<< No affair found for slug: ${slug}`);
    return null;
  } catch (error) {
    logger.error(`currentAffairsRepository.js <<getAffairBySlug<< Error: ${error.message}`);
    throw error;
  }
};

/**
 * List affairs with pagination, projection, and .lean(). Default limit 20.
 * Excludes full content to reduce response size.
 */
const getAllAffairs = async (filters = {}) => {
  try {
    logger.info('currentAffairsRepository.js <<getAllAffairs<< Building query with filters');

    const query = {};

    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) {
        query.date.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999);
        query.date.$lte = endDate;
      }
    }

    if (filters.paperName) {
      query.paperName = filters.paperName;
    }
    if (filters.subject) {
      query.subject = filters.subject;
    }

    const page = Math.max(1, parseInt(filters.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const [affairs, totalCount] = await Promise.all([
      CurrentAffair.find(query)
        .select(LIST_PROJECTION)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CurrentAffair.countDocuments(query)
    ]);

    logger.info(`currentAffairsRepository.js <<getAllAffairs<< Fetched ${affairs.length} affairs (page ${page}, total ${totalCount})`);
    return { data: affairs, totalCount };
  } catch (error) {
    logger.error(`currentAffairsRepository.js <<getAllAffairs<< Error fetching current affairs: ${error.message}`);
    throw error;
  }
};

const getAffairById = async (id) => {
  try {
    logger.info(`currentAffairsRepository.js <<getAffairById<< Fetching current affair by ID: ${id}`);
    const affair = await CurrentAffair.findById(id)
      .select(DETAIL_PROJECTION)
      .lean();
    if (affair) {
      logger.info(`currentAffairsRepository.js <<getAffairById<< Current affair found for ID: ${id}`);
    } else {
      logger.warn(`currentAffairsRepository.js <<getAffairById<< Current affair not found for ID: ${id}`);
    }
    return affair;
  } catch (error) {
    logger.error(`currentAffairsRepository.js <<getAffairById<< Error fetching current affair by ID: ${error.message}`);
    throw error;
  }
};

const updateAffair = async (id, update) => {
  try {
    if (update.title && !update.slug) {
      update.slug = slugify(update.title);
    }
    logger.info(`currentAffairsRepository.js <<updateAffair<< Updating current affair with ID: ${id}`);
    const result = await CurrentAffair.findByIdAndUpdate(id, update, { new: true })
      .select(DETAIL_PROJECTION)
      .lean();
    if (result) {
      logger.info(`currentAffairsRepository.js <<updateAffair<< Current affair updated successfully for ID: ${id}`);
    } else {
      logger.warn(`currentAffairsRepository.js <<updateAffair<< Current affair not found for update with ID: ${id}`);
    }
    return result;
  } catch (error) {
    logger.error(`currentAffairsRepository.js <<updateAffair<< Error updating current affair: ${error.message}`);
    throw error;
  }
};

const deleteAffair = async (id) => {
  try {
    logger.info(`currentAffairsRepository.js <<deleteAffair<< Deleting current affair with ID: ${id}`);
    const result = await CurrentAffair.findByIdAndDelete(id);
    if (result) {
      logger.info(`currentAffairsRepository.js <<deleteAffair<< Current affair deleted successfully for ID: ${id}`);
    } else {
      logger.warn(`currentAffairsRepository.js <<deleteAffair<< Current affair not found for deletion with ID: ${id}`);
    }
    return result;
  } catch (error) {
    logger.error(`currentAffairsRepository.js <<deleteAffair<< Error deleting current affair: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createAffair,
  getAllAffairs,
  getAffairBySlug,
  getAffairById,
  updateAffair,
  deleteAffair
};
