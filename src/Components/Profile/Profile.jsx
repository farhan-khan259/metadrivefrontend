import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiActivity,
  FiArrowDown,
  FiArrowUp,
  FiBell,
  FiPieChart,
  FiCheckCircle,
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiLock,
  FiMail,
  FiMenu,
  FiPhone,
  FiSave,
  FiShield,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { FaGift, FaTags, FaWhatsapp } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./Profile.css";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState("account");
  const [teamData, setTeamData] = useState(null);
  const [uplinerName, setUplinerName] = useState("Loading...");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Store user in state
  const [user, setUser] = useState(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  const userId = user?._id;

  const [formData, setFormData] = useState({
    Name: user?.fullName || "",
    email: user?.email || "",
    phone: user?.whatsappNumber || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && sidebarOpen && !e.target.closest('.sx-sidebar')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  const whatsappGroupLink = "https://chat.whatsapp.com/LCW0V5VeVAr9NFIx1asQis?mode=gi_t";

  const sidebarMain = [
    { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    { to: "/investmentplans", icon: <FiPieChart />, label: "Investment Plans" },
    { to: "/deposit", icon: <FiArrowDown />, label: "Deposit" },
    { to: "/withdraw", icon: <FiArrowUp />, label: "Withdraw" },
    { to: "/invite", icon: <FiUsers />, label: "Refer & Invite" },
    { to: "/team", icon: <FiUsers />, label: "My Team" },
    { to: "/managerranksystem", icon: <FaGift />, label: "Manager Rank System" },
    { to: "/earningsummary", icon: <FiActivity />, label: "Earning Summary" },
    { to: "/transactionhistory", icon: <FiCreditCard />, label: "Transaction History" },
    { to: "/rankingdashboard", icon: <FaTags />, label: "Ranking Dashboard" },
  ];

  const sidebarMore = [
    { to: "/profile", icon: <FiUser />, label: "Profile" },
    { to: "/support", icon: <FiHelpCircle />, label: "Support" },
    { to: "/privacypolicy", icon: <FiShield />, label: "Privacy Policy" },
  ];

  // Function to get upliner name by referral code
  const getUplinerName = async (referralCode) => {
    if (!referralCode) return "No Upliner";

    try {
      const response = await axios.post(
        "https://be.sparkx1.pro/api/getUserByReferral",
        {
          referralCode: referralCode,
        }
      );

      if (response.data.success) {
        return response.data.user.fullName;
      } else {
        return "No Upliner";
      }
    } catch (error) {
      console.error("Error fetching upliner:", error);
      return "No Upliner";
    }
  };

  // Fetch team data and upliner name
  useEffect(() => {
    const fetchTeamDataAndUpliner = async () => {
      if (!userId) {
        console.log("No userId available");
        return;
      }

      try {
        // Fetch team data - using the same endpoint as Team component
        const response = await axios.post("https://be.sparkx1.pro/team", {
          userId: userId,
        });

        if (response.data.success) {
          setTeamData(response.data);
          console.log("Team data loaded:", response.data);

          // Get upliner name from user's referredBy field
          const userReferralCode = user?.referredBy;
          if (userReferralCode) {
            const upliner = await getUplinerName(userReferralCode);
            setUplinerName(upliner);
          } else {
            setUplinerName("No Upliner");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUplinerName("No Upliner");
      }
    };

    fetchTeamDataAndUpliner();
  }, [userId, user?.referredBy]);

  // Calculate total team size - same calculation as Team component
  const getTotalTeamSize = () => {
    if (!teamData) return 0;

    return (
      (teamData.directReferrals?.stats?.totalUsers || 0) +
      (teamData.indirectReferrals?.stats?.totalUsers || 0) +
      (teamData.extendedReferrals?.stats?.totalUsers || 0) +
      (teamData.level4Referrals?.stats?.totalUsers || 0) +
      (teamData.level5Referrals?.stats?.totalUsers || 0)
    );
  };

  // Get additional stats for more info cards
  const getAdditionalStats = () => {
    if (!teamData) return { totalDeposit: 0, totalCommission: 0 };

    const totalTeamDeposit =
      (teamData.directReferrals?.stats?.totalTeamDeposit || 0) +
      (teamData.indirectReferrals?.stats?.totalTeamDeposit || 0) +
      (teamData.extendedReferrals?.stats?.totalTeamDeposit || 0) +
      (teamData.level4Referrals?.stats?.totalTeamDeposit || 0) +
      (teamData.level5Referrals?.stats?.totalTeamDeposit || 0);

    const totalTeamCommission = Math.floor(
      teamData.commissionSummary?.grandTotalCommission || 0
    );

    return {
      totalDeposit: totalTeamDeposit,
      totalCommission: totalTeamCommission,
    };
  };

  const additionalStats = getAdditionalStats();

  const levelData = [
    {
      key: "directReferrals",
      title: "Level 1",
      commissionRate: "6.5%",
      commissionValue: teamData?.commissionSummary?.level1Commission || 0,
    },
    {
      key: "indirectReferrals",
      title: "Level 2",
      commissionRate: "3.3%",
      commissionValue: teamData?.commissionSummary?.level2Commission || 0,
    },
    {
      key: "extendedReferrals",
      title: "Level 3",
      commissionRate: "2.5%",
      commissionValue: teamData?.commissionSummary?.level3Commission || 0,
    },
    {
      key: "level4Referrals",
      title: "Level 4",
      commissionRate: "2%",
      commissionValue: teamData?.commissionSummary?.level4Commission || 0,
    },
    {
      key: "level5Referrals",
      title: "Level 5",
      commissionRate: "1.5%",
      commissionValue: teamData?.commissionSummary?.level5Commission || 0,
    },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // ✅ Update account info
  const saveAccount = async () => {
    try {
      const response = await axios.post("https://be.sparkx1.pro/api/account", {
        userId,
        fullName: formData.Name,
        email: formData.email,
        whatsappNumber: formData.phone,
      });
      if (response.data.success) {
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setIsEditing(false);
      } else {
        alert(response.data.message || "Update failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  const cancelEdit = () => {
    setFormData({
      Name: user?.fullName || "",
      email: user?.email || "",
      phone: user?.whatsappNumber || "",
    });
    setIsEditing(false);
  };

  // ✅ Change password
  const savePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "https://be.sparkx1.pro/api/changePassword",
        {
          userId,
          oldpassword: passwordData.oldPassword,
          newpassword: passwordData.newPassword,
        }
      );
      if (response.data.success) {
        alert("Password changed successfully!");
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setIsEditingPassword(false);
      } else {
        alert(response.data.message || "Password change failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error changing password");
    }
  };

  const cancelPasswordEdit = () => {
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setIsEditingPassword(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace('PKR', 'PKR');
  };

  return (
    <div className="sx-dashboard-root">
      {/* Sidebar */}
      <aside className={`sx-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sx-sidebar-top">
          <div className="sx-sidebar-brand">
            <span className="sx-sidebar-brand-text">SPARK</span>
            <img
              src={logoImage}
              alt="SparkX"
              className="sx-sidebar-logo"
            />
          </div>
          <button
            className="sx-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            type="button"
          >
            <FiX />
          </button>
        </div>

        <div className="sx-sidebar-links">
          {sidebarMain.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sx-sidebar-link ${
                location.pathname === item.to ? "active" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sx-sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="sx-sidebar-divider" />

        <div className="sx-sidebar-links">
          {sidebarMore.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sx-sidebar-link ${
                location.pathname === item.to ? "active" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sx-sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          <a
            href={whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="sx-sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="sx-sidebar-icon"><FaWhatsapp /></span>
            <span>WhatsApp Group</span>
          </a>

          <button
            type="button"
            className="sx-sidebar-link sx-logout"
            onClick={handleLogout}
          >
            <span className="sx-sidebar-icon"><FiX /></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sx-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="sx-main">
        <header className="sx-header">
          <div className="sx-header-left">
            <button
              className="sx-menu-btn"
              onClick={() => setSidebarOpen(true)}
              type="button"
            >
              <FiMenu />
            </button>
            <div>
              <h2 className="sx-title">My Profile</h2>
              <p className="sx-subtitle">Manage your account settings</p>
            </div>
          </div>

          <div className="sx-header-right">
            <a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="sx-whatsapp-pill"
            >
              <FaWhatsapp /> Join WhatsApp
            </a>
            <button className="sx-icon-btn" type="button">
              <FiBell />
            </button>
            <button
              className="sx-profile-avatar-btn"
              onClick={() => navigate("/profile")}
              type="button"
            >
              <FiUser className="sx-profile-avatar-icon" />
            </button>
          </div>
        </header>

        <div className="profile-shell">
          {/* Header Section */}
          <div className="profile-header-section">
            <div className="profile-header-content">
              <div className="profile-header-badge">
                <FiUser /> ACCOUNT PROFILE
              </div>
              <h1 className="profile-header-title">Welcome Back, {formData.Name || "User"}!</h1>
              <p className="profile-header-subtitle">
                View and manage your personal information, security settings, and account preferences
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="profile-stats-grid">
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <FiUsers />
              </div>
              <div className="profile-stat-info">
                <span className="profile-stat-label">Total Team</span>
                <strong className="profile-stat-value">{getTotalTeamSize().toLocaleString()}</strong>
              </div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <FiActivity />
              </div>
              <div className="profile-stat-info">
                <span className="profile-stat-label">Team Deposit</span>
                <strong className="profile-stat-value">{formatCurrency(additionalStats.totalDeposit)}</strong>
              </div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <FiShield />
              </div>
              <div className="profile-stat-info">
                <span className="profile-stat-label">Upliner</span>
                <strong className="profile-stat-value">{uplinerName}</strong>
              </div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <FiCheckCircle />
              </div>
              <div className="profile-stat-info">
                <span className="profile-stat-label">Referral Code</span>
                <strong className="profile-stat-value">{user?.randomCode || "N/A"}</strong>
              </div>
            </div>
          </div>

          {/* Main Profile Card */}
          <div className="profile-card">
            {/* User Header */}
            <div className="profile-user-header">
              <div className="profile-avatar">
                <FiUser className="profile-avatar-icon" />
              </div>
              <div className="profile-user-info">
                <h2 className="profile-user-name">{formData.Name || user?.fullName || "User"}</h2>
                <p className="profile-user-email">{formData.email || user?.email || "No email provided"}</p>
                <div className="profile-user-meta">
                  <span className="profile-user-meta-item">
                    <FiPhone /> {formData.phone || user?.whatsappNumber || "No phone"}
                  </span>
                  <span className="profile-user-meta-item">
                    <FiShield /> Referral: {user?.randomCode || "N/A"}
                  </span>
                </div>
              </div>
              <div className="profile-badge">
                <FiShield className="profile-badge-icon" />
              </div>
            </div>

            <div className="profile-divider" />

            {/* Tabs */}
            <div className="profile-tabs">
              <button
                className={`profile-tab ${activeTab === "account" ? "active" : ""}`}
                onClick={() => setActiveTab("account")}
                type="button"
              >
                Account Information
              </button>
              <button
                className={`profile-tab ${activeTab === "password" ? "active" : ""}`}
                onClick={() => setActiveTab("password")}
                type="button"
              >
                Security & Password
              </button>
            </div>

            {/* Account Section */}
            {activeTab === "account" && (
              <div className="profile-section">
                <div className="profile-section-header">
                  <h3 className="profile-section-title">Personal Information</h3>
                  {!isEditing ? (
                    <button className="profile-edit-btn" onClick={() => setIsEditing(true)} type="button">
                      Edit Profile
                    </button>
                  ) : (
                    <button className="profile-cancel-top-btn" onClick={cancelEdit} type="button">
                      Cancel
                    </button>
                  )}
                </div>

                <div className="profile-fields-grid">
                  <div className="profile-field-group">
                    <label className="profile-label">Full Name</label>
                    <div className="profile-input-wrap">
                      <FiUser className="profile-input-icon" />
                      <input
                        className="profile-input"
                        type="text"
                        name="Name"
                        placeholder="Enter your full name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="profile-field-group">
                    <label className="profile-label">Phone Number</label>
                    <div className="profile-input-wrap">
                      <FiPhone className="profile-input-icon" />
                      <input
                        className="profile-input"
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="profile-field-group profile-field-group--full">
                    <label className="profile-label">Email Address</label>
                    <div className="profile-input-wrap">
                      <FiMail className="profile-input-icon" />
                      <input
                        className="profile-input"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="profile-action-bar">
                    <button className="profile-cancel-btn" onClick={cancelEdit} type="button">
                      Cancel
                    </button>
                    <button className="profile-save-btn" onClick={saveAccount} type="button">
                      <FiSave /> Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Change Password Section */}
            {activeTab === "password" && (
              <div className="profile-section">
                <div className="profile-section-header">
                  <h3 className="profile-section-title">Change Password</h3>
                  {!isEditingPassword ? (
                    <button className="profile-edit-btn" onClick={() => setIsEditingPassword(true)} type="button">
                      Update Password
                    </button>
                  ) : (
                    <button className="profile-cancel-top-btn" onClick={cancelPasswordEdit} type="button">
                      Cancel
                    </button>
                  )}
                </div>

                <div className="profile-fields-grid">
                  <div className="profile-field-group">
                    <label className="profile-label">Current Password</label>
                    <div className="profile-input-wrap">
                      <FiLock className="profile-input-icon" />
                      <input
                        className="profile-input"
                        type="password"
                        name="oldPassword"
                        placeholder="Enter current password"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        disabled={!isEditingPassword}
                      />
                    </div>
                  </div>

                  <div className="profile-field-group">
                    <label className="profile-label">New Password</label>
                    <div className="profile-input-wrap">
                      <FiLock className="profile-input-icon" />
                      <input
                        className="profile-input"
                        type="password"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        disabled={!isEditingPassword}
                      />
                    </div>
                  </div>

                  <div className="profile-field-group profile-field-group--full">
                    <label className="profile-label">Confirm New Password</label>
                    <div className="profile-input-wrap">
                      <FiLock className="profile-input-icon" />
                      <input
                        className="profile-input"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        disabled={!isEditingPassword}
                      />
                    </div>
                  </div>
                </div>

                {isEditingPassword && (
                  <div className="profile-action-bar">
                    <button className="profile-cancel-btn" onClick={cancelPasswordEdit} type="button">
                      Cancel
                    </button>
                    <button className="profile-save-btn" onClick={savePassword} type="button">
                      <FiSave /> Update Password
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Additional Info */}
            <div className="profile-info-section">
              <h4 className="profile-info-title">Account Information</h4>
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <span className="profile-info-label">Member Since</span>
                  <span className="profile-info-value">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="profile-info-item">
                  <span className="profile-info-label">Last Updated</span>
                  <span className="profile-info-value">
                    {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="profile-info-item">
                  <span className="profile-info-label">Account Status</span>
                  <span className="profile-info-value status-active">Active</span>
                </div>
                <div className="profile-info-item">
                  <span className="profile-info-label">User ID</span>
                  <span className="profile-info-value">{userId?.slice(-8) || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}