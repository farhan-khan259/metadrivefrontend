// import {
//   FaCamera,
//   FaRegCopy,
//   FaShieldAlt,
//   FaTimes,
//   FaUserCircle,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./Profilecard.css";

// export default function Profilecard() {
//   return (
//     <div className="profile-wrapper">
//       <div className="profile-container">
//         {/* Top Bar */}
//         <div className="profile-header">
//           <FaTimes className="close-icon" />
//           <h2 className="profile-title">Solar X Settings</h2>
//           <FaUserCircle className="user-icon" />
//         </div>

//         {/* Avatar + Badge */}
//         <div className="avatar-section">
//           <div className="avatar-circle">
//             <FaUserCircle className="profile-icon" />
//             <FaCamera className="camera-icon" />
//           </div>
//           <div className="badge-icon">
//             <FaShieldAlt />
//           </div>
//         </div>

//         {/* UID */}
//         <div className="uid-section">
//           <span className="uid-label">UID:</span>
//           <span className="uid-number">10001</span>
//           <FaRegCopy className="copy-icon" />
//         </div>

//         {/* Registration Date */}
//         <div className="registration-date">
//           <span className="reg-label">Registration Date&Time:</span>
//           <span className="reg-value">10/August/2025 6:02 AM</span>
//         </div>

//         {/* About Link */}
//         <Link className="about-link" to="/profilecard">
//           About All Solar X System
//         </Link>
//       </div>
//     </div>
//   );
// }

import {
  FaCamera,
  FaRegCopy,
  FaShieldAlt,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Profilecard.css";

export default function Profilecard() {
  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        {/* Top Bar */}
        <div className="profile-header">
          <FaTimes className="close-icon" />
          <h2 className="profile-title">MetaDrive Settings</h2>
          <FaUserCircle className="user-icon" />
        </div>

        {/* Avatar + Badge */}
        <div className="avatar-section">
          <div className="avatar-circle">
            <FaUserCircle className="profile-icon" />
            <FaCamera className="camera-icon" />
          </div>
          <div className="badge-icon">
            <FaShieldAlt />
          </div>
        </div>

        {/* UID */}
        <div className="uid-section">
          <span className="uid-label">UID:</span>
          <span className="uid-number">10001</span>
          <FaRegCopy className="copy-icon" />
        </div>

        {/* Registration Date */}
        <div className="registration-date">
          <span className="reg-label">Registration Date&Time:</span>
          <span className="reg-value">10/August/2025 6:02 AM</span>
        </div>

        {/* About Link */}
        <Link className="about-link" to="/profilecard">
          About All MetaDrive System
        </Link>
      </div>
    </div>
  );
}
