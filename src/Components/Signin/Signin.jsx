// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import "./Signin.css";

// export default function Signin() {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupTitle, setPopupTitle] = useState("");
//   const [popupMessage, setPopupMessage] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (!res.ok || !data.user) {
//         setPopupTitle("Login Failed");
//         setPopupMessage(data.message || "Invalid email or password.");
//         setShowPopup(true);
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("role", data.user?.role || "user");
//       localStorage.setItem(
//         "userPlan",
//         JSON.stringify(data.userPlanlength || [])
//       );
//       if (data.token) localStorage.setItem("token", data.token);

//       sessionStorage.setItem("justLoggedIn", "true");

//       if (data.user.role === "admin") navigate("/admin");
//       else navigate("/dashboard");
//     } catch (error) {
//       console.error("Login Error:", error);
//       setPopupTitle("Server Error");
//       setPopupMessage("Could not connect to server. Try again later.");
//       setShowPopup(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signin-container">
//       <div className="signin-card">
//         <div className="signin-header">
//           <h2>
//             SOLAR <span>X</span>
//           </h2>
//           <p>Sign in to your account</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email</label>
//             <div className="input-box">
//               <input
//                 type="email"
//                 placeholder="example@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <div className="input-box password-box">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <span
//                 className="toggle-password-icon"
//                 onClick={() => setPasswordVisible(!passwordVisible)}
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </div>

//           <div className="forgot-password">
//             <Link to="/forgetpassword">Forgot Password?</Link>
//           </div>

//           <button type="submit" className="signin-btn" disabled={loading}>
//             {loading ? "Signing In..." : "Sign In"}
//           </button>

//           <Link to="/signup" className="create-account-btn">
//             Create Account
//           </Link>
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
//     </div>
//   );
// }

// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import "./Signin.css";

// export default function Signin() {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupTitle, setPopupTitle] = useState("");
//   const [popupMessage, setPopupMessage] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (!res.ok || !data.user) {
//         setPopupTitle("Login Failed");
//         setPopupMessage(data.message || "Invalid email or password.");
//         setShowPopup(true);
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("role", data.user?.role || "user");
//       localStorage.setItem(
//         "userPlan",
//         JSON.stringify(data.userPlanlength || [])
//       );
//       if (data.token) localStorage.setItem("token", data.token);

//       sessionStorage.setItem("justLoggedIn", "true");

//       if (data.user.role === "admin") navigate("/admin");
//       else navigate("/dashboard");
//     } catch (error) {
//       console.error("Login Error:", error);
//       setPopupTitle("Server Error");
//       setPopupMessage("Could not connect to server. Try again later.");
//       setShowPopup(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signin-container">
//       <div className="signin-card">
//         <div className="signin-header">
//           <h2>
//             META <span>DRIVE</span>
//           </h2>
//           <p>Sign in to your account</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email</label>
//             <div className="input-box">
//               <input
//                 type="email"
//                 placeholder="example@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <div className="input-box password-box">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <span
//                 className="toggle-password-icon"
//                 onClick={() => setPasswordVisible(!passwordVisible)}
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </div>

//           <div className="forgot-password">
//             <Link to="/forgetpassword">Forgot Password?</Link>
//           </div>

//           <button type="submit" className="signin-btn" disabled={loading}>
//             {loading ? "Signing In..." : "Sign In"}
//           </button>

//           <Link to="/signup" className="create-account-btn">
//             Create Account
//           </Link>
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
//     </div>
//   );
// }

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";

export default function Signin() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.user) {
        setPopupTitle("Login Failed");
        setPopupMessage(data.message || "Invalid email or password.");
        setShowPopup(true);
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user?.role || "user");
      localStorage.setItem(
        "userPlan",
        JSON.stringify(data.userPlanlength || [])
      );
      if (data.token) localStorage.setItem("token", data.token);

      sessionStorage.setItem("justLoggedIn", "true");

      if (data.user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      setPopupTitle("Server Error");
      setPopupMessage("Could not connect to server. Try again later.");
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header-section">
          <div className="signin-header">
            <h1 className="signin-title">Welcome Back</h1>
            <p className="signin-subtitle">
              Sign in to your account to continue
            </p>
          </div>
        </div>

        <div className="signin-content">
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <div className="input-container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
                <label className="input-label">Email Address</label>
              </div>
            </div>

            <div className="form-group">
              <div className="input-container password-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
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
            </div>

            <div className="form-options">
              <Link to="/forgetpassword" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="signup-redirect">
              <p>Don't have an account?</p>
              <Link to="/signup" className="signup-link">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box error-popup">
            <div className="popup-icon">⚠️</div>
            <h3>Login Failed</h3>
            <p>{popupMessage}</p>
            <div className="popup-note">
              Please check your credentials and try again
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="popup-btn error-btn"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
