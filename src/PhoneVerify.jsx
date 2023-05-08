import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Phone.css";
import img from "./assets/bg2.png";
import toast, { Toaster } from "react-hot-toast";

const PhoneVerify = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value.replace(/\D/g, ""));
  };

  const isPhoneNumberValid = /^\d{10}$/.test(phoneNumber);

  const handleVerifyClick = () => {
    if (isPhoneNumberValid) {
      setPhoneNumber("");
      navigate("/verify", { state: phoneNumber });
    } else {
      toast.error("Please enter a valid 10-digit phone number");
    }
  };

  // console.log("otp ===", phoneNumber);

  return (
    <>
      <div className="container">
        <img className="img" src={img} alt="" />
        <h1>OTP Verification</h1>
        <p>
          We will send you a one time password on this mobile number <br />{" "}
          <span>{phoneNumber}</span>
        </p>
        <label htmlFor="phone-number-input" className="label">
          Please enter your mobile number :{" "}
        </label>
        <br />
        <div className="input-wrap">
          <input
            type="tel"
            className="input"
            id="phone-number-input"
            name="phone-number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="+91-1234567890"
          />

          <button onClick={handleVerifyClick} style={{ width: "100px" }}>
            Get OTP
          </button>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default PhoneVerify;
