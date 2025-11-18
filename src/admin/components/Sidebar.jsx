// src/admin/components/Sidebar.jsx
import { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaChevronDown,
  FaChevronUp,
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaRocket,
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
    reports: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {!open && (
        <div className="admin-hamburger-btn" onClick={() => setOpen(true)}>
          <FaBars />
        </div>
      )}

      <div className={`admin-sidebar-overlay ${open ? "show" : ""}`}>
        <div className="admin-sidebar">
          <div className="admin-sidebar-header">
            <div className="admin-sidebar-logo">
              <FaRocket className="admin-logo-icon" />
              <span className="admin-logo-text">MetaDrive Admin</span>
            </div>
            <button
              className="admin-sidebar-close"
              onClick={() => setOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <nav className="admin-sidebar-menu">
            {/* Dashboard */}
            <NavLink
              to="/admin"
              end
              onClick={() => setOpen(false)}
              className="admin-menu-item"
            >
              <FaTachometerAlt className="admin-menu-icon" />
              <span className="admin-menu-text">Dashboard</span>
            </NavLink>

            {/* Users */}
            <NavLink
              to="/admin/users"
              onClick={() => setOpen(false)}
              className="admin-menu-item"
            >
              <FaUsers className="admin-menu-icon" />
              <span className="admin-menu-text">Users</span>
            </NavLink>

            {/* Transactions */}
            <NavLink
              to="/admin/transactions"
              onClick={() => setOpen(false)}
              className="admin-menu-item"
            >
              <FaExchangeAlt className="admin-menu-icon" />
              <span className="admin-menu-text">Transactions</span>
            </NavLink>

            {/* Analytics Dropdown */}
            <div className="admin-dropdown-section">
              <button
                className={`admin-dropdown-btn ${
                  dropdowns.reports ? "active" : ""
                }`}
                onClick={() => toggleDropdown("reports")}
              >
                <FaChartLine className="admin-menu-icon" />
                <span className="admin-menu-text">Analytics</span>
                <div className="admin-dropdown-arrow">
                  {dropdowns.reports ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </button>
              <div
                className={`admin-dropdown-links ${
                  dropdowns.reports ? "open" : ""
                }`}
              >
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
            </div>

            {/* Deposits Dropdown */}
            <div className="admin-dropdown-section">
              <button
                className={`admin-dropdown-btn ${
                  dropdowns.deposits ? "active" : ""
                }`}
                onClick={() => toggleDropdown("deposits")}
              >
                <FaMoneyCheckAlt className="admin-menu-icon" />
                <span className="admin-menu-text">Deposits</span>
                <div className="admin-dropdown-arrow">
                  {dropdowns.deposits ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </button>
              <div
                className={`admin-dropdown-links ${
                  dropdowns.deposits ? "open" : ""
                }`}
              >
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
            </div>

            {/* Withdrawals Dropdown */}
            <div className="admin-dropdown-section">
              <button
                className={`admin-dropdown-btn ${
                  dropdowns.withdrawals ? "active" : ""
                }`}
                onClick={() => toggleDropdown("withdrawals")}
              >
                <FaWallet className="admin-menu-icon" />
                <span className="admin-menu-text">Withdrawals</span>
                <div className="admin-dropdown-arrow">
                  {dropdowns.withdrawals ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </button>
              <div
                className={`admin-dropdown-links ${
                  dropdowns.withdrawals ? "open" : ""
                }`}
              >
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
              </div>
            </div>
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-user-info">
              <div className="admin-user-avatar">
                <span>AD</span>
              </div>
              <div className="admin-user-details">
                <div className="admin-user-name">Admin User</div>
                <div className="admin-user-role">Super Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
