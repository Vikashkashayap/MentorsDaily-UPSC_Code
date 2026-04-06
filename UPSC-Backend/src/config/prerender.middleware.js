const prerender = require("prerender-node");

/**
 * prerender-node proxies bot traffic to a rendering service (default: Prerender.io).
 * Requires PRERENDER_TOKEN in production for https://service.prerender.io
 *
 * /api/* and /preparation-blog/* are blacklisted: API is not mounted through SPA, and
 * preparation blogs get fast, accurate OG tags from spaBotPrepBlog.middleware (DB-backed).
 */
if (process.env.PRERENDER_SERVICE_URL) {
  prerender.set("prerenderServiceUrl", process.env.PRERENDER_SERVICE_URL);
}
if (process.env.PRERENDER_TOKEN) {
  prerender.set("prerenderToken", process.env.PRERENDER_TOKEN);
}

prerender.blacklisted(["^/api", "^/preparation-blog/"]);

/** Bots already matched by prerender-node include WhatsApp, LinkedInBot, facebookexternalhit, Twitterbot, etc. */

function prerenderWithFallback(req, res, next) {
  prerender(req, res, (err) => {
    if (err) {
      console.warn("[prerender-node] Falling through to app:", err.message || String(err));
      return next();
    }
    next();
  });
}

module.exports = prerenderWithFallback;
