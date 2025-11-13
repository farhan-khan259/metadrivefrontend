// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   FaCode,
//   FaEnvelope,
//   FaEye,
//   FaEyeSlash,
//   FaLock,
//   FaPhoneAlt,
//   FaUser,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// // import logo from "../../Assets/Pictures/Solarxlogo.jpeg";
// import "./Signup.css";

// export default function Signup() {
//   const params = new URLSearchParams(window.location.search);

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [referralCode, setReferralCode] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [whatsAppNumber, setWhatsAppNumber] = useState("+92");
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupTitle, setPopupTitle] = useState("");
//   const [popupMessage, setPopupMessage] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const ref = params.get("ref");
//     if (ref) setReferralCode(ref);
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!email.trim()) newErrors.email = "Email is required";
//     if (!password) newErrors.password = "Password is required";
//     if (password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";
//     if (password !== confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match";
//     if (!whatsAppNumber || whatsAppNumber === "+92")
//       newErrors.whatsAppNumber = "WhatsApp number is required";
//     if (!referralCode.trim())
//       newErrors.referralCode = "Referral code is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       setPopupTitle("Form Validation Error");
//       setPopupMessage("Please fill all required fields correctly.");
//       setShowPopup(true);
//       return;
//     }

//     try {
//       const res = await axios.post("https://be.solarx0.com/api/signup", {
//         fullName,
//         whatsappNumber: whatsAppNumber,
//         refercode: referralCode,
//         password,
//         email,
//       });

//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setShowSuccess(true);

//       setReferralCode("");
//       setFullName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       setWhatsAppNumber("+92");
//       setErrors({});

//       setTimeout(() => {
//         window.location.href = "/";
//       }, 2000);
//     } catch (error) {
//       setPopupTitle("Signup Failed");
//       setPopupMessage(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again!"
//       );
//       setShowPopup(true);
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-container">
//         <div className="signup-header">
//           {/* <img src={logo} alt="Solar X" className="signup-logo" /> */}
//           <h2>
//             SOLAR <span>X</span>
//           </h2>
//           <p>Create Your Account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="signup-form">
//           <div className="input-group">
//             <FaPhoneAlt className="input-icon" />
//             <input
//               type="text"
//               placeholder="+92XXXXXXXXXX"
//               value={whatsAppNumber}
//               onChange={(e) => {
//                 let value = e.target.value;
//                 if (!value.startsWith("+92")) {
//                   value = "+92" + value.replace(/^(\+92)?/, "");
//                 }
//                 const onlyDigits = value
//                   .replace("+92", "")
//                   .replace(/[^0-9]/g, "")
//                   .slice(0, 10);
//                 setWhatsAppNumber("+92" + onlyDigits);
//               }}
//               required
//             />
//           </div>
//           {errors.whatsAppNumber && (
//             <span className="error-text">{errors.whatsAppNumber}</span>
//           )}

//           <div className="input-group">
//             <FaUser className="input-icon" />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//           </div>
//           {errors.fullName && (
//             <span className="error-text">{errors.fullName}</span>
//           )}

//           <div className="input-group">
//             <FaEnvelope className="input-icon" />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           {errors.email && <span className="error-text">{errors.email}</span>}

//           <div className="input-group">
//             <FaLock className="input-icon" />
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Password (min 6 characters)"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span
//               className="toggle-icon"
//               onClick={() => setPasswordVisible(!passwordVisible)}
//             >
//               {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           {errors.password && (
//             <span className="error-text">{errors.password}</span>
//           )}

//           <div className="input-group">
//             <FaLock className="input-icon" />
//             <input
//               type={confirmPasswordVisible ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//             <span
//               className="toggle-icon"
//               onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//             >
//               {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           {errors.confirmPassword && (
//             <span className="error-text">{errors.confirmPassword}</span>
//           )}

//           <div className="input-group">
//             <FaCode className="input-icon" />
//             <input
//               type="text"
//               placeholder="Referral Code"
//               value={referralCode}
//               onChange={(e) => setReferralCode(e.target.value)}
//               required
//             />
//           </div>
//           {errors.referralCode && (
//             <span className="error-text">{errors.referralCode}</span>
//           )}

