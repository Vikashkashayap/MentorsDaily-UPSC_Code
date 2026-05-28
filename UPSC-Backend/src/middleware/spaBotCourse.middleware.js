const path = require("path");
const fs = require("fs").promises;
const logger = require("../utility/logger.js");
const courseService = require("../services/course.service.js");
const { stripHeadSocialDefaults, isObjectIdString } = require("../utils/blogSeoHtml.js");
const { buildCourseMeta, buildInjectedHeadFragment } = require("../utils/courseSeoHtml.js");

function decodeParam(raw) {
  if (raw == null) return "";
  try {
    return decodeURIComponent(String(raw));
  } catch {
    return String(raw);
  }
}

async function renderCourseHtml({ metaPath, indexPath, req, res, next }) {
  try {
    let html = await fs.readFile(indexPath, "utf8");
    html = stripHeadSocialDefaults(html);

    const course = await resolveCourseForMeta(metaPath);
    const meta = course
      ? buildCourseMeta(course, process.env, metaPath)
      : {
          title: "Course | MentorsDaily",
          description: "Explore MentorsDaily courses and mentorship programs.",
          image: `${(process.env.SITE_URL || "https://mentorsdaily.com").replace(/\/$/, "")}/images/hero.webp`,
          url: `${(process.env.SITE_URL || "https://mentorsdaily.com").replace(/\/$/, "")}${metaPath}`,
          pathname: metaPath,
          plainTitle: "Course",
        };

    const fragment = buildInjectedHeadFragment(meta);
    if (!html.includes("<!--SEO_INJECTION_SLOT-->")) {
      logger.warn("spaBotCourse: index.html missing <!--SEO_INJECTION_SLOT--> — inject after <head>");
      html = html.replace(/<head[^>]*>/i, (match) => `${match}\n    <!--SEO_INJECTION_SLOT-->`);
    }
    html = html.replace("<!--SEO_INJECTION_SLOT-->", fragment);
    res.status(course ? 200 : 404).type("html").send(html);
  } catch (err) {
    logger.error(`spaBotCourse.middleware << ${err.message}`);
    next(err);
  }
}

async function resolveCourseForMeta(pathname) {
  // Supported:
  // - /integrated-mentorship-2031, /integrated-mentorship-2032 (slug)
  // - /program/:slug (slug)
  // - /courses/:id/:courseSlug? (id)
  const p = String(pathname || "");

  if (p.startsWith("/integrated-mentorship-")) {
    const slug = p.replace(/^\//, "").split("/")[0];
    return await courseService.findCourseBySlug(slug);
  }

  const prog = p.match(/^\/program\/([^/]+)\/?$/);
  if (prog) {
    const slug = decodeParam(prog[1]);
    if (!slug) return null;
    return await courseService.findCourseBySlug(slug);
  }

  const byId = p.match(/^\/courses\/([^/]+)(?:\/[^/]+)?\/?$/);
  if (byId) {
    const id = decodeParam(byId[1]);
    if (!id || !isObjectIdString(id)) return null;
    return await courseService.findCourseById(id);
  }

  return null;
}

function createCourseHtmlRouteHandler(distPathAbs) {
  const indexPath = path.join(distPathAbs, "index.html");
  return async function courseHtmlRouteHandler(req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    // Normalize to a pathname we can resolve
    const metaPath = req.path;
    return renderCourseHtml({ metaPath, indexPath, req, res, next });
  };
}

function createCourseBotHtmlMiddleware(distPathAbs) {
  const indexPath = path.join(distPathAbs, "index.html");
  return async function courseBotHtml(req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next();

    // Only for bots/social crawlers (same behavior as blog injection middleware),
    // but explicit route handlers can still serve injected HTML for first hits.
    const ua = String(req.headers["user-agent"] || "");
    const isBot = /facebookexternalhit|facebot|whatsapp|linkedinbot|twitterbot|slackbot|discordbot|telegrambot|pinterest|googlebot|bingbot/i.test(
      ua
    );
    if (!isBot) return next();

    const p = req.path;
    if (
      /^\/integrated-mentorship-203[12]\/?$/.test(p) ||
      /^\/program\/[^/]+\/?$/.test(p) ||
      /^\/courses\/[^/]+(?:\/[^/]+)?\/?$/.test(p)
    ) {
      return renderCourseHtml({ metaPath: p, indexPath, req, res, next });
    }

    next();
  };
}

module.exports = {
  createCourseHtmlRouteHandler,
  createCourseBotHtmlMiddleware,
};

