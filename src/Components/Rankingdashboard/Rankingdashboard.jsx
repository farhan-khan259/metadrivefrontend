import { useEffect, useState } from "react";
import {
  FiActivity,
  FiArrowDown,
  FiArrowUp,
  FiBell,
  FiCheckCircle,
  FiChevronRight,
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiMenu,
  FiShield,
  FiPieChart,
  FiUser,
  FiUsers,
  FiX,
  FiArrowLeft,
  FiAward,
  FiTrendingUp,
  FiTarget,
  FiGift,
  FiStar,
  FiZap,
  FiBarChart2,
} from "react-icons/fi";
import { FaGift, FaTags, FaWhatsapp, FaCrown, FaTrophy, FaMedal, FaRocket } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./Rankingdashboard.css";



export default function Rankingdashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({ show: false, type: "success", message: "" });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  const whatsappGroupLink = "https://chat.whatsapp.com/FvRiiZs7DyhIDIDHxTdRNj?mode=gi_t";

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

  const ranks = [
    {
      name: "Starter",
      level: 1,
      personal: 1000,
      team: 15000,
      reward: 100,
     
      icon: <FiStar />,
      color: "#6c757d",
    },
    {
      name: "Bronze",
      level: 2,
      personal: 1000,
      team: 25000,
      reward: 200,
      
      icon: <FaMedal />,
      color: "#cd7f32",
    },
    {
      name: "Silver",
      level: 3,
      personal: 1000,
      team: 50000,
      reward: 1000,
     
      icon: <FaMedal />,
      color: "#c0c0c0",
    },
    {
      name: "Gold",
      level: 4,
      personal: 1000,
      team: 150000,
      reward: 3000,
     
      icon: <FaMedal />,
      color: "#ffd700",
    },
    {
      name: "Platinum",
      level: 5,
      personal: 1000,
      team: 300000,
      reward: 5000,
     
      icon: <FaTrophy />,
      color: "#e5e4e2",
    },
    {
      name: "Diamond",
      level: 6,
      personal: 1000,
      team: 500000,
      reward: 10000,
     
      icon: <FaTrophy />,
      color: "#b9f2ff",
    },
    {
      name: "Master",
      level: 7,
      personal: 1000,
      team: 700000,
      reward: 15000,
    
      icon: <FaCrown />,
      color: "#9370db",
    },
    {
      name: "Grandmaster",
      level: 8,
      personal: 1000,
      team: 1000000,
      reward: 25000,
    
      icon: <FaCrown />,
      color: "#4b0082",
    },
    {
      name: "Elite",
      level: 9,
      personal: 1000,
      team: 1500000,
      reward: 35000,
     
      icon: <FaRocket />,
      color: "#ff4500",
    },
    {
      name: "Legend",
      level: 10,
      personal: 1000,
      team: 2000000,
      reward: 40000,
     
      icon: <FiZap />,
      color: "#ff1493",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post("https://be.sparkx1.pro/team", {
          userId,
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load ranking data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const personalCurrent = userData?.user?.UserInvestment || 0;
  const teamCurrent = userData?.teamPlanInvestment || 0;

  const calculateCurrentLevel = () => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (
        personalCurrent >= ranks[i].personal &&
        teamCurrent >= ranks[i].team
      ) {
        return i;
      }
    }
    return -1;
  };

  const currentLevelIndex = calculateCurrentLevel();
  const nextLevelIndex = currentLevelIndex + 1 < ranks.length ? currentLevelIndex + 1 : -1;

  const calculateProgress = (current, required) => {
    return Math.min((current / required) * 100, 100);
  };

  const handleClaimReward = async (rankIndex, rewardAmount) => {
    const rankName = ranks[rankIndex].name;

    const alreadyClaimed = userData?.user?.claimedRanks?.some(
      (claimedRank) => claimedRank.rankName === rankName
    );

    if (alreadyClaimed) {
      setPopup({
        show: true,
        type: "error",
        message: "Reward already claimed!",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://be.sparkx1.pro/api/claimReward",
        {
          userId,
          rank: rankName,
          reward: rewardAmount,
        }
      );

      if (response.data.success) {
        setPopup({
          show: true,
          type: "success",
          message: `🎉 ${response.data.message}\nNew Balance: $ ${response.data.newBalance.toLocaleString()}`,
        });

        // Refresh user data
        const updatedResponse = await axios.post("https://be.sparkx1.pro/team", {
          userId,
        });
        setUserData(updatedResponse.data);
      } else {
        setPopup({
          show: true,
          type: "error",
          message: response.data.message,
        });
      }
    } catch (err) {
      setPopup({
        show: true,
        type: "error",
        message: `Failed to claim reward: ${err.response?.data?.message || "Please try again."}`,
      });
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

  if (loading) {
    return (
      <div className="sx-dashboard-root">
        <div className="rank-state-shell">
          <div className="rank-state-card">
            <div className="rank-state-spinner" />
            <p>Loading ranking data...</p>
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
              <h2 className="sx-title">Rankings & Rewards</h2>
              <p className="sx-subtitle">Track your progress and claim exclusive rewards</p>
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

        <div className="rank-shell">
          {/* Header Section */}
          <div className="rank-header-section">
            
            <div className="rank-header-content">
              <div className="rank-header-badge">
                <FaTrophy /> GOALS & REWARDS
              </div>
              <h1 className="rank-header-title">Achievement Ranks</h1>
              <p className="rank-header-subtitle">
                Complete investment milestones to unlock exclusive rewards and benefits
              </p>
            </div>
          </div>

          {/* Current Status Card */}
          <div className="rank-status-card">
            <div className="rank-status-left">
              <span className="rank-status-label">Current Rank</span>
              <div className="rank-status-value">
                {currentLevelIndex >= 0 ? (
                  <>
                    <span 
                      className="rank-status-icon"
                      style={{ color: ranks[currentLevelIndex].color }}
                    >
                      {ranks[currentLevelIndex].icon}
                    </span>
                    <h2>{ranks[currentLevelIndex].name}</h2>
                  </>
                ) : (
                  <>
                    <FiTarget className="rank-status-icon" />
                    <h2>No Rank Yet</h2>
                  </>
                )}
              </div>
            </div>
            
            {nextLevelIndex >= 0 && (
              <div className="rank-status-right">
                <span className="rank-status-label">Next Goal</span>
                <div className="rank-next-goal">
                  <div className="rank-next-info">
                    <span 
                      className="rank-next-icon"
                      style={{ color: ranks[nextLevelIndex].color }}
                    >
                      {ranks[nextLevelIndex].icon}
                    </span>
                    <span className="rank-next-name">{ranks[nextLevelIndex].name}</span>
                  </div>
                  <div className="rank-next-progress">
                    <div className="rank-next-progress-bar">
                      <div 
                        className="rank-next-progress-fill"
                        style={{ 
                          width: `${calculateProgress(teamCurrent, ranks[nextLevelIndex].team)}%` 
                        }}
                      />
                    </div>
                    <span className="rank-next-percent">
                      {calculateProgress(teamCurrent, ranks[nextLevelIndex].team).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Investment Summary */}
          <div className="rank-summary-grid">
            <div className="rank-summary-card">
              <div className="rank-summary-icon">
                <FiTrendingUp />
              </div>
              <div className="rank-summary-info">
                <span className="rank-summary-label">Personal Investment</span>
                <strong className="rank-summary-value">{formatCurrency(personalCurrent)}</strong>
              </div>
            </div>
            <div className="rank-summary-card">
              <div className="rank-summary-icon">
                <FiUsers />
              </div>
              <div className="rank-summary-info">
                <span className="rank-summary-label">Team Investment</span>
                <strong className="rank-summary-value">{formatCurrency(teamCurrent)}</strong>
              </div>
            </div>
          </div>

          {/* Ranks Grid */}
          <div className="rank-grid">
            {ranks.map((rank, index) => {
              const personalProgress = calculateProgress(personalCurrent, rank.personal);
              const teamProgress = calculateProgress(teamCurrent, rank.team);
              const overallProgress = (personalProgress + teamProgress) / 2;
              const isCurrentRank = index === currentLevelIndex;
              const isPastRank = index < currentLevelIndex;
              const isNextRank = index === nextLevelIndex;
              const alreadyClaimed = userData?.user?.claimedRanks?.some(
                (claimedRank) => claimedRank.rankName === rank.name
              );
              const canClaim = personalCurrent >= rank.personal && teamCurrent >= rank.team && !alreadyClaimed;

              return (
                <div 
                  key={index} 
                  className={`rank-card ${isCurrentRank ? 'current' : ''} ${isPastRank ? 'completed' : ''} ${isNextRank ? 'next' : ''}`}
                  style={{ '--rank-color': rank.color }}
                >
                  <div className="rank-card-header">
                   
                    <div className="rank-card-title">
                      <div className="rank-card-name">
                        <span className="rank-card-icon" style={{ color: rank.color }}>
                          {rank.icon}
                        </span>
                        <h3>{rank.name}</h3>
                      </div>
                      <div className="rank-card-level">
                        <span className="rank-level-pill">Level {rank.level}</span>
                        {isCurrentRank && (
                          <span className="rank-current-pill">
                            <FiCheckCircle /> Current
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rank-card-content">
                    {/* Requirements */}
                    <div className="rank-requirements">
                      <div className="rank-requirement">
                        <span className="rank-requirement-label">Personal</span>
                        <span className="rank-requirement-value">{formatCurrency(rank.personal)}</span>
                        <div className="rank-requirement-progress">
                          <div 
                            className="rank-requirement-fill"
                            style={{ width: `${personalProgress}%` }}
                          />
                        </div>
                        <span className="rank-requirement-percent">{personalProgress.toFixed(1)}%</span>
                      </div>
                      <div className="rank-requirement">
                        <span className="rank-requirement-label">Team</span>
                        <span className="rank-requirement-value">{formatCurrency(rank.team)}</span>
                        <div className="rank-requirement-progress">
                          <div 
                            className="rank-requirement-fill"
                            style={{ width: `${teamProgress}%` }}
                          />
                        </div>
                        <span className="rank-requirement-percent">{teamProgress.toFixed(1)}%</span>
                      </div>
                    </div>

                    {/* Reward Section */}
                    <div className="rank-reward-section">
                      <div className="rank-reward-info">
                        <FiGift className="rank-reward-icon" />
                        <div>
                          <span className="rank-reward-label">Reward</span>
                          <strong className="rank-reward-amount">{formatCurrency(rank.reward)}</strong>
                        </div>
                      </div>

                      {canClaim ? (
                        <button
                          className="rank-claim-btn"
                          onClick={() => handleClaimReward(index, rank.reward)}
                        >
                          Claim Reward
                        </button>
                      ) : alreadyClaimed ? (
                        <div className="rank-claimed-badge">
                          <FiCheckCircle /> Claimed
                        </div>
                      ) : (
                        <div className="rank-locked-badge">
                          <FiTarget /> Locked
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="rank-overall-progress">
                      <div className="rank-overall-progress-bar">
                        <div 
                          className="rank-overall-progress-fill"
                          style={{ width: `${overallProgress}%` }}
                        />
                      </div>
                      <span className="rank-overall-percent">{overallProgress.toFixed(1)}% Complete</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Success/Error Popup */}
      {popup.show && (
        <div
          className="rank-popup-overlay"
          onClick={() => setPopup({ ...popup, show: false })}
        >
          <div
            className={`rank-popup rank-popup-${popup.type}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rank-popup-icon">
              {popup.type === "success" ? "🎉" : "⚠️"}
            </div>
            <h3 className="rank-popup-title">
              {popup.type === "success" ? "Congratulations!" : "Oops!"}
            </h3>
            <p className="rank-popup-message">{popup.message}</p>
            <button
              className="rank-popup-close"
              onClick={() => setPopup({ ...popup, show: false })}
            >
              {popup.type === "success" ? "Awesome!" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}