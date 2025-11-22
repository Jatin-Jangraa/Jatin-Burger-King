





import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB14q78Tq9wwEcd-kBn_-tgSpyNxL2UJ_g",
  authDomain: "burger-king-79016.firebaseapp.com",
  projectId: "burger-king-79016",
  storageBucket: "burger-king-79016.firebasestorage.app",
  messagingSenderId: "233682437571",
  appId: "1:233682437571:web:fbaa5938f953fb670f2976"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
 const storage = getStorage(app)
export {app, storage , auth, googleProvider, RecaptchaVerifier, signInWithPhoneNumber };


