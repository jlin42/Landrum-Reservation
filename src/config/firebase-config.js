// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrCtKUP6yTayRLWtmgb-gVOrWKrZe8YzE",
  authDomain: "landrum-reservation.firebaseapp.com",
  projectId: "landrum-reservation",
  storageBucket: "landrum-reservation.appspot.com",
  messagingSenderId: "766619689293",
  appId: "1:766619689293:web:609393738bc2b0fc941704",
  measurementId: "G-NQKHN0W3C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;