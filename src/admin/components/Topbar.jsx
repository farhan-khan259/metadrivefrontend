// src/admin/components/Topbar.jsx
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/topbar.css";

const Topbar = () => {
  return (
    <div className="admin-topbar">
      <div className="admin-topbar-left">
        <Sidebar />
        <div className="admin-breadcrumb">
          <h2 className="admin-page-title">Dashboard Overview</h2>
          <div className="admin-breadcrumb-items">
            <span className="admin-breadcrumb-item">Admin</span>
            <span className="admin-breadcrumb-divider">/</span>
            <span className="admin-breadcrumb-item active">Dashboard</span>
          </div>
        </div>
      </div>

      <div className="admin-topbar-right">
        <div className="admin-topbar-actions">
          <Link to="/" className="admin-profile-btn">
            <div className="admin-profile-avatar">
              <span>A</span>
            </div>
            <div className="admin-profile-info">
              <span className="admin-profile-name">Admin</span>
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
