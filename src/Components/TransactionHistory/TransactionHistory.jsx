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
  FiX,
  FiPieChart,
  FiArrowLeft,
  FiTrendingUp,
  FiAward,
  FiClock,
  FiFilter,
  FiDownload,
  FiCalendar,
  FiSearch,
  FiBarChart2,
} from "react-icons/fi";
import { 
  FaGift, 
  FaTags, 
  FaWhatsapp, 
  FaCoins, 
  FaHistory, 
  FaExchangeAlt,
  FaRocket,
  FaBitcoin,
  FaChartLine,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./TransactionHistory.css";

export default function TransactionHistory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState("all");
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [investmentEarnings, setInvestmentEarnings] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
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
    { to: "/transactionhistory", icon: <FaHistory />, label: "Transaction History" },
    { to: "/rankingdashboard", icon: <FaTags />, label: "Ranking Dashboard" },
  ];

  const sidebarMore = [
    { to: "/profile", icon: <FiUser />, label: "Profile" },
    { to: "/support", icon: <FiHelpCircle />, label: "Support" },
    { to: "/privacypolicy", icon: <FiShield />, label: "Privacy Policy" },
  ];

  // Fetch Team Data and Investment Earnings
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team data
        const teamRes = await axios.post("https://be.sparkx1.pro/team", {
          userId: userId,
        });
        setTeamData(teamRes.data);

        // Fetch investment earnings
        const earningsRes = await axios.get(`https://be.sparkx1.pro/api/user/investment-earnings/${userId}`);
        setInvestmentEarnings(earningsRes.data || []);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (!userId) return <div className="tx-error">Please Login</div>;
  if (loading) return (
    <div className="sx-dashboard-root">
      <div className="tx-state-shell">
        <div className="tx-state-card">
          <div className="tx-state-spinner" />
          <p>Loading transaction history...</p>
        </div>
      </div>
    </div>
  );

  const payments = teamData?.payment || [];

  // Deposit Transactions
  const depositTransactions = payments
    .filter(p => p.depositsAmount)
    .map(p => ({
      id: p._id,
      type: 'deposit',
      method: p.payment_method,
      amount: p.depositsAmount,
      status: p.depositStatus,
      date: p.createdAt,
      transactionId: p.transactionId,
      remarks: `Deposit via ${p.payment_method}`,
      icon: '📥',
      color: '#22e88c',
      category: 'deposit'
    }));

  // Withdrawal Transactions with fee calculation
  const withdrawalTransactions = payments
    .filter(p => p.withdrawalsAmount)
    .map(p => {
      const requestedAmount = p.withdrawalsAmount || 0;
      const feePercentage = 3; // 3% fee
      const feeAmount = (requestedAmount * feePercentage) / 100;
      const netAmount = requestedAmount - feeAmount;

      return {
        id: p._id,
        type: 'withdrawal',
        method: p.payment_method,
        amount: requestedAmount,
        netAmount: netAmount,
        fee: feeAmount,
        status: p.withdrawalStatus,
        date: p.createdAt,
        transactionId: p.transactionId,
        accountNumber: p.accountNumber,
        remarks: `Withdrawal via ${p.payment_method} (Fee: ${feePercentage}%)`,
        icon: '📤',
        color: '#ffb14d',
        category: 'withdrawal'
      };
    });

  // Rank Reward Transactions
  const rankRewardTransactions = (teamData?.user?.claimedRanks || []).map(rank => ({
    id: rank._id,
    type: 'rank_reward',
    rank: rank.rankName,
    amount: rank.reward,
    status: 'completed',
    date: rank.claimedAt,
    remarks: `Rank reward for achieving ${rank.rankName}`,
    icon: '🏆',
    color: '#ffd700',
    category: 'rank_reward'
  }));

  // Investment Earning Transactions (Daily/Periodic earnings from investment plans)
  const investmentEarningTransactions = investmentEarnings.map(earning => ({
    id: earning._id,
    type: 'investment_earning',
    planName: earning.planName || 'Investment Plan',
    amount: earning.amount,
    investmentAmount: earning.investmentAmount,
    cycle: earning.cycle,
    status: 'completed',
    date: earning.createdAt,
    remarks: `Daily earning from ${earning.planName || 'Investment Plan'} (Cycle ${earning.cycle || 1})`,
    icon: <FaChartLine />,
    color: '#9060ff',
    category: 'investment_earning',
    profitType: earning.profitType || 'daily',
    roi: earning.roi || '3.5%'
  }));

  // Commission Transactions (from referrals)
  const commissionTransactions = [];
  const commissionLevels = [
    { key: 'directReferrals', level: 1, rate: 0.065 },
    { key: 'indirectReferrals', level: 2, rate: 0.033 },
    { key: 'extendedReferrals', level: 3, rate: 0.025 },
    { key: 'level4Referrals', level: 4, rate: 0.02 },
    { key: 'level5Referrals', level: 5, rate: 0.015 },
  ];

  commissionLevels.forEach(level => {
    const members = teamData[level.key]?.members || [];
    members.forEach(member => {
      const commission = member.payments.totalDeposit * level.rate;
      if (commission > 0) {
        commissionTransactions.push({
          id: `${member._id}-${level.level}`,
          type: 'commission',
          level: level.level,
          rate: level.rate * 100,
          amount: commission,
          fromUser: member.fullName,
          fromUserCode: member.randomCode,
          depositAmount: member.payments.totalDeposit,
          status: 'completed',
          date: member.createdAt,
          remarks: `Level ${level.level} commission from ${member.fullName} (${level.rate * 100}% of $${member.payments.totalDeposit})`,
          icon: '💰',
          color: '#9060ff',
          category: 'commission'
        });
      }
    });
  });

  // Balance Adjustment Transactions (from admin)
  const balanceAdjustments = teamData?.balanceAdjustments || [];
  const adjustmentTransactions = balanceAdjustments.map(adj => ({
    id: adj._id,
    type: adj.type === 'add' ? 'balance_add' : 'balance_deduct',
    amount: adj.amount,
    previousBalance: adj.previousBalance,
    newBalance: adj.newBalance,
    status: 'completed',
    date: adj.createdAt,
    remarks: adj.remarks,
    adminName: adj.adminName,
    icon: adj.type === 'add' ? '➕' : '➖',
    color: adj.type === 'add' ? '#22e88c' : '#ff5a87',
    category: 'balance_adjustment'
  }));

  // Combine all transactions
  const allTransactions = [
    ...depositTransactions,
    ...withdrawalTransactions,
    ...rankRewardTransactions,
    ...investmentEarningTransactions,
    ...commissionTransactions,
    ...adjustmentTransactions
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filter transactions
  const filterTransactions = () => {
    let filtered = allTransactions;

    // Filter by type (tab)
    if (activeTab !== 'all') {
      if (activeTab === 'investment_earnings') {
        filtered = filtered.filter(t => t.category === 'investment_earning');
      } else {
        filtered = filtered.filter(t => t.category === activeTab);
      }
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.remarks?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.fromUser?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.rank?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.planName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    const now = new Date();
    if (dateFilter === 'today') {
      filtered = filtered.filter(t => new Date(t.date).toDateString() === now.toDateString());
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      filtered = filtered.filter(t => new Date(t.date) >= weekAgo);
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      filtered = filtered.filter(t => new Date(t.date) >= monthAgo);
    }

    return filtered;
  };

  const filteredTransactions = filterTransactions();

  // Calculate statistics
  const stats = {
    totalDeposits: depositTransactions.reduce((sum, t) => sum + t.amount, 0),
    totalWithdrawals: withdrawalTransactions.reduce((sum, t) => sum + t.amount, 0),
    totalCommissions: commissionTransactions.reduce((sum, t) => sum + t.amount, 0),
    totalRewards: rankRewardTransactions.reduce((sum, t) => sum + t.amount, 0),
    totalInvestmentEarnings: investmentEarningTransactions.reduce((sum, t) => sum + t.amount, 0),
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { class: 'pending', label: 'Pending' },
      'approved': { class: 'completed', label: 'Completed' },
      'completed': { class: 'completed', label: 'Completed' },
      'rejected': { class: 'rejected', label: 'Rejected' },
      'add': { class: 'completed', label: 'Added' },
      'deduct': { class: 'rejected', label: 'Deducted' }
    };
    const s = statusMap[status] || { class: 'pending', label: status };
    return <span className={`tx-status-badge ${s.class}`}>{s.label}</span>;
  };

  const getTransactionIcon = (tx) => {
    if (tx.icon) {
      return typeof tx.icon === 'string' ? tx.icon : tx.icon;
    }
    return '📄';
  };

  const tabs = [
    { id: 'all', label: 'All Transactions', icon: <FaHistory /> },
    { id: 'deposit', label: 'Deposits', icon: '📥' },
    { id: 'withdrawal', label: 'Withdrawals', icon: '📤' },
    { id: 'investment_earnings', label: 'Investment Earnings', icon: <FaChartLine /> },
    { id: 'commission', label: 'Commissions', icon: '💰' },
    { id: 'rank_reward', label: 'Rank Rewards', icon: '🏆' },
    { id: 'balance_adjustment', label: 'Balance Adjustments', icon: '⚖️' },
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
              <h2 className="sx-title">Transaction History</h2>
              <p className="sx-subtitle">View all your financial activities</p>
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

        <div className="tx-shell">
          {/* Header Section */}
          <div className="tx-header-section">
            <div className="tx-header-content">
              <div className="tx-header-badge">
                <FaHistory /> TRANSACTION HISTORY
              </div>
              <h1 className="tx-header-title">Your Financial Journey</h1>
              <p className="tx-header-subtitle">
                Track all your deposits, withdrawals, investment earnings, commissions, rewards, and balance adjustments
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="tx-stats-grid">
            <div className="tx-stat-card">
              <div className="tx-stat-icon" style={{ background: 'rgba(34, 232, 140, 0.1)', color: '#22e88c' }}>
                <FiArrowDown />
              </div>
              <div className="tx-stat-info">
                <span className="tx-stat-label">Total Deposits</span>
                <strong className="tx-stat-value">{formatCurrency(stats.totalDeposits)}</strong>
                <span className="tx-stat-sub">{depositTransactions.length} transactions</span>
              </div>
            </div>
            <div className="tx-stat-card">
              <div className="tx-stat-icon" style={{ background: 'rgba(255, 177, 77, 0.1)', color: '#ffb14d' }}>
                <FiArrowUp />
              </div>
              <div className="tx-stat-info">
                <span className="tx-stat-label">Total Withdrawals</span>
                <strong className="tx-stat-value">{formatCurrency(stats.totalWithdrawals)}</strong>
                <span className="tx-stat-sub">{withdrawalTransactions.length} transactions</span>
              </div>
            </div>
            <div className="tx-stat-card">
              <div className="tx-stat-icon" style={{ background: 'rgba(144, 96, 255, 0.1)', color: '#9060ff' }}>
                <FaChartLine />
              </div>
              <div className="tx-stat-info">
                <span className="tx-stat-label">Investment Earnings</span>
                <strong className="tx-stat-value">{formatCurrency(stats.totalInvestmentEarnings)}</strong>
                <span className="tx-stat-sub">{investmentEarningTransactions.length} earnings</span>
              </div>
            </div>
            <div className="tx-stat-card">
              <div className="tx-stat-icon" style={{ background: 'rgba(255, 215, 0, 0.1)', color: '#ffd700' }}>
                <FiAward />
              </div>
              <div className="tx-stat-info">
                <span className="tx-stat-label">Total Commissions</span>
                <strong className="tx-stat-value">{formatCurrency(stats.totalCommissions)}</strong>
                <span className="tx-stat-sub">{commissionTransactions.length} earnings</span>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="tx-filters-section">
            <div className="tx-search-bar">
              <FiSearch className="tx-search-icon" />
              <input
                type="text"
                placeholder="Search by remarks, transaction ID, plan name, or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="tx-search-input"
              />
            </div>
            <button
              className="tx-filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters
            </button>
          </div>

          {showFilters && (
            <div className="tx-filters-panel">
              <div className="tx-filter-group">
                <label>Date Range</label>
                <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
              <div className="tx-filter-group">
                <label>Transaction Type</label>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="all">All Types</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                  <option value="investment_earning">Investment Earnings</option>
                  <option value="commission">Commissions</option>
                  <option value="rank_reward">Rank Rewards</option>
                  <option value="balance_adjustment">Balance Adjustments</option>
                </select>
              </div>
              <button className="tx-filter-clear" onClick={() => {
                setSearchTerm("");
                setDateFilter("all");
                setTypeFilter("all");
              }}>
                Clear Filters
              </button>
            </div>
          )}

          {/* Tabs */}
          <div className="tx-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tx-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tx-tab-icon">{tab.icon}</span>
                <span className="tx-tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Transactions List */}
          <div className="tx-list">
            {filteredTransactions.length === 0 ? (
              <div className="tx-empty">
                <FaHistory className="tx-empty-icon" />
                <h3>No Transactions Found</h3>
                <p>There are no transactions matching your criteria.</p>
              </div>
            ) : (
              filteredTransactions.map((tx, index) => (
                <div key={tx.id || index} className="tx-card">
                  <div className="tx-card-header">
                    <div className="tx-card-icon" style={{ background: `${tx.color}15`, color: tx.color }}>
                      <span>{getTransactionIcon(tx)}</span>
                    </div>
                    <div className="tx-card-info">
                      <div className="tx-card-title">
                        <h3>
                          {tx.type === 'deposit' && 'Deposit'}
                          {tx.type === 'withdrawal' && 'Withdrawal'}
                          {tx.type === 'investment_earning' && `Investment Earning - ${tx.planName || 'Plan'}`}
                          {tx.type === 'commission' && `Level ${tx.level} Commission`}
                          {tx.type === 'rank_reward' && `${tx.rank} Reward`}
                          {tx.type === 'balance_add' && 'Balance Added'}
                          {tx.type === 'balance_deduct' && 'Balance Deducted'}
                        </h3>
                        {getStatusBadge(tx.status)}
                      </div>
                      <p className="tx-card-method">
                        {tx.method && `via ${tx.method}`}
                        {tx.fromUser && `from ${tx.fromUser} (${tx.fromUserCode})`}
                        {tx.rank && `for achieving ${tx.rank}`}
                        {tx.planName && `from ${tx.planName}`}
                        {tx.profitType && ` - ${tx.profitType} profit`}
                      </p>
                    </div>
                    <div className="tx-card-amount">
                      <strong style={{ 
                        color: tx.type === 'withdrawal' || tx.type === 'balance_deduct' 
                          ? '#ff5a87' 
                          : tx.type === 'investment_earning' 
                            ? '#9060ff' 
                            : '#22e88c' 
                      }}>
                        {tx.type === 'withdrawal' || tx.type === 'balance_deduct' ? '-' : '+'}
                        {formatCurrency(tx.amount)}
                      </strong>
                      {tx.netAmount && (
                        <span className="tx-card-net">Net: {formatCurrency(tx.netAmount)}</span>
                      )}
                      {tx.fee > 0 && (
                        <span className="tx-card-fee">Fee: {formatCurrency(tx.fee)}</span>
                      )}
                      {tx.investmentAmount && (
                        <span className="tx-card-investment">Investment: {formatCurrency(tx.investmentAmount)}</span>
                      )}
                      {tx.roi && (
                        <span className="tx-card-roi">ROI: {tx.roi}</span>
                      )}
                      {tx.cycle && (
                        <span className="tx-card-cycle">Cycle: {tx.cycle}</span>
                      )}
                    </div>
                  </div>

                  <div className="tx-card-body">
                    <div className="tx-card-details">
                      <div className="tx-detail-item">
                        <FiClock className="tx-detail-icon" />
                        <span>{formatDate(tx.date)}</span>
                      </div>
                      {tx.transactionId && (
                        <div className="tx-detail-item">
                          <FiCreditCard className="tx-detail-icon" />
                          <span>ID: {tx.transactionId}</span>
                        </div>
                      )}
                      {tx.accountNumber && (
                        <div className="tx-detail-item">
                          <FiUser className="tx-detail-icon" />
                          <span>Account: {tx.accountNumber}</span>
                        </div>
                      )}
                      {tx.depositAmount && (
                        <div className="tx-detail-item">
                          <FiActivity className="tx-detail-icon" />
                          <span>Deposit: {formatCurrency(tx.depositAmount)}</span>
                        </div>
                      )}
                      {tx.rate && (
                        <div className="tx-detail-item">
                          <FiTrendingUp className="tx-detail-icon" />
                          <span>Rate: {tx.rate}%</span>
                        </div>
                      )}
                      {tx.previousBalance && (
                        <div className="tx-detail-item">
                          <FaExchangeAlt className="tx-detail-icon" />
                          <span>Balance: {formatCurrency(tx.previousBalance)} → {formatCurrency(tx.newBalance)}</span>
                        </div>
                      )}
                      {tx.planName && (
                        <div className="tx-detail-item">
                          <FaRocket className="tx-detail-icon" />
                          <span>Plan: {tx.planName}</span>
                        </div>
                      )}
                    </div>
                    <div className="tx-card-remarks">
                      <strong>Remarks:</strong> {tx.remarks}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}