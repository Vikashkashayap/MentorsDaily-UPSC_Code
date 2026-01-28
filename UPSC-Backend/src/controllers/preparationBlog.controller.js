const logger = require("../utility/logger.js");
const mongoose = require("mongoose");
const {
  createBlogService,
  getBlogService,
  deleteBlogService,
  updateBlogService,
  getBlogByIdService,
} = require("../services/preparationBlog.service.js");
const {
  setCreateSuccess,
  setBadRequest,
  setSuccess,
  setServerError,
} = require("../utility/responseHelper.js");

exports.createBlogController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return setBadRequest(res, { message: "No file uploaded" });
    }

    const { title, content, category, tags } = req.body;
    if (!title || !content) {
      return setBadRequest(res, { message: "Title and content are required" });
    }

    const blogData = {
      title,
      content,
      category: category || "General",
      tags: tags ? (typeof tags === "string" ? JSON.parse(tags) : tags) : [],
    };

    const result = await createBlogService(blogData, file, req.user.id);

    return setCreateSuccess(res, {
      message: "Blog created successfully",
      data: result,
    });
  } catch (err) {
    logger.error(`preparationBlog.controller.js << createBlogController << ${err.message}`);
    return setServerError(res, { message: err.message || "Failed to create blog" });
  }
};

exports.getBlogController = async (req, res) => {
  try {
    const blog = await getBlogService();
    return setSuccess(res, {
      message: "All blogs fetched successfully",
      data: blog,
    });
  } catch (error) {
    logger.error(`preparationBlog.controller.js << getBlogController << ${error.message}`);
    return setServerError(res, {
      message: error.message || "Failed to fetch blogs",
    });
  }
};

exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await deleteBlogService(id);

    if (!blog) {
      return setBadRequest(res, { message: "Blog not found" });
    }

    return setSuccess(res, {
      message: "Blog deleted successfully",
      data: blog,
    });
  } catch (error) {
    logger.error(`preparationBlog.controller.js << deleteBlogController << ${error.message}`);
    return setServerError(res, {
      message: error.message || "Failed to delete blog",
    });
  }
};


exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    const { title, content, category, tags } = req.body || {};


    if (!title && !content && !category && !tags && !file) {
      return setBadRequest(res, { message: "No data provided for update" });
    }

    const blogData = {};
    if (title) blogData.title = title;
    if (content) blogData.content = content;
    if (category) blogData.category = category;
    if (tags) {
      blogData.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
    }

    const result = await updateBlogService(id, blogData, file, req.user.id);

    return setSuccess(res, {
      message: "Blog updated successfully",
      data: result,
    });
  } catch (err) {
    logger.error(
      `preparationBlog.controller.js << updateBlogController << ${err.message}`
    );
    return setServerError(res, {
      message: err.message || "Failed to update blog",
    });
  }
};

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await getBlogByIdService(id);

    if (!blog) {
      return setBadRequest(res, { message: "Blog not found" });
    }

    return setSuccess(res, {
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    logger.error(`preparationBlog.controller.js << getBlogByIdController << ${error.message}`);
    return setServerError(res, {
      message: error.message || "Failed to find blog",
    });
  }
};