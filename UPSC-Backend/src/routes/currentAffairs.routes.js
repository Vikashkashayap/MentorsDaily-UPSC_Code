const express = require("express");
const router = express.Router();
const currentAffairsController = require("../controllers/currentAffairs.controller.js");
const { auth, verifyTokenAndAdmin } = require("../middlewares/auth.middleware.js");

router.post("/create-affair",verifyTokenAndAdmin, currentAffairsController.createAffair);

router.get("/get-affairs", currentAffairsController.listAffairs);

router.get("/affair/:id",verifyTokenAndAdmin, currentAffairsController.findAffairById);

router.put("/update-affair/:id",verifyTokenAndAdmin, currentAffairsController.updateAffair);

router.delete("/delete-affair/:id",verifyTokenAndAdmin, currentAffairsController.deleteAffair);

module.exports = router;