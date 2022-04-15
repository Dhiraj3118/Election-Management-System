const express = require("express");
const {
  getElectionList,
  getElectionCandidates,
  castVote,
  getResultsForUser,
} = require("../controllers/Election");
const { isVerified } = require("../middlewares/Auth");
const { checkBody, getState } = require("../middlewares/General");
const router = express.Router();

router.get("/list", getState, getElectionList);

router.get("/election-candidates", getElectionCandidates);

router.post("/cast-vote", isVerified, checkBody, castVote);

router.get("/get-results", getResultsForUser);

module.exports = router;
