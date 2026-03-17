import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./Signin.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || "https://be.sparkx1.pro"}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok || !data.user) {
        setPopupMessage(data.message || "Invalid email or password.");
        setShowPopup(true);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user?.role || "user");
      localStorage.setItem("userPlan", JSON.stringify(data.userPlanlength || []));
      if (data.token) localStorage.setItem("token", data.token);

      if (data.user.role === "admin") navigate("/admin");
      else navigate("/dashboard?welcome=1");
    } catch (error) {
      setPopupMessage("Could not connect to server. Please try again.");
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

      <div className="auth-card signin-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Login to your account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="john123@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <div className="auth-link-row">
            <Link to="/forgetpassword">Forgot password</Link>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="auth-bottom-text">
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>

      {showPopup && (
        <div className="auth-popup-overlay">
          <div className="auth-popup">
            <h3>Login Failed</h3>
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}