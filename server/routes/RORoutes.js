const express = require("express");
const { approveCandidate, getCandidatesList } = require("../controllers/RO");
const router = express.Router();

router.get("/candidates-list", getCandidatesList);

router.put("approve-candidate", approveCandidate);

module.exports = router;