//           <button type="submit" className="signup-btn">
//             Create Account & Start Earning
//           </button>

//           <p className="login-text">
//             Already have an account?{" "}
//             <Link to="/" className="login-link">
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h2>❌ {popupTitle}</h2>
//             <p>{popupMessage}</p>
//             <button onClick={() => setShowPopup(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       {showSuccess && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h2>✅ Account Created</h2>
//             <p>Your account has been created successfully!</p>
//             <button
//               onClick={() => {
//                 setShowSuccess(false);
//                 window.location.href = "/";
//               }}
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   FaCode,
//   FaEnvelope,
//   FaEye,
//   FaEyeSlash,
//   FaLock,
//   FaPhoneAlt,
//   FaUser,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./Signup.css";

// export default function Signup() {
//   const params = new URLSearchParams(window.location.search);

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [referralCode, setReferralCode] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [whatsAppNumber, setWhatsAppNumber] = useState("+92");
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupTitle, setPopupTitle] = useState("");
//   const [popupMessage, setPopupMessage] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const ref = params.get("ref");
//     if (ref) setReferralCode(ref);
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!email.trim()) newErrors.email = "Email is required";
//     if (!password) newErrors.password = "Password is required";
//     if (password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";
//     if (password !== confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match";
//     if (!whatsAppNumber || whatsAppNumber === "+92")
//       newErrors.whatsAppNumber = "WhatsApp number is required";
//     if (!referralCode.trim())
//       newErrors.referralCode = "Referral code is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       setPopupTitle("Form Validation Error");
//       setPopupMessage("Please fill all required fields correctly.");
//       setShowPopup(true);
//       return;
//     }

//     try {
//       const res = await axios.post("https://be.solarx0.com/api/signup", {
//         fullName,
//         whatsappNumber: whatsAppNumber,
//         refercode: referralCode,
//         password,
//         email,
//       });

//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setShowSuccess(true);

//       setReferralCode("");
//       setFullName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       setWhatsAppNumber("+92");
//       setErrors({});

//       setTimeout(() => {
//         window.location.href = "/";
//       }, 2000);
//     } catch (error) {
//       setPopupTitle("Signup Failed");
//       setPopupMessage(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again!"
//       );
//       setShowPopup(true);
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-container">
//         <div className="signup-header">

//           <h2>
//             META <span>DRIVE</span>
//           </h2>
//           <p>Create Your Account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="signup-form">
//           <div className="input-group">
//             <FaPhoneAlt className="input-icon" />
//             <input
//               type="text"
//               placeholder="+92XXXXXXXXXX"
//               value={whatsAppNumber}
//               onChange={(e) => {
//                 let value = e.target.value;
//                 if (!value.startsWith("+92")) {
//                   value = "+92" + value.replace(/^(\+92)?/, "");
//                 }
//                 const onlyDigits = value
//                   .replace("+92", "")
//                   .replace(/[^0-9]/g, "")
//                   .slice(0, 10);
//                 setWhatsAppNumber("+92" + onlyDigits);
//               }}
//               required
//             />
//           </div>
//           {errors.whatsAppNumber && (
//             <span className="error-text">{errors.whatsAppNumber}</span>
//           )}

//           <div className="input-group">
//             <FaUser className="input-icon" />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//           </div>
//           {errors.fullName && (
//             <span className="error-text">{errors.fullName}</span>
//           )}

//           <div className="input-group">
//             <FaEnvelope className="input-icon" />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           {errors.email && <span className="error-text">{errors.email}</span>}

//           <div className="input-group">
//             <FaLock className="input-icon" />
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Password (min 6 characters)"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span
//               className="toggle-icon"
//               onClick={() => setPasswordVisible(!passwordVisible)}
//             >
//               {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           {errors.password && (
//             <span className="error-text">{errors.password}</span>
//           )}

