const mongoose = require("mongoose");
const logger = require("../utility/logger.js");
const PreparationBlog = require("../models/preparationBlog.model.js");

exports.createBlogRepo = async (blogData) => {
  try {
    logger.info("preparationBlog.repository.js << createBlogRepo << Creating new blog");
    const newBlog = await PreparationBlog.create(blogData);

    return await PreparationBlog.findById(newBlog._id)
      .populate("file", "filename contentType size")
      .populate("user", "name");
  } catch (err) {
    logger.error(`preparationBlog.repository.js << createBlogRepo << ${err.message}`);
    throw new Error(err.message);
  }
};

exports.getBlogRepo = async () => {
  try {
    logger.info("preparationBlog.repository.js << getBlogRepo << Fetching all blogs");
    return await PreparationBlog.find()
      .populate("file", "filename contentType size")
      .populate("user", "name");
  } catch (err) {
    logger.error(`preparationBlog.repository.js << getBlogRepo << ${err.message}`);
    throw new Error(err.message);
  }
};

exports.deleteBlogRepo = async (id) => {
  try {
    logger.info(`preparationBlog.repository.js << deleteBlogRepo << Deleting blog with id: ${id}`);

    const deletedBlog = await PreparationBlog.findByIdAndDelete(new mongoose.Types.ObjectId(id) );
    return deletedBlog;
    } catch (error) {
    logger.error( `preparationBlog.repository.js << deleteBlogRepo << ${error.message}` );
    throw new Error(error.message);
  }
};

exports.updateBlogRepo = async (id, data) => {
  try {
    logger.info("preparationBlog.repository.js << updateBlogRepo << Updating blog with id");
    // Ensure we return the updated document and populate fields for consistency
    const updatedBlog = await PreparationBlog.findByIdAndUpdate(id, data, { new: true })
        .populate("file", "filename contentType size")
        .populate("user", "name");
    return updatedBlog;
  } catch (error) {
    logger.error(`preparationBlog.repository.js << updateBlogRepo << ${error.message}`);
    throw new Error(error.message);
  }
};

exports.getBlogFileIdRepo = async (blogId) => {
  try {
    logger.info(`preparationBlog.repository.js << getBlogFileIdRepo << Fetching file ID for blog: ${blogId}`);
    
    // The requested logic: Find by ID and select only the 'file' field
    const currentBlog = await PreparationBlog.findById(blogId).select('file');
    return currentBlog;
  } catch (err) {
    logger.error(`preparationBlog.repository.js << getBlogFileIdRepo << ${err.message}`);
    // Do not throw a new Error here, just throw the caught error to be handled by the service/controller
    throw err; 
  }
};

exports.getBlogByIdRepo = async (id) => {
  try {
    logger.info(`preparationBlog.repository.js << getBlogByIdRepo << Fetching file ID for blog: ${id}`);
    
    const currentBlog = await PreparationBlog.findById(id)
    return currentBlog;
  } catch (err) {
    logger.error(`preparationBlog.repository.js << getBlogByIdRepo << ${err.message}`);
    throw err; 
  }
};
  