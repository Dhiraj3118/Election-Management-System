const { addDoc } = require("firebase/firestore");
const { db } = require("../firebase");

exports.createElection = async (req, res) => {
    try {
      const docRef = await addDoc(collection(db, "Elections"), {
        ...req.body,
        declared: false,
        vote_count: 0
      });

      res.status(201).json({
        success: true,
        msg: "election created successfully",
        data: {
          id: docRef.id,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        error,
        msg: "Error in saving data",
      });
    }
};
exports.assignRoles = async (req, res) => {};
exports.getStats = async (req, res) => {};
exports.declareResults = async (req, res) => {};
exports.addArea = async (req, res) => {};
