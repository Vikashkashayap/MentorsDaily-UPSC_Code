const path = require("path");
const fs = require("fs").promises;
const logger = require("../utility/logger.js");
const { getBlogBySlugFlexibleService } = require("../services/preparationBlog.service.js");
const {
  buildBlogMeta,
  buildDefaultBlogMeta,
  stripHeadSocialDefaults,
  buildInjectedHeadFragment,
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
 * When FRONTEND_DIST is set: for /preparation-blog/:slug and /blog/:slug,
 * inject OG/Twitter meta into index.html server-side so crawlers can read it.
 */
function createPrepBlogBotHtmlMiddleware(distPathAbs) {
  const indexPath = path.join(distPathAbs, "index.html");

  return async function prepBlogBotHtml(req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const m = req.path.match(/^\/(?:preparation-blog|blog)\/([^/]+)\/?$/);
    if (!m) return next();
    const routeBase = req.path.startsWith("/blog/") ? "/blog" : "/preparation-blog";
    return renderPreparationBlogHtml({ slug: m[1], routeBase, indexPath, req, res, next });
  };
}

async function renderPreparationBlogHtml({ slug, routeBase = "/preparation-blog", indexPath, req, res, next }) {
  const decodedSlug = decodeSlugParam(slug);
  if (!decodedSlug) return next();
  try {
    const blog = await getBlogBySlugFlexibleService(decodedSlug, { onlyPublic: true });
    let html = await fs.readFile(indexPath, "utf8");
    html = stripHeadSocialDefaults(html);
    const meta = blog
      ? buildBlogMeta(blog, decodedSlug, process.env, routeBase)
      : buildDefaultBlogMeta(decodedSlug, process.env, routeBase);
    const fragment = buildInjectedHeadFragment(meta);
    if (!html.includes("<!--SEO_INJECTION_SLOT-->")) {
      logger.warn("spaBotPrepBlog: index.html missing <!--SEO_INJECTION_SLOT--> — inject after <head>");
      html = html.replace(/<head[^>]*>/i, (match) => `${match}\n    <!--SEO_INJECTION_SLOT-->`);
    }
    html = html.replace("<!--SEO_INJECTION_SLOT-->", fragment);
    res.status(blog ? 200 : 404).type("html").send(html);
  } catch (err) {
    logger.error(`spaBotPrepBlog.middleware << ${err.message}`);
    next();
  }
}

function createPreparationBlogHtmlRouteHandler(distPathAbs, routeBase = "/preparation-blog") {
  const indexPath = path.join(distPathAbs, "index.html");
  return async function preparationBlogHtmlRouteHandler(req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    return renderPreparationBlogHtml({
      slug: req.params.slug,
      routeBase,
      indexPath,
      req,
      res,
      next,
    });
  };
}

module.exports = {
  createPrepBlogBotHtmlMiddleware,
  createPreparationBlogHtmlRouteHandler,
  decodeSlugParam,
};
