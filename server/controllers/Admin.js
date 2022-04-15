const { addDoc, updateDoc, doc, collection } = require("firebase/firestore");
const { db } = require("../firebase");

exports.createElection = async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "Elections"), {
      ...req.body,
      declared: false,
      vote_count: 0,
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
exports.assignRoles = async (req, res) => {
  const { userId, role } = req.body;
  try {
    if ([1, 2, 3].includes(role)) {
      await updateDoc(doc(db, "Voters", userId), {
        role: role,
      });

      return res.status(200).json({
        success: true,
        msg: "Role assigned successfully",
      });
    }
    return res.status(400).json({
      success: false,
      msg: "No such role exists",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error,
      msg: "Server error",
    });
  }
};
exports.getStats = async (req, res) => {};
exports.declareResults = async (req, res) => {
  const { electionId } = req.body;
  try {
    await updateDoc(doc(db, "Elections", electionId), {
      declared: true,
    });

    return res.status(200).json({
      success: true,
      msg: "Results declared successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error,
      msg: "Server error",
    });
  }
};
exports.addArea = async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "Area"), {
      ...req.body,
    });

    res.status(201).json({
      success: true,
      msg: "area added successfully",
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
