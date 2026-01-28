const {
  createPreviousYearPaperService,
  getPreviousYearPaperService,
  deletePreviousYearPaperService,
  updatePreviousYearPaperService
} = require("../services/previousYearPaper.service");
const { setBadRequest, setCreateSuccess, setServerError, setSuccess } = require("../utility/responseHelper");
const logger = require('../utility/logger.js');

exports.createPreviousYearPaperController = async (req, res) => {
  try {
    logger.info(`previousYearController.js << createPreviousYearPaperController() << Start`);
    
    const { year, examName, examType, paperType } = req.body;
    
    if (!year && !examName && !examType && !paperType) {
      logger.warn(`previousYearController.js << createPreviousYearPaperController() << Warning: No data provided for update`);
      return setBadRequest(res, { message: "No data provided for update" });
    }
    
    const previous = await createPreviousYearPaperService(req.body);
    
    logger.info(`previousYearController.js << createPreviousYearPaperController() << Success`);
    return setCreateSuccess(res, {
      message: "previous year paper added sucessfully",
      data: previous,
    });
  } catch (error) {
    logger.error(`previousYearController.js << createPreviousYearPaperController() << Error: ${error.message}`);
    return setServerError(res, {
      message: error.message,
    });
  }
};

exports.getPreviousYearPaperController = async (req, res) => {
  try {
    logger.info(`previousYearController.js << getPreviousYearPaperController() << Start`);
    
    const papers = await getPreviousYearPaperService();

    logger.info(`previousYearController.js << getPreviousYearPaperController() << Success`);
    return setSuccess(res, {
      message: "Previous year papers fetched successfully",
      data: papers,
    });
  } catch (error) {
    logger.error(`previousYearController.js << getPreviousYearPaperController() << Error: ${error.message}`);
    return setServerError(res, {
      message: error.message,
    });
  }
};

exports.deletePreviousYearPaperController = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`previousYearController.js << deletePreviousYearPaperController() << Start. ID: ${id}`);
    
    const deleted = await deletePreviousYearPaperService(id);

    if (!deleted) {
      logger.warn(`previousYearController.js << deletePreviousYearPaperController() << Warning: Paper not found for ID: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    logger.info(`previousYearController.js << deletePreviousYearPaperController() << Success. Paper ID: ${id} deleted.`);
    return res.status(200).json({
      success: true,
      message: "Paper deleted successfully",
      data: deleted,
    });
  } catch (error) {
    logger.error(`previousYearController.js << deletePreviousYearPaperController() << Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePreviousYearPaperController = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`previousYearController.js << updatePreviousYearPaperController() << Start. ID: ${id}`);
    
    const updatedPaper = await updatePreviousYearPaperService(id, req.body);
    
    logger.info(`previousYearController.js << updatePreviousYearPaperController() << Success. Paper ID: ${id} updated.`);
    return res.status(200).json({
      success: true,
      message: "Previous year paper updated successfully",
      data: updatedPaper,
    });
  } catch (error) {
    logger.error(`previousYearController.js << updatePreviousYearPaperController() << Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};