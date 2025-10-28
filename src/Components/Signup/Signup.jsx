import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/Pictures/Solarxlogo.jpeg";
import "./Signup.css";

export default function Signup() {
  const params = new URLSearchParams(window.location.search);

  const [passwordVisible, setPasswordVisible] = useState(false);
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
  const [isFirstUser, setIsFirstUser] = useState(false); // ✅ ADDED: Track first user state

  // ✅ Autofill referral code from URL
  useEffect(() => {
    const ref = params.get("ref");
    if (ref) {
      setReferralCode(ref);
    }

    // ✅ ADDED: Check if this might be first user (no referral code in URL)
    if (!ref) {
      setIsFirstUser(true);
    }
  }, []);

  // ✅ FIXED: Validate form - referral code not required for first user
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

    // ✅ FIXED: Only require referral code if NOT first user
    if (!isFirstUser && !referralCode.trim()) {
      newErrors.referralCode = "Referral code is required for registration";
    }

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
        refercode: referralCode, // This can be empty string for first user
        password,
        email,
      });

      // ✅ Store user data and token
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token); // ✅ ADDED: Store token

      setShowSuccess(true);
      console.log("Signup Success:", res.data);

      // Show custom success message
      setPopupTitle("✅ Account Created Successfully!");
      setPopupMessage(res.data.message || "Welcome to SolarX!");
      setShowSuccess(true);

      // Clear form
      setReferralCode("");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setWhatsAppNumber("+92");
      setErrors({});

      // ✅ Redirect to dashboard after delay (since we have token)
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error);

      // ✅ IMPROVED: Better error handling
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again!";

      setPopupTitle("❌ Signup Failed");
      setPopupMessage(errorMessage);
      setShowPopup(true);

      // ✅ If error is about referral code, update first user state
      if (
        errorMessage.includes("first user") ||
        errorMessage.includes("First admin")
      ) {
        setIsFirstUser(true);
      }
    }
  };

  // ✅ ADDED: Handle referral code input change
  const handleReferralCodeChange = (e) => {
    const value = e.target.value;
    setReferralCode(value);

    // If user starts typing referral code, they're probably not first user
    if (value.trim() !== "") {
      setIsFirstUser(false);
    } else {
      setIsFirstUser(true);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="form-container">
        <div className="form-header">
          <img src={logo} alt="Solar X" className="logo" />
          <h2>Create Your Account</h2>

          {/* ✅ ADDED: First User Banner */}
          {isFirstUser && (
            <div className="first-user-banner">
              <div className="first-user-icon">👑</div>
              <div className="first-user-text">
                <strong>First User Detected!</strong>
                <p>
                  You're creating the first account. No referral code needed.
                </p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label>WhatsApp Number *</label>
          <input
            type="text"
            placeholder="+92XXXXXXXXXX"
            className="input4"
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
          {errors.whatsAppNumber && (
            <span className="error-text">{errors.whatsAppNumber}</span>
          )}

          <label>Full Name *</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {errors.fullName && (
            <span className="error-text">{errors.fullName}</span>
          )}

          <label>Email *</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <label>Password *</label>
          <div className="input-icon-box">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}

          <label>Confirm Password *</label>
          <div className="input-icon-box">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.confirmPassword && (
            <span className="error-text">{errors.confirmPassword}</span>
          )}

          <label>
            Referral Code {!isFirstUser && "*"}
            {isFirstUser && (
              <span className="optional-text">
                (Optional - Not required for first user)
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder={
              isFirstUser
                ? "Leave empty for first user"
                : "Enter referral code (required)"
            }
            value={referralCode}
            onChange={handleReferralCodeChange}
            required={!isFirstUser} // ✅ Only required if NOT first user
          />
          {errors.referralCode && (
            <span className="error-text">{errors.referralCode}</span>
          )}

          {/* ✅ ADDED: Help text */}
          <div className="help-text">
            {isFirstUser
              ? "As the first user, you'll become the system admin. Save your referral code to share with others!"
              : "You need a valid referral code from an existing member to join."}
          </div>

          <button type="submit" className="signup-button">
            {isFirstUser
              ? "Create Admin Account 🚀"
              : "Create Account & Start Earning"}
          </button>

          <p className="signin-link">
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </form>
      </div>

      {/* Error Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>{popupTitle}</h2>
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-box success-popup">
            <h2>🎉 Welcome to SolarX!</h2>
            <p>{popupMessage}</p>
            <p>
              <strong>
                Your Referral Code:{" "}
                {JSON.parse(localStorage.getItem("user"))?.randomCode}
              </strong>
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                window.location.href = "/dashboard";
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
