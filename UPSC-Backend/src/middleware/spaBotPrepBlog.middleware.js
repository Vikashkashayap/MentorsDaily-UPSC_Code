const path = require("path");
const fs = require("fs").promises;
const logger = require("../utility/logger.js");
const { getBlogBySlugFlexibleService } = require("../services/preparationBlog.service.js");
const {
  buildBlogMeta,
  stripHeadSocialDefaults,
  buildInjectedHeadFragment,
  isSocialOrSearchBot,
} = require("../utils/blogSeoHtml.js");

function decodeSlugParam(raw) {
  if (raw == null) return "";
  try {
    return decodeURIComponent(String(raw));
  } catch {
    return String(raw);
  }
}

/**
 * When FRONTEND_DIST is set: for crawler GETs to /preparation-blog/:slug, inject OG/Twitter meta into index.html.
 */
function createPrepBlogBotHtmlMiddleware(distPathAbs) {
  const indexPath = path.join(distPathAbs, "index.html");

  return async function prepBlogBotHtml(req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    if (!isSocialOrSearchBot(req.get("user-agent") || "")) return next();

    const m = req.path.match(/^\/preparation-blog\/([^/]+)\/?$/);
    if (!m) return next();

    const slug = decodeSlugParam(m[1]);
    if (!slug) return next();

    try {
      const blog = await getBlogBySlugFlexibleService(slug);
      if (!blog) return next();

      let html = await fs.readFile(indexPath, "utf8");
      html = stripHeadSocialDefaults(html);
      const meta = buildBlogMeta(blog, slug);
      const fragment = buildInjectedHeadFragment(meta);
      if (!html.includes("<!--SEO_INJECTION_SLOT-->")) {
        logger.warn("spaBotPrepBlog: index.html missing <!--SEO_INJECTION_SLOT--> — inject after <head>");
        html = html.replace(/<head[^>]*>/i, (match) => `${match}\n    <!--SEO_INJECTION_SLOT-->`);
      }
      html = html.replace("<!--SEO_INJECTION_SLOT-->", fragment);
      res.type("html").send(html);
    } catch (err) {
      logger.error(`spaBotPrepBlog.middleware << ${err.message}`);
      next();
    }
  };
}

module.exports = {
  createPrepBlogBotHtmlMiddleware,
  decodeSlugParam,
};
