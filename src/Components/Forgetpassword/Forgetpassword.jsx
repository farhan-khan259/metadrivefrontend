import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./Forgetpassword.css";

export default function Forgetpassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_URL || "https://be.sparkx1.pro";

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setPopupTitle("Reset Failed");
      setPopupMessage("Please enter your email.");
      setShowPopup(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/forgetpassword`, {
        email: email.trim().toLowerCase(),
      });

      setPopupTitle("Reset Link Sent");
      setPopupMessage(res.data?.message || "OTP sent to your email.");
      setShowPopup(true);
      setStep(2);
    } catch (error) {
      setPopupTitle("Reset Failed");
      setPopupMessage(
        error.response?.data?.message || "Unable to send reset email. Try again."
      );
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!resetCode || !password || !confirmPassword) {
      setPopupTitle("Reset Failed");
      setPopupMessage("Please complete all fields.");
      setShowPopup(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/resetpassword`, {
        email: email.trim().toLowerCase(),
        resetcode: resetCode.trim(),
        password,
        confirmpassword: confirmPassword,
      });

      setPopupTitle("Password Updated");
      setPopupMessage(res.data?.message || "Password reset successfully.");
      setShowPopup(true);

      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      setPopupTitle("Reset Failed");
      setPopupMessage(
        error.response?.data?.message || "Could not reset password."
      );
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <span className="auth-brand-text">SPARK</span>
        <img src={logoImage} alt="SparkX logo" className="auth-brand-logo" />
      </div>

      <div className="auth-card reset-card">
        <h1>Reset Password</h1>
        <p className="auth-subtitle">Enter your email to reset your password</p>

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="auth-form">
            <label>Email</label>
            <input
              type="email"
              placeholder="john123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="auth-bottom-text">
              Remember your password? <Link to="/">Log In</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="auth-form">
            <label>OTP Code</label>
            <input
              type="text"
              placeholder="Enter 5-digit OTP"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value.replace(/[^0-9]/g, ""))}
              maxLength={5}
              required
            />

            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Resetting..." : "Confirm Reset"}
            </button>

            <p className="auth-bottom-text">
              Remember your password? <Link to="/">Log In</Link>
            </p>
          </form>
        )}
      </div>

      {showPopup && (
        <div className="auth-popup-overlay">
          <div className="auth-popup">
            <h3>{popupTitle}</h3>
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}