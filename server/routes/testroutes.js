const express = require("express");
const router = express.Router();
const { auth } = require("../firebase");
const { createUserWithEmailAndPassword } = require("firebase/auth");

router.post("/", (req, res) => {
  const { email, password } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      res.status(200).json({ msg: "Success", credentials });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ msg: "Error", error });
    });
});

module.exports = router;
