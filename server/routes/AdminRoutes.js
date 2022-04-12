const express = require("express");
const {
  createElection,
  assignRoles,
  getStats,
  declareResults,
  addArea,
} = require("../controllers/Admin");
const { checkBody } = require("../middlewares/General");
const router = express.Router();

router.post("create-election", checkBody, createElection);

router.put("assign-role", checkBody, assignRoles);

router.get("get-stats", getStats);

router.put("declare-results", checkBody, declareResults);

router.post("/add-area", checkBody, addArea);

module.exports = router;
