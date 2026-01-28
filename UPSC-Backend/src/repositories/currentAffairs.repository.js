const CurrentAffair = require('../models/CurrentAffair');
const logger = require('../utility/logger');

const createAffair = async (data) => {
  try {
    logger.info('currentAffairsRepository.js <<createAffair<< Creating new current affair');
    const result = await CurrentAffair.create(data);
    logger.info(`currentAffairsRepository.js <<createAffair<< Current affair created successfully with ID: ${result._id}`);
    return result;
  } catch (error) {
    logger.error(`currentAffairsRepository.js <<createAffair<< Error creating current affair: ${error.message}`);
    throw error;
  }
};

// const getAllAffairs = async () => {
//   try {
//     logger.info('currentAffairsRepository.js <<getAllAffairs<< Fetching all current affairs');
//     const affairs = await CurrentAffair.find().sort({ date: -1 });
//     logger.info(`currentAffairsRepository.js <<getAllAffairs<< Successfully fetched ${affairs.length} current affairs`);
//     return affairs;
//   } catch (error) {
//     logger.error(`currentAffairsRepository.js <<getAllAffairs<< Error fetching current affairs: ${error.message}`);
//     throw error;
//   }
// };

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

    logger.info(`currentAffairsRepository.js <<getAllAffairs<< Built query: ${JSON.stringify(query)}`);

    let queryChain = CurrentAffair.find(query).sort({ date: -1 });

    if (filters.page && filters.limit) {
      const page = parseInt(filters.page, 10) || 1;
      const limit = parseInt(filters.limit, 10);
      const skip = (page - 1) * limit;

      queryChain = queryChain.skip(skip).limit(limit);
      
      logger.info(`currentAffairsRepository.js <<getAllAffairs<< Applying pagination: page ${page}, limit ${limit}`);
    } else {
      logger.info('currentAffairsRepository.js <<getAllAffairs<< No pagination filters provided, fetching all matching results.');
    }

    const affairs = await queryChain.exec();
    
    logger.info(`currentAffairsRepository.js <<getAllAffairs<< Successfully fetched ${affairs.length} current affairs`);
    return affairs;
       
  } catch (error) {
    logger.error(`currentAffairsRepository.js <<getAllAffairs<< Error fetching current affairs: ${error.message}`);
    throw error;
  }
};

const getAffairById = async (id) => {
  try {
    logger.info(`currentAffairsRepository.js <<getAffairById<< Fetching current affair by ID: ${id}`);
    const affair = await CurrentAffair.findById(id);
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
    logger.info(`currentAffairsRepository.js <<updateAffair<< Updating current affair with ID: ${id}`);
    const result = await CurrentAffair.findByIdAndUpdate(id, update, { new: true });
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
  getAffairById,
  updateAffair,
  deleteAffair
};