//           <div className="input-group">
//             <FaLock className="input-icon" />
//             <input
//               type={confirmPasswordVisible ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//             <span
//               className="toggle-icon"
//               onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//             >
//               {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           {errors.confirmPassword && (
//             <span className="error-text">{errors.confirmPassword}</span>
//           )}

//           <div className="input-group">
//             <FaCode className="input-icon" />
//             <input
//               type="text"
//               placeholder="Referral Code"
//               value={referralCode}
//               onChange={(e) => setReferralCode(e.target.value)}
//               required
//             />
//           </div>
//           {errors.referralCode && (
//             <span className="error-text">{errors.referralCode}</span>
//           )}

//           <button type="submit" className="signup-btn">
//             Create Account & Start Earning
//           </button>

//           <p className="login-text">
//             Already have an account?{" "}
//             <Link to="/" className="login-link">
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h2>❌ {popupTitle}</h2>
//             <p>{popupMessage}</p>
//             <button onClick={() => setShowPopup(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       {showSuccess && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h2>✅ Account Created</h2>
//             <p>Your account has been created successfully!</p>
//             <button
//               onClick={() => {
//                 setShowSuccess(false);
//                 window.location.href = "/";
//               }}
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const params = new URLSearchParams(window.location.search);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("+92");
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!whatsAppNumber || whatsAppNumber === "+92")
      newErrors.whatsAppNumber = "WhatsApp number is required";
    if (!referralCode.trim())
      newErrors.referralCode = "Referral code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setPopupTitle("Form Validation Error");
      setPopupMessage("Please fill all required fields correctly.");
      setShowPopup(true);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("https://be.solarx0.com/api/signup", {
        fullName,
        whatsappNumber: whatsAppNumber,
        refercode: referralCode,
        password,
        email,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setShowSuccess(true);

      setReferralCode("");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setWhatsAppNumber("+92");
      setErrors({});

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setPopupTitle("Signup Failed");
      setPopupMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again!"
      );
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header-section">
          <div className="signup-header">
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">
              Join us and start your investment journey
            </p>
          </div>
        </div>

        <div className="signup-content">
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="+92XXXXXXXXXX"
                  value={whatsAppNumber}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (!value.startsWith("+92")) {
                      value = "+92" + value.replace(/^(\+92)?/, "");
                    }
                    const onlyDigits = value
                      .replace("+92", "")
                      .replace(/[^0-9]/g, "")
                      .slice(0, 10);
                    setWhatsAppNumber("+92" + onlyDigits);
                  }}
                  required
                  className="form-input"
                />
                <label className="input-label">WhatsApp Number</label>
              </div>
              {errors.whatsAppNumber && (
                <span className="error-text">{errors.whatsAppNumber}</span>
              )}
            </div>

            <div className="form-group">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="form-input"
                />
                <label className="input-label">Full Name</label>
              </div>
              {errors.fullName && (
                <span className="error-text">{errors.fullName}</span>
              )}
            </div>

            <div className="form-group">
              <div className="input-container">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  requiredB
                  className="form-input"
                />
                <label className="input-label">Email Address</label>
              </div>
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <div className="input-container password-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
                <label className="input-label">Password</label>
                <span
                  className="toggle-password-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <div className="input-container password-container">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="form-input"
                />
                <label className="input-label">Confirm Password</label>
                <span
                  className="toggle-password-icon"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-group">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Referral Code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  required
                  className="form-input"
                />
                <label className="input-label">Referral Code</label>
              </div>
              {errors.referralCode && (
                <span className="error-text">{errors.referralCode}</span>
              )}
            </div>

            <button
              type="submit"
              className={`signup-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  Creating Account...
                </>
              ) : (
                "Create Account & Start Earning"
              )}
            </button>

            <div className="login-redirect">
              <p>Already have an account?</p>
              <Link to="/" className="login-link">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-icon">⚠️</div>
            <h3>{popupTitle}</h3>
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)} className="popup-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-box success-popup">
            <div className="popup-icon">✅</div>
            <h3>Account Created Successfully!</h3>
            <p>
              Your account has been created successfully! Redirecting to
              login...
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                window.location.href = "/";
              }}
              className="popup-btn success-btn"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
