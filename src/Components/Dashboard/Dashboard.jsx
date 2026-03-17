import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiArrowDown,
  FiArrowUp,
  FiBell,
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiPieChart,
  FiMenu,
  FiShield,
  FiUser,
  FiUsers,
  FiX,
  FiClock,
} from "react-icons/fi";
import { 
  FaEye, 
  FaEyeSlash, 
  FaGift, 
  FaTags, 
  FaWhatsapp, 
  FaTrophy, 
  FaCrown, 
  FaMedal, 
  FaStar, 
  FaRocket,
  FaBitcoin,
  FaCoins,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoimagemetadrive from "../../Assets/Pictures/sparkx-logo.jpeg";
import WelcomePopup from "../WelcomePopup/WelcomePopup";
import "./Dashboard.css";

const USD_TO_PKR = 280;
const whatsappGroupLink = "https://chat.whatsapp.com/FvRiiZs7DyhIDIDHxTdRNj?mode=gi_t";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  const [teamData, setTeamData] = useState({
    user: {},
    commissionSummary: {},
  });
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  const shouldShowWelcomePopup =
    new URLSearchParams(location.search).get("welcome") === "1" && !welcomeDismissed;

  const user = useMemo(() => {
    const str = localStorage.getItem("user");
    return str ? JSON.parse(str) : null;
  }, []);

  const userId = user?._id;

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

  const fetchTeamData = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.post("https://be.sparkx1.pro/team", { userId });
      setTeamData(res.data || {});
      
      // Fetch active investments
      const investmentsRes = await axios.get(`https://be.sparkx1.pro/api/user/investments/${userId}`);
      setActiveInvestments(investmentsRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchTeamData();
    const interval = setInterval(fetchTeamData, 60000);
    return () => clearInterval(interval);
  }, [fetchTeamData]);

  // Timer effect for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      activeInvestments.forEach(investment => {
        const endTime = new Date(investment.nextPayout).getTime();
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
          newTimeLeft[investment._id] = "Ready";
          // Trigger payout refresh
          fetchTeamData();
        } else {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          newTimeLeft[investment._id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeInvestments, fetchTeamData]);

  const totalBalancePKR = Number(teamData?.user?.userbalance || 0);

  const stats = useMemo(() => {
    const summary = teamData?.commissionSummary || {};
    return {
      invested: Number(summary?.totalInvested || 0),
      referral: Number(summary?.referralCommission || 0),
      deposit: Number(summary?.totalDeposit || 0),
      withdrawn: Number(summary?.totalWithdrawn || 0),
    };
  }, [teamData]);

  // User stats for manager rank
  const userStats = {
    selfInvestment: teamData?.user?.UserInvestment || 0,
    directActive: teamData?.directReferrals?.stats?.totalUsers || 0,
    indirectActive: (teamData?.indirectReferrals?.stats?.totalUsers || 0) + 
                    (teamData?.extendedReferrals?.stats?.totalUsers || 0) +
                    (teamData?.level4Referrals?.stats?.totalUsers || 0) +
                    (teamData?.level5Referrals?.stats?.totalUsers || 0),
    claimedRanks: teamData?.user?.claimedManagerRanks || [],
  };

  // Find the first unclaimed rank (current running rank)
  const currentRank = managerRanks.find(rank => !userStats.claimedRanks?.includes(rank.id)) || managerRanks[0];

  // Progress calculation helpers
  const calcProgress = (val, req) => Math.min(100, (val / req) * 100);

  const formatPKR = (value) =>
    `PKR ${Number(value || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatUSD = (pkr) =>
    `$${(Number(pkr || 0) / USD_TO_PKR).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const balanceActions = [
    {
      label: "Deposit",
      subtitle: "Add funds",
      icon: <FiArrowDown />,
      className: "deposit",
      onClick: () => navigate("/deposit"),
    },
    {
      label: "Withdraw",
      subtitle: "Send to wallet",
      icon: <FiArrowUp />,
      className: "withdraw",
      onClick: () => navigate("/withdraw"),
    },
    {
      label: "Refer",
      subtitle: "Invite your team",
      icon: <FiUsers />,
      className: "refer",
      onClick: () => navigate("/invite"),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

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

  const getPlanIcon = (planName) => {
    if (planName?.toLowerCase().includes('lithium')) return <FaBitcoin />;
    if (planName?.toLowerCase().includes('gold')) return <FaCoins />;
    return <FaRocket />;
  };

  // Sample active investments for demo (replace with real data)
  const sampleInvestments = [
    {
      _id: "1",
      planName: "Premium Plan",
      amount: 100,
      dailyProfit: 4.20,
      totalProfit: 12.60,
      startDate: new Date(),
      nextPayout: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
      status: "active",
    },
    {
      _id: "2",
      planName: "Premium Plan",
      amount: 250,
      dailyProfit: 10.50,
      totalProfit: 31.50,
      startDate: new Date(),
      nextPayout: new Date(Date.now() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000), // 5.5 hours
      status: "active",
    },
    {
      _id: "3",
      planName: "Premium Plan",
      amount: 500,
      dailyProfit: 21.00,
      totalProfit: 63.00,
      startDate: new Date(),
      nextPayout: new Date(Date.now() + 1 * 60 * 60 * 1000 + 45 * 60 * 1000), // 1.75 hours
      status: "active",
    },
  ];

  const displayInvestments = activeInvestments.length > 0 ? activeInvestments : sampleInvestments;

  return (
    <div className="sx-dashboard-root">
      <WelcomePopup
        userName={user?.fullName || user?.name || "User"}
        isOpen={shouldShowWelcomePopup}
        onClose={() => {
          setWelcomeDismissed(true);
          navigate("/dashboard", { replace: true });
        }}
      />

      <aside className={`sx-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sx-sidebar-top">
          <div className="sx-sidebar-brand">
            <span className="sx-sidebar-brand-text">SPARK</span>
            <img src={logoimagemetadrive} alt="SparkX" className="sx-sidebar-logo" />
          </div>
          <button className="sx-sidebar-close" onClick={() => setSidebarOpen(false)} type="button">
            <FiX />
          </button>
        </div>

        <div className="sx-sidebar-links">
          {sidebarMain.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sx-sidebar-link ${location.pathname === item.to ? "active" : ""}`}
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
              className={`sx-sidebar-link ${location.pathname === item.to ? "active" : ""}`}
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

          <button type="button" className="sx-sidebar-link sx-logout" onClick={handleLogout}>
            <span className="sx-sidebar-icon"><FiX /></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="sx-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <main className="sx-main">
        <header className="sx-header">
          <div className="sx-header-left">
            <button className="sx-menu-btn" onClick={() => setSidebarOpen(true)} type="button">
              <FiMenu />
            </button>
            <div>
              <h2 className="sx-title">Dashboard</h2>
              <p className="sx-subtitle">Welcome back, {user?.fullName || user?.name || "User"}</p>
            </div>
          </div>

          <div className="sx-header-right">
            <a href={whatsappGroupLink} target="_blank" rel="noopener noreferrer" className="sx-whatsapp-pill">
              <FaWhatsapp /> Join WhatsApp
            </a>
            <button className="sx-icon-btn" type="button">
              <FiBell />
              <span className="sx-notify-dot">3</span>
            </button>
            <button className="sx-profile-avatar-btn" onClick={() => navigate("/profile")} type="button">
              <FiUser className="sx-profile-avatar-icon" />
            </button>
          </div>
        </header>

        {/* Main Content Container */}
        <div className="sx-dashboard-content">
          {/* Balance Card */}
          <section className="sx-balance-card">
            <div className="sx-balance-head">
              <h3>Available Balance</h3>
              <button className="sx-eye-toggle" onClick={() => setShowBalance((v) => !v)} type="button">
                {showBalance ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="sx-balance-values">
              <div>
                <span className="sx-balance-label">PKR</span>
                <p className="sx-balance-amount">{showBalance ? formatPKR(totalBalancePKR) : "••••••"}</p>
              </div>
              <div className="sx-balance-line" />
              <div>
                <span className="sx-balance-label">USD</span>
                <p className="sx-balance-amount sx-usd">{showBalance ? formatUSD(totalBalancePKR) : "••••••"}</p>
              </div>
            </div>
            <p className="sx-conversion-note">1 USD = 280 PKR</p>

            <div className="sx-balance-actions">
              {balanceActions.map((action) => (
                <button
                  key={action.label}
                  className={`sx-balance-action sx-balance-action-${action.className}`}
                  onClick={action.onClick}
                  type="button"
                >
                  <span className="sx-balance-action-icon">{action.icon}</span>
                  <span className="sx-balance-action-copy">
                    <strong>{action.label}</strong>
                    <small>{action.subtitle}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Stats Cards */}
          <section className="sx-stats-grid">
            <article className="sx-stat-card">
              <h4>Total Invested</h4>
              <p>{showBalance ? formatUSD(stats.invested) : "••••"}</p>
            </article>
            <article className="sx-stat-card">
              <h4>Referral Earning</h4>
              <p>{showBalance ? formatUSD(stats.referral) : "••••"}</p>
            </article>
            <article className="sx-stat-card">
              <h4>Total Deposit</h4>
              <p>{showBalance ? formatUSD(stats.deposit) : "••••"}</p>
            </article>
            <article className="sx-stat-card">
              <h4>Total Withdrawn</h4>
              <p>{showBalance ? formatUSD(stats.withdrawn) : "••••"}</p>
            </article>
          </section>

          {/* Rank Section */}
          <section className="sx-rank-section">
            <div className="sx-rank-header">
              <h3>My Current Rank</h3>
              <span className="sx-rank-badge">{currentRank.version}</span>
            </div>
            <div className="mr-rank-card" style={{ background: currentRank.bgGradient }}>
              <div className="mr-rank-header">
                <div className="mr-rank-version" style={{ color: currentRank.color }}>
                  <span className="mr-rank-icon">{currentRank.icon}</span>
                  <span>{currentRank.title}</span>
                </div>
              </div>
              <div className="mr-rank-requirements">
                <div className="mr-requirement-item">
                  <span className="mr-req-label">Self Investment</span>
                  <span className="mr-req-value">${currentRank.selfInvestment}</span>
                  <div className="mr-progress-bar">
                    <div 
                      className="mr-progress-fill" 
                      style={{ 
                        width: `${calcProgress(userStats.selfInvestment, currentRank.selfInvestment)}%`, 
                        background: currentRank.color 
                      }} 
                    />
                  </div>
                  <span className="mr-progress-text">{calcProgress(userStats.selfInvestment, currentRank.selfInvestment).toFixed(0)}%</span>
                </div>
                <div className="mr-requirement-item">
                  <span className="mr-req-label">Direct Active</span>
                  <span className="mr-req-value">{currentRank.directActive} members</span>
                  <div className="mr-progress-bar">
                    <div 
                      className="mr-progress-fill" 
                      style={{ 
                        width: `${calcProgress(userStats.directActive, currentRank.directActive)}%`, 
                        background: currentRank.color 
                      }} 
                    />
                  </div>
                  <span className="mr-progress-text">{calcProgress(userStats.directActive, currentRank.directActive).toFixed(0)}%</span>
                </div>
                <div className="mr-requirement-item">
                  <span className="mr-req-label">Indirect Active</span>
                  <span className="mr-req-value">{currentRank.indirectActive} members</span>
                  <div className="mr-progress-bar">
                    <div 
                      className="mr-progress-fill" 
                      style={{ 
                        width: `${calcProgress(userStats.indirectActive, currentRank.indirectActive)}%`, 
                        background: currentRank.color 
                      }} 
                    />
                  </div>
                  <span className="mr-progress-text">{calcProgress(userStats.indirectActive, currentRank.indirectActive).toFixed(0)}%</span>
                </div>
              </div>
              <div className="mr-rank-footer">
                <div className="mr-salary-info">
                  <span className="mr-salary-label">15 Days Salary</span>
                  <strong className="mr-salary-amount">${currentRank.salary}</strong>
                  <span className="mr-growth-rate">Growth: {currentRank.growthRate}%</span>
                </div>
                <Link to="/managerranksystem" className="mr-view-all">View All Ranks →</Link>
              </div>
            </div>
          </section>

          {/* Active Investments Section */}
          <section className="sx-active-investments-section">
            <div className="sx-section-header">
              <h3>Active Investments</h3>
             
            </div>
            
            {displayInvestments.length === 0 ? (
              <div className="sx-no-investments">
                <p>No active investments found.</p>
                <Link to="/investmentplans" className="sx-start-investing-btn">Start Investing</Link>
              </div>
            ) : (
              <div className="sx-investments-grid">
                {displayInvestments.map((investment) => (
                  <div key={investment._id} className="sx-investment-card">
                    <div className="sx-investment-header">
                      <div className="sx-investment-icon">
                        {getPlanIcon(investment.planName)}
                      </div>
                      <div className="sx-investment-title">
                        <h4>{investment.planName}</h4>
                        <span className="sx-investment-status active">Active</span>
                      </div>
                    </div>

                    <div className="sx-investment-details">
                      <div className="sx-investment-detail">
                        <span>Investment Amount</span>
                        <strong>{formatCurrency(investment.amount)}</strong>
                      </div>
                      <div className="sx-investment-detail">
                        <span>Daily Profit</span>
                        <strong className="profit">{formatCurrency(investment.dailyProfit)}</strong>
                      </div>
                      <div className="sx-investment-detail">
                        <span>Total Profit</span>
                        <strong className="total-profit">{formatCurrency(investment.totalProfit)}</strong>
                      </div>
                    </div>

                    <div className="sx-investment-timer">
                      <FiClock className="sx-timer-icon" />
                      <div className="sx-timer-info">
                        <span>Next Payout in</span>
                        <strong className="sx-timer-value">
                          {timeLeft[investment._id] || "00:00:00"}
                        </strong>
                      </div>
                    </div>

                    <div className="sx-investment-progress">
                      <div className="sx-progress-bar">
                        <div 
                          className="sx-progress-fill" 
                          style={{ 
                            width: `${Math.random() * 100}%`, // Replace with actual progress calculation
                            background: 'linear-gradient(90deg, #22e88c, #9060ff)'
                          }} 
                        />
                      </div>
                      <span className="sx-progress-text">Cycle Progress</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}