const { getDoc, doc } = require("firebase/firestore");
const { db } = require("../firebase");

exports.isVerified = async (req, res, next) => {
  const id = req.headers.authorization.substr(7);

  const docSnap = await getDoc(doc(db, "Voters", id));

  if (!docSnap.data().verified) {
    return res.status(403).json({
      success: false,
      msg: "Unauthorized",
    });
  }
  req.params.id = id;
  req.params.area = docSnap.data().area;

  next();
};
exports.isAuthenticated = async (req, res, next) => {
  next();
};
exports.isCandidate = async (req, res, next) => {
  const id = req.headers.authorization.substr(7);
  const docSnap = await getDoc(doc(db, "Voters", id));

  if (docSnap.data().role != 1) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized",
    });
  }
  req.params.id = id;
  req.params.area = docSnap.data().area;
  next();
  next();
};
exports.isBLO = async (req, res, next) => {
  const id = req.headers.authorization.substr(7);
  const docSnap = await getDoc(doc(db, "Voters", id));
  if (docSnap.data().role != 2) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized",
    });
  }
  req.params.id = id;
  req.params.city = docSnap.data().city;
  next();
};
exports.isRO = async (req, res, next) => {
  const id = req.headers.authorization.substr(7);
  const docSnap = await getDoc(doc(db, "Voters", id));

  if (docSnap.data().role != 3) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized",
    });
  }
  req.params.id = id;
  req.params.city = docSnap.data().city;
  next();
};
exports.isAdmin = async (req, res, next) => {
  const id = req.headers.authorization.substr(7);
  const docSnap = await getDoc(doc(db, "Voters", id));
console.log(docSnap.data().role)
  if (docSnap.data().role != 4) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized",
    });
  }
  req.params.id = id;
  req.params.area = docSnap.data().area;
  next();
};
