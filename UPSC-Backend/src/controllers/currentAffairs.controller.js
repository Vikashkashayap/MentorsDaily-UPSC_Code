const currentAffairsService = require("../services/currentAffairs.service");
const logger = require("../utility/logger");
const { setBadRequest, setCreateSuccess, setServerError, setNotFoundError, setSuccess } = require("../utility/responseHelper");

exports.createAffair = async (req, res) => {
  try {
    logger.info('currentAffairsController.js <<createAffair<< Starting current affair creation');
    
    if (!req.body.title) {
      logger.error('currentAffairsController.js  <<createAffair<< Missing required fields');
      return setBadRequest(res, { message: "Title is required!" });
    }

    const newAffair = await currentAffairsService.createAffair(req.body);
    
    logger.info(`currentAffairsController.js <<createAffair<< Current affair created successfully: ${req.body.title}`);
    setCreateSuccess(res, {
      message: 'Current affair created successfully',
      data: newAffair
    });
  } catch (err) {
    logger.error(`currentAffairsController.js <<createAffair<< Error creating current affair: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};

exports.listAffairs = async (req, res) => {
  try {
    logger.info('currentAffairsController.js <<listAffairs<< Fetching all current affairs');
    
    const filters = req.query; 
    
    const affairs = await currentAffairsService.listAffairs(filters);
    
    logger.info(`currentAffairsController.js <<listAffairs<< Successfully fetched ${affairs.length} current affairs`);
    setSuccess(res, {
      message: 'Current affairs fetched successfully',
      data: affairs
    });
  } catch (err) {
    logger.error(`currentAffairsController.js <<listAffairs<< Error fetching current affairs: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};

exports.findAffairById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`currentAffairsController.js <<findAffairById<< Fetching current affair by ID: ${id}`);
    
    const affair = await currentAffairsService.findAffairById(id);
    
    if (!affair) {
      logger.error(`currentAffairsController.js <<findAffairById<< Current affair not found for ID: ${id}`);
      return setNotFoundError(res, {
        message: 'Current affair not found'
      });
    }
    
    logger.info(`currentAffairsController.js <<findAffairById<< Current affair fetched successfully for ID: ${id}`);
    setSuccess(res, {
      message: 'Current affair fetched successfully',
      data: affair
    });
  } catch (err) {
    logger.error(`currentAffairsController.js <<findAffairById<< Error fetching current affair: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};

exports.updateAffair = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`currentAffairsController.js <<updateAffair<< Updating current affair by ID: ${id}`);
    
    const updatedAffair = await currentAffairsService.updateAffair(id, req.body);
    
    if (!updatedAffair) {
      logger.error(`currentAffairsController.js <<updateAffair<< Current affair not found for ID: ${id}`);
      return setNotFoundError(res, {
        message: 'Current affair not found'
      });
    }
    
    logger.info(`currentAffairsController.js <<updateAffair<< Current affair updated successfully for ID: ${id}`);
    setSuccess(res, {
      message: 'Current affair updated successfully',
      data: updatedAffair
    });
  } catch (err) {
    logger.error(`currentAffairsController.js <<updateAffair<< Error updating current affair: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};

exports.deleteAffair = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`currentAffairsController.js <<deleteAffair<< Deleting current affair by ID: ${id}`);
    
    const deletedAffair = await currentAffairsService.deleteAffair(id);
    
    if (!deletedAffair) {
      logger.error(`currentAffairsController.js <<deleteAffair<< Current affair not found for ID: ${id}`);
      return setNotFoundError(res, {
        message: 'Current affair not found'
      });
    }
    
    logger.info(`currentAffairsController.js <<deleteAffair<< Current affair deleted successfully for ID: ${id}`);
    setSuccess(res, {
      message: 'Current affair deleted successfully',
      data: deletedAffair
    });
  } catch (err) {
    logger.error(`currentAffairsController.js <<deleteAffair<< Error deleting current affair: ${err.message}`);
    setServerError(res, { message: err.message || 'Internal server error' });
  }
};