const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyB-RfPJFTQZjyom4cyxfukyc9KMQsxpCAE",
  authDomain: "election-management-syst-7ea81.firebaseapp.com",
  projectId: "election-management-syst-7ea81",
  storageBucket: "election-management-syst-7ea81.appspot.com",
  messagingSenderId: "50827039199",
  appId: "1:50827039199:web:6e5bf4adfa433e6f2eb46a",
  measurementId: "G-8D0MNTJ8T9",
};

const fb = initializeApp(firebaseConfig);
const auth = getAuth(fb);

module.exports = { auth };
