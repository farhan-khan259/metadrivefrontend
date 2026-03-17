import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./Signup.css";

export default function Signup() {
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const ref = params.get("ref");
    if (ref) setInviteCode(ref);
  }, [params]);

  const validate = () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !phone.trim()) {
      return "Please fill all required fields.";
    }
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!acceptTerms) return "Please accept terms and conditions to continue.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setPopupTitle("Signup Failed");
      setPopupMessage(validationError);
      setShowPopup(true);
      return;
    }

    setLoading(true);
    try {
      const baseUrl = process.env.REACT_APP_API_URL || "https://be.sparkx1.pro";
      const payload = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        refercode: inviteCode.trim(),
        whatsappNumber: phone.trim(),
        phone: phone.trim(),
        termsAccepted: acceptTerms,
      };

      const res = await axios.post(`${baseUrl}/api/signup`, payload);

      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      setPopupTitle("Account Created");
      setPopupMessage("Your account has been created successfully.");
      setShowPopup(true);

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      setPopupTitle("Signup Failed");
      setPopupMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
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

      <div className="auth-card signup-card">
        <h1>Create an Account</h1>
        <p className="auth-subtitle">Join the future of AI investing</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="john123@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Invite Code</label>
          <input
            type="text"
            placeholder="MONEYMAKER6159"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
          />

          <label>Phone</label>
          <input
            type="text"
            placeholder="+1 123 456 7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="auth-checkbox-row">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <span>I accept the terms and conditions</span>
          </label>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <p className="auth-bottom-text">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
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