const express = require("express");
const {
  getElectionList,
  getElectionCandidates,
  castVote,
  getResults,
} = require("../controllers/Election");
const { checkBody, getState } = require("../middlewares/General");
const router = express.Router();

router.get("/list", getState, getElectionList);

router.get("/election-candidates", getElectionCandidates);

router.post("/cast-vote", checkBody, castVote);

router.get("/get-results", getResults);

module.exports = router;
