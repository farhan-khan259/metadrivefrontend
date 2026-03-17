import { useEffect, useState } from "react";
import {
  FaCalendar,
  FaChartLine,
  FaEnvelope,
  FaMoneyBillWave,
  FaPhone,
  FaTimes,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import "../../styles/userprofilemodal.css";

const UserProfileModal = ({ user, onClose, onSuspendToggle }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 10);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  const handleSuspend = () => {
    if (
      window.confirm(
        `Are you sure you want to ${
          user.status === "active" ? "suspend" : "activate"
        } this user?`
      )
    ) {
      onSuspendToggle(user._id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={`modal-overlay ${animate ? "show" : ""}`}>
      <div className={`modal-content ${animate ? "slide-in" : ""}`}>
        <button className="modal-close" onClick={handleClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <h2>User Profile</h2>
          <p className="modal-subtitle">View and manage user details</p>
        </div>

        <div className="user-profile-header">
          <div className="user-avatar-large">
            {user.fullName?.charAt(0) || user.name?.charAt(0) || "U"}
          </div>
          <div className="user-basic-info">
            <h3>{user.fullName || user.name || "N/A"}</h3>
            <p className="user-role">{user.role || "user"}</p>
            <div className="user-status">
              <span className={`status-badge ${user.status || "active"}`}>
                {user.status || "active"}
              </span>
            </div>
          </div>
        </div>

        <div className="user-stats">
          <div className="stat-item">
            <span className="stat-value">
              PKR {user.userbalance?.toLocaleString() || 0}
            </span>
            <span className="stat-label">Balance</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              PKR {user.userTotalDeposits?.toLocaleString() || 0}
            </span>
            <span className="stat-label">Deposits</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.teamCount || 0}</span>
            <span className="stat-label">Team</span>
          </div>
        </div>

        <div className="user-details-grid">
          <div className="detail-row">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">{user.fullName || "N/A"}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{user.email}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Phone</span>
            <span className="detail-value">
              {user.phoneNumber || user.whatsappNumber || "N/A"}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Joined</span>
            <span className="detail-value">
              {user.createdAt ? formatDate(user.createdAt) : "N/A"}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">User ID</span>
            <span className="detail-value code">
              {user.randomCode || user._id?.slice(-8) || "N/A"}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Referral Code</span>
            <span className="detail-value code">
              {user.randomCode || "N/A"}
            </span>
          </div>
        </div>

        <div className="modal-actions">
          <button
            className={`modal-btn ${user.status === "active" ? "warning" : "success"}`}
            onClick={handleSuspend}
          >
            {user.status === "active" ? "Suspend User" : "Activate User"}
          </button>
          <button className="modal-btn secondary" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;