import { useState } from "react";
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
  FiPieChart,
  FiTrendingUp,
  FiDollarSign,
  FiInfo,
  FiClock,
} from "react-icons/fi";
import { 
  FaGift, 
  FaTags, 
  FaWhatsapp, 
  FaCrown, 
  FaRocket, 
  FaCoins, 
  FaBitcoin,
  FaCalculator,
  FaRegClock,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./Investmentplans.css";

const whatsappGroupLink = "https://chat.whatsapp.com/LCW0V5VeVAr9NFIx1asQis?mode=gi_t";

export default function InvestmentPlans() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // Only show static plan(s) here, not active investments
  const plans = [
    {
      name: "Premium",
      description: "Earn through Premium mining",
      min: 5,
      max: 500,
      dailyROI: "4.2%",
      hourlyROI: "0.175%",
      principalReturn: true,
    },
  ];
  const [showCalculator, setShowCalculator] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [investAmount, setInvestAmount] = useState("");
  const [calcAmount, setCalcAmount] = useState("");
  const [depositBalance, setDepositBalance] = useState(0);
  const [earningBalance, setEarningBalance] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  // Removed useEffect hooks for resize and click outside, as not needed for static plans.

  // No fetching of plans here. Only static plans are shown.

  const sidebarMain = [
    { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    { to: "/investmentplans", icon: <FiPieChart />, label: "Investment Plans" },
    { to: "/deposit", icon: <FiArrowDown />, label: "Deposit" },
    { to: "/withdraw", icon: <FiArrowUp />, label: "Withdraw" },
    { to: "/invite", icon: <FiUsers />, label: "Refer & Invite" },
    { to: "/team", icon: <FiUsers />, label: "My Team" },
    { to: "/managerranksystem", icon: <FaCrown />, label: "Manager Rank System" },
    { to: "/earningsummary", icon: <FiActivity />, label: "Earning Summary" },
    { to: "/transactionhistory", icon: <FiCreditCard />, label: "Transaction History" },
    { to: "/rankingdashboard", icon: <FaTags />, label: "Ranking Dashboard" },
  ];

  const sidebarMore = [
    { to: "/profile", icon: <FiUser />, label: "Profile" },
    { to: "/support", icon: <FiHelpCircle />, label: "Support" },
    { to: "/privacypolicy", icon: <FiShield />, label: "Privacy Policy" },
  ];

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

  const calculateReturns = (amount) => {
    const daily = amount * 0.042; // 4.2% daily
    const weekly = daily * 7;
    const monthly = daily * 30;
    return { daily, weekly, monthly };
  };

  const handleInvest = () => {
    if (!investAmount || investAmount < (selectedPlan?.min || 5)) return;
    // Handle investment logic here
    console.log("Investing:", investAmount, "in", selectedPlan?.name);
    setShowInvestModal(false);
    setInvestAmount("");
  };

  const getPlanIcon = (planName) => {
    if (planName?.toLowerCase().includes('Premium')) return <FaBitcoin />;
    if (planName?.toLowerCase().includes('gold')) return <FaCoins />;
    return <FaRocket />;
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
              <h2 className="sx-title">Investment Plans</h2>
              <p className="sx-subtitle">Choose your AI trading bot and start earning</p>
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

        <div className="ip-shell">
          {/* Header Section */}
          <div className="ip-header-section">
            <div className="ip-header-content">
              <div className="ip-header-badge">
                <FiPieChart /> INVESTMENT PLANS
              </div>
              <h1 className="ip-header-title">Choose Your Plan</h1>
              <p className="ip-header-subtitle">
                Select from our range of AI-powered investment plans designed to maximize your returns
              </p>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="ip-balance-grid">
            <div className="ip-balance-card">
              <div className="ip-balance-icon" style={{ background: 'rgba(34, 232, 140, 0.1)', color: '#22e88c' }}>
                <FiDollarSign />
              </div>
              <div className="ip-balance-info">
                <span className="ip-balance-label">Deposit Balance</span>
                <strong className="ip-balance-value">{formatCurrency(depositBalance)}</strong>
              </div>
            </div>
            <div className="ip-balance-card">
              <div className="ip-balance-icon" style={{ background: 'rgba(255, 215, 0, 0.1)', color: '#ffd700' }}>
                <FiTrendingUp />
              </div>
              <div className="ip-balance-info">
                <span className="ip-balance-label">Earning Balance</span>
                <strong className="ip-balance-value">{formatCurrency(earningBalance)}</strong>
              </div>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="ip-plans-grid">
            {plans.map((plan, index) => (
              <div key={index} className="ip-plan-card">
                <div className="ip-plan-header">
                  <div className="ip-plan-icon">
                    {getPlanIcon(plan.name)}
                  </div>
                  <div className="ip-plan-title">
                    <h3>{plan.name}</h3>
                    <span className="ip-plan-badge">Crypto Mining Plan</span>
                  </div>
                </div>
                <div className="ip-plan-description">
                  {plan.description}
                </div>
                <div className="ip-plan-details">
                  <div className="ip-plan-detail">
                    <span>Range</span>
                    <strong>${plan.min} - ${plan.max}</strong>
                  </div>
                  <div className="ip-plan-detail">
                    <span>Min Investment</span>
                    <strong>${plan.min}</strong>
                  </div>
                </div>
                <div className="ip-plan-roi">
                  <div className="ip-roi-item">
                    <span>Daily ROI</span>
                    <strong>{plan.dailyROI}</strong>
                  </div>
                 
                </div>
                <div className="ip-plan-note">
                  <FiInfo />
                  <span>Principal Return Policy Will Be Returned</span>
                </div>
                <div className="ip-plan-actions">
                  <button
                    className="ip-btn-primary"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setShowInvestModal(true);
                    }}
                  >
                    Start Investing
                  </button>
                  <button
                    className="ip-btn-secondary"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setShowCalculator(true);
                    }}
                  >
                    <FaCalculator /> Calculator
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Investment Calculator Modal */}
      {showCalculator && selectedPlan && (
        <div className="ip-modal-overlay" onClick={() => setShowCalculator(false)}>
          <div className="ip-modal" onClick={e => e.stopPropagation()}>
            <div className="ip-modal-header">
              <div className="ip-modal-title">
                <FaCalculator className="ip-modal-icon" />
                <h2>Investment Profit Calculator - {selectedPlan.name || 'Premium'}</h2>
              </div>
              <button className="ip-modal-close" onClick={() => setShowCalculator(false)}>
                <FiX />
              </button>
            </div>

            <div className="ip-modal-body">
              <div className="ip-plan-info-compact">
                <div className="ip-plan-info-row">
                  <FiInfo className="ip-info-icon" />
                  <div className="ip-plan-info-text">
                    <strong>{selectedPlan.name || 'Premium'}</strong>
                    <span>{selectedPlan.description || 'Earn through Premium mining'}</span>
                  </div>
                </div>
              </div>

              <div className="ip-plan-details-grid">
                <div className="ip-detail-item">
                  <span className="ip-detail-label">Return Rate</span>
                  <span className="ip-detail-value">0.145%</span>
                </div>
                <div className="ip-detail-item">
                  <span className="ip-detail-label">Frequency</span>
                  <span className="ip-detail-value">Every hour</span>
                </div>
                <div className="ip-detail-item">
                  <span className="ip-detail-label">Price Type</span>
                  <span className="ip-detail-value">Range</span>
                </div>
                <div className="ip-detail-item">
                  <span className="ip-detail-label">Investment Range</span>
                  <span className="ip-detail-value">${selectedPlan.min || 2} - ${selectedPlan.max || 100000}</span>
                </div>
              </div>

              <div className="ip-calc-input">
                <label>Investment Amount</label>
                <div className="ip-input-group">
                  <span className="ip-input-prefix">$</span>
                  <input
                    type="number"
                    min={selectedPlan.min || 2}
                    max={selectedPlan.max || 100000}
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(e.target.value)}
                    placeholder={`Enter amount between ${selectedPlan.min || 2} - ${selectedPlan.max || 100000}`}
                  />
                </div>
              </div>

              {calcAmount && calcAmount >= (selectedPlan.min || 2) && (
                <div className="ip-calc-results">
                  <h3>Investment Details</h3>
                  <div className="ip-result-item">
                    <span>Investment Amount:</span>
                    <strong>{formatCurrency(parseFloat(calcAmount))}</strong>
                  </div>
                  <div className="ip-result-item">
                    <span>Return Rate:</span>
                    <strong>0.145% every hour</strong>
                  </div>
                  <div className="ip-result-item highlight">
                    <span>Profit Per Cycle:</span>
                    <strong>{formatCurrency(calcAmount * 0.00145)}</strong>
                  </div>

                  <h4>Profit Breakdown by Time Period</h4>
                  <div className="ip-profit-breakdown">
                   
                    <div className="ip-profit-row">
                      <span>Daily:</span>
                      <strong>{formatCurrency(calcAmount * 0.035)}</strong>
                    </div>
                    <div className="ip-profit-row">
                      <span>Weekly:</span>
                      <strong>{formatCurrency(calcAmount * 0.035 * 7)}</strong>
                    </div>
                    <div className="ip-profit-row">
                      <span>Monthly:</span>
                      <strong>{formatCurrency(calcAmount * 0.035 * 30)}</strong>
                    </div>
                  </div>
                </div>
              )}

              <div className="ip-modal-actions">
                <button className="ip-btn-secondary" onClick={() => setCalcAmount("")}>
                  Reset
                </button>
                <button className="ip-btn-primary" onClick={() => setShowCalculator(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buy Investment Plan Modal */}
      {showInvestModal && selectedPlan && (
        <div className="ip-modal-overlay" onClick={() => setShowInvestModal(false)}>
          <div className="ip-modal" onClick={e => e.stopPropagation()}>
            <div className="ip-modal-header">
              <div className="ip-modal-title">
                <FiDollarSign className="ip-modal-icon" />
                <h2>Buy Investment Plan: <span className="ip-plan-name">{selectedPlan.name || 'Premium'}</span></h2>
              </div>
              <button className="ip-modal-close" onClick={() => setShowInvestModal(false)}>
                <FiX />
              </button>
            </div>

            <div className="ip-modal-body">
              <div className="ip-invest-warning">
                <FiInfo />
                <p>Please deposit at least ${selectedPlan.min || 2} to buy this plan.</p>
              </div>

              <div className="ip-plan-quick-info">
                <div className="ip-plan-quick-item">
                  <span className="ip-quick-label">Plan</span>
                  <span className="ip-quick-value">{selectedPlan.name || 'Premium'}</span>
                </div>
                <div className="ip-plan-quick-item">
                  <span className="ip-quick-label">Range</span>
                  <span className="ip-quick-value">${selectedPlan.min || 2} - ${selectedPlan.max || 100000}</span>
                </div>
                <div className="ip-plan-quick-item">
                  <span className="ip-quick-label">ROI</span>
                  <span className="ip-quick-value">{selectedPlan.dailyROI || '3.5%'} Daily</span>
                </div>
              </div>

              <div className="ip-principal-note">
                <FaRegClock className="ip-principal-icon" />
                <span>Principal Return Policy Will Be Returned</span>
              </div>

              <div className="ip-balance-summary">
                <h4>Current amount in deposit and earning wallet</h4>
                <div className="ip-balance-list">
                  <div className="ip-balance-item">
                    <span>Deposit Balance:</span>
                    <strong className="deposit">{formatCurrency(depositBalance)}</strong>
                  </div>
                  <div className="ip-balance-item">
                    <span>Earning Balance:</span>
                    <strong className="earning">{formatCurrency(earningBalance)}</strong>
                  </div>
                </div>
              </div>

              <div className="ip-payment-section">
                <h4>Pay from:</h4>
                <div className="ip-payment-card selected">
                  <div className="ip-payment-info">
                    <div className="ip-payment-title">Deposit Balance</div>
                    <div className="ip-payment-subtitle">Investment Amount</div>
                  </div>
                  <div className="ip-payment-limit">
                    Min: ${selectedPlan.min || 2} - Max: ${selectedPlan.max || 100000}
                  </div>
                </div>
              </div>

              <div className="ip-invest-input">
                <label>Investment Amount</label>
                <div className="ip-input-group">
                  <span className="ip-input-prefix">$</span>
                  <input
                    type="number"
                    min={selectedPlan.min || 2}
                    max={selectedPlan.max || 100000}
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    placeholder={`Min: $${selectedPlan.min || 2} - Max: $${selectedPlan.max || 100000}`}
                  />
                </div>
                {investAmount && investAmount < (selectedPlan.min || 2) && (
                  <div className="ip-input-error">Minimum investment is ${selectedPlan.min || 2}</div>
                )}
              </div>

              <div className="ip-modal-actions">
                <button className="ip-btn-secondary" onClick={() => setShowInvestModal(false)}>
                  Cancel
                </button>
                <button
                  className="ip-btn-primary"
                  disabled={!investAmount || investAmount < (selectedPlan.min || 2)}
                  onClick={handleInvest}
                >
                  Confirm Investment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}