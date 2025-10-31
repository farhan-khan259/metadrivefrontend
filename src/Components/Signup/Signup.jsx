// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../Assets/Pictures/Solarxlogo.jpeg";
// import "./Signup.css";

// export default function Signup() {
//   const params = new URLSearchParams(window.location.search);

//   const [passwordVisible, setPasswordVisible] = useState(false);
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

//   // ✅ Autofill referral code from URL
//   useEffect(() => {
//     const ref = params.get("ref");
//     if (ref) {
//       setReferralCode(ref);
//     }
//   }, []);

//   // ✅ Validate form before submission
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
//       console.log("Signup Success:", res.data);

//       // Clear form
//       setReferralCode("");
//       setFullName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       setWhatsAppNumber("+92");
//       setErrors({});

//       // Redirect after delay
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 2000);
//     } catch (error) {
//       console.error(error);
//       setPopupTitle("Signup Failed");
//       setPopupMessage(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again!"
//       );
//       setShowPopup(true);
//     }
//   };

//   return (
//     <div className="signup-wrapper">
//       <div className="form-container">
//         <div className="form-header">
//           <img src={logo} alt="Solar X" className="logo" />
//         </div>

//         <form onSubmit={handleSubmit}>
//           <label>WhatsApp Number </label>
//           <input
//             type="text"
//             placeholder="+92XXXXXXXXXX"
//             className="input4"
//             value={whatsAppNumber}
//             onChange={(e) => {
//               let value = e.target.value;
//               if (!value.startsWith("+92")) {
//                 value = "+92" + value.replace(/^(\+92)?/, "");
//               }
//               const onlyDigits = value
//                 .replace("+92", "")
//                 .replace(/[^0-9]/g, "")
//                 .slice(0, 10);
//               setWhatsAppNumber("+92" + onlyDigits);
//             }}
//             required
//           />
//           {errors.whatsAppNumber && (
//             <span className="error-text">{errors.whatsAppNumber}</span>
//           )}

//           <label>Full Name </label>
//           <input
//             type="text"
//             placeholder="Enter your full name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             required
//           />
//           {errors.fullName && (
//             <span className="error-text">{errors.fullName}</span>
//           )}

//           <label>Email </label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           {errors.email && <span className="error-text">{errors.email}</span>}

//           <label>Password </label>
//           <div className="input-icon-box">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Enter your password (min 6 characters)"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span
//               className="eye-icon"
//               onClick={() => setPasswordVisible(!passwordVisible)}
//             >
//               {passwordVisible ? "🙈" : "👁️"}
//             </span>
//           </div>
//           {errors.password && (
//             <span className="error-text">{errors.password}</span>
//           )}

//           <label>Confirm Password </label>
//           <div className="input-icon-box">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//             <span
//               className="eye-icon"
//               onClick={() => setPasswordVisible(!passwordVisible)}
//             >
//               {passwordVisible ? "🙈" : "👁️"}
//             </span>
//           </div>
//           {errors.confirmPassword && (
//             <span className="error-text">{errors.confirmPassword}</span>
//           )}

//           <label>Referral Code </label>
//           <input
//             type="text"
//             placeholder="Enter referral code"
//             value={referralCode}
//             onChange={(e) => setReferralCode(e.target.value)}
//             required
//           />
//           {errors.referralCode && (
//             <span className="error-text">{errors.referralCode}</span>
//           )}

//           <button type="submit">Create Account & Start Earning</button>

//           <p className="signin-link">
//             Already have an account? <Link to="/">Sign In</Link>
//           </p>
//         </form>
//       </div>

//       {/* Error Popup */}
//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h2>❌ {popupTitle}</h2>
//             <p>{popupMessage}</p>
//             <button onClick={() => setShowPopup(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* Success Popup */}
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
import {
  FaCode,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
// import logo from "../../Assets/Pictures/Solarxlogo.jpeg";
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

    if (!validateForm()) {
      setPopupTitle("Form Validation Error");
      setPopupMessage("Please fill all required fields correctly.");
      setShowPopup(true);
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
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          {/* <img src={logo} alt="Solar X" className="signup-logo" /> */}
          <h2>
            SOLAR <span>X</span>
          </h2>
          <p>Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <FaPhoneAlt className="input-icon" />
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
            />
          </div>
          {errors.whatsAppNumber && (
            <span className="error-text">{errors.whatsAppNumber}</span>
          )}

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          {errors.fullName && (
            <span className="error-text">{errors.fullName}</span>
          )}

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {errors.email && <span className="error-text">{errors.email}</span>}

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="toggle-icon"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <span className="error-text">{errors.confirmPassword}</span>
          )}

          <div className="input-group">
            <FaCode className="input-icon" />
            <input
              type="text"
              placeholder="Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              required
            />
          </div>
          {errors.referralCode && (
            <span className="error-text">{errors.referralCode}</span>
          )}

          <button type="submit" className="signup-btn">
            Create Account & Start Earning
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/" className="login-link">
              Sign In
            </Link>
          </p>
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>❌ {popupTitle}</h2>
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>✅ Account Created</h2>
            <p>Your account has been created successfully!</p>
            <button
              onClick={() => {
                setShowSuccess(false);
                window.location.href = "/";
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
