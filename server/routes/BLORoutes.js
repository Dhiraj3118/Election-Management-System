const express = require("express");
const { getVotersList, verifyVoter } = require("../controllers/BLO");
const router = express.Router();

router.get("/get-voters", getVotersList);

router.put("verify-voter", verifyVoter);

module.exports = router;
