const { getDoc, doc } = require("firebase/firestore");
const { db } = require("../firebase");

exports.isAuthenticated = async (req, res, next) => {
    next();
};
exports.isCandidate = async (req, res, next) => {
    next();
};
exports.isBLO = async (req, res, next) => {
    const id = req.headers.authorization.substr(7);
    const docSnap = await getDoc(doc(db, "Voters", id));
    if(docSnap.data().role != 2)
    {
        return res.status(403).json({
            success: false,
            msg: "Unauthorized"
        })
    }
    req.params.id = id;
    req.params.area = docSnap.data().area;
    next();
};
exports.isRO = async (req, res, next) => {
    const id = req.headers.authorization.substr(7);
    const docSnap = await getDoc(doc(db, "Voters", id));

    if(docSnap.data().role != 3)
    {
        return res.status(403).json({
            success: false,
            msg: "Unauthorized"
        })
    }
    req.params.id = id;
    req.params.area = docSnap.data().area;
    next();
};
exports.isAdmin = async (req, res, next) => {
    next();
};
