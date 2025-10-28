import { useEffect, useState } from "react";
import {
  FaChevronRight,
  FaHandHoldingUsd,
  FaInfoCircle,
  FaLifeRing,
  FaMoneyBillAlt,
  FaMoneyCheckAlt,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import profileImg from "../../Assets/Pictures/download.jpeg";
import "./Settings.css";

export default function Settings({ isOpen, onClose, onOpenProfile }) {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    const fetchTeamData = async () => {
      try {
        const res = await axios.post("https://be.solarx0.com/team", { userId });
        setTeamData(res.data);
      } catch (err) {
        console.error("Error fetching team data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [userId, navigate]);

  const handleLogoutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const totalDeposits = teamData?.user?.userTotalDeposits || 0;
  const totalWithdrawals = teamData?.user?.userTotalWithdrawals || 0;

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="settings-overlay" onClick={onClose}></div>}

      {/* Settings Menu */}
      <div className={`settings-menu-container ${isOpen ? "open" : ""}`}>
        {/* Header with Close Button */}
        <div className="settings-menu-header">
          <h2 className="settings-menu-title">Settings</h2>
          <button className="settings-close-btn" onClick={onClose}>
            <FaTimes className="close-icon" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="settings-profile-section">
          <div className="profile-avatar-container">
            <img
              src={
                user?.profilepicture
                  ? `https://be.solarx0.com${user.profilepicture}`
                  : profileImg
              }
              className="settings-user-avatar"
              alt="User"
            />
          </div>
          <div className="profile-info">
            <p className="profile-name">
              {user?.fullName || user?.name || "User"}
            </p>
            <p className="profile-email">{user?.email || "N/A"}</p>
            <p className="profile-uid">
              UID: {teamData?.user?.randomCode || "N/A"}
            </p>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="settings-balance-row">
          <div className="settings-balance-card deposit-card">
            <div className="balance-icon">💰</div>
            <p className="balance-title">Total Deposit</p>
            <span className="balance-amount">
              PKR {totalDeposits.toLocaleString()}
            </span>
          </div>

          <div className="settings-balance-card withdrawal-card">
            <div className="balance-icon">💸</div>
            <p className="balance-title">Total Withdrawal</p>
            <span className="balance-amount">
              PKR {totalWithdrawals.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="settings-menu-list">
          <Link to="/profile" onClick={onClose}>
            <MenuItem icon={<FaUser />} label="Profile" />
          </Link>
          <Link to="/userdeposit" onClick={onClose}>
            <MenuItem icon={<FaMoneyBillAlt />} label="Deposit History" />
          </Link>
          <Link to="/userwithdraw" onClick={onClose}>
            <MenuItem icon={<FaMoneyCheckAlt />} label="Withdrawal History" />
          </Link>
          <Link to="/usercommission" onClick={onClose}>
            <MenuItem icon={<FaHandHoldingUsd />} label="Commission History" />
          </Link>
          <Link to="/support" onClick={onClose}>
            <MenuItem icon={<FaLifeRing />} label="Technical Support" />
          </Link>
          <Link to="/ourinfo" onClick={onClose}>
            <MenuItem icon={<FaInfoCircle />} label="About Solar X" />
          </Link>

          {/* Logout Button */}
          <div
            className="settings-menu-item logout-item"
            onClick={handleLogoutUser}
          >
            <div className="menu-icon">
              <FaSignOutAlt />
            </div>
            <span className="menu-label">Logout</span>
            <FaChevronRight className="arrow-icon" />
          </div>
        </div>
      </div>
    </>
  );
}

function MenuItem({ icon, label }) {
  return (
    <div className="settings-menu-item">
      <div className="menu-icon">{icon}</div>
      <span className="menu-label">{label}</span>
      <FaChevronRight className="arrow-icon" />
    </div>
  );
}
