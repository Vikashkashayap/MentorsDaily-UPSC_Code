const path = require("path");
const fs = require("fs").promises;
const logger = require("../utility/logger.js");
const courseService = require("../services/course.service.js");
const { stripHeadSocialDefaults, isObjectIdString } = require("../utils/blogSeoHtml.js");
const { buildCourseMeta, buildInjectedHeadFragment } = require("../utils/courseSeoHtml.js");
const {
  decodePathSegment,
  rootSlugFromPathname,
  isCourseBotHtmlPath,
} = require("../utils/courseSlugSeoPaths.js");

async function renderCourseHtml({ metaPath, indexPath, course, res, next }) {
  try {
    let html = await fs.readFile(indexPath, "utf8");
    html = stripHeadSocialDefaults(html);

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
    res.status(200).type("html").send(html);
  } catch (err) {
    logger.error(`spaBotCourse.middleware << ${err.message}`);
    next(err);
  }
}

async function resolveCourseForMeta(pathname) {
  const p = String(pathname || "");

  if (p.startsWith("/integrated-mentorship-")) {
    const slug = p.replace(/^\//, "").split("/")[0];
    return await courseService.findCourseBySlug(slug, { activeOnly: true });
  }

  const prog = p.match(/^\/program\/([^/]+)\/?$/);
  if (prog) {
    const slug = decodePathSegment(prog[1]);
    if (!slug) return null;
    return await courseService.findCourseBySlug(slug, { activeOnly: true });
  }

  const byId = p.match(/^\/courses\/([^/]+)(?:\/[^/]+)?\/?$/);
  if (byId) {
    const id = decodePathSegment(byId[1]);
    if (!id || !isObjectIdString(id)) return null;
    const course = await courseService.findCourseById(id);
    if (!course || course.isActive === false) return null;
    return course;
  }

  const rootSlug = rootSlugFromPathname(p);
  if (rootSlug) {
    return await courseService.findCourseBySlug(rootSlug, { activeOnly: true });
  }

  return null;
}

function createCourseHtmlRouteHandler(distPathAbs) {
  const indexPath = path.join(distPathAbs, "index.html");
  return async function courseHtmlRouteHandler(req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const metaPath = req.path;
    const course = await resolveCourseForMeta(metaPath);
    if (!course) return next();
    return renderCourseHtml({ metaPath, indexPath, course, res, next });
  };
}

function createCourseBotHtmlMiddleware(distPathAbs) {
  const indexPath = path.join(distPathAbs, "index.html");
  return async function courseBotHtml(req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next();

    const ua = String(req.headers["user-agent"] || "");
    const isBot = /facebookexternalhit|facebot|whatsapp|linkedinbot|twitterbot|slackbot|discordbot|telegrambot|pinterest|googlebot|bingbot/i.test(
      ua
    );
    if (!isBot) return next();

    const p = req.path;
    if (!isCourseBotHtmlPath(p)) return next();

    const course = await resolveCourseForMeta(p);
    if (!course) return next();

    return renderCourseHtml({ metaPath: p, indexPath, course, res, next });
  };
}

module.exports = {
  createCourseHtmlRouteHandler,
  createCourseBotHtmlMiddleware,
  resolveCourseForMeta,
};
