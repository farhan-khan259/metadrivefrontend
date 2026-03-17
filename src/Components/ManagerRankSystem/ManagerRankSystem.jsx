import { useEffect, useState } from "react";
import {
  FiActivity,
  FiArrowDown,
  FiArrowUp,
  FiBell,
  FiCheckCircle,
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiMenu,
  FiShield,
  FiUser,
  FiUsers,
  FiPieChart,
  FiX,
  FiArrowLeft,
  FiTrendingUp,
  FiAward,
  FiClock,
  FiInfo,
  FiTarget,
} from "react-icons/fi";
import { FaGift, FaTags, FaWhatsapp, FaTrophy, FaCrown, FaMedal, FaStar, FaRocket, FaChartLine } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./ManagerRankSystem.css";

export default function ManagerRankSystem() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const [claimingRank, setClaimingRank] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [rankData, setRankData] = useState(null);
  const [userStats, setUserStats] = useState(null);

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

  // Manager Rank Definitions
  const managerRanks = [
    {
      id: "v1",
      version: "V1",
      title: "Manager Rank V1",
      selfInvestment: 5,
      directActive: 10,
      indirectActive: 30,
      growthRate: 50,
      salary: 35,
      icon: <FaStar />,
      color: "#22e88c",
      bgGradient: "linear-gradient(135deg, #22e88c15, #9060ff15)",
    },
    {
      id: "v2",
      version: "V2",
      title: "Manager Rank V2",
      selfInvestment: 10,
      directActive: 20,
      indirectActive: 60,
      growthRate: 50,
      salary: 70,
      icon: <FaMedal />,
      color: "#5aa6ff",
      bgGradient: "linear-gradient(135deg, #5aa6ff15, #9060ff15)",
    },
    {
      id: "v3",
      version: "V3",
      title: "Manager Rank V3",
      selfInvestment: 20,
      directActive: 35,
      indirectActive: 80,
      growthRate: 50,
      salary: 150,
      icon: <FaMedal />,
      color: "#c77dff",
      bgGradient: "linear-gradient(135deg, #c77dff15, #9060ff15)",
    },
    {
      id: "v4",
      version: "V4",
      title: "Manager Rank V4",
      selfInvestment: 30,
      directActive: 50,
      indirectActive: 150,
      growthRate: 50,
      salary: 250,
      icon: <FaTrophy />,
      color: "#ffb14d",
      bgGradient: "linear-gradient(135deg, #ffb14d15, #9060ff15)",
    },
    {
      id: "v5",
      version: "V5",
      title: "Manager Rank V5",
      selfInvestment: 40,
      directActive: 100,
      indirectActive: 300,
      growthRate: 50,
      salary: 600,
      icon: <FaCrown />,
      color: "#ff5a87",
      bgGradient: "linear-gradient(135deg, #ff5a8715, #9060ff15)",
    },
    {
      id: "v6",
      version: "V6",
      title: "Manager Rank V6",
      selfInvestment: 50,
      directActive: 150,
      indirectActive: 500,
      growthRate: 50,
      salary: 1500,
      icon: <FaRocket />,
      color: "#ffd700",
      bgGradient: "linear-gradient(135deg, #ffd70015, #9060ff15)",
    },
  ];

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // Fetch user stats and rank data
  const fetchUserStats = async () => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Fetch team data to get direct and indirect members
      const teamResponse = await axios.post("https://be.sparkx1.pro/team", {
        userId,
      });

      // Fetch user's investment and rank data
      const userResponse = await axios.post("https://be.sparkx1.pro/user/stats", {
        userId,
      });

      // Calculate active members (those with deposits)
      const directMembers = teamResponse.data.directReferrals?.members || [];
      const indirectMembers = teamResponse.data.indirectReferrals?.members || [];

      const activeDirect = directMembers.filter(m => m.payments?.totalDeposit > 0).length;
      const activeIndirect = indirectMembers.filter(m => m.payments?.totalDeposit > 0).length;

      setUserStats({
        selfInvestment: userResponse.data?.totalInvestment || 0,
        directActive: activeDirect,
        indirectActive: activeIndirect,
        claimedRanks: userResponse.data?.claimedManagerRanks || [],
        lastSalaryClaim: userResponse.data?.lastSalaryClaim,
      });

      setError("");
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError(err?.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleClaimSalary = async (rank) => {
    if (!userId || claimingRank) return;

    try {
      setClaimingRank(rank.id);

      // Check if all requirements are met
      if (userStats.selfInvestment < rank.selfInvestment) {
        showToast(`Self investment of $${rank.selfInvestment} required`, "error");
        return;
      }
      if (userStats.directActive < rank.directActive) {
        showToast(`${rank.directActive} direct active members required`, "error");
        return;
      }
      if (userStats.indirectActive < rank.indirectActive) {
        showToast(`${rank.indirectActive} indirect active members required`, "error");
        return;
      }

      // Check if already claimed this rank
      if (userStats.claimedRanks?.includes(rank.id)) {
        showToast(`You have already claimed ${rank.title} salary`, "error");
        return;
      }

      const response = await axios.post("https://be.sparkx1.pro/manager/claim-salary", {
        userId,
        rankId: rank.id,
        salary: rank.salary,
      });

      if (response.data.success) {
        // Update user stats
        setUserStats(prev => ({
          ...prev,
          claimedRanks: [...(prev.claimedRanks || []), rank.id],
        }));

        // Update local storage balance
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (storedUser && storedUser._id === userId) {
          storedUser.userbalance = (storedUser.userbalance || 0) + rank.salary;
          localStorage.setItem("user", JSON.stringify(storedUser));
        }

        showToast(`Successfully claimed $${rank.salary} salary for ${rank.title}!`, "success");
      }
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to claim salary", "error");
    } finally {
      setClaimingRank(null);
    }
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateProgress = (current, required) => {
    return Math.min((current / required) * 100, 100);
  };

  if (loading) {
    return (
      <div className="sx-dashboard-root">
        <div className="mr-state-shell">
          <div className="mr-state-card">
            <div className="mr-state-spinner" />
            <p>Loading manager rank data...</p>
          </div>
        </div>
      </div>
    );
  }

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
              <h2 className="sx-title">Manager Rank System</h2>
              <p className="sx-subtitle">Climb the ranks and earn 15-day salaries</p>
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

        <div className="mr-shell">
          {/* Header Section */}
          <div className="mr-header-section">
           
            <div className="mr-header-content">
              <div className="mr-header-badge">
                <FaCrown /> MANAGER RANK PROGRAM
              </div>
              <h1 className="mr-header-title">15-Day Salary System</h1>
              <p className="mr-header-subtitle">
                Achieve ranks by building your team and earn guaranteed salaries every 15 days
              </p>
            </div>
          </div>

          {/* User Stats Summary */}
          <div className="mr-stats-grid">
            <div className="mr-stat-card">
              <div className="mr-stat-icon" style={{ background: 'rgba(34, 232, 140, 0.1)', color: '#22e88c' }}>
                <FiTrendingUp />
              </div>
              <div className="mr-stat-info">
                <span className="mr-stat-label">Self Investment</span>
                <strong className="mr-stat-value">{formatCurrency(userStats?.selfInvestment || 0)}</strong>
              </div>
            </div>
            <div className="mr-stat-card">
              <div className="mr-stat-icon" style={{ background: 'rgba(90, 166, 255, 0.1)', color: '#5aa6ff' }}>
                <FiUsers />
              </div>
              <div className="mr-stat-info">
                <span className="mr-stat-label">Direct Active</span>
                <strong className="mr-stat-value">{userStats?.directActive || 0}</strong>
              </div>
            </div>
            <div className="mr-stat-card">
              <div className="mr-stat-icon" style={{ background: 'rgba(199, 125, 255, 0.1)', color: '#c77dff' }}>
                <FiUsers />
              </div>
              <div className="mr-stat-info">
                <span className="mr-stat-label">Indirect Active</span>
                <strong className="mr-stat-value">{userStats?.indirectActive || 0}</strong>
              </div>
            </div>
            <div className="mr-stat-card">
              <div className="mr-stat-icon" style={{ background: 'rgba(255, 215, 0, 0.1)', color: '#ffd700' }}>
                <FaTrophy />
              </div>
              <div className="mr-stat-info">
                <span className="mr-stat-label">Ranks Achieved</span>
                <strong className="mr-stat-value">{userStats?.claimedRanks?.length || 0}/6</strong>
              </div>
            </div>
          </div>

          {/* Important Guidelines */}
          <div className="mr-guidelines-card">
            <div className="mr-guidelines-header">
              <FiInfo className="mr-guidelines-icon" />
              <h3>Important Guidelines – 15 Days Salary System</h3>
            </div>
            <div className="mr-guidelines-content">
              <p>
                In <strong>Spark X,</strong> a <strong>15-day salary system</strong> has been introduced under the{' '}
                <strong>Manager Rank Program.</strong> To qualify for this salary, every member must fulfill the required conditions.
              </p>
              <p>
                According to this system, <strong>Self Investment, Direct Active Members, and Indirect Active Members</strong>{' '}
                must all be completed. If any of these requirements are not fulfilled, the member will{' '}
                <strong>not be eligible to receive the 15-day salary.</strong>
              </p>
              <div className="mr-guidelines-warning">
                <FiTarget />
                <p>
                  Members are strictly advised <strong>not to create fake or non-genuine accounts.</strong> Always build your team with{' '}
                  <strong>real and active members</strong> so that you can easily complete your targets and qualify for the salary.
                </p>
              </div>
              <p className="mr-guidelines-motivation">
                🚀 Work smart, build a strong team, and achieve success with Spark X.
              </p>
            </div>
          </div>

          {/* Ranks Grid */}
          <div className="mr-ranks-grid">
            {managerRanks.map((rank) => {
              const isClaimed = userStats?.claimedRanks?.includes(rank.id);
              const canClaim = !isClaimed &&
                userStats?.selfInvestment >= rank.selfInvestment &&
                userStats?.directActive >= rank.directActive &&
                userStats?.indirectActive >= rank.indirectActive;

              const selfProgress = calculateProgress(userStats?.selfInvestment || 0, rank.selfInvestment);
              const directProgress = calculateProgress(userStats?.directActive || 0, rank.directActive);
              const indirectProgress = calculateProgress(userStats?.indirectActive || 0, rank.indirectActive);

              return (
                <div
                  key={rank.id}
                  className={`mr-rank-card ${isClaimed ? 'claimed' : ''}`}
                  style={{ background: rank.bgGradient }}
                >
                  <div className="mr-rank-header">
                    <div className="mr-rank-version" style={{ color: rank.color }}>
                      <span className="mr-rank-icon">{rank.icon}</span>
                      <span>{rank.version}</span>
                    </div>
                    <h3 className="mr-rank-title">{rank.title}</h3>
                  </div>

                  <div className="mr-rank-requirements">
                    <div className="mr-requirement-item">
                      <span className="mr-req-label">Self Investment</span>
                      <span className="mr-req-value">{formatCurrency(rank.selfInvestment)}</span>
                      <div className="mr-progress-bar">
                        <div
                          className="mr-progress-fill"
                          style={{ width: `${selfProgress}%`, background: rank.color }}
                        />
                      </div>
                      <span className="mr-progress-text">{selfProgress.toFixed(0)}%</span>
                    </div>

                    <div className="mr-requirement-item">
                      <span className="mr-req-label">Direct Active</span>
                      <span className="mr-req-value">{rank.directActive} members</span>
                      <div className="mr-progress-bar">
                        <div
                          className="mr-progress-fill"
                          style={{ width: `${directProgress}%`, background: rank.color }}
                        />
                      </div>
                      <span className="mr-progress-text">{directProgress.toFixed(0)}%</span>
                    </div>

                    <div className="mr-requirement-item">
                      <span className="mr-req-label">Indirect Active</span>
                      <span className="mr-req-value">{rank.indirectActive} members</span>
                      <div className="mr-progress-bar">
                        <div
                          className="mr-progress-fill"
                          style={{ width: `${indirectProgress}%`, background: rank.color }}
                        />
                      </div>
                      <span className="mr-progress-text">{indirectProgress.toFixed(0)}%</span>
                    </div>
                  </div>

                  <div className="mr-rank-footer">
                    <div className="mr-salary-info">
                      <span className="mr-salary-label">15 Days Salary</span>
                      <strong className="mr-salary-amount">{formatCurrency(rank.salary)}</strong>
                      <span className="mr-growth-rate">Growth: {rank.growthRate}%</span>
                    </div>

                  
                  </div>
                </div>
              );
            })}
          </div>

          {/* Toast Notification */}
          {toast.show && (
            <div className={`mr-toast mr-toast-${toast.type}`}>
              {toast.message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}