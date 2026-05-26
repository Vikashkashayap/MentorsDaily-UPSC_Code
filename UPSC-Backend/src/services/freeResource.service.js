const freeResourceRepository = require('../repositories/freeResource.repository.js');
const { uploadFileService } = require('./uploadFiles.service.js');
const logger = require('../utility/logger.js');

exports.createFreeResourceService = async (resourceData, file, userId) => {
    logger.info('freeResource.service.js << createFreeResourceService << Creating free resource');
    try {
        let pdfUrl = '';
        if (file) {
            const uploadedFile = await uploadFileService(file, { folder: 'pdfs', uploadedBy: userId });
            pdfUrl = uploadedFile.url;
        }

        const resource = await freeResourceRepository.createFreeResource({
            ...resourceData,
            pdfUrl,
            uploadedBy: userId
        });
        return resource;
    } catch (error) {
        logger.error(`freeResource.service.js << createFreeResourceService << ${error}`);
        throw error;
    }
};

exports.getAllFreeResourcesService = async (filters = {}, listOptions = {}) => {
    logger.info('freeResource.service.js << getAllFreeResourcesService << Fetching resources');
    try {
        const query = { isActive: true };
        const andConditions = [];

        if (filters.category) {
            andConditions.push({
                $or: [
                    { category: filters.category },
                    { categories: filters.category }
                ]
            });
        }
        if (filters.subcategory) {
            query.subcategory = filters.subcategory;
        }
        if (filters.subject) {
            query.subject = filters.subject;
        }
        if (filters.search) {
            andConditions.push({
                $or: [
                    { title: { $regex: filters.search, $options: 'i' } },
                    { description: { $regex: filters.search, $options: 'i' } }
                ]
            });
        }

        if (andConditions.length > 0) {
            query.$and = andConditions;
        }

        const page = parseInt(listOptions.page, 10);
        const limitRaw = parseInt(listOptions.limit, 10);
        const usePage = Number.isFinite(page) && page >= 1 && Number.isFinite(limitRaw) && limitRaw >= 1;
        const limit = usePage ? Math.min(200, Math.max(1, limitRaw)) : null;
        const safePage = usePage ? page : 1;

        if (usePage) {
            const skip = (safePage - 1) * limit;
            const [resources, total] = await Promise.all([
                freeResourceRepository.findAllFreeResources(query, { skip, limit }),
                freeResourceRepository.countFreeResources(query),
            ]);
            return {
                resources,
                total,
                page: safePage,
                limit,
                totalPages: Math.max(1, Math.ceil(total / limit)),
            };
        }

        const [total, resources] = await Promise.all([
            freeResourceRepository.countFreeResources(query),
            freeResourceRepository.findAllFreeResources(query, { limit: 500 }),
        ]);
        return {
            resources,
            total,
            page: 1,
            limit: resources.length,
            totalPages: Math.max(1, Math.ceil(total / 500)),
        };
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
            const uploadedFile = await uploadFileService(file, { folder: 'pdfs', uploadedBy: userId });
            updateData.pdfUrl = uploadedFile.url;
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

        await freeResourceRepository.deleteFreeResource(id);

        return { message: 'Resource deleted successfully' };
    } catch (error) {
        logger.error(`freeResource.service.js << deleteFreeResourceService << ${error}`);
        throw error;
    }
};
