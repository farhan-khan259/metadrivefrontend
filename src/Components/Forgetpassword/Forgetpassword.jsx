import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Pictures/Solarxlogo.jpeg";
import "./Forgetpassword.css";

export default function Forgetpassword() {
  const [step, setStep] = useState(1); // Step 1: request OTP, Step 2: reset password
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // Step 1: Request OTP
  const handleRequestOTP = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setPopupTitle("Email Required");
      setPopupMessage("Please enter your email to receive OTP.");
      setShowPopup(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://be.solarx0.com/api/forgetpassword",
        { email: trimmedEmail },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("OTP sent:", res.data);
      setStep(2);
      setPopupTitle("OTP Sent");
      setPopupMessage(res.data.message || "OTP has been sent to your email.");
      setShowPopup(true);
    } catch (err) {
      setPopupTitle("Request Failed");
      setPopupMessage(err.response?.data?.message || "Something went wrong.");
      setShowPopup(true);
    }
    setLoading(false);
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedCode = resetCode.trim();

    if (!trimmedEmail || !trimmedCode || !password || !confirmPassword) {
      setPopupTitle("Missing Fields");
      setPopupMessage("All fields are required.");
      setShowPopup(true);
      return;
    }

    if (trimmedCode.length !== 5) {
      setPopupTitle("Invalid OTP");
      setPopupMessage("OTP must be 5 digits.");
      setShowPopup(true);
      return;
    }

    if (password !== confirmPassword) {
      setPopupTitle("Passwords do not match");
      setPopupMessage("Please make sure both passwords are the same.");
      setShowPopup(true);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://be.solarx0.com/api/resetpassword",
        {
          email: trimmedEmail,
          resetcode: trimmedCode,
          password,
          confirmpassword: confirmPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(res.data);
      setPopupTitle("Success");
      setPopupMessage("Password has been reset successfully!");
      setShowPopup(true);

      setTimeout(() => {
        navigate("/"); // redirect to login page
      }, 1500);
    } catch (err) {
      setPopupTitle("Reset Failed");
      setPopupMessage(err.response?.data?.message || "Something went wrong.");
      setShowPopup(true);
    }
    setLoading(false);
  };

  return (
    <div className="login-page4">
      <div className="login-box4">
        <img src={logo} alt="Solar X" className="bot-icon4" />
        <h2 className="title4">RESET LOGIN PASSWORD</h2>

        {step === 1 && (
          <>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input4"
            />
            <button
              type="button"
              className="login-btn4"
              onClick={handleRequestOTP}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input4"
            />

            <label>OTP (5 digits)</label>
            <input
              type="text"
              maxLength={5}
              placeholder="Enter OTP"
              value={resetCode}
              onChange={(e) =>
                setResetCode(e.target.value.replace(/[^0-9]/g, ""))
              }
              required
              className="input4"
            />

            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input4"
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input4"
            />

            <button type="submit" className="login-btn4" disabled={loading}>
              {loading ? "Resetting..." : "Confirm"}
            </button>
          </form>
        )}

        <p className="footer-text4">
          Remembered your password? <Link to="/">Sign In</Link>
        </p>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="deposit-success-overlay">
          <div className="deposit-success-box">
            <h2>{popupTitle}</h2>
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
