const express = require("express");
const {
  registerVoter,
  login,
  updateUser,
  getStates,
} = require("../controllers/User");
const { checkBody } = require("../middlewares/General");
const router = express.Router();

router.post("/register", checkBody, registerVoter);

router.post("/login", checkBody, login);

router.put("/update", checkBody, updateUser);

router.get("/get-states", getStates);

module.exports = router;
