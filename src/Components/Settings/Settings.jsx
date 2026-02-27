import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaCalendarTimes,
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
import "./Settings.css";

export default function Settings({ isOpen, onClose }) {
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
        const res = await axios.post("http://localhost:3005/team", { userId });
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
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userPlan");
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {isOpen && <div className="settings-overlay" onClick={onClose}></div>}

      <div className={`settings-menu-container ${isOpen ? "open" : ""}`}>
        <div className="settings-menu-header">
          <h2 className="settings-menu-title">Settings</h2>
          <button className="settings-close-btn" onClick={onClose}>
            <FaTimes className="close-icon" />
          </button>
        </div>

        <div className="settings-menu-list">
          <Link to="/profile" onClick={onClose}>
            <MenuItem icon={<FaUser />} label="My Profile Setup" />
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
          <Link to="/rebatecommission" onClick={onClose}>
            <MenuItem
              icon={<FaCalendarTimes />}
              label="Daily Rebate Commission"
            />
          </Link>
          <Link to="/support" onClick={onClose}>
            <MenuItem icon={<FaLifeRing />} label="Customer Support" />
          </Link>
          <Link to="/privacypolicy" onClick={onClose}>
            <MenuItem icon={<FaInfoCircle />} label="Privacy Policy" />
          </Link>
          <Link to="/ourinfo" onClick={onClose}>
            <MenuItem icon={<FaInfoCircle />} label="About MetaDrive" />
          </Link>

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
