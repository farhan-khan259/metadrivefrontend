import { useEffect, useState } from "react";
import {
  FiActivity,
  FiArrowDown,
  FiArrowUp,
  FiBell,
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiMenu,
  FiShield,
  FiUser,
  FiUsers,
  FiX,
  FiArrowLeft,
  FiTrendingUp,
  FiPieChart,
  FiBarChart2,
  FiDollarSign,
  FiClock,
  FiAward,
} from "react-icons/fi";
import { 
  FaGift, 
  FaTags, 
  FaWhatsapp, 
  FaWallet, 
  FaMoneyBillWave, 
  FaCoins, 
  FaChartLine, 
  FaUsers, 
  FaUsers as FaUsersIcon,
  FaDownload,
  FaUpload,
  FaPercent,
  FaCrown,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./EarningsSummary.css";

export default function EarningsSummary() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const location = useLocation();
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

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

  const safeNumber = (value) => Number(value || 0);

  // Investment Commission rates (as per user request)
  const investmentRates = {
    level1: 5, // 5%
    level2: 3, // 3%
    level3: 2, // 2%
    level4: 1, // 1%
    level5: 1, // 1%
  };

  // Team Commission rates (as per user request)
  const teamRates = {
    level1: 3, // 3%
    level2: 2, // 2%
    level3: 1, // 1%
    level4: 1, // 1%
    level5: 1, // 1%
  };

  const levelConfig = [
    {
      key: "directReferrals",
      label: "Level 1",
      icon: <FaUsersIcon />,
      color: "#22e88c",
      investmentRate: investmentRates.level1,
      teamRate: teamRates.level1,
    },
    {
      key: "indirectReferrals",
      label: "Level 2",
      icon: <FaUsersIcon />,
      color: "#5aa6ff",
      investmentRate: investmentRates.level2,
      teamRate: teamRates.level2,
    },
    {
      key: "extendedReferrals",
      label: "Level 3",
      icon: <FaUsersIcon />,
      color: "#c77dff",
      investmentRate: investmentRates.level3,
      teamRate: teamRates.level3,
    },
    {
      key: "level4Referrals",
      label: "Level 4",
      icon: <FaUsersIcon />,
      color: "#ffb14d",
      investmentRate: investmentRates.level4,
      teamRate: teamRates.level4,
    },
    {
      key: "level5Referrals",
      label: "Level 5",
      icon: <FaUsersIcon />,
      color: "#ff5a87",
      investmentRate: investmentRates.level5,
      teamRate: teamRates.level5,
    },
  ];

  // Fetch Team Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamRes = await axios.post("https://be.sparkx1.pro/team", {
          userId: userId,
        });

        setTeamData(teamRes.data);
        setUserData(teamRes.data.user);
      } catch (error) {
        console.error("Error fetching earnings summary data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (!userId) return <div className="es-error">Please Login</div>;
  if (loading) return (
    <div className="sx-dashboard-root">
      <div className="es-state-shell">
        <div className="es-state-card">
          <div className="es-state-spinner" />
          <p>Loading earnings summary...</p>
        </div>
      </div>
    </div>
  );
  if (!teamData) return <div className="es-error">No data available.</div>;

  // Calculate all statistics separately
  const userStats = {
    deposits: safeNumber(userData?.userTotalDeposits),
    withdrawals: safeNumber(userData?.userTotalWithdrawals),
    investment: safeNumber(userData?.UserInvestment),
    balance: safeNumber(userData?.userbalance),
    referralCode: userData?.randomCode || "N/A",
    joinedDate: userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "N/A",
  };

  // Team statistics by level
  const teamStats = {
    totalMembers: levelConfig.reduce(
      (sum, level) => sum + safeNumber(teamData[level.key]?.stats?.totalUsers), 0
    ),
    totalDeposits: levelConfig.reduce(
      (sum, level) => sum + safeNumber(teamData[level.key]?.stats?.totalTeamDeposit), 0
    ),
    totalWithdrawals: levelConfig.reduce(
      (sum, level) => sum + safeNumber(teamData[level.key]?.stats?.totalTeamWithdrawal), 0
    ),
    todayDeposits: levelConfig.reduce(
      (sum, level) => sum + safeNumber(teamData[level.key]?.stats?.todayTeamDeposit), 0
    ),
    todayWithdrawals: levelConfig.reduce(
      (sum, level) => sum + safeNumber(teamData[level.key]?.stats?.todayTeamWithdrawal), 0
    ),
    planInvestment: safeNumber(teamData?.teamPlanInvestment),
    byLevel: levelConfig.map(level => ({
      label: level.label,
      members: safeNumber(teamData[level.key]?.stats?.totalUsers),
      deposits: safeNumber(teamData[level.key]?.stats?.totalTeamDeposit),
      withdrawals: safeNumber(teamData[level.key]?.stats?.totalTeamWithdrawal),
    })),
  };

  // Investment Commission statistics (based on team deposits)
  const investmentCommission = {
    total: levelConfig.reduce((sum, level) => {
      const levelDeposits = safeNumber(teamData[level.key]?.stats?.totalTeamDeposit);
      return sum + (levelDeposits * (level.investmentRate / 100));
    }, 0),
    byLevel: levelConfig.map(level => ({
      label: level.label,
      rate: level.investmentRate,
      amount: safeNumber(teamData[level.key]?.stats?.totalTeamDeposit) * (level.investmentRate / 100),
      deposits: safeNumber(teamData[level.key]?.stats?.totalTeamDeposit),
    })),
  };

  // Team Commission statistics (based on team earnings - using commissionSummary)
  const teamCommission = {
    total: safeNumber(teamData.commissionSummary?.grandTotalCommission),
    byLevel: [
      {
        label: "Level 1",
        rate: teamRates.level1,
        amount: safeNumber(teamData.commissionSummary?.level1Commission),
      },
      {
        label: "Level 2",
        rate: teamRates.level2,
        amount: safeNumber(teamData.commissionSummary?.level2Commission),
      },
      {
        label: "Level 3",
        rate: teamRates.level3,
        amount: safeNumber(teamData.commissionSummary?.level3Commission),
      },
      {
        label: "Level 4",
        rate: teamRates.level4,
        amount: safeNumber(teamData.commissionSummary?.level4Commission),
      },
      {
        label: "Level 5",
        rate: teamRates.level5,
        amount: safeNumber(teamData.commissionSummary?.level5Commission),
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const tabs = [
    { id: "all", label: "All Overview", icon: <FiPieChart /> },
    { id: "personal", label: "Personal", icon: <FiUser /> },
    { id: "team", label: "Team", icon: <FaUsersIcon /> },
    { id: "commission", label: "Commission", icon: <FaCoins /> },
  ];

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
              <h2 className="sx-title">Earnings Summary</h2>
              <p className="sx-subtitle">Track all your earnings and performance</p>
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

        <div className="es-shell">
          {/* Header Section */}
          <div className="es-header-section">
            <div className="es-header-content">
              <div className="es-header-badge">
                <FiBarChart2 /> EARNINGS OVERVIEW
              </div>
              <h1 className="es-header-title">Your Financial Dashboard</h1>
              <p className="es-header-subtitle">
                Complete breakdown of your personal earnings, team performance, and commission structure
              </p>
            </div>
          </div>

          {/* User Info Card */}
          <div className="es-user-card">
            <div className="es-user-avatar">
              <FiUser />
            </div>
            <div className="es-user-details">
              <h3 className="es-user-name">{userData?.fullName || "User"}</h3>
              <div className="es-user-meta">
                <span className="es-user-id">ID: {userStats.referralCode}</span>
                <span className="es-user-date">Joined: {userStats.joinedDate}</span>
              </div>
            </div>
            <div className="es-user-balance">
              <span className="es-balance-label">Current Balance</span>
              <strong className="es-balance-value">{formatCurrency(userStats.balance)}</strong>
            </div>
          </div>

          {/* Tabs */}
          <div className="es-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`es-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="es-tab-icon">{tab.icon}</span>
                <span className="es-tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* All Overview Tab */}
          {activeTab === "all" && (
            <>
              {/* Personal Summary */}
              <div className="es-section">
                <h3 className="es-section-title">
                  <FiUser /> Personal Summary
                </h3>
                <div className="es-stats-grid es-stats-grid-4">
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #22e88c15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#22e88c' }}>
                      <FaDownload />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Total Deposits</span>
                      <strong className="es-stat-value">{formatCurrency(userStats.deposits)}</strong>
                    </div>
                  </div>
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #ff5a8715, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#ff5a87' }}>
                      <FaUpload />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Total Withdrawals</span>
                      <strong className="es-stat-value">{formatCurrency(userStats.withdrawals)}</strong>
                    </div>
                  </div>
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #5aa6ff15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#5aa6ff' }}>
                      <FiTrendingUp />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Total Investment</span>
                      <strong className="es-stat-value">{formatCurrency(userStats.investment)}</strong>
                    </div>
                  </div>
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #ffd70015, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#ffd700' }}>
                      <FaWallet />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Current Balance</span>
                      <strong className="es-stat-value">{formatCurrency(userStats.balance)}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Summary */}
              <div className="es-section">
                <h3 className="es-section-title">
                  <FaUsersIcon /> Team Summary
                </h3>
                <div className="es-stats-grid es-stats-grid-4">
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #22e88c15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#22e88c' }}>
                      <FaUsersIcon />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Total Members</span>
                      <strong className="es-stat-value">{formatNumber(teamStats.totalMembers)}</strong>
                    </div>
                  </div>
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #5aa6ff15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#5aa6ff' }}>
                      <FaMoneyBillWave />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Team Deposits</span>
                      <strong className="es-stat-value">{formatCurrency(teamStats.totalDeposits)}</strong>
                    </div>
                  </div>
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #ffb14d15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#ffb14d' }}>
                      <FaWallet />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Team Withdrawals</span>
                      <strong className="es-stat-value">{formatCurrency(teamStats.totalWithdrawals)}</strong>
                    </div>
                  </div>
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #c77dff15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#c77dff' }}>
                      <FiTrendingUp />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Plan Investment</span>
                      <strong className="es-stat-value">{formatCurrency(teamStats.planInvestment)}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commission Summary - Both Types */}
              <div className="es-section">
                <h3 className="es-section-title">
                  <FaCoins /> Commission Summary
                </h3>
                <div className="es-stats-grid es-stats-grid-2">
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #22e88c15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#22e88c' }}>
                      <FaMoneyBillWave />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Investment Commission</span>
                      <strong className="es-stat-value">{formatCurrency(investmentCommission.total)}</strong>
                      <span className="es-stat-sub">From team deposits</span>
                    </div>
                  </div>
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #ffd70015, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#ffd700' }}>
                      <FaCoins />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Team Commission</span>
                      <strong className="es-stat-value">{formatCurrency(teamCommission.total)}</strong>
                      <span className="es-stat-sub">From team earnings</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Activity */}
              <div className="es-section">
                <h3 className="es-section-title">
                  <FiClock /> Today's Activity
                </h3>
                <div className="es-stats-grid es-stats-grid-2">
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #22e88c15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#22e88c' }}>
                      <FaDownload />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Today's Team Deposits</span>
                      <strong className="es-stat-value">{formatCurrency(teamStats.todayDeposits)}</strong>
                    </div>
                  </div>
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #ff5a8715, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#ff5a87' }}>
                      <FaUpload />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Today's Team Withdrawals</span>
                      <strong className="es-stat-value">{formatCurrency(teamStats.todayWithdrawals)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Personal Tab */}
          {activeTab === "personal" && (
            <div className="es-section">
              <h3 className="es-section-title">
                <FiUser /> Personal Financial Details
              </h3>
              <div className="es-details-grid">
                <div className="es-detail-item">
                  <span className="es-detail-label">Full Name</span>
                  <span className="es-detail-value">{userData?.fullName || "N/A"}</span>
                </div>
                <div className="es-detail-item">
                  <span className="es-detail-label">Email Address</span>
                  <span className="es-detail-value">{userData?.email || "N/A"}</span>
                </div>
                <div className="es-detail-item">
                  <span className="es-detail-label">Phone Number</span>
                  <span className="es-detail-value">{userData?.whatsappNumber || "N/A"}</span>
                </div>
                <div className="es-detail-item">
                  <span className="es-detail-label">Referral Code</span>
                  <span className="es-detail-value es-highlight">{userStats.referralCode}</span>
                </div>
                <div className="es-detail-item">
                  <span className="es-detail-label">Total Deposits</span>
                  <span className="es-detail-value">{formatCurrency(userStats.deposits)}</span>
                </div>
                <div className="es-detail-item">
                  <span className="es-detail-label">Total Withdrawals</span>
                  <span className="es-detail-value">{formatCurrency(userStats.withdrawals)}</span>
                </div>
                <div className="es-detail-item">
                  <span className="es-detail-label">Total Investment</span>
                  <span className="es-detail-value">{formatCurrency(userStats.investment)}</span>
                </div>
                <div className="es-detail-item">
                  <span className="es-detail-label">Current Balance</span>
                  <span className="es-detail-value es-highlight">{formatCurrency(userStats.balance)}</span>
                </div>
                <div className="es-detail-item">
                  <span className="es-detail-label">Member Since</span>
                  <span className="es-detail-value">{userStats.joinedDate}</span>
                </div>
                <div className="es-detail-item">
                  <span className="es-detail-label">User ID</span>
                  <span className="es-detail-value">{userId?.slice(-8) || "N/A"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <>
              <div className="es-section">
                <h3 className="es-section-title">
                  <FaUsersIcon /> Team Overview
                </h3>
                <div className="es-stats-grid es-stats-grid-3">
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #22e88c15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#22e88c' }}>
                      <FaUsersIcon />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Total Team Members</span>
                      <strong className="es-stat-value">{formatNumber(teamStats.totalMembers)}</strong>
                    </div>
                  </div>
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #5aa6ff15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#5aa6ff' }}>
                      <FaMoneyBillWave />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Team Deposits</span>
                      <strong className="es-stat-value">{formatCurrency(teamStats.totalDeposits)}</strong>
                    </div>
                  </div>
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #ffb14d15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#ffb14d' }}>
                      <FaWallet />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Team Withdrawals</span>
                      <strong className="es-stat-value">{formatCurrency(teamStats.totalWithdrawals)}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="es-section">
                <h3 className="es-section-title">
                  <FaChartLine /> Team Performance by Level
                </h3>
                <div className="es-levels-grid">
                  {levelConfig.map((level) => {
                    const levelData = teamData[level.key]?.stats;
                    return (
                      <div key={level.key} className="es-level-card" style={{ borderLeftColor: level.color }}>
                        <div className="es-level-header">
                          <span className="es-level-icon" style={{ color: level.color }}>{level.icon}</span>
                          <span className="es-level-name">{level.label}</span>
                        </div>
                        <div className="es-level-stats">
                          <div className="es-level-stat">
                            <span>Members</span>
                            <strong>{formatNumber(levelData?.totalUsers || 0)}</strong>
                          </div>
                          <div className="es-level-stat">
                            <span>Deposits</span>
                            <strong>{formatCurrency(levelData?.totalTeamDeposit || 0)}</strong>
                          </div>
                          <div className="es-level-stat">
                            <span>Withdrawals</span>
                            <strong>{formatCurrency(levelData?.totalTeamWithdrawal || 0)}</strong>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Team Commission Section */}
              <div className="es-section">
                <h3 className="es-section-title">
                  <FaCoins /> Team Commission
                </h3>
                <div className="es-commission-grid">
                  {teamCommission.byLevel.map((level, index) => (
                    <div key={index} className="es-commission-card">
                      <div className="es-commission-header">
                        <span className="es-commission-level">{level.label}</span>
                        <span className="es-commission-rate">{level.rate}%</span>
                      </div>
                      <div className="es-commission-amount">
                        {formatCurrency(level.amount)}
                      </div>
                      <div className="es-commission-progress">
                        <div 
                          className="es-commission-progress-bar" 
                          style={{ 
                            width: `${teamCommission.total > 0 ? (level.amount / teamCommission.total) * 100 : 0}%`,
                            backgroundColor: levelConfig[index]?.color 
                          }}
                        />
                      </div>
                      <span className="es-commission-percent">
                        {teamCommission.total > 0 ? ((level.amount / teamCommission.total) * 100).toFixed(1) : 0}% of total
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Commission Tab */}
          {activeTab === "commission" && (
            <>
              <div className="es-section">
                <h3 className="es-section-title">
                  <FaCoins /> Investment Commission
                </h3>
                <div className="es-stats-grid es-stats-grid-1">
                  <div className="es-stat-card es-stat-card-large" style={{ background: 'linear-gradient(135deg, #22e88c15, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#22e88c' }}>
                      <FaMoneyBillWave />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Total Investment Commission</span>
                      <strong className="es-stat-value es-large">{formatCurrency(investmentCommission.total)}</strong>
                      <span className="es-stat-sub">Based on team deposits at specified rates</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="es-section">
                <h3 className="es-section-title">
                  <FiGrid /> Investment Commission by Level
                </h3>
                <div className="es-commission-grid">
                  {investmentCommission.byLevel.map((level, index) => (
                    <div key={index} className="es-commission-card">
                      <div className="es-commission-header">
                        <span className="es-commission-level">{level.label}</span>
                        <span className="es-commission-rate">{level.rate}%</span>
                      </div>
                      <div className="es-commission-amount">
                        {formatCurrency(level.amount)}
                      </div>
                      <div className="es-commission-detail">
                        <span className="es-commission-detail-label">Team Deposits:</span>
                        <span className="es-commission-detail-value">{formatCurrency(level.deposits)}</span>
                      </div>
                      <div className="es-commission-progress">
                        <div 
                          className="es-commission-progress-bar" 
                          style={{ 
                            width: `${investmentCommission.total > 0 ? (level.amount / investmentCommission.total) * 100 : 0}%`,
                            backgroundColor: levelConfig[index]?.color 
                          }}
                        />
                      </div>
                      <span className="es-commission-percent">
                        {investmentCommission.total > 0 ? ((level.amount / investmentCommission.total) * 100).toFixed(1) : 0}% of total
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Commission Summary (for reference) */}
              <div className="es-section">
                <h3 className="es-section-title">
                  <FaUsers /> Team Commission (Reference)
                </h3>
                <div className="es-stats-grid es-stats-grid-1">
                  <div className="es-stat-card" style={{ background: 'linear-gradient(135deg, #ffd70015, #9060ff15)' }}>
                    <div className="es-stat-icon" style={{ color: '#ffd700' }}>
                      <FaCoins />
                    </div>
                    <div className="es-stat-content">
                      <span className="es-stat-label">Total Team Commission</span>
                      <strong className="es-stat-value">{formatCurrency(teamCommission.total)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}