const {
  getDocs,
  collection,
  where,
  query,
  addDoc,
  updateDoc,
  doc,
  increment,
  getDoc,
} = require("firebase/firestore");
const { db } = require("../firebase");
const { get } = require("../routes/AdminRoutes");

exports.getElectionList = async (req, res) => {
  try {
    const q = query(
      collection(db, "Elections"),
      where("state", "==", req.params.state)
    );
    const docSnap = await getDocs(q);

    const data = [];

    docSnap.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json({
      success: true,
      msg: "Elections list fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error,
      msg: "Error in fetching list",
    });
  }
};
exports.getElectionCandidates = async (req, res) => {
  try {
    const q = query(
      collection(db, "Candidates"),
      where("name", "==", req.query.electionId)
    );
    const docSnap = await getDocs(q);

    const data = [];

    docSnap.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json({
      success: true,
      msg: "Candidates list fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error,
      msg: "Error in fetching list",
    });
  }
};
exports.castVote = async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "Votes"), {
      ...req.body,
      voterId: req.params.id,
    });

    await updateDoc(doc(db, "Elections", req.body.election_id), {
      vote_count: increment(1),
    });

    return res.status(201).json({
      success: true,
      msg: "vote casted successfully",
      data: {
        id: docRef.id,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error,
      msg: "Error in fetching list",
    });
  }
};
exports.getResultsForUser = async (req, res) => {
  const { electionId } = req.body;

  try {
    const elecDoc = await getDoc(doc(db, "Elections", electionId));

    if (elecDoc.data().declared) {
      const docSnap = await getDocs(
        collection(db, "Votes"),
        where("electionId", "==", electionId)
      );

      const votes = [];

      docSnap.forEach((doc) => {
        votes.push({ id: doc.id, ...doc.data() });
      });

      const voteCount = votes.reduce(async (acc, value) => {
        const id = value.candidateId;
        if (value in acc) {
          acc[id].vote++;
        } else {
          const candDoc = await getDoc(doc(db, "Candidates", id));
          acc[id] = { vote: 1, name: candDoc.data().name };
        }
      }, {});

      data = { electionId, voteCount };

      return res.status(200).json({
        success: true,
        msg: "Stats fetched successfully",
        data,
      });
    }

    return res.status(401).json({
      success: false,
      msg: "Results not declared still",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error,
      msg: "Error in fetching data",
    });
  }
};
