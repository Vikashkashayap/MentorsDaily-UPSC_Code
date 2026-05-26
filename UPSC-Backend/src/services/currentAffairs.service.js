const repo = require('../repositories/currentAffairs.repository.js');
const logger = require('../utility/logger.js');

const createAffair = async (payload) => {
  try {
    logger.info('currentAffairsService.js <<createAffair<< Creating current affair');
    const result = await repo.createAffair(payload);
    logger.info('currentAffairsService.js <<createAffair<< Current affair created successfully in service');
    return result;
  } catch (error) {
    logger.error(`currentAffairsService.js <<createAffair<< Error in service creating current affair: ${error.message}`);
    throw error;
  }
};

// const listAffairs = async () => {
//   try {
//     logger.info('currentAffairsService.js <<listAffairs<< Fetching all current affairs');
//     const result = await repo.getAllAffairs();
//     logger.info('currentAffairsService.js <<listAffairs<< Successfully fetched all current affairs in service');
//     return result;
//   } catch (error) {
//     logger.error(`currentAffairsService.js <<listAffairs<< Error in service fetching current affairs: ${error.message}`);
//     throw error;
//   }
// };


const listAffairs = async (filters = {}) => {
  try {
    if (filters.slug) {
      logger.info('currentAffairsService.js <<listAffairs<< Fetching single affair by slug');
      const affair = await repo.getAffairBySlug(filters.slug);
      return { data: affair ? [affair] : [], totalCount: affair ? 1 : 0 };
    }
    logger.info('currentAffairsService.js <<listAffairs<< Fetching current affairs list');
    const result = await repo.getAllAffairs(filters);
    const data = result.data || result;
    const totalCount = result.totalCount ?? (Array.isArray(data) ? data.length : 0);
    logger.info('currentAffairsService.js <<listAffairs<< Successfully fetched current affairs in service');
    return { data, totalCount };
  } catch (error) {
    logger.error(`currentAffairsService.js <<listAffairs<< Error in service fetching current affairs: ${error.message}`);
    throw error;
  }
};

const findAffairById = async (id) => {
  try {
    logger.info(`currentAffairsService.js <<findAffairById<< Fetching current affair by ID: ${id}`);
    const result = await repo.getAffairById(id);
    logger.info(`currentAffairsService.js <<findAffairById<< Successfully processed request for ID: ${id} in service`);
    return result;
  } catch (error) {
    logger.error(`currentAffairsService.js <<findAffairById<< Error in service fetching current affair by ID: ${error.message}`);
    throw error;
  }
};

const updateAffair = async (id, data) => {
  try {
    logger.info(`currentAffairsService.js <<updateAffair<< Updating current affair with ID: ${id}`);
    const result = await repo.updateAffair(id, data);
    logger.info(`currentAffairsService.js <<updateAffair<< Successfully processed update for ID: ${id} in service`);
    return result;
  } catch (error) {
    logger.error(`currentAffairsService.js <<updateAffair<< Error in service updating current affair: ${error.message}`);
    throw error;
  }
};


const deleteAffair = async (id) => {
  try {
    logger.info(`currentAffairsService.js <<deleteAffair<< Deleting current affair with ID: ${id}`);
    const result = await repo.deleteAffair(id);
    logger.info(`currentAffairsService.js <<deleteAffair<< Successfully processed delete for ID: ${id} in service`);
    return result;
  } catch (error) {
    logger.error(`currentAffairsService.js <<deleteAffair<< Error in service deleting current affair: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createAffair,
  listAffairs,
  findAffairById,
  updateAffair,
  deleteAffair
};