// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDebcv-bRyxOPRO5EmB3pEgozOYUW3Gd9o",
  authDomain: "bistro-boss-b8b15.firebaseapp.com",
  projectId: "bistro-boss-b8b15",
  storageBucket: "bistro-boss-b8b15.appspot.com",
  messagingSenderId: "840466194880",
  appId: "1:840466194880:web:1271bfdd1ba3751e81e825"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app