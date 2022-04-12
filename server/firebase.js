const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB-RfPJFTQZjyom4cyxfukyc9KMQsxpCAE",
  authDomain: "election-management-syst-7ea81.firebaseapp.com",
  projectId: "election-management-syst-7ea81",
  storageBucket: "election-management-syst-7ea81.appspot.com",
  messagingSenderId: "50827039199",
  appId: "1:50827039199:web:6e5bf4adfa433e6f2eb46a",
  measurementId: "G-8D0MNTJ8T9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { auth, db };
