// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../Assets/Pictures/Solarxlogo.jpeg";
// import "./Signin.css";

// export default function Signin() {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupTitle, setPopupTitle] = useState("");
//   const [popupMessage, setPopupMessage] = useState("");

//   // ✅ Hardcoded Admin
//   const adminEmail = "admin@gmail.com";
//   const adminPassword = "admin786";

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // ✅ Check hardcoded admin credentials first
//     if (email === adminEmail && password === adminPassword) {
//       const adminUser = { email: adminEmail, role: "admin" };

//       // Store admin user + role in localStorage
//       localStorage.setItem("user", JSON.stringify(adminUser));
//       localStorage.setItem("role", "admin");

//       sessionStorage.setItem("justLoggedIn", "true");
//       navigate("/admin");
//       setLoading(false);
//       return;
//     }

//     // ✅ Otherwise use backend API
//     try {
//       const res = await fetch("http://localhost:3005/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//         credentials: "include",
//       });

//       const data = await res.json();
//       console.log(data);

//       if (!res.ok) {
//         setPopupTitle("Login Failed");
//         setPopupMessage(data.message || "Invalid email or password.");
//         setShowPopup(true);
//         setLoading(false);
//         return;
//       }

//       // Save user info
//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("userPlan", JSON.stringify(data.userPlanlength));
//       localStorage.setItem("role", data.user?.role || "user");

//       // Save JWT token if provided
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }

//       // ✅ Set flag so Dashboard knows it’s a fresh login
//       sessionStorage.setItem("justLoggedIn", "true");

//       // Explicitly check role and redirect
//       if (data.user && data.user.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       setPopupTitle("Server Error");
//       setPopupMessage("Could not connect to server. Try again later.");
//       setShowPopup(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-box">
//         <img src={logo} alt="Solar X Logo" className="bot-icon" />
//         <h2 className="title">WELCOME BACK!</h2>
//         <p className="subtitle">Sign in to Solar X</p>

//         <form onSubmit={handleSubmit}>
//           <label>Email</label>
//           <div className="input-icon-box">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <label>Password</label>
//           <div className="input-icon-box">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Enter your password"
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

//           <p className="forget">
//             <Link to="/forgetpassword"> forget password?</Link>
//           </p>

//           <button type="submit" className="login-btn" disabled={loading}>
//             {loading ? "Signing In..." : "Sign In"}
//           </button>

//           <p className="footer-text">
//             Don’t have an account? <Link to="/signup">Sign up</Link>
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
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Pictures/Solarxlogo.jpeg";
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
      // ✅ Login via secure backend route
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok || !data.user) {
        setPopupTitle("Login Failed");
        setPopupMessage(data.message || "Invalid email or password.");
        setShowPopup(true);
        setLoading(false);
        return;
      }

      // ✅ Save user info securely
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user?.role || "user");
      localStorage.setItem(
        "userPlan",
        JSON.stringify(data.userPlanlength || [])
      );
      if (data.token) localStorage.setItem("token", data.token);

      // ✅ Session flag for first load
      sessionStorage.setItem("justLoggedIn", "true");

      // ✅ Navigate by role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
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
    <div className="login-page">
      <div className="login-box">
        <img src={logo} alt="Solar X Logo" className="bot-icon" />
        {/* <h2 className="title">WELCOME BACK!</h2> */}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <div className="input-icon-box">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Password</label>
          <div className="input-icon-box">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>

          <p className="forget">
            <Link to="/forgetpassword"> forget password?</Link>
          </p>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="footer-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
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
    </div>
  );
}
