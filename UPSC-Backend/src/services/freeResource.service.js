const freeResourceRepository = require('../repositories/freeResource.repository.js');
const UploadedDocuments = require('../models/uploadedDocuments.model.js');
const { uploadFileService } = require('./uploadFiles.service.js');
const logger = require('../utility/logger.js');

exports.createFreeResourceService = async (resourceData, file, userId) => {
    logger.info('freeResource.service.js << createFreeResourceService << Creating free resource');
    try {
        const uploadedFile = await uploadFileService(file, userId);

        const resource = await freeResourceRepository.createFreeResource({
            ...resourceData,
            fileId: uploadedFile._id,
            uploadedBy: userId
        });
        return resource;
    } catch (error) {
        logger.error(`freeResource.service.js << createFreeResourceService << ${error}`);
        throw error;
    }
};

exports.getAllFreeResourcesService = async (filters = {}) => {
    logger.info('freeResource.service.js << getAllFreeResourcesService << Fetching all resources');
    try {
        const query = { isActive: true };

        if (filters.category) {
            query.categories = filters.category;
        }
        if (filters.difficulty) {
            query.difficulty = filters.difficulty;
        }
        if (filters.search) {
            query.$or = [
                { title: { $regex: filters.search, $options: 'i' } },
                { description: { $regex: filters.search, $options: 'i' } }
            ];
        }

        const resources = await freeResourceRepository.findAllFreeResources(query);
        return resources;
    } catch (error) {
        logger.error(`freeResource.service.js << getAllFreeResourcesService << ${error}`);
        throw error;
    }
};

exports.getFreeResourceByIdService = async (id) => {
    logger.info(`freeResource.service.js << getFreeResourceByIdService << Input: ${id}`);
    try {
        const resource = await freeResourceRepository.findFreeResourceById(id);

        if (!resource) {
            throw new Error('Resource not found');
        }

        return resource;
    } catch (error) {
        logger.error(`freeResource.service.js << getFreeResourceByIdService << ${error}`);
        throw error;
    }
};

exports.updateFreeResourceService = async (id, updateData, file, userId) => {
    logger.info(`freeResource.service.js << updateFreeResourceService << Input: ${id}`);
    try {
        const resource = await freeResourceRepository.findFreeResourceById(id);

        if (!resource) {
            throw new Error('Resource not found');
        }

        if (file) {
            const uploadedFile = await uploadFileService(file, userId);
            updateData.fileId = uploadedFile._id;
        }

        updateData.updatedAt = Date.now();
        const updatedResource = await freeResourceRepository.updateFreeResource(id, updateData);

        return updatedResource;
    } catch (error) {
        logger.error(`freeResource.service.js << updateFreeResourceService << ${error}`);
        throw error;
    }
};

exports.deleteFreeResourceService = async (id) => {
    logger.info(`freeResource.service.js << deleteFreeResourceService << Input: ${id}`);
    try {
        const resource = await freeResourceRepository.findFreeResourceById(id);

        if (!resource) {
            throw new Error('Resource not found');
        }

        // Delete the uploaded file
        await UploadedDocuments.findByIdAndDelete(resource.fileId);

        // Delete the resource using repository
        await freeResourceRepository.deleteFreeResource(id);

        return { message: 'Resource deleted successfully' };
    } catch (error) {
        logger.error(`freeResource.service.js << deleteFreeResourceService << ${error}`);
        throw error;
    }
};


