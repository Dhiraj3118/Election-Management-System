const express = require("express");
const {
  applyCandidature,
  getCandidateData,
  updateCandidature,
  uploadCandidature,
} = require("../controllers/Candidate");
const { isVerified } = require("../middlewares/Auth");
const router = express.Router();
const { checkBody } = require("../middlewares/General");

router.post("/upload-candidature", uploadCandidature);

router.post("/apply", checkBody, isVerified, applyCandidature);

router.get("/getData", getCandidateData);

router.put("/update", updateCandidature);

module.exports = router;
