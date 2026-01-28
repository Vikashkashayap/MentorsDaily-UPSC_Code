const mongoose = require("mongoose");
const logger = require("../utility/logger.js");
const { createBlogRepo, getBlogRepo, deleteBlogRepo, updateBlogRepo, getBlogFileIdRepo, getBlogByIdRepo } = require("../repositories/preparationBlog.repository.js");
const { uploadFileService } = require("./uploadFiles.service.js");
const preparationBlogModel = require("../models/preparationBlog.model.js");

exports.createBlogService = async (blogData, file, userId) => {
  logger.info("preparationBlog.service.js << createBlogService << Creating blog");
  try {
    const uploadedFile = await uploadFileService(file, userId);

    const blog = await createBlogRepo({
      ...blogData,
      user: userId,
      file: uploadedFile._id,
    });

    return blog;
  } catch (error) {
    logger.error(`preparationBlog.service.js << createBlogService << ${error.message}`);
    throw error;
  }
};

exports.getBlogService = async () => {
  logger.info("preparationBlog.service.js << getBlogService << Fetching all blogs");
  try {
    return await getBlogRepo();
  } catch (error) {
    logger.error(`preparationBlog.service.js << getBlogService << ${error.message}`);
    throw new Error(error.message);
  }
};

exports.deleteBlogService = async (id) => {
  logger.info(`preparationBlog.service.js << deleteBlogService << Deleting blog ${id}`);
  try {
    const result = await deleteBlogRepo(id);
    return result;
  } catch (error) {
    logger.error(`preparationBlog.service.js << deleteBlogService << ${error.message}`);
    throw new Error(error.message);
  }
};


exports.updateBlogService = async (blogId, blogData, newFile, userId) => {
  logger.info(`preparationBlog.service.js << updateBlogService << Updating blog with ID: ${blogId}`);
  try {
    let fileId;
    let oldFileId;

    // 1. Check if a new file is uploaded
    if (newFile) {
      // Find the current blog to get the old file reference
      const currentBlog = await getBlogFileIdRepo(blogId)
      if (currentBlog) {
        oldFileId = currentBlog.file;
      }

      // 2. Upload the new file
      const uploadedFile = await uploadFileService(newFile, userId);
      fileId = uploadedFile._id;

      
    }

    const updatedBlog = await updateBlogRepo(blogId, blogData, fileId);

    return updatedBlog;
  } catch (error) {
    logger.error(`preparationBlog.service.js << updateBlogService << ${error.message}`);
    throw error;
  }
};

exports.getBlogByIdService = async(id) => {
  logger.info(`preparationBlog.service.js << getBlogByIdService() << finding blog with ID: ${id}`);
 try {
    return await getBlogByIdRepo(id)
  } catch (error) {
    logger.error(`preparationBlog.service.js << getBlogByIdService() << Error in finding blog error: ${error.message}`);
    throw new Error(error.message)
  }
}

