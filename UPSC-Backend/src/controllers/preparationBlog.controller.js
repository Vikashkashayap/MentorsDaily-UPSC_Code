const logger = require("../utility/logger.js");
const mongoose = require("mongoose");
const {
  createBlogService,
  getBlogService,
  getBlogPagedService,
  deleteBlogService,
  updateBlogService,
  getBlogByIdService,
  incrementBlogViewsService,
  getBlogBySlugFlexibleService,
} = require("../services/preparationBlog.service.js");
const { buildBlogMeta, generateSlugFromTitle } = require("../utils/blogSeoHtml.js");
const {
  setCreateSuccess,
  setBadRequest,
  setSuccess,
  setServerError,
  setNotFoundError,
} = require("../utility/responseHelper.js");

const BLOG_TEMPLATES = new Set(["standard", "listicle", "comparison", "landing"]);
const BLOG_STATUS = new Set(["draft", "published", "scheduled"]);

function parseOptionalDate(value) {
  if (value == null || String(value).trim() === "") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

exports.createBlogController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return setBadRequest(res, { message: "No file uploaded" });
    }

    const {
      title,
      content,
      category,
      tags,
      shortDescription,
      slug,
      seoKeyword,
      metaTitle,
      imageAlt,
      template,
      ctaText,
      ctaLink,
      publishDate,
      status,
    } = req.body;
    if (!title || !content) {
      return setBadRequest(res, { message: "Title and content are required" });
    }

    const normalizedTemplate = template && BLOG_TEMPLATES.has(template) ? template : "standard";
    const normalizedStatus = status && BLOG_STATUS.has(status) ? status : "published";
    const parsedPublishDate = parseOptionalDate(publishDate);
    if (status && !BLOG_STATUS.has(status)) {
      return setBadRequest(res, { message: "Invalid status value" });
    }
    if (template && !BLOG_TEMPLATES.has(template)) {
      return setBadRequest(res, { message: "Invalid template value" });
    }
    if (normalizedStatus === "scheduled" && !parsedPublishDate) {
      return setBadRequest(res, { message: "publishDate is required for scheduled blogs" });
    }

    const blogData = {
      title,
      content,
      category: category || "General",
      tags: tags ? (typeof tags === "string" ? JSON.parse(tags) : tags) : [],
      shortDescription: shortDescription || "",
      slug: slug || undefined,
      seoKeyword: seoKeyword || "",
      metaTitle: metaTitle || "",
      imageAlt: imageAlt || "",
      template: normalizedTemplate,
      ctaText: ctaText || "",
      ctaLink: ctaLink || "",
      status: normalizedStatus,
      publishDate:
        normalizedStatus === "published"
          ? parsedPublishDate || new Date()
          : parsedPublishDate,
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
    const page = parseInt(req.query.page, 10);
    const limitRaw = parseInt(req.query.limit, 10);
    const search = typeof req.query.search === "string" ? req.query.search : "";
    const onlyPublic = req.query.visibility === "public";

    if (Number.isFinite(page) && page > 0 && Number.isFinite(limitRaw) && limitRaw > 0) {
      const limit = Math.min(limitRaw, 50);
      const { blogs, total } = await getBlogPagedService({ page, limit, search, onlyPublic });
      const totalPages = Math.max(1, Math.ceil(total / limit));
      return setSuccess(res, {
        message: "Blogs fetched successfully",
        data: {
          blogs,
          total,
          page,
          limit,
          totalPages,
        },
      });
    }

    const blog = await getBlogService({ onlyPublic });
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

    const {
      title,
      content,
      category,
      tags,
      shortDescription,
      slug,
      seoKeyword,
      metaTitle,
      imageAlt,
      template,
      ctaText,
      ctaLink,
      publishDate,
      status,
    } = req.body || {};

    if (
      !title &&
      !content &&
      !category &&
      !tags &&
      !file &&
      shortDescription === undefined &&
      !slug &&
      seoKeyword === undefined &&
      metaTitle === undefined &&
      imageAlt === undefined &&
      template === undefined &&
      ctaText === undefined &&
      ctaLink === undefined &&
      publishDate === undefined &&
      status === undefined
    ) {
      return setBadRequest(res, { message: "No data provided for update" });
    }

    const blogData = {};
    if (title) blogData.title = title;
    if (content) blogData.content = content;
    if (category) blogData.category = category;
    if (tags) {
      blogData.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
    }
    if (shortDescription !== undefined) blogData.shortDescription = shortDescription;
    if (slug) blogData.slug = slug;
    if (seoKeyword !== undefined) blogData.seoKeyword = seoKeyword;
    if (metaTitle !== undefined) blogData.metaTitle = metaTitle;
    if (imageAlt !== undefined) blogData.imageAlt = imageAlt;
    if (template !== undefined) {
      if (!BLOG_TEMPLATES.has(template)) {
        return setBadRequest(res, { message: "Invalid template value" });
      }
      blogData.template = template;
    }
    if (ctaText !== undefined) blogData.ctaText = ctaText;
    if (ctaLink !== undefined) blogData.ctaLink = ctaLink;
    if (status !== undefined) {
      if (!BLOG_STATUS.has(status)) {
        return setBadRequest(res, { message: "Invalid status value" });
      }
      blogData.status = status;
    }
    if (publishDate !== undefined) {
      const parsed = parseOptionalDate(publishDate);
      if (publishDate && !parsed) {
        return setBadRequest(res, { message: "Invalid publishDate" });
      }
      blogData.publishDate = parsed;
    }
    if (blogData.status === "scheduled" && !blogData.publishDate) {
      return setBadRequest(res, { message: "publishDate is required for scheduled blogs" });
    }
    if (blogData.status === "published" && blogData.publishDate == null) {
      blogData.publishDate = new Date();
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

exports.incrementBlogViewController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await incrementBlogViewsService(id);

    if (!blog) {
      return setBadRequest(res, { message: "Blog not found" });
    }

    return setSuccess(res, {
      message: "Blog views incremented successfully",
      data: blog,
    });
  } catch (err) {
    logger.error(`preparationBlog.controller.js << incrementBlogViewController << ${err.message}`);
    return setServerError(res, { message: err.message || "Failed to increment blog views" });
  }
};

