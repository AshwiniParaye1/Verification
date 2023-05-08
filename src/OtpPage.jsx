import React, { useState } from "react";
import "./styles/OTP.css";
import { useLocation } from "react-router-dom";
import img from "./assets/img2.png";
import toast, { Toaster } from "react-hot-toast";

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const location = useLocation();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    const key = event.key;

    // Move focus to the previous input on backspace key press
    if (key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      if (event.target.previousSibling) {
        event.target.previousSibling.focus();
      }
    }

    // Move focus to the previous or next input on arrow key press
    if (key === "ArrowLeft" && index > 0) {
      event.target.previousSibling.focus();
    } else if (key === "ArrowRight" && index < 5) {
      event.target.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const otpChars = pastedData
      .slice(0, 6)
      .split("")
      .filter((char) => /[0-9]/.test(char)); // Only keep numeric characters
    otpChars.forEach((char, index) => {
      if (index < otp.length) {
        setOtp((prevValues) => {
          const newValues = [...prevValues];
          newValues[index] = char;
          return newValues;
        });
        if (index < otpChars.length - 1) {
          e.target.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Enter" })
          );
        }
      }
    });
  };

  console.log("location ==", location);
  return (
    <>
      <div className="row">
        <div className="wrapper">
          <img className="imgc" src={img} alt="" />
          <h2>Verify your identity</h2>
          <p>
            OTP has been sent to mobile number
            <span> {location.state} </span>
          </p>
          <div className="otp-input">
            {otp.map((data, index) => {
              return (
                <input
                  className="otp-field"
                  type="password"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  onFocus={(e) => e.target.select()}
                />
              );
            })}
          </div>
          <div className="btn-wrapper">
            <p>
              <button
                className="btn btn-secondary mr-2"
                onClick={(e) => setOtp([...otp.map((v) => "")])}
              >
                Clear
              </button>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  if (otp.includes("")) {
                    toast.error("Please enter all OTP digits!");
                  } else {
                    toast.success(
                      "Your Mobile Number has been successfully verified!"
                    );
                  }
                }}
              >
                Verify OTP
              </button>
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default OtpPage;
