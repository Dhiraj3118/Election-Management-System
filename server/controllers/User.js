const { async } = require("@firebase/util");
const {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} = require("firebase/firestore");
const { db } = require("../firebase");

exports.registerVoter = async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "Voters"), {
      ...req.body,
      role: 0,
      verified: false,
    });

    return res.status(201).json({
      success: true,
      msg: "user created successfully",
      data: {
        id: docRef.id,
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const votersRef = collection(db, "Voters");

    const loginQuery = query(votersRef, where("email", "==", email));

    const querySnapshot = await getDocs(loginQuery);

    if (!querySnapshot.empty) {
      let data = {};

      querySnapshot.forEach((doc) => {
        data = { id: doc.id, ...doc.data() };
      });

      const docSnap = await getDoc(doc(db, "Candidates", data.id));

      if (docSnap.exists()) {
        data.role = 1;
      }

      if (data.password == password) {
        return res.status(200).json({
          success: true,
          msg: "login successfull",
          data: data,
        });
      } else {
        return res.status(400).json({
          success: false,
          msg: "Wrong Email and Password combination",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        msg: "User does not exists!",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error,
      msg: "Server error in user login",
    });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.body.userId;
  let user = { ...req.body };
  delete user.userId;
  try {
    await updateDoc(doc(db, "Voters", id), {
      ...user,
    });

    return res.status(200).json({
      success: true,
      msg: "Details updated successfully",
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

exports.getStates = async (req, res) => {
  try {
    const querySnap = await getDocs(collection(db, "Areas"));

    const areas = [];

    querySnap.forEach((doc) => {
      areas.push(doc.data());
    });

    return res.status(200).json({
      success: true,
      data: areas,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error in fetching states",
      error,
    });
  }
};
