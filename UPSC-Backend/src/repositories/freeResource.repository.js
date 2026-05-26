const FreeResource = require('../models/freeResource.model.js');

exports.createFreeResource = async (resourceData) => {
  try {
    const newResource = await FreeResource.create(resourceData);
    return await FreeResource.findById(newResource._id)
      .populate('uploadedBy', 'name')
      .lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * @param {object} query
 * @param {{ skip?: number, limit?: number } | {}} options — omit both for capped list (see service)
 */
exports.findAllFreeResources = async (query = {}, options = {}) => {
  try {
    let q = FreeResource.find(query)
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    if (typeof options.skip === 'number' && typeof options.limit === 'number') {
      q = q.skip(options.skip).limit(options.limit);
    } else if (typeof options.limit === 'number') {
      q = q.limit(options.limit);
    }

    return await q;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.countFreeResources = async (query = {}) => {
  try {
    return await FreeResource.countDocuments(query);
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findFreeResourceById = async (id) => {
  try {
    return await FreeResource.findById(id)
      .populate('uploadedBy', 'name')
      .select('-__v')
      .lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateFreeResource = async (id, updateData) => {
  try {
    const resource = await FreeResource.findById(id);
    if (!resource) {
      return null;
    }

    Object.keys(updateData).forEach((key) => {
      resource[key] = updateData[key];
    });

    const updatedResource = await resource.save();
    return await FreeResource.findById(updatedResource._id)
      .populate('uploadedBy', 'name')
      .lean();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteFreeResource = async (id) => {
  try {
    return await FreeResource.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err.message);
  }
};
