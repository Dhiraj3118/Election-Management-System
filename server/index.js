const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const UserRoutes = require("./routes/UserRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const BLORoutes = require("./routes/BLORoutes");
const RORoutes = require("./routes/RORoutes");
const CandidateRoutes = require("./routes/CandidateRoutes");
const ElectionRoutes = require("./routes/ElectionRoutes");

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors({
//     origin: 'http://localhost:8080'
// }))
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", UserRoutes);
app.use("/admin", AdminRoutes);
app.use("/ro", RORoutes);
app.use("/blo", BLORoutes);
app.use("/candidate", CandidateRoutes);
app.use("/election", ElectionRoutes);

app.listen(port, () => {
  console.log("Server is running at port", port);
});
