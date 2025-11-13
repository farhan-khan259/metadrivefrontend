// src/admin/components/Sidebar.jsx
import { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaChevronDown,
  FaChevronUp,
  FaExchangeAlt,
  FaFileAlt,
  FaMoneyCheckAlt,
  FaTachometerAlt,
  FaTimes,
  FaUsers,
  FaWallet,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    deposits: false,
    withdrawals: false,
    referrals: false,
    settings: false,
    admins: false,
    reports: false, // <-- added
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {!open && (
        <div className="hamburger-btn" onClick={() => setOpen(true)}>
          <FaBars />
        </div>
      )}

      <div className={`sidebar-overlay ${open ? "show" : ""}`}>
        <div className="sidebar">
          <div className="sidebar-header">
            <h2 className="logo">MetaDrive</h2>
            <FaTimes className="close-btn" onClick={() => setOpen(false)} />
          </div>

          <nav className="sidebar-menu">
            {/* Single links */}
            <NavLink to="/admin" end onClick={() => setOpen(false)}>
              <FaTachometerAlt /> <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin/users" onClick={() => setOpen(false)}>
              <FaUsers /> <span>Users</span>
            </NavLink>
            <NavLink to="/admin/transactions" onClick={() => setOpen(false)}>
              <FaExchangeAlt /> <span>All Transactions</span>
            </NavLink>
            {/* <NavLink to="/admin/promocode" onClick={() => setOpen(false)}>
              <FaTags /> <span>Promo Code</span>
            </NavLink> */}
            <NavLink
              to="/admin/cms/announcements"
              onClick={() => setOpen(false)}
            >
              <FaFileAlt /> <span>Announcements</span>
            </NavLink>
            {/* <NavLink
              to="/admin/admins/richtickett"
              onClick={() => setOpen(false)}
            >
              <FaTicketAlt /> <span>Rich Ticket</span>
            </NavLink> */}

            {/* Reports dropdown */}
            <div className="dropdown-section">
              <button
                className="dropdown-btn"
                onClick={() => toggleDropdown("reports")}
              >
                <FaChartLine />
                <span>Reports</span>
                {dropdowns.reports ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {dropdowns.reports && (
                <div className="dropdown-links">
                  <NavLink
                    to="/admin/reports/daily"
                    onClick={() => setOpen(false)}
                  >
                    Daily Report
                  </NavLink>
                  <NavLink
                    to="/admin/reports/monthly"
                    onClick={() => setOpen(false)}
                  >
                    Monthly Report
                  </NavLink>
                </div>
              )}
            </div>

            {/* Deposits dropdown */}
            <div className="dropdown-section">
              <button
                className="dropdown-btn"
                onClick={() => toggleDropdown("deposits")}
              >
                <FaMoneyCheckAlt />
                <span>Deposits</span>
                {dropdowns.deposits ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {dropdowns.deposits && (
                <div className="dropdown-links">
                  <NavLink
                    to="/admin/deposits/pending"
                    onClick={() => setOpen(false)}
                  >
                    Pending Deposits
                  </NavLink>
                  <NavLink
                    to="/admin/deposits/completed"
                    onClick={() => setOpen(false)}
                  >
                    Completed Deposits
                  </NavLink>
                </div>
              )}
            </div>

            {/* Withdrawals dropdown */}
            <div className="dropdown-section">
              <button
                className="dropdown-btn"
                onClick={() => toggleDropdown("withdrawals")}
              >
                <FaWallet />
                <span>Withdrawals</span>
                {dropdowns.withdrawals ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {dropdowns.withdrawals && (
                <div className="dropdown-links">
                  <NavLink
                    to="/admin/withdrawals/pending"
                    onClick={() => setOpen(false)}
                  >
                    Pending Withdrawals
                  </NavLink>
                  <NavLink
                    to="/admin/withdrawals/completed"
                    onClick={() => setOpen(false)}
                  >
                    Completed Withdrawals
                  </NavLink>
                  {/* <NavLink
                    to="/admin/withdrawals/settings"
                    onClick={() => setOpen(false)}
                  >
                    Withdrawal Settings
                  </NavLink> */}
                </div>
              )}
            </div>

            {/* Referrals dropdown */}
            {/* <div className="dropdown-section">
              <button
                className="dropdown-btn"
                onClick={() => toggleDropdown("referrals")}
              >
                <FaUserFriends />
                <span>Referrals</span>
                {dropdowns.referrals ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {dropdowns.referrals && (
                <div className="dropdown-links">
                  <NavLink
                    to="/admin/referrals/tree"
                    onClick={() => setOpen(false)}
                  >
                    Referral Tree
                  </NavLink>
                  <NavLink
                    to="/admin/referrals/settings"
                    onClick={() => setOpen(false)}
                  >
                    Referral Settings
                  </NavLink>
                </div>
              )}
            </div> */}

            {/* Settings dropdown */}
            {/* <div className="dropdown-section">
              <button
                className="dropdown-btn"
                onClick={() => toggleDropdown("settings")}
              >
                <FaCog />
                <span>Settings</span>
                {dropdowns.settings ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {dropdowns.settings && (
                <div className="dropdown-links">
                  <NavLink
                    to="/admin/settings/payment"
                    onClick={() => setOpen(false)}
                  >
                    Payment Settings
                  </NavLink>
                  <NavLink
                    to="/admin/settings/security"
                    onClick={() => setOpen(false)}
                  >
                    Security Settings
                  </NavLink>
                  <NavLink
                    to="/admin/settings/notifications"
                    onClick={() => setOpen(false)}
                  >
                    Notification Settings
                  </NavLink>
                </div>
              )}
            </div> */}

            {/* Admin dropdown */}
            {/* <div className="dropdown-section">
              <button
                className="dropdown-btn"
                onClick={() => toggleDropdown("admins")}
              >
                <FaUserShield />
                <span>Admins</span>
                {dropdowns.admins ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {dropdowns.admins && (
                <div className="dropdown-links">
                  <NavLink to="/admin/admins" onClick={() => setOpen(false)}>
                    Admin List
                  </NavLink>
                  <NavLink
                    to="/admin/admins/roles"
                    onClick={() => setOpen(false)}
                  >
                    Roles
                  </NavLink>
                  <NavLink
                    to="/admin/admins/logs"
                    onClick={() => setOpen(false)}
                  >
                    Admin Logs
                  </NavLink>
                </div>
              )}
            </div> */}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
