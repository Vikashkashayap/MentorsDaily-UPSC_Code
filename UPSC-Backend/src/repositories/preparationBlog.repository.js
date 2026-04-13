const mongoose = require("mongoose");
const logger = require("../utility/logger.js");
const PreparationBlog = require("../models/preparationBlog.model.js");

const PUBLIC_STATUS_FILTER = {
  $or: [
    { status: { $exists: false } },
    { status: "published" },
    { $and: [{ status: "scheduled" }, { publishDate: { $lte: new Date() } }] },
  ],
};

async function autoPublishDueScheduledBlogs() {
  try {
    await PreparationBlog.updateMany(
      { status: "scheduled", publishDate: { $lte: new Date() } },
      { $set: { status: "published" } }
    );
  } catch (err) {
    logger.error(`preparationBlog.repository.js << autoPublishDueScheduledBlogs << ${err.message}`);
  }
}

function popUser(q) {
  return q.populate("user", "name");
}

exports.createBlogRepo = async (blogData) => {
  try {
    logger.info("preparationBlog.repository.js << createBlogRepo << Creating new blog");
    const newBlog = await PreparationBlog.create(blogData);

    return await popUser(PreparationBlog.findById(newBlog._id));
  } catch (err) {
    logger.error(`preparationBlog.repository.js << createBlogRepo << ${err.message}`);
    throw new Error(err.message);
  }
};

exports.getBlogRepo = async ({ onlyPublic = false } = {}) => {
  try {
    logger.info("preparationBlog.repository.js << getBlogRepo << Fetching all blogs");
    if (onlyPublic) {
      await autoPublishDueScheduledBlogs();
    }
    const filter = onlyPublic ? PUBLIC_STATUS_FILTER : {};
    return await popUser(PreparationBlog.find(filter).sort({ createdAt: -1 }));
  } catch (err) {
    logger.error(`preparationBlog.repository.js << getBlogRepo << ${err.message}`);
    throw new Error(err.message);
  }
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

exports.getBlogPagedRepo = async ({ page, limit, search, onlyPublic = false }) => {
  try {
    logger.info("preparationBlog.repository.js << getBlogPagedRepo << Fetching paged blogs");
    if (onlyPublic) {
      await autoPublishDueScheduledBlogs();
    }
    const skip = (page - 1) * limit;
    const filter = onlyPublic ? { ...PUBLIC_STATUS_FILTER } : {};
    if (search && String(search).trim()) {
      const q = escapeRegex(String(search).trim());
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { shortDescription: { $regex: q, $options: "i" } },
      ];
    }
    let listQuery = PreparationBlog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    if (onlyPublic) {
      listQuery = listQuery.select(
        "title shortDescription slug category thumbnailUrl pdfUrl imageAlt views createdAt updatedAt publishDate status metaTitle user"
      );
    }
    const [blogs, total] = await Promise.all([
      popUser(listQuery),
      PreparationBlog.countDocuments(filter),
    ]);
    return { blogs, total };
  } catch (err) {
    logger.error(`preparationBlog.repository.js << getBlogPagedRepo << ${err.message}`);
    throw new Error(err.message);
  }
};

exports.deleteBlogRepo = async (id) => {
  try {
    logger.info(`preparationBlog.repository.js << deleteBlogRepo << Deleting blog with id: ${id}`);

    const deletedBlog = await PreparationBlog.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    return deletedBlog;
  } catch (error) {
    logger.error(`preparationBlog.repository.js << deleteBlogRepo << ${error.message}`);
    throw new Error(error.message);
  }
};

exports.updateBlogRepo = async (id, data) => {
  try {
    logger.info("preparationBlog.repository.js << updateBlogRepo << Updating blog with id");
    const updatedBlog = await PreparationBlog.findByIdAndUpdate(id, data, { new: true })
      .populate("user", "name");
    return updatedBlog;
  } catch (error) {
    logger.error(`preparationBlog.repository.js << updateBlogRepo << ${error.message}`);
    throw new Error(error.message);
  }
};

exports.getBlogByIdRepo = async (id) => {
  try {
    logger.info(`preparationBlog.repository.js << getBlogByIdRepo << Fetching blog: ${id}`);

    const currentBlog = await PreparationBlog.findById(id);
    return currentBlog;
  } catch (err) {
    logger.error(`preparationBlog.repository.js << getBlogByIdRepo << ${err.message}`);
    throw err;
  }
};

exports.incrementBlogViewsRepo = async (id) => {
  try {
    logger.info(`preparationBlog.repository.js << incrementBlogViewsRepo << Incrementing views for blog: ${id}`);
    const updatedBlog = await PreparationBlog.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    return updatedBlog;
  } catch (err) {
    logger.error(`preparationBlog.repository.js << incrementBlogViewsRepo << ${err.message}`);
    throw err;
  }
};

function popBlog(q) {
  return q.populate("user", "name");
}

exports.getBlogBySlugFlexibleRepo = async (slug, { onlyPublic = false } = {}) => {
  try {
    if (!slug || slug === "undefined") return null;
    logger.info(`preparationBlog.repository.js << getBlogBySlugFlexibleRepo << ${slug}`);
    if (onlyPublic) {
      await autoPublishDueScheduledBlogs();
    }

    let blog = await popBlog(
      PreparationBlog.findOne({
        slug,
        ...(onlyPublic ? PUBLIC_STATUS_FILTER : {}),
      })
    );
    if (blog) return blog;

    if (mongoose.Types.ObjectId.isValid(slug)) {
      blog = await popBlog(PreparationBlog.findOne({ _id: slug, ...(onlyPublic ? PUBLIC_STATUS_FILTER : {}) }));
      if (blog) return blog;
    }

    const { generateSlugFromTitle } = require("../utils/blogSeoHtml.js");
    const blogs = await popBlog(PreparationBlog.find(onlyPublic ? PUBLIC_STATUS_FILTER : {}));
    const found = blogs.find((b) => {
      if (b.slug && b.slug === slug) return true;
      return generateSlugFromTitle(b.title) === slug;
    });
    return found || null;
  } catch (err) {
    logger.error(`preparationBlog.repository.js << getBlogBySlugFlexibleRepo << ${err.message}`);
    throw new Error(err.message);
  }
};
