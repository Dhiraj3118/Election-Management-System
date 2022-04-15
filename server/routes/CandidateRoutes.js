const express = require("express");
const {
  applyCandidature,
  getCandidateData,
  updateCandidature,
  uploadCandidature,
} = require("../controllers/Candidate");
const router = express.Router();

router.post("/upload-candidature", uploadCandidature);

router.post("/apply", applyCandidature);

router.get("/getData", getCandidateData);

router.put("/update", updateCandidature);

module.exports = router;
