import { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiArrowDown,
  FiArrowUp,
  FiBell,
  FiCheckCircle,
  FiCopy,
  FiCreditCard,
  FiGift,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiLink2,
  FiMenu,
  FiShare2,
  FiShield,
  FiTrendingUp,
  FiPieChart,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { FaGift, FaTags, FaWhatsapp } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoimagemetadrive from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./InviteScreen.css";

const whatsappGroupLink = "https://chat.whatsapp.com/FvRiiZs7DyhIDIDHxTdRNj?mode=gi_t";

const InviteScreen = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = useMemo(() => {
    const str = localStorage.getItem("user");
    return str ? JSON.parse(str) : null;
  }, []);

  const userId = user?._id;

  const formatCurrency = (value) =>
    `PKR ${Number(value || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const buildReferralLink = (code) => {
    const safeCode = (code || "").trim();
    return `${window.location.origin}/signup?ref=${encodeURIComponent(
      safeCode || "REF174085491"
    )}`;
  };

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

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        if (!userId) {
          setError("User not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch("https://be.sparkx1.pro/team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch team data");
        }

        const data = await response.json();
        setTeamData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [userId]);

  useEffect(() => {
    if (!feedback) return undefined;

    const timeout = window.setTimeout(() => setFeedback(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setFeedback(`${label} copied`);
    } catch (err) {
      console.error("Clipboard copy failed:", err.message);
      setFeedback(`Could not copy ${label.toLowerCase()}`);
    }
  };

  const shareLink = async () => {
    const referralLink = buildReferralLink(teamData?.user?.randomCode);

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join SparkX",
          text: "Join SparkX with my referral link.",
          url: referralLink,
        });
        setFeedback("Referral link shared");
      } catch (err) {
        console.error("Share failed:", err.message);
        copyToClipboard(referralLink, "Referral link");
      }
    } else {
      copyToClipboard(referralLink, "Referral link");
    }
  };

  const referralCode = teamData?.user?.randomCode || "REF174085491";
  const referralLink = buildReferralLink(referralCode);

  const levelConfig = useMemo(
    () => [
      {
        key: "directReferrals",
        title: "Level 1",
        label: "Direct circle",
        investmentRate: "5%",
        teamRate: "3%",
        cardClass: "mint",
      },
      {
        key: "indirectReferrals",
        title: "Level 2",
        label: "Second layer",
        investmentRate: "3%",
        teamRate: "2%",
        cardClass: "blue",
      },
      {
        key: "extendedReferrals",
        title: "Level 3",
        label: "Extended network",
        investmentRate: "2%",
        teamRate: "1%",
        cardClass: "violet",
      },
      {
        key: "level4Referrals",
        title: "Level 4",
        label: "Growth band",
        investmentRate: "1%",
        teamRate: "1%",
        cardClass: "amber",
      },
      {
        key: "level5Referrals",
        title: "Level 5",
        label: "Deep network",
        investmentRate: "1%",
        teamRate: "1%",
        cardClass: "rose",
      },
    ],
    []
  );

  const levelStats = useMemo(
    () =>
      levelConfig.map((level, index) => ({
        ...level,
        totalUsers: Number(teamData?.[level.key]?.stats?.totalUsers || 0),
        totalDeposit: Number(teamData?.[level.key]?.stats?.totalTeamDeposit || 0),
        earned: Number(teamData?.commissionSummary?.[`level${index + 1}Commission`] || 0),
      })),
    [levelConfig, teamData]
  );

  const totalReferrals = levelStats.reduce((sum, level) => sum + level.totalUsers, 0);
  const totalReferralEarning = Number(
    teamData?.commissionSummary?.grandTotalCommission ||
      teamData?.commissionSummary?.referralCommission ||
      0
  );
  const totalTeamDeposit = levelStats.reduce((sum, level) => sum + level.totalDeposit, 0);
  const strongestLevel =
    levelStats.reduce(
      (best, level) => (level.totalUsers > best.totalUsers ? level : best),
      levelStats[0] || { title: "Level 1", totalUsers: 0 }
    ) || { title: "Level 1", totalUsers: 0 };

  const summaryCards = [
    {
      title: "Total Referral Earning",
      value: formatCurrency(totalReferralEarning),
      hint: "All referral commission collected",
      icon: <FiTrendingUp />,
      className: "earning",
      action: null,
    },
    {
      title: "Total Referrals",
      value: totalReferrals.toLocaleString(),
      hint: `${strongestLevel.title} is your biggest channel`,
      icon: <FiUsers />,
      className: "referrals",
      action: null,
    },
    {
      title: "Referral Code",
      value: referralCode,
      hint: "Share this code manually anytime",
      icon: <FiGift />,
      className: "code",
      action: (
        <button
          type="button"
          className="invite-mini-btn"
          onClick={() => copyToClipboard(referralCode, "Referral code")}
        >
          <FiCopy />
        </button>
      ),
    },
    {
      title: "Referral Link",
      value: referralLink,
      hint: "Use the direct signup path",
      icon: <FiLink2 />,
      className: "link",
      action: (
        <button
          type="button"
          className="invite-mini-btn"
          onClick={() => copyToClipboard(referralLink, "Referral link")}
        >
          <FiCopy />
        </button>
      ),
    },
  ];

  const inviteBody = loading ? (
    <div className="invite-state-shell invite-shell-framed">
      <div className="invite-state-card">
        <div className="invite-state-orbit" />
        <p>Loading referral workspace...</p>
      </div>
    </div>
  ) : error ? (
    <div className="invite-state-shell invite-shell-framed">
      <div className="invite-state-card invite-state-card-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="invite-retry-btn" type="button">
          Try Again
        </button>
      </div>
    </div>
  ) : (
    <div className="invite-shell invite-shell-framed">
      <div className="invite-backdrop invite-backdrop-a" />
      <div className="invite-backdrop invite-backdrop-b" />

      <section className="invite-hero">
        <div className="invite-hero-card">
          <div className="invite-hero-main">
            <div className="invite-kicker-row invite-kicker-row-inline">
              <span className="invite-panel-badge invite-studio-badge">SPARKX REFERRAL STUDIO</span>
              {feedback ? (
                <span className="invite-feedback">
                  <FiCheckCircle /> {feedback}
                </span>
              ) : null}
            </div>

            <div className="invite-highlight-row">
              <div className="invite-highlight-card invite-highlight-balance">
                <span>Referral earnings</span>
                <strong>{formatCurrency(totalReferralEarning)}</strong>
                <small>{totalReferrals.toLocaleString()} total network referrals</small>
              </div>

              <div className="invite-highlight-card invite-highlight-network">
                <span>Network deposit volume</span>
                <strong>{formatCurrency(totalTeamDeposit)}</strong>
                <small>{strongestLevel.title} currently leads your growth</small>
              </div>
            </div>
          </div>

          <div className="invite-share-panel">
            <div className="invite-code-chip">
              <span>Your referral code</span>
              <strong>{referralCode}</strong>
            </div>

            <div className="invite-link-preview">
              <span>Signup link</span>
              <p>{referralLink}</p>
            </div>

            <div className="invite-cta-row">
              <button className="invite-primary-btn" onClick={shareLink} type="button">
                <FiShare2 /> Share Invite
              </button>
              <button
                className="invite-secondary-btn"
                onClick={() => copyToClipboard(referralLink, "Referral link")}
                type="button"
              >
                <FiCopy /> Copy Link
              </button>
            </div>

            
          </div>
        </div>
      </section>

      <section className="invite-summary-grid">
        {summaryCards.map((card) => (
          <article key={card.title} className={`invite-summary-card invite-summary-card-${card.className}`}>
            <div className="invite-summary-top">
              <span className="invite-summary-icon">{card.icon}</span>
              {card.action}
            </div>
            <span className="invite-summary-title">{card.title}</span>
            <strong className="invite-summary-value">{card.value}</strong>
            <p className="invite-summary-hint">{card.hint}</p>
          </article>
        ))}
      </section>

      <section className="invite-content-grid">
        <article className="invite-panel invite-panel-rates">
          <div className="invite-section-head">
            <div>
              <span className="invite-section-kicker">Commission structure</span>
              <h2>Spark X commission plan</h2>
            </div>
          </div>

          <div className="invite-rate-sections">
            <div className="invite-rate-group">
              <div className="invite-rate-group-head">
                <h3>Investment Commission</h3>
                <p>Applied when your referral network invests.</p>
              </div>

              <div className="invite-rate-grid">
                {levelStats.map((level) => (
                  <div key={`${level.key}-investment`} className={`invite-rate-card invite-rate-card-${level.cardClass}`}>
                    <span className="invite-rate-label">{level.label}</span>
                    <strong>{level.title}</strong>
                    <b>{level.investmentRate}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="invite-rate-group">
              <div className="invite-rate-group-head">
                <h3>Team Earning Commission</h3>
                <p>Applied on team earning across your five levels.</p>
              </div>

              <div className="invite-rate-grid invite-rate-grid-secondary">
                {levelStats.map((level) => (
                  <div key={`${level.key}-team`} className={`invite-rate-card invite-rate-card-${level.cardClass}`}>
                    <span className="invite-rate-label">{level.label}</span>
                    <strong>{level.title}</strong>
                    <b>{level.teamRate}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="invite-panel invite-panel-performance">
          <div className="invite-section-head">
            <div>
              <span className="invite-section-kicker">Live performance</span>
              <h2>What each level is producing</h2>
            </div>
            <p>Actual referral members and commission earned from every level.</p>
          </div>

          <div className="invite-level-list">
            {levelStats.map((level) => (
              <div key={level.key} className="invite-level-row">
                <div className="invite-level-meta">
                  <span className={`invite-level-dot invite-level-dot-${level.cardClass}`} />
                  <div>
                    <strong>{level.title}</strong>
                    <small>{level.label}</small>
                  </div>
                </div>

                <div className="invite-level-figures">
                  <div>
                    <span>Members</span>
                    <strong>{level.totalUsers.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>Earned</span>
                    <strong>{formatCurrency(level.earned)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );

  return (
    <div className="sx-dashboard-root">
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
              <h2 className="sx-title">Refer & Invite</h2>
              <p className="sx-subtitle">Invite your network and track referral growth</p>
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

        {inviteBody}
      </main>
    </div>
  );
};

export default InviteScreen;
