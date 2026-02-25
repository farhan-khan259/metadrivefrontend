// import axios from "axios";
// import { useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import "./Forgetpassword.css";

// export default function Forgetpassword() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [resetCode, setResetCode] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [popupTitle, setPopupTitle] = useState("");
//   const [popupMessage, setPopupMessage] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   const navigate = useNavigate();

//   // Request OTP
//   const handleRequestOTP = async () => {
//     if (!email.trim()) {
//       setPopupTitle("Email Required");
//       setPopupMessage("Please enter your email to receive OTP.");
//       setShowPopup(true);
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "https://be.metadrive01.xyz/api/forgetpassword",
//         {
//           email: email.trim().toLowerCase(),
//         }
//       );

//       setStep(2);
//       setPopupTitle("OTP Sent");
//       setPopupMessage(res.data.message || "OTP sent to your email.");
//       setShowPopup(true);
//     } catch (err) {
//       setPopupTitle("Request Failed");
//       setPopupMessage(err.response?.data?.message || "Something went wrong.");
//       setShowPopup(true);
//     }
//     setLoading(false);
//   };

//   // Reset Password
//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     if (!email || !resetCode || !password || !confirmPassword) {
//       setPopupTitle("Missing Fields");
//       setPopupMessage("Please fill all required fields.");
//       setShowPopup(true);
//       return;
//     }

