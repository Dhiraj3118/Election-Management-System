const express = require("express");
const { registerVoter, login, updateUser } = require("../controllers/User");
const { checkBody } = require("../middlewares/General");
const router = express.Router();

router.post("/register", checkBody, registerVoter);

router.post("/login", checkBody, login);

router.put("/update", checkBody, updateUser);

module.exports = router;
