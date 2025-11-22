
import React, { useState } from "react";
import { motion } from "framer-motion";
import {useDispatch}from 'react-redux'

import {
  auth,
  googleProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../../Firebase.js";

import { signInWithPopup, signOut } from "firebase/auth";
import "./Login.css";
import { userapi } from "../../../Api";
import { useEffect } from "react";
import {setUserinfo} from '../../../Redux/UserFeature.js'
import { useNavigate } from "react-router-dom";



const Login = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userdata = result.user
      
console.log(result);


      setUser(result.user);

      const res = await userapi.post("/login",{
        name:userdata.displayName,
        uid:userdata.uid,
        photo:userdata.photoURL,
        email:userdata.email,
        
      })

        
        
   const userinfo = res.data

   dispatch(setUserinfo(userinfo))
   console.log("user saved in redux");
   
    
navigate("/")


    } catch (err) {
      console.error("Google login error:", err);
      alert(err.message);
    }
  };







  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved", response);
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired. Try again.");
          },
        },
        
      );
    }
  };

  const sendOTP = async () => {
    if (!phone.startsWith("+91")) {
      alert("Please include +91 before your number (e.g. +919999999999)");
      return;
    }

    
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      alert("OTP sent successfully.");
    } catch (err) {
      console.error("OTP send error:", err);
      alert(err.message);
    }
  };

  const verifyOTP = async () => {
    if (!confirmationResult) return;
    try {
      const result = await confirmationResult.confirm(otp);
      setUser(result.user);
      alert("Phone verified successfully.");
    } catch (err) {
      console.error("OTP verification error:", err);
      alert("Invalid OTP. Please try again.");
    }
  };

 const logout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div className="container">
      {user ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card"
        >
          <h2>Welcome, {user.displayName || user.phoneNumber}</h2>
          <button className="btn logout" onClick={logout}>
            Logout
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card"
        >
          <h2>Login</h2>
          <button className="btn google" onClick={handleGoogleLogin}>
            Login with Google
          </button>

          <div className="divider">or</div>

          <input
            type="text"
            placeholder="+91 98765XXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="btn otp" onClick={sendOTP}>
            Send OTP
          </button>

          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="btn verify" onClick={verifyOTP}>
                Verify OTP
              </button>
            </>
          )}

          {/* reCAPTCHA container */}
          <div id="recaptcha"></div>
        </motion.div>
      )}
    </div>
  );
};

export default Login;