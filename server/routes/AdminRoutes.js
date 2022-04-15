const express = require("express");
const {
  createElection,
  assignRoles,
  getStats,
  declareResults,
  addArea,
} = require("../controllers/Admin");
const { isAdmin } = require("../middlewares/Auth");
const { checkBody } = require("../middlewares/General");
const router = express.Router();

router.post("/create-election", isAdmin, checkBody, createElection);

router.put("/assign-role", isAdmin, checkBody, assignRoles);

router.get("/get-stats", isAdmin, getStats);

router.put("/declare-results", isAdmin, checkBody, declareResults);

router.post("/add-area", isAdmin, checkBody, addArea);

module.exports = router;
