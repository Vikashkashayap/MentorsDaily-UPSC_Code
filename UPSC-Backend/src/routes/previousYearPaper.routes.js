const express = require('express');
const router = express.Router();

const{createPreviousYearPaperController, getPreviousYearPaperController, deletePreviousYearPaperController, updatePreviousYearPaperController} = require("../controllers/previousYearPaper.controller");
const { verifyTokenAndAdmin } = require('../middlewares/auth.middleware');

router.post('/previousyear/add-new-paper',verifyTokenAndAdmin,createPreviousYearPaperController)
router.get('/previousyear/get-all-papers',getPreviousYearPaperController)
router.delete('/previousyear/:id/deletepapers',verifyTokenAndAdmin,deletePreviousYearPaperController)
router.put('/previousyear/:id/updatepapers',verifyTokenAndAdmin,updatePreviousYearPaperController)

module.exports = router;