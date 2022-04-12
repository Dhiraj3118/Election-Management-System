const express = require("express");
const { getVotersList, verifyVoter } = require("../controllers/BLO");
const { isBLO } = require("../middlewares/Auth");
const { checkBody } = require("../middlewares/General");
const router = express.Router();

router.get("/get-voters", isBLO, getVotersList);

router.put("/verify-voter", checkBody, isBLO, verifyVoter);

module.exports = router;
