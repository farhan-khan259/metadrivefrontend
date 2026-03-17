import { FaSignOutAlt, FaBell, FaEnvelope, FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../styles/topbar.css";

const Topbar = ({ title = "Dashboard Overview", breadcrumb = "Dashboard" }) => {
  return (
    <div className="admin-topbar">
      <div className="admin-topbar-left">
        <div className="admin-breadcrumb">
          <h2 className="admin-page-title">{title}</h2>
          <div className="admin-breadcrumb-items">
            <span className="admin-breadcrumb-item">Admin</span>
            <span className="admin-breadcrumb-divider">/</span>
            <span className="admin-breadcrumb-item active">{breadcrumb}</span>
          </div>
        </div>
      </div>

      <div className="admin-topbar-right">
       

        <div className="admin-topbar-actions">
          

          <Link to="/" className="admin-profile-btn">
            <div className="admin-profile-avatar">
              <span>AD</span>
            </div>
            <div className="admin-profile-info">
              <span className="admin-profile-name">Admin User</span>
              <span className="admin-profile-role">Super Admin</span>
            </div>
            <FaSignOutAlt className="admin-logout-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;