exports.getBlogBySlugPublicController = async (req, res) => {
  try {
    let { slug } = req.params;
    try {
      slug = decodeURIComponent(String(slug || ""));
    } catch {
      return setBadRequest(res, { message: "Invalid blog URL" });
    }
    if (!slug || slug === "undefined") {
      return setBadRequest(res, { message: "Invalid blog URL" });
    }

    const blog = await getBlogBySlugFlexibleService(slug, { onlyPublic: true });
    if (!blog) {
      return setNotFoundError(res, { message: "Blog not found" });
    }

    return setSuccess(res, {
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    logger.error(`preparationBlog.controller.js << getBlogBySlugPublicController << ${error.message}`);
    return setServerError(res, { message: error.message || "Failed to fetch blog" });
  }
};

exports.getBlogMetaBySlugController = async (req, res) => {
  try {
    let { slug } = req.params;
    try {
      slug = decodeURIComponent(String(slug || ""));
    } catch {
      return setBadRequest(res, { message: "Invalid blog URL" });
    }
    if (!slug || slug === "undefined") {
      return setBadRequest(res, { message: "Invalid blog URL" });
    }

    const blog = await getBlogBySlugFlexibleService(slug, { onlyPublic: true });
    if (!blog) {
      return setNotFoundError(res, { message: "Blog not found" });
    }

    const meta = buildBlogMeta(blog, slug);
    return setSuccess(res, {
      message: "Meta fetched successfully",
      data: meta,
    });
  } catch (error) {
    logger.error(`preparationBlog.controller.js << getBlogMetaBySlugController << ${error.message}`);
    return setServerError(res, { message: error.message || "Failed to fetch meta" });
  }
};

function escapeXmlSitemap(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

exports.getPreparationBlogsSitemapXml = async (req, res) => {
  try {
    const blogs = await getBlogService({ onlyPublic: true });
    const list = Array.isArray(blogs) ? blogs : [];
    const siteUrl = (process.env.SITE_URL || process.env.FRONTEND_URL || "https://mentorsdaily.com").replace(
      /\/$/,
      ""
    );
    const today = new Date().toISOString().slice(0, 10);
    const lines = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      `  <url>`,
      `    <loc>${escapeXmlSitemap(`${siteUrl}/preparation-blogs`)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>daily</changefreq>`,
      `    <priority>0.85</priority>`,
      `  </url>`,
    ];

    for (const b of list) {
      const slug =
        b.slug && String(b.slug).trim()
          ? String(b.slug).trim()
          : generateSlugFromTitle(b.title);
      if (!slug) continue;
      const loc = `${siteUrl}/preparation-blog/${encodeURIComponent(slug)}`;
      const last = b.updatedAt || b.createdAt;
      const lastmod = last ? new Date(last).toISOString().slice(0, 10) : today;
      lines.push(`  <url>`);
      lines.push(`    <loc>${escapeXmlSitemap(loc)}</loc>`);
      lines.push(`    <lastmod>${lastmod}</lastmod>`);
      lines.push(`    <changefreq>weekly</changefreq>`);
      lines.push(`    <priority>0.8</priority>`);
      lines.push(`  </url>`);
    }

    lines.push(`</urlset>`);

    res.set({
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=600",
    });
    return res.send(lines.join("\n"));
  } catch (error) {
    logger.error(`preparationBlog.controller.js << getPreparationBlogsSitemapXml << ${error.message}`);
    return res.status(500).type("text/plain").send("Sitemap error");
  }
};