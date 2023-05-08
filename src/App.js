import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhoneVerify from "./PhoneVerify";
import OtpPage from "./OtpPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<PhoneVerify />} />
          <Route exact path="/verify" element={<OtpPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
