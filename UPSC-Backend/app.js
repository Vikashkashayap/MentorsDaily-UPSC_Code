const express = require("express");
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

dotenv.config();

connectDB();

const app = express();

app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

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


app.get("/", (req, res) => {
  res.send("Welcome to UPSC backend...");
});

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




