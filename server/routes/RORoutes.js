const express = require("express");
const { approveCandidate, getCandidatesList } = require("../controllers/RO");
const { isRO } = require("../middlewares/Auth");
const { checkBody } = require("../middlewares/General");
const router = express.Router();

router.get("/candidates-list", isRO, getCandidatesList);

router.put("/approve-candidate", isRO, checkBody, approveCandidate);

module.exports = router;
