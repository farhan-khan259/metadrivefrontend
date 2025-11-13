import axios from "axios";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Forgetpassword.css";

export default function Forgetpassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // Request OTP
  const handleRequestOTP = async () => {
    if (!email.trim()) {
      setPopupTitle("Email Required");
      setPopupMessage("Please enter your email to receive OTP.");
      setShowPopup(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://be.solarx0.com/api/forgetpassword",
        {
          email: email.trim().toLowerCase(),
        }
      );

      setStep(2);
      setPopupTitle("OTP Sent");
      setPopupMessage(res.data.message || "OTP sent to your email.");
      setShowPopup(true);
    } catch (err) {
      setPopupTitle("Request Failed");
      setPopupMessage(err.response?.data?.message || "Something went wrong.");
      setShowPopup(true);
    }
    setLoading(false);
  };

  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !resetCode || !password || !confirmPassword) {
      setPopupTitle("Missing Fields");
      setPopupMessage("Please fill all required fields.");
      setShowPopup(true);
      return;
    }

    if (resetCode.length !== 5) {
      setPopupTitle("Invalid OTP");
      setPopupMessage("OTP must be 5 digits.");
      setShowPopup(true);
      return;
    }

    if (password !== confirmPassword) {
      setPopupTitle("Passwords do not match");
      setPopupMessage("Please make sure both passwords match.");
      setShowPopup(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://be.solarx0.com/api/resetpassword", {
        email: email.trim().toLowerCase(),
        resetcode: resetCode.trim(),
        password,
        confirmpassword: confirmPassword,
      });

      setPopupTitle("Success");
      setPopupMessage("Password has been reset successfully!");
      setShowPopup(true);

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setPopupTitle("Reset Failed");
      setPopupMessage(err.response?.data?.message || "Something went wrong.");
      setShowPopup(true);
    }
    setLoading(false);
  };

  return (
    <div className="forget-container">
      <div className="forget-card">
        <div className="forget-header-section">
          <div className="forget-header">
            <h1 className="forget-title">Reset Password</h1>
            <p className="forget-subtitle">
              {step === 1
                ? "Enter your registered email to receive an OTP"
                : "Enter the OTP and set your new password"}
            </p>
          </div>
        </div>

        <div className="forget-content">
          {step === 1 && (
            <div className="forget-form">
              <div className="form-group">
                <div className="input-container">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                  />
                  <label className="input-label">Email Address</label>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRequestOTP}
                disabled={loading}
                className={`forget-btn ${loading ? "loading" : ""}`}
              >
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Sending OTP...
                  </>
                ) : (
                  "Get OTP"
                )}
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="forget-form">
              <div className="form-group">
                <div className="input-container">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                    disabled
                  />
                  <label className="input-label">Email Address</label>
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="Enter 5-digit OTP"
                    value={resetCode}
                    onChange={(e) =>
                      setResetCode(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    required
                    className="form-input"
                  />
                  <label className="input-label">OTP Code</label>
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                  />
                  <label className="input-label">New Password</label>
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="form-input"
                  />
                  <label className="input-label">Confirm Password</label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`forget-btn ${loading ? "loading" : ""}`}
              >
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          <div className="login-redirect">
            <p>Remember your password?</p>
            <Link to="/" className="login-link">
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-icon">
              {popupTitle === "Success" ? "✅" : "⚠️"}
            </div>
            <h3>{popupTitle}</h3>
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)} className="popup-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