//     if (resetCode.length !== 5) {
//       setPopupTitle("Invalid OTP");
//       setPopupMessage("OTP must be 5 digits.");
//       setShowPopup(true);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setPopupTitle("Passwords do not match");
//       setPopupMessage("Please make sure both passwords match.");
//       setShowPopup(true);
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post("https://be.metadrive01.xyz/api/resetpassword", {
//         email: email.trim().toLowerCase(),
//         resetcode: resetCode.trim(),
//         password,
//         confirmpassword: confirmPassword,
//       });

//       setPopupTitle("Success");
//       setPopupMessage("Password has been reset successfully!");
//       setShowPopup(true);

//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       setPopupTitle("Reset Failed");
//       setPopupMessage(err.response?.data?.message || "Something went wrong.");
//       setShowPopup(true);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="forget-container">
//       <div className="forget-card">
//         <div className="forget-header-section">
//           <div className="forget-header">
//             <h1 className="forget-title">Reset Password</h1>
//             <p className="forget-subtitle">
//               {step === 1
//                 ? "Enter your registered email to receive an OTP"
//                 : "Enter the OTP and set your new password"}
//             </p>
//           </div>
//         </div>

//         <div className="forget-content">
//           {step === 1 && (
//             <div className="forget-form">
//               <div className="form-group">
//                 <div className="input-container">
//                   <input
//                     type="email"
//                     placeholder="your@email.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="form-input"
//                   />
//                   <label className="input-label">Email Address</label>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleRequestOTP}
//                 disabled={loading}
//                 className={`forget-btn ${loading ? "loading" : ""}`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="btn-spinner"></div>
//                     Sending OTP...
//                   </>
//                 ) : (
//                   "Get OTP"
//                 )}
//               </button>
//             </div>
//           )}

//           {step === 2 && (
//             <form onSubmit={handleResetPassword} className="forget-form">
//               <div className="form-group">
//                 <div className="input-container">
//                   <input
//                     type="email"
//                     placeholder="your@email.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="form-input"
//                     disabled
//                   />
//                   <label className="input-label">Email Address</label>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <div className="input-container">
//                   <input
//                     type="text"
//                     maxLength={5}
//                     placeholder="Enter 5-digit OTP"
//                     value={resetCode}
//                     onChange={(e) =>
//                       setResetCode(e.target.value.replace(/[^0-9]/g, ""))
//                     }
//                     required
//                     className="form-input"
//                   />
//                   <label className="input-label">OTP Code</label>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <div className="input-container">
//                   <input
//                     type="password"
//                     placeholder="Enter new password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="form-input"
//                   />
//                   <label className="input-label">New Password</label>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <div className="input-container">
//                   <input
//                     type="password"
//                     placeholder="Confirm new password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                     className="form-input"
//                   />
//                   <label className="input-label">Confirm Password</label>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`forget-btn ${loading ? "loading" : ""}`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="btn-spinner"></div>
//                     Resetting Password...
//                   </>
//                 ) : (
//                   "Reset Password"
//                 )}
//               </button>
//             </form>
//           )}

//           <div className="login-redirect">
//             <p>Remember your password?</p>
//             <Link to="/" className="login-link">
//               Back to Login
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Popup */}
//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <div className="popup-icon">
//               {popupTitle === "Success" ? "✅" : "⚠️"}
//             </div>
//             <h3>{popupTitle}</h3>
//             <p>{popupMessage}</p>
//             <button onClick={() => setShowPopup(false)} className="popup-btn">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
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
  const [timeLeft, setTimeLeft] = useState(0); // Timer in seconds
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && step === 2) {
      setCanResend(true);
    }
  }, [timeLeft, step]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Request OTP
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
      // Remove the 'res' variable assignment
      await axios.post("https://be.metadrive01.xyz/api/forgetpassword", {
        email: email.trim().toLowerCase(),
      });

      setStep(2);
      setTimeLeft(60); // Start 1-minute timer
      setCanResend(false);
      setPopupTitle("OTP Sent");
      setPopupMessage("OTP sent to your email.");
      setShowPopup(true);
    } catch (err) {
      setPopupTitle("Request Failed");
      setPopupMessage(err.response?.data?.message || "Something went wrong.");
      setShowPopup(true);
    }
    setLoading(false);
  };

  // Reset Password
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
      // Remove the 'res' variable assignment
      await axios.post("https://be.metadrive01.xyz/api/resetpassword", {
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

  // Resend OTP
  // Resend OTP
  const handleResendOTP = async () => {
    if (!canResend) return;

    setLoading(true);
    try {
      // Remove the 'res' variable assignment
      await axios.post("https://be.metadrive01.xyz/api/forgetpassword", {
        email: email.trim().toLowerCase(),
      });

      setTimeLeft(60); // Reset to 1 minute
      setCanResend(false);
      setPopupTitle("OTP Resent");
      setPopupMessage("New OTP has been sent to your email.");
      setShowPopup(true);
    } catch (err) {
      setPopupTitle("Resend Failed");
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
                className="forget-btn"
              >
                {loading ? "Sending OTP..." : "Get OTP"}
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
                  {/* Timer Display */}
                  {timeLeft > 0 && (
                    <div className="otp-timer red-timer">
                      {formatTime(timeLeft)}
                    </div>
                  )}
                </div>
                {/* Resend OTP Link */}
                <div className="resend-otp-section">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={loading}
                      className="resend-otp-btn"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <span className="resend-text">
                      Didn't receive code? Resend in {formatTime(timeLeft)}
                    </span>
                  )}
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

              <button type="submit" disabled={loading} className="forget-btn">
                {loading ? "Resetting Password..." : "Reset Password"}
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
          <div
            className={`popup-box ${
              popupTitle === "Success" ? "success-popup" : "error-popup"
            }`}
          >
            <div className="popup-icon">
              {popupTitle === "Success" ? "🎉" : "⚠️"}
            </div>
            <h3>{popupTitle}</h3>
            <p>{popupMessage}</p>
            <div className="popup-note">
              {popupTitle === "Success"
                ? "⏳ Redirecting to login page..."
                : "Please check the details and try again"}
            </div>
            <button
              onClick={() => {
                if (popupTitle === "Success") {
                  setShowPopup(false);
                  navigate("/");
                } else {
                  setShowPopup(false);
                }
              }}
              className={`popup-btn ${
                popupTitle === "Success" ? "success-btn" : "error-btn"
              }`}
            >
              {popupTitle === "Success" ? "Continue to Login" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
