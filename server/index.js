const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { auth } = require("./firebase");
const { createUserWithEmailAndPassword } = require("firebase/auth");

const testroutes = require("./routes/testroutes");

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors({
//     origin: 'http://localhost:8080'
// }))
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", testroutes);

app.listen(port, () => {
  console.log("Server is running at port", port);
});
