const {
  createPreviousYearPaperRepo,
  getPreviousYearPaperRepo,
  deletePreviousYearPaperRepo,
  updatePreviousYearPaperRepo
} = require("../repositories/previousYearPaper.repository")

const logger = require('../utility/logger.js')

exports.createPreviousYearPaperService = async(data) => {
  try {
    logger.info(`previousYearPaper.service.js << createPreviousYearPaperService() << Start`);
    const result = await createPreviousYearPaperRepo(data);
    logger.info(`previousYearPaper.service.js << createPreviousYearPaperService() << Success`);
    return result;
  } catch (error) {
    logger.error(`previousYearPaper.service.js << createPreviousYearPaperService() << Error: ${error.message}`);
    throw new Error(error.message) 
  }
};

exports.getPreviousYearPaperService = async() => {
  try {
    logger.info(`previousYearPaper.service.js << getPreviousYearPaperService() << Start`);
    const result = await getPreviousYearPaperRepo();
    logger.info(`previousYearPaper.service.js << getPreviousYearPaperService() << Success`);
    return result;
  } catch (error) {
    logger.error(`previousYearPaper.service.js << getPreviousYearPaperService() << Error: ${error.message}`);
    throw new Error(error.message)
  }
};

exports.deletePreviousYearPaperService = async(id) => {
  try {
    logger.info(`previousYearPaper.service.js << deletePreviousYearPaperService() << Start. ID: ${id}`);
    const result = await deletePreviousYearPaperRepo(id);
    logger.info(`previousYearPaper.service.js << deletePreviousYearPaperService() << Success. ID: ${id} processed.`);
    return result;
  } catch (error) {
    logger.error(`previousYearPaper.service.js << deletePreviousYearPaperService() << Error: ${error.message}`);
    throw new Error(error.message);
  }
};

exports.updatePreviousYearPaperService = async (id, data) => {
  try {
    logger.info(`previousYearPaper.service.js << updatePreviousYearPaperService() << Start. ID: ${id}`);
    const result = await updatePreviousYearPaperRepo(id, data);
    logger.info(`previousYearPaper.service.js << updatePreviousYearPaperService() << Success. ID: ${id} processed.`);
    return result;
  } catch (error) {
    logger.error(`previousYearPaper.service.js << updatePreviousYearPaperService() << Error: ${error.message}`);
    throw new Error(error.message);
  }
};