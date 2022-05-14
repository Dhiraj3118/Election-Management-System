const {
  addDoc,
  collection,
  updateDoc,
  doc,
  setDoc,
  increment,
} = require("firebase/firestore");
const { db } = require("../firebase");

exports.uploadCandidature = async (req, res) => {};

exports.applyCandidature = async (req, res) => {
  try {
    const docRef = await setDoc(doc(db, "Candidates", req.params.id), {
      ...req.body,
      userId: req.params.id,
      approved: false,
      applyDate: Date.now(),
    });

    await updateDoc(doc(db, "Elections", req.body.electionId), {
      candidateCount: increment(1),
    });

    return res.status(201).json({
      success: true,
      msg: "candidate created successfully",
      data: {
        id: req.params.id,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error,
      msg: "Error in saving data",
    });
  }
};
exports.getCandidateData = async (req, res) => {};
exports.updateCandidature = async (req, res) => {};
