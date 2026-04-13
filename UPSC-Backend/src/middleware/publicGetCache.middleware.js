/**
 * Short-lived in-memory cache for anonymous GET JSON responses.
 * Reduces Mongo repeat work on free-tier / high-traffic public reads.
 * Set API_CACHE_TTL_MS=0 to disable (default 45000).
 */
const DEFAULT_TTL_MS = 45_000;
const MAX_KEYS = 200;

function cacheEnabled() {
  const raw = process.env.API_CACHE_TTL_MS;
  if (raw === "0" || raw === "false") return false;
  return true;
}

function ttlMs() {
  const n = parseInt(process.env.API_CACHE_TTL_MS || String(DEFAULT_TTL_MS), 10);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_TTL_MS;
}

const store = new Map();
/** @type {string[]} */
const lru = [];

function touch(key) {
  const i = lru.indexOf(key);
  if (i >= 0) lru.splice(i, 1);
  lru.push(key);
  while (lru.length > MAX_KEYS) {
    const old = lru.shift();
    store.delete(old);
  }
}

function shouldCachePath(urlPath) {
  const p = urlPath.split("?")[0];
  if (!p.startsWith("/api/v1/")) return false;
  if (
    p === "/api/v1/get-course" ||
    p.startsWith("/api/v1/course/slug/") ||
    p.startsWith("/api/v1/get-affairs") ||
    p.startsWith("/api/v1/preparation/get-blog") ||
    p === "/api/v1/free-resourse/all" ||
    p.startsWith("/api/v1/free-resourse/all") ||
    p.startsWith("/api/v1/previousyear/get-all-papers")
  ) {
    return true;
  }
  return false;
}

function publicGetCache(req, res, next) {
  if (!cacheEnabled()) return next();
  if (req.method !== "GET") return next();
  if (req.headers.authorization) return next();

  const full = req.originalUrl || req.url || "";
  if (!shouldCachePath(full)) return next();

  const cacheKey = full;
  const hit = store.get(cacheKey);
  if (hit && hit.expiresAt > Date.now()) {
    res.set("X-Cache", "HIT");
    res.type("application/json");
    return res.status(200).send(hit.body);
  }

  const _json = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode === 200 && body !== undefined) {
      try {
        const bodyStr = JSON.stringify(body);
        store.set(cacheKey, { expiresAt: Date.now() + ttlMs(), body: bodyStr });
        touch(cacheKey);
      } catch (_) {
        /* ignore */
      }
    }
    res.set("X-Cache", "MISS");
    return _json(body);
  };

  next();
}

module.exports = { publicGetCache };
