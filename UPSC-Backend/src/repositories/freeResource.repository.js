const FreeResource = require('../models/freeResource.model.js');

exports.createFreeResource = async (resourceData) => {
  try {
    const newResource = await FreeResource.create(resourceData);
    return await FreeResource.findById(newResource._id)
      .populate('fileId', 'filename contentType size')
      .populate('uploadedBy', 'name');
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findAllFreeResources = async (query = {}) => {
  try {
    return await FreeResource.find(query)
      .populate('fileId', 'filename contentType size')
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 });
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findFreeResourceById = async (id) => {
  try {
    return await FreeResource.findById(id)
      .populate('fileId', 'filename contentType size')
      .populate('uploadedBy', 'name');
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
      .populate('fileId', 'filename contentType size')
      .populate('uploadedBy', 'name');
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
