const logger = require("../utility/logger.js");
const {
  createBlogRepo,
  getBlogRepo,
  getBlogPagedRepo,
  deleteBlogRepo,
  updateBlogRepo,
  getBlogByIdRepo,
  incrementBlogViewsRepo,
  getBlogBySlugFlexibleRepo,
} = require("../repositories/preparationBlog.repository.js");
const { uploadFileService } = require("./uploadFiles.service.js");

exports.createBlogService = async (blogData, file, userId) => {
  logger.info("preparationBlog.service.js << createBlogService << Creating blog");
  try {
    const folder = file.mimetype === "application/pdf" ? "pdfs" : "thumbnails";
    const uploadedFile = await uploadFileService(file, { folder, uploadedBy: userId });

    const patch = {
      user: userId,
    };
    if (file.mimetype === "application/pdf") {
      patch.pdfUrl = uploadedFile.url;
    } else {
      patch.thumbnailUrl = uploadedFile.url;
    }

    const blog = await createBlogRepo({
      ...blogData,
      ...patch,
    });

    return blog;
  } catch (error) {
    logger.error(`preparationBlog.service.js << createBlogService << ${error.message}`);
    throw error;
  }
};

exports.getBlogService = async ({ onlyPublic = false } = {}) => {
  logger.info("preparationBlog.service.js << getBlogService << Fetching all blogs");
  try {
    return await getBlogRepo({ onlyPublic });
  } catch (error) {
    logger.error(`preparationBlog.service.js << getBlogService << ${error.message}`);
    throw new Error(error.message);
  }
};

exports.getBlogPagedService = async ({ page, limit, search, onlyPublic = false }) => {
  logger.info("preparationBlog.service.js << getBlogPagedService << Fetching paged blogs");
  try {
    return await getBlogPagedRepo({ page, limit, search, onlyPublic });
  } catch (error) {
    logger.error(`preparationBlog.service.js << getBlogPagedService << ${error.message}`);
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
    if (newFile) {
      const folder = newFile.mimetype === "application/pdf" ? "pdfs" : "thumbnails";
      const uploadedFile = await uploadFileService(newFile, { folder, uploadedBy: userId });
      if (newFile.mimetype === "application/pdf") {
        blogData.pdfUrl = uploadedFile.url;
      } else {
        blogData.thumbnailUrl = uploadedFile.url;
      }
    }

    const updatedBlog = await updateBlogRepo(blogId, blogData);

    return updatedBlog;
  } catch (error) {
    logger.error(`preparationBlog.service.js << updateBlogService << ${error.message}`);
    throw error;
  }
};

exports.getBlogByIdService = async (id) => {
  logger.info(`preparationBlog.service.js << getBlogByIdService() << finding blog with ID: ${id}`);
  try {
    return await getBlogByIdRepo(id);
  } catch (error) {
    logger.error(`preparationBlog.service.js << getBlogByIdService() << Error in finding blog error: ${error.message}`);
    throw new Error(error.message);
  }
};

exports.incrementBlogViewsService = async (id) => {
  logger.info(`preparationBlog.service.js << incrementBlogViewsService << Incrementing views for blog ID: ${id}`);
  try {
    return await incrementBlogViewsRepo(id);
  } catch (err) {
    logger.error(`preparationBlog.service.js << incrementBlogViewsService << Error: ${err.message}`);
    throw err;
  }
};

exports.getBlogBySlugFlexibleService = async (slug, { onlyPublic = false } = {}) => {
  logger.info(`preparationBlog.service.js << getBlogBySlugFlexibleService << ${slug}`);
  try {
    return await getBlogBySlugFlexibleRepo(slug, { onlyPublic });
  } catch (err) {
    logger.error(`preparationBlog.service.js << getBlogBySlugFlexibleService << ${err.message}`);
    throw err;
  }
};
