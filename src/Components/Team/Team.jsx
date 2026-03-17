import axios from "axios";
import { useEffect, useState } from "react";
import { 
  FaArrowLeft, 
  FaChartLine, 
  FaUsers,
  FaCrown,
  FaRocket,
  FaStar,
  FaGift,
  FaTrophy,
  FaMedal,
  FaTags
} from "react-icons/fa";
import { 
  FiHome, 
  FiPieChart, 
  FiUsers,
  FiBell,
  FiMenu,
  FiX,
  FiUser,
  FiActivity,
  FiTrendingUp,
  FiAward,
  FiCheckCircle,
  FiCopy,
  FiArrowDown,
  FiArrowUp,
  FiCreditCard
} from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import logoimagemetadrive from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./Team.css";

const whatsappGroupLink = "https://chat.whatsapp.com/FvRiiZs7DyhIDIDHxTdRNj?mode=gi_t";

const Team = () => {
  const [activeTab, setActiveTab] = useState("data");
  const [teamData, setTeamData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;

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
    { to: "/support", icon: <FiActivity />, label: "Support" },
    { to: "/privacypolicy", icon: <FiAward />, label: "Privacy Policy" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.post("https://be.sparkx1.pro/team", { userId });
        setTeamData(res.data);
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    fetchTeamData();
  }, [userId]);

  if (!teamData) {
    return (
      <div className="sx-dashboard-root">
        <div className="team-state-shell">
          <div className="team-state-card">
            <div className="team-state-orbit" />
            <div className="team-state-spinner" />
            <p>Loading your network data...</p>
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
              src={logoimagemetadrive}
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
              <h2 className="sx-title">Team Network</h2>
              <p className="sx-subtitle">Track your team's growth and performance</p>
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
              <span className="sx-notify-dot">3</span>
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

        <div className="team-shell">
          

          {/* Header */}
          <div className="team-header-section">
            <div className="team-header-content">
              <div className="team-header-badge">
                <FaCrown /> SPARKX NETWORK
              </div>
              <h1 className="team-header-title">My Team Network</h1>
              <p className="team-header-subtitle">
                Manage and track your team's performance across all levels
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="team-tab-container">
            <button
              className={`team-tab-btn ${activeTab === "data" ? "active" : ""}`}
              onClick={() => setActiveTab("data")}
            >
              <FiActivity /> Analytics
            </button>
            <button
              className={`team-tab-btn ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              <FiUsers /> Network
            </button>
          </div>

          {/* Tab Content */}
          <div className="team-content">
            {activeTab === "data" && (
              <TeamDataScreen
                teamData={teamData}
                userId={userId}
                setTeamData={setTeamData}
              />
            )}
            {activeTab === "details" && <TeamDetailsScreen teamData={teamData} />}
          </div>
        </div>
      </main>
    </div>
  );
};

const TeamDataScreen = ({ teamData, userId, setTeamData }) => {
  const [claimingThreshold, setClaimingThreshold] = useState(null);
  const [rewardToast, setRewardToast] = useState(null);

  // Calculate totals
  const totalTeamMembers =
    teamData.directReferrals.stats.totalUsers +
    teamData.indirectReferrals.stats.totalUsers +
    teamData.extendedReferrals.stats.totalUsers +
    (teamData.level4Referrals?.stats?.totalUsers || 0) +
    (teamData.level5Referrals?.stats?.totalUsers || 0);

  const totalTeamDeposit =
    teamData.directReferrals.stats.totalTeamDeposit +
    teamData.indirectReferrals.stats.totalTeamDeposit +
    teamData.extendedReferrals.stats.totalTeamDeposit +
    (teamData.level4Referrals?.stats?.totalTeamDeposit || 0) +
    (teamData.level5Referrals?.stats?.totalTeamDeposit || 0);

  const totalTeamWithdraw =
    teamData.directReferrals.stats.totalTeamWithdrawal +
    teamData.indirectReferrals.stats.totalTeamWithdrawal +
    teamData.extendedReferrals.stats.totalTeamWithdrawal +
    (teamData.level4Referrals?.stats?.totalTeamWithdrawal || 0) +
    (teamData.level5Referrals?.stats?.totalTeamWithdrawal || 0);

  const totalTeamCommission = Math.floor(
    teamData.commissionSummary.grandTotalCommission
  );

  const rewardMilestones = [100000, 200000, 300000];
  const claimedMilestones = teamData?.user?.teamDepositRewardMilestones || [];

  const getProgressPercent = (threshold) => {
    const progressDeposit = Math.min(totalTeamDeposit, threshold);
    return Math.round((progressDeposit / threshold) * 100);
  };

  const isRewardClaimed = (threshold) =>
    claimedMilestones.includes(threshold) ||
    (threshold === 100000 && Boolean(teamData?.user?.teamDepositRewardClaimed));

  const canClaimReward = (threshold) =>
    !isRewardClaimed(threshold) &&
    claimingThreshold !== threshold &&
    totalTeamDeposit >= threshold;

  const showToast = (threshold, message) => {
    setRewardToast({ threshold, message });
    window.setTimeout(() => setRewardToast(null), 2000);
  };

  const handleClaimReward = async (threshold) => {
    if (!userId || claimingThreshold) return;

    try {
      setClaimingThreshold(threshold);
      const res = await axios.post("https://be.sparkx1.pro/team/claim-reward", {
        userId,
        threshold,
      });

      const newBalance = res?.data?.newBalance;
      const newClaimedMilestones = res?.data?.claimedMilestones || [];
      setTeamData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          user: {
            ...prev.user,
            userbalance: Number(newBalance ?? prev.user?.userbalance ?? 0),
            teamDepositRewardClaimed:
              threshold === 100000
                ? true
                : prev.user?.teamDepositRewardClaimed || false,
            teamDepositRewardClaimedAt:
              threshold === 100000
                ? res?.data?.claimedAt || new Date()
                : prev.user?.teamDepositRewardClaimedAt || null,
            teamDepositRewardMilestones: newClaimedMilestones,
          },
        };
      });

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser && storedUser._id === userId) {
        storedUser.userbalance = Number(newBalance ?? storedUser.userbalance ?? 0);
        localStorage.setItem("user", JSON.stringify(storedUser));
      }

      showToast(threshold, "✅ Reward added to balance");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Unable to claim reward right now";
      if (err?.response?.data?.claimed) {
        const responseThreshold = Number(err?.response?.data?.threshold || threshold);
        setTeamData((prev) => {
          if (!prev) return prev;
          const oldMilestones = prev.user?.teamDepositRewardMilestones || [];
          const merged = [...new Set([...oldMilestones, responseThreshold])];
          return {
            ...prev,
            user: {
              ...prev.user,
              teamDepositRewardClaimed:
                responseThreshold === 100000
                  ? true
                  : prev.user?.teamDepositRewardClaimed || false,
              teamDepositRewardMilestones: merged,
            },
          };
        });
      }
      showToast(threshold, `❌ ${message}`);
    } finally {
      setClaimingThreshold(null);
    }
  };

  const formatCurrency = (value) => 
    `$ ${Number(value || 0).toLocaleString()}`;

  return (
    <div className="team-data-container">
      {/* Summary Cards */}
      <div className="team-summary-grid">
        <div className="team-summary-card team-summary-total">
          <div className="team-summary-icon">
            <FaUsers />
          </div>
          <span className="team-summary-label">Total Team</span>
          <strong className="team-summary-value">{totalTeamMembers.toLocaleString()}</strong>
       
        </div>

        <div className="team-summary-card team-summary-deposit">
          <div className="team-summary-icon">
            <FiTrendingUp />
          </div>
          <span className="team-summary-label">Team Deposit</span>
          <strong className="team-summary-value">{formatCurrency(totalTeamDeposit)}</strong>
     
        </div>

        <div className="team-summary-card team-summary-commission">
          <div className="team-summary-icon">
            <FaMedal />
          </div>
          <span className="team-summary-label">Team Commission</span>
          <strong className="team-summary-value">{formatCurrency(totalTeamCommission)}</strong>
        
        </div>

        <div className="team-summary-card team-summary-withdraw">
          <div className="team-summary-icon">
            <FiActivity />
          </div>
          <span className="team-summary-label">Team Withdraw</span>
          <strong className="team-summary-value">{formatCurrency(totalTeamWithdraw)}</strong>
        
        </div>
      </div>

      {/* Level Cards */}
      <div className="team-levels-grid">
        {/* Level 1 */}
        <div className="team-level-card level-1">
          <div className="team-level-header">
            <div className="team-level-badge">LEVEL 1</div>
            {/* <div className="team-level-rate">6.5%</div> */}
          </div>
          <div className="team-level-stats">
            <div className="team-level-stat">
              <span>Team Deposit</span>
              <strong>{formatCurrency(teamData.directReferrals.stats.totalTeamDeposit)}</strong>
            </div>
            <div className="team-level-stat">
              <span>Team Withdraw</span>
              <strong>{formatCurrency(teamData.directReferrals.stats.totalTeamWithdrawal)}</strong>
            </div>
            <div className="team-level-stat">
              <span>Total Members</span>
              <strong>{teamData.directReferrals.stats.totalUsers.toLocaleString()}</strong>
            </div>
            <div className="team-level-stat">
              <span>Commission</span>
              <strong>{formatCurrency(teamData.commissionSummary.level1Commission || 0)}</strong>
            </div>
          </div>
        </div>

        {/* Level 2 */}
        <div className="team-level-card level-2">
          <div className="team-level-header">
            <div className="team-level-badge">LEVEL 2</div>
            {/* <div className="team-level-rate">3.3%</div> */}
          </div>
          <div className="team-level-stats">
            <div className="team-level-stat">
              <span>Team Deposit</span>
              <strong>{formatCurrency(teamData.indirectReferrals.stats.totalTeamDeposit)}</strong>
            </div>
            <div className="team-level-stat">
              <span>Team Withdraw</span>
              <strong>{formatCurrency(teamData.indirectReferrals.stats.totalTeamWithdrawal)}</strong>
            </div>
            <div className="team-level-stat">
              <span>Total Members</span>
              <strong>{teamData.indirectReferrals.stats.totalUsers.toLocaleString()}</strong>
            </div>
            <div className="team-level-stat">
              <span>Commission</span>
              <strong>{formatCurrency(teamData.commissionSummary.level2Commission || 0)}</strong>
            </div>
          </div>
        </div>

        {/* Level 3 */}
        <div className="team-level-card level-3">
          <div className="team-level-header">
            <div className="team-level-badge">LEVEL 3</div>
            {/* <div className="team-level-rate">2.5%</div> */}
          </div>
          <div className="team-level-stats">
            <div className="team-level-stat">
              <span>Team Deposit</span>
              <strong>{formatCurrency(teamData.extendedReferrals.stats.totalTeamDeposit)}</strong>
            </div>
            <div className="team-level-stat">
              <span>Team Withdraw</span>
              <strong>{formatCurrency(teamData.extendedReferrals.stats.totalTeamWithdrawal)}</strong>
            </div>
            <div className="team-level-stat">
              <span>Total Members</span>
              <strong>{teamData.extendedReferrals.stats.totalUsers.toLocaleString()}</strong>
            </div>
            <div className="team-level-stat">
              <span>Commission</span>
              <strong>{formatCurrency(teamData.commissionSummary.level3Commission || 0)}</strong>
            </div>
          </div>
        </div>

        {/* Level 4 */}
        <div className="team-level-card level-4">
          <div className="team-level-header">
            <div className="team-level-badge">LEVEL 4</div>
            {/* <div className="team-level-rate">2%"</div> */}
          </div>
          <div className="team-level-stats">
            <div className="team-level-stat">
              <span>Team Deposit</span>
              <strong>{formatCurrency(teamData.level4Referrals?.stats?.totalTeamDeposit || 0)}</strong>
            </div>
            <div className="team-level-stat">
              <span>Team Withdraw</span>
              <strong>{formatCurrency(teamData.level4Referrals?.stats?.totalTeamWithdrawal || 0)}</strong>
            </div>
            <div className="team-level-stat">
              <span>Total Members</span>
              <strong>{(teamData.level4Referrals?.stats?.totalUsers || 0).toLocaleString()}</strong>
            </div>
            <div className="team-level-stat">
              <span>Commission</span>
              <strong>{formatCurrency(teamData.commissionSummary.level4Commission || 0)}</strong>
            </div>
          </div>
        </div>

        {/* Level 5 */}
        <div className="team-level-card level-5">
          <div className="team-level-header">
            <div className="team-level-badge">LEVEL 5</div>
            {/* <div className="team-level-rate">1.5%</div> */}
          </div>
          <div className="team-level-stats">
            <div className="team-level-stat">
              <span>Team Deposit</span>
              <strong>{formatCurrency(teamData.level5Referrals?.stats?.totalTeamDeposit || 0)}</strong>
            </div>
            <div className="team-level-stat">
              <span>Team Withdraw</span>
              <strong>{formatCurrency(teamData.level5Referrals?.stats?.totalTeamWithdrawal || 0)}</strong>
            </div>
            <div className="team-level-stat">
              <span>Total Members</span>
              <strong>{(teamData.level5Referrals?.stats?.totalUsers || 0).toLocaleString()}</strong>
            </div>
            <div className="team-level-stat">
              <span>Commission</span>
              <strong>{formatCurrency(teamData.commissionSummary.level5Commission || 0)}</strong>
            </div>
          </div>
        </div>
      </div>

     

     
    </div>
  );
};

const TeamDetailsScreen = ({ teamData }) => {
  const [activeLevel, setActiveLevel] = useState("1");

  const getLevelMembers = (level) => {
    switch(level) {
      case "1":
        return { members: teamData.directReferrals.members, rate: "6.5%" };
      case "2":
        return { members: teamData.indirectReferrals.members, rate: "3.3%" };
      case "3":
        return { members: teamData.extendedReferrals.members, rate: "2.5%" };
      case "4":
        return { members: teamData.level4Referrals?.members || [], rate: "2%" };
      case "5":
        return { members: teamData.level5Referrals?.members || [], rate: "1.5%" };
      default:
        return { members: [], rate: "0%" };
    }
  };

  const currentLevel = getLevelMembers(activeLevel);

  return (
    <div className="team-details-container">
      {/* Level Navigation */}
      <div className="team-level-nav">
        {["1", "2", "3", "4", "5"].map((level) => (
          <button
            key={level}
            className={`team-level-nav-btn ${activeLevel === level ? "active" : ""}`}
            onClick={() => setActiveLevel(level)}
          >
            Level {level}
          
          </button>
        ))}
      </div>

      {/* Members Grid */}
      <div className="team-members-grid">
        {currentLevel.members.length > 0 ? (
          currentLevel.members.map((member, index) => (
            <div key={index} className={`team-member-card level-${activeLevel}`}>
              <div className="team-member-header">
                <div className="team-member-level-badge">
                  Level {activeLevel}
                </div>
                <div className="team-member-avatar">
                  <FiUser />
                </div>
              </div>
              <div className="team-member-info">
                <h4 className="team-member-name">{member.fullName}</h4>
                <div className="team-member-details">
                  <div className="team-member-detail">
                    <span>Upliner</span>
                    <strong>{member.uplinerName || teamData.user.fullName}</strong>
                  </div>
                  <div className="team-member-detail">
                    <span>Phone</span>
                    <strong>{member.whatsappNumber}</strong>
                  </div>
                  <div className="team-member-detail">
                    <span>Email</span>
                    <strong>
                      {member.email ||
                        `${member.fullName
                          .toLowerCase()
                          .replace(/\s/g, "")}@gmail.com`}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="team-no-members">
            <FiUsers />
            <p>No members found in Level {activeLevel}</p>
            <span>Invite more people to grow your network</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;