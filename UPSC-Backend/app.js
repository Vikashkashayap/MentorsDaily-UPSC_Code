const express = require("express");
const path = require("path");
const compression = require("compression");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
const userRoutes = require("./src/routes/user.routes.js");
const courseRoute = require("./src/routes/course.routes.js");
const currentAffairsRoutes = require('./src/routes/currentAffairs.routes');
const paymentRoutes = require("./src/routes/payment.routes.js");
const coursePurchaseRoutes = require("./src/routes/coursePurchase.routes.js");
const emiRoutes = require("./src/routes/emi.routes.js");
const fileUploadRoutes = require("./src/routes/uploadFiles.routes.js");
const freeResourceRoutes = require("./src/routes/freeResource.routes.js");
const cors = require("cors");
const cron = require('node-cron');
const axios = require('axios');
const preparationBlogRoutes = require('./src/routes/preparationBlog.routes.js')
const previousYearPaperRoutes = require('./src/routes/previousYearPaper.routes.js')
const { getPreparationBlogsSitemapXml } = require('./src/controllers/preparationBlog.controller.js')

dotenv.config();

connectDB();

const app = express();

app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) return false;
      return compression.filter(req, res);
    },
  })
);

const { publicGetCache } = require("./src/middleware/publicGetCache.middleware.js");
app.use(publicGetCache);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.set("etag", "strong");

// Add short-lived cache headers for high-traffic, mostly-read endpoints.
app.use((req, res, next) => {
  if (req.method !== "GET") return next();
  if (
    req.path.includes("/api/v1/get-course") ||
    req.path.includes("/api/v1/course/slug/") ||
    req.path.includes("/api/v1/get-affairs") ||
    req.path.includes("/api/v1/preparation/get-blog")
  ) {
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.set("Vary", "Accept-Encoding");
  }
  next();
});

try {
  const prerender = require("./src/config/prerender.middleware.js");
  app.use(prerender);
} catch (e) {
  console.warn("prerender-node failed to load.", e.message);
}

app.get("/sitemap-preparation-blogs.xml", getPreparationBlogsSitemapXml);

app.use("/api/v1", userRoutes);
app.use("/api/v1", courseRoute);
app.use('/api/v1', currentAffairsRoutes);
app.use('/api/v1', paymentRoutes);
app.use('/api/v1', coursePurchaseRoutes);
app.use('/api/v1', emiRoutes);
app.use('/api/v1', fileUploadRoutes);
app.use('/api/v1', freeResourceRoutes);
app.use('/api/v1', preparationBlogRoutes);
app.use('/api/v1', previousYearPaperRoutes)

const FRONTEND_DIST = process.env.FRONTEND_DIST;

if (!FRONTEND_DIST) {
  app.get("/", (req, res) => {
    res.send("Welcome to UPSC backend...");
  });
}

if (FRONTEND_DIST) {
  const distResolved = path.resolve(FRONTEND_DIST);
  const {
    createPrepBlogBotHtmlMiddleware,
    createPreparationBlogHtmlRouteHandler,
  } = require("./src/middleware/spaBotPrepBlog.middleware.js");
  const prepBlogBotHtml = createPrepBlogBotHtmlMiddleware(distResolved);
  const preparationBlogHtmlRoute = createPreparationBlogHtmlRouteHandler(
    distResolved,
    "/preparation-blog"
  );
  const legacyBlogHtmlRoute = createPreparationBlogHtmlRouteHandler(distResolved, "/blog");

  // Explicit SSR-like entry route for social crawlers and first-page hits.
  app.get("/preparation-blog/:slug", preparationBlogHtmlRoute);
  app.get("/blog/:slug", legacyBlogHtmlRoute);

  app.use(
    express.static(distResolved, {
      index: false,
      fallthrough: true,
      maxAge: "30d",
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
          return;
        }
        if (/\.(js|css|png|jpg|jpeg|svg|gif|webp|woff2?)$/i.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    })
  );
  app.use(prepBlogBotHtml);
  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distResolved, "index.html"), (err) => {
      if (err) next(err);
    });
  });
}

// cron.schedule('*/14 * * * *', async () => {
//     const urlsToPing = [
//         'https://www.mentorsdaily.com/currentAffairs',
//         'https://api.mentorsdaily.com/api/v1/get-course',
//         'https://www.mentorsdaily.com/MentorshipCourses'
//     ];

//     console.log(`[${new Date().toLocaleString()}] Pinging services...`);
//     try {
//         const requests = urlsToPing.map(url => axios.get(url));
//         const responses = await Promise.all(requests);

//         responses.forEach((response, index) => {
//             console.log(`Ping successful for ${urlsToPing[index]}! Status: ${response.status}`);
//         });

//     } catch (error) {
//         console.error(`Error during ping: ${error.message}`);
//     }
// });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




