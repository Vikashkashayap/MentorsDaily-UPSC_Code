const upscPreviousYearPaper = require("../models/previousYearPaper.model")
const logger = require('../utility/logger.js')

exports.createPreviousYearPaperRepo = async(data) => {
    try {
        logger.info(`previousYearPaper.repository.js << createPreviousYearPaperRepo() << Start`);
        const result = await upscPreviousYearPaper.create(data);
        logger.info(`previousYearPaper.repository.js << createPreviousYearPaperRepo() << Success`);
        return result;
    } catch (error) {
        logger.error(`previousYearPaper.repository.js << createPreviousYearPaperRepo() << Error: ${error.message}`);
        throw new Error(error.message)
    }
};

exports.getPreviousYearPaperRepo = async() => {
    try {
        logger.info(`previousYearPaper.repository.js << getPreviousYearPaperRepo() << Start`);
        const result = await upscPreviousYearPaper.find();
        logger.info(`previousYearPaper.repository.js << getPreviousYearPaperRepo() << Success. Fetched ${result.length} papers.`);
        return result;
    } catch (error) {
        logger.error(`previousYearPaper.repository.js << getPreviousYearPaperRepo() << Error: ${error.message}`);
        throw new Error(error.message);
    }
};

exports.deletePreviousYearPaperRepo = async (id) => {
    try {
        logger.info(`previousYearPaper.repository.js << deletePreviousYearPaperRepo() << Start. ID: ${id}`);
        const result = await upscPreviousYearPaper.findByIdAndDelete(id);
        logger.info(`previousYearPaper.repository.js << deletePreviousYearPaperRepo() << Success. ID: ${id} processed.`);
        return result;
    } catch (error) {
        logger.error(`previousYearPaper.repository.js << deletePreviousYearPaperRepo() << Error: ${error.message}`);
        throw new Error(error.message);
    }
};

exports.updatePreviousYearPaperRepo = async (id, data) => {
    try {
        logger.info(`previousYearPaper.repository.js << updatePreviousYearPaperRepo() << Start. ID: ${id}`);
        const result = await upscPreviousYearPaper.findByIdAndUpdate(id, {$set:data},
                { new: true, runValidators: true }
            );
        logger.info(`previousYearPaper.repository.js << updatePreviousYearPaperRepo() << Success. ID: ${id} processed.`);
        return result;
    } catch (error) {
        logger.error(`previousYearPaper.repository.js << updatePreviousYearPaperRepo() << Error: ${error.message}`);
        throw new Error(error.message);
    }
};