const {
    createFreeResourceService,
    getAllFreeResourcesService,
    getFreeResourceByIdService,
    updateFreeResourceService,
    deleteFreeResourceService
} = require('../services/freeResource.service.js');
const logger = require('../utility/logger.js');
const {
    setCreateSuccess,
    setSuccess,
    setBadRequest,
    setNotFoundError,
    setServerError
} = require('../utility/responseHelper.js');

exports.createFreeResource = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return setBadRequest(res, { message: 'No file uploaded' });
        }

        const { title, description, fileSize, categories, difficulty } = req.body;

        if (!title || !description || !fileSize) {
            return setBadRequest(res, { message: 'Title, description, and fileSize are required' });
        }

        const resourceData = {
            title,
            description,
            fileSize,
            categories: categories ? JSON.parse(categories) : [],
            difficulty: difficulty || 'Intermediate'
        };

        const result = await createFreeResourceService(resourceData, file, req.user.id);
        return setCreateSuccess(res, {
            message: 'Free resource created successfully',
            data: result
        });
    } catch (err) {
        logger.error(`freeResource.controller.js << createFreeResource() << Error: ${err}`);
        return setServerError(res, { message: err.message || 'Failed to create resource' });
    }
};

exports.getAllFreeResources = async (req, res) => {
    try {
        const { category, difficulty, search } = req.query;
        const filters = { category, difficulty, search };

        const resources = await getAllFreeResourcesService(filters);
        return setSuccess(res, {
            message: 'Resources fetched successfully',
            data: resources
        });
    } catch (err) {
        logger.error(`freeResource.controller.js << getAllFreeResources() << Error: ${err}`);
        return setServerError(res, { message: 'Failed to fetch resources' });
    }
};

exports.getFreeResourceById = async (req, res) => {
    try {
        const resource = await getFreeResourceByIdService(req.params.id);
        return setSuccess(res, {
            message: 'Resource fetched successfully',
            data: resource
        });
    } catch (err) {
        logger.error(`freeResource.controller.js << getFreeResourceById() << Error: ${err}`);
        return setServerError(res, { message: 'Resource not found' });
    }
};

exports.updateFreeResource = async (req, res) => {
    try {
        const { title, description, fileSize, categories, difficulty, isActive } = req.body;
        const file = req.file;

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (fileSize) updateData.fileSize = fileSize;
        if (categories) updateData.categories = JSON.parse(categories);
        if (difficulty) updateData.difficulty = difficulty;
        if (isActive !== undefined) updateData.isActive = isActive;

        const result = await updateFreeResourceService(req.params.id, updateData, file, req.user.id);
        return setSuccess(res, {
            message: 'Resource updated successfully',
            data: result
        });
    } catch (err) {
        logger.error(`freeResource.controller.js << updateFreeResource() << Error: ${err}`);
        return setServerError(res, { message: err.message || 'Failed to update resource' });
    }
};

exports.deleteFreeResource = async (req, res) => {
    try {
        const result = await deleteFreeResourceService(req.params.id);
        return setSuccess(res, { message: result.message });
    } catch (err) {
        logger.error(`freeResource.controller.js << deleteFreeResource() << Error: ${err}`);
        return setServerError(res, { message: 'Resource not found' });
    }
};
