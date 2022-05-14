const { getDoc, doc } = require("firebase/firestore");
const { db } = require("../firebase");

exports.checkBody = (req, res, next) => {
  if (req.body && Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: "no data found",
      msg: "No data found",
    });
  }

  next();
};

exports.getState = async (req, res, next) => {
  const id = req.headers.authorization.substr(7);
  const docSnap = await getDoc(doc(db, "Voters", id));
  req.params.id = id;
  req.params.state = docSnap.data().state;
  next();
};
