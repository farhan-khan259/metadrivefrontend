import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaChartLine,
  FaClock,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaRocket,
  FaUsers,
  FaWallet,
  FaCoins,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import {
  FiActivity,
  FiTrendingUp,
  FiDollarSign,
  FiUserPlus,
  FiBell,
  FiShoppingBag,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Charts from "../components/Charts";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/admin.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(
          "https://be.sparkx1.pro/api/admin/dashboard-stats"
        );
        if (response.data.success) {
          setStats(response.data.stats);
        } else {
          setError("Failed to fetch dashboard statistics");
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Error loading dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <div className="admin-loading">
              <div className="admin-loading-spinner"></div>
              <p>Loading dashboard data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <div className="admin-error-state">
              <div className="error-icon">⚠️</div>
              <h3>Error Loading Dashboard</h3>
              <p>{error}</p>
              <button
                className="admin-btn primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <div className="admin-error-state">
              <div className="error-icon">📊</div>
              <h3>No Data Available</h3>
              <p>Unable to load dashboard statistics at this time.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0).replace('PKR', '₨');
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-PK').format(value || 0);
  };

  const statCards = [
    {
      title: "Today's Users",
      value: formatNumber(stats.todayUsers),
      icon: FaUsers,
      variant: "primary",
      trend: "+12%",
      trendUp: true,
      subtitle: "New registrations",
      color: "#22e88c",
      link: "/admin/users?filter=today",
    },
    {
      title: "Today's Deposits",
      value: formatCurrency(stats.todayDeposits),
      icon: FaMoneyBillWave,
      variant: "success",
      trend: "+8%",
      trendUp: true,
      subtitle: "Total deposits today",
      color: "#5aa6ff",
      link: "/admin/deposits/completed?filter=today",
    },
    {
      title: "Today's Withdrawals",
      value: formatCurrency(stats.todayWithdrawals),
      icon: FaWallet,
      variant: "warning",
      trend: "-3%",
      trendUp: false,
      subtitle: "Total withdrawals today",
      color: "#ffb14d",
      link: "/admin/withdrawals/completed?filter=today",
    },
    {
      title: "Total Users",
      value: formatNumber(stats.totalUsers),
      icon: FiUserPlus,
      variant: "primary",
      trend: "+15%",
      trendUp: true,
      subtitle: "All-time users",
      color: "#c77dff",
      link: "/admin/users",
    },
    {
      title: "Total Deposits",
      value: formatCurrency(stats.totalDeposits),
      icon: FiTrendingUp,
      variant: "success",
      trend: "+22%",
      trendUp: true,
      subtitle: "All-time deposits",
      color: "#22e88c",
      link: "/admin/deposits/completed",
    },
    {
      title: "Total Withdrawals",
      value: formatCurrency(stats.totalWithdrawals),
      icon: FiActivity,
      variant: "accent",
      trend: "+18%",
      trendUp: true,
      subtitle: "All-time withdrawals",
      color: "#ff5a87",
      link: "/admin/withdrawals/completed",
    },
    {
      title: "Pending Deposits",
      value: formatNumber(stats.pendingDeposits),
      icon: FaHourglassHalf,
      variant: "warning",
      badge: "Action Required",
      badgeType: "warning",
      subtitle: "Awaiting approval",
      color: "#ffb14d",
      link: "/admin/deposits/pending",
    },
    {
      title: "Pending Withdrawals",
      value: formatNumber(stats.pendingWithdrawals),
      icon: FaClock,
      variant: "warning",
      badge: "Action Required",
      badgeType: "warning",
      subtitle: "Awaiting processing",
      color: "#ff5a87",
      link: "/admin/withdrawals/pending",
    },
    {
      title: "Active Plans",
      value: formatNumber(stats.activePlans),
      icon: FiShoppingBag,
      variant: "success",
      badge: "Running",
      badgeType: "success",
      subtitle: "Currently active",
      color: "#9060ff",
      link: "/admin/plans",
    },
  ];

  const netProfit = (stats.totalDeposits || 0) - (stats.totalWithdrawals || 0);
  const todayProfit = (stats.todayDeposits || 0) - (stats.todayWithdrawals || 0);
  const profitTrend = todayProfit >= 0 ? "positive" : "negative";
  const profitIcon = todayProfit >= 0 ? <FaArrowUp /> : <FaArrowUp style={{ transform: 'rotate(180deg)' }} />;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {/* Welcome Banner */}
          <div className="admin-welcome-banner">
            <div className="banner-content">
              <h1 className="banner-title">
                <FaRocket className="banner-icon" />
                Dashboard Overview
              </h1>
              <p className="banner-subtitle">
                Welcome back! Here's what's happening with your platform today.
              </p>
            </div>
            <div className="banner-stats">
              <div className="banner-stat">
                <span className="banner-stat-label">Server Status</span>
                <span className="banner-stat-value status-online">
                  <span className="status-dot"></span>
                  Online
                </span>
              </div>
              <div className="banner-stat">
                <span className="banner-stat-label">Last Update</span>
                <span className="banner-stat-value">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          {/* Profit Summary Cards */}
          <div className="admin-profit-summary">
            <Link to="/admin/reports/monthly" className="profit-card-link">
              <div className="profit-card net-profit">
                <div className="profit-icon">
                  <FaCoins />
                </div>
                <div className="profit-content">
                  <h3>Net Profit</h3>
                  <p className="profit-value">{formatCurrency(netProfit)}</p>
                  <div className="profit-trend positive">
                    <FaArrowUp /> +15% this month
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/reports/daily" className="profit-card-link">
              <div className="profit-card today-profit">
                <div className="profit-icon">
                  <FaChartLine />
                </div>
                <div className="profit-content">
                  <h3>Today's P&L</h3>
                  <p className="profit-value">{formatCurrency(todayProfit)}</p>
                  <div className={`profit-trend ${profitTrend}`}>
                    {profitIcon} {profitTrend === 'positive' ? '+8%' : '-2%'} from yesterday
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/reports/weekly" className="profit-card-link">
              <div className="profit-card conversion-rate">
                <div className="profit-icon">
                  <FiTrendingUp />
                </div>
                <div className="profit-content">
                  <h3>Conversion Rate</h3>
                  <p className="profit-value">68.5%</p>
                  <div className="profit-trend positive">
                    <FaArrowUp /> +5% this week
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Main Stats Grid */}
          <div className="admin-stats-grid">
            {statCards.map((card, index) => (
              <Link 
                key={index} 
                to={card.link} 
                className="admin-stat-card-link"
                style={{ textDecoration: 'none' }}
              >
                <div className="admin-stat-card-wrapper">
                  <Card {...card} />
                </div>
              </Link>
            ))}
          </div>

          {/* Charts Section */}
          <div className="admin-charts-section">
            <div className="section-header">
              <h2>
                <FaChartLine className="section-icon" />
                Analytics & Performance
              </h2>
              <div className="chart-filters">
                <Link to="/admin/reports/daily" className="filter-link">
                  <button className="filter-btn active">Weekly</button>
                </Link>
                <Link to="/admin/reports/monthly" className="filter-link">
                  <button className="filter-btn">Monthly</button>
                </Link>
                <Link to="/admin/reports/custom" className="filter-link">
                  <button className="filter-btn">Yearly</button>
                </Link>
              </div>
            </div>
            <Charts
              userGrowth={stats.userGrowth}
              monthlyDeposits={stats.monthlyDeposits}
            />
          </div>

          {/* Recent Activity Grid */}
          <div className="admin-activity-grid">
            {/* Recent Deposits */}
            <div className="activity-card">
              <div className="activity-card-header">
                <div className="activity-card-title">
                  <FaMoneyBillWave className="activity-card-icon" />
                  <h3>Recent Deposits</h3>
                </div>
                <Link to="/admin/deposits/completed" className="activity-view-all">
                  View All →
                </Link>
              </div>
              <div className="activity-card-body">
                {stats.recentDeposits?.length > 0 ? (
                  <div className="activity-list">
                    {stats.recentDeposits.slice(0, 5).map((deposit, index) => (
                      <Link 
                        key={deposit.id || index} 
                        to={`/admin/userdetails/${deposit.user_id}`}
                        state={{ userId: deposit.user_id }}
                        className="activity-item-link"
                      >
                        <div className="activity-item">
                          <div className="activity-user">
                            <div className="activity-avatar">
                              {deposit.user_id?.slice(0, 2).toUpperCase() || 'U'}
                            </div>
                            <div className="activity-user-info">
                              <span className="activity-user-id">
                                User {deposit.user_id?.slice(-6)}
                              </span>
                              <span className="activity-time">
                                {new Date(deposit.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                          <div className="activity-details">
                            <span className="activity-amount">
                              {formatCurrency(deposit.depositsAmount)}
                            </span>
                            <span className={`activity-status ${deposit.depositStatus}`}>
                              {deposit.depositStatus}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="activity-empty">
                    <p>No recent deposits</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Withdrawals */}
            <div className="activity-card">
              <div className="activity-card-header">
                <div className="activity-card-title">
                  <FaWallet className="activity-card-icon" />
                  <h3>Recent Withdrawals</h3>
                </div>
                <Link to="/admin/withdrawals/completed" className="activity-view-all">
                  View All →
                </Link>
              </div>
              <div className="activity-card-body">
                {stats.recentWithdrawals?.length > 0 ? (
                  <div className="activity-list">
                    {stats.recentWithdrawals.slice(0, 5).map((withdrawal, index) => (
                      <Link 
                        key={withdrawal.id || index} 
                        to={`/admin/userdetails/${withdrawal.user_id}`}
                        state={{ userId: withdrawal.user_id }}
                        className="activity-item-link"
                      >
                        <div className="activity-item">
                          <div className="activity-user">
                            <div className="activity-avatar">
                              {withdrawal.user_id?.slice(0, 2).toUpperCase() || 'U'}
                            </div>
                            <div className="activity-user-info">
                              <span className="activity-user-id">
                                User {withdrawal.user_id?.slice(-6)}
                              </span>
                              <span className="activity-time">
                                {new Date(withdrawal.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                          <div className="activity-details">
                            <span className="activity-amount">
                              {formatCurrency(withdrawal.withdrawalsAmount)}
                            </span>
                            <span className={`activity-status ${withdrawal.withdrawalStatus}`}>
                              {withdrawal.withdrawalStatus}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="activity-empty">
                    <p>No recent withdrawals</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Users */}
            <div className="activity-card">
              <div className="activity-card-header">
                <div className="activity-card-title">
                  <FaUsers className="activity-card-icon" />
                  <h3>Recent Users</h3>
                </div>
                <Link to="/admin/users" className="activity-view-all">
                  View All →
                </Link>
              </div>
              <div className="activity-card-body">
                {stats.recentUsers?.length > 0 ? (
                  <div className="activity-list">
                    {stats.recentUsers.slice(0, 5).map((user, index) => (
                      <Link 
                        key={user.id || index} 
                        to={`/admin/userdetails/${user._id}`}
                        state={{ userId: user._id }}
                        className="activity-item-link"
                      >
                        <div className="activity-item">
                          <div className="activity-user">
                            <div className="activity-avatar">
                              {user.fullName?.slice(0, 2).toUpperCase() || 'U'}
                            </div>
                            <div className="activity-user-info">
                              <span className="activity-user-id">
                                {user.fullName || 'New User'}
                              </span>
                              <span className="activity-time">
                                {new Date(user.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                          <div className="activity-details">
                            <span className="activity-role">
                              {user.role || 'Member'}
                            </span>
                            <span className="activity-status completed">
                              Active
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="activity-empty">
                    <p>No recent users</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats Footer */}
          <div className="admin-quick-stats">
            <Link to="/admin/reports/daily" className="quick-stat-link">
              <div className="quick-stat-item">
                <FiActivity className="quick-stat-icon" />
                <div className="quick-stat-info">
                  <span className="quick-stat-label">Active Sessions</span>
                  <span className="quick-stat-value">1,432</span>
                </div>
              </div>
            </Link>
            <Link to="/admin/reports/daily" className="quick-stat-link">
              <div className="quick-stat-item">
                <FaClock className="quick-stat-icon" />
                <div className="quick-stat-info">
                  <span className="quick-stat-label">Avg. Response</span>
                  <span className="quick-stat-value">1.2s</span>
                </div>
              </div>
            </Link>
            <Link to="/admin/reports/monthly" className="quick-stat-link">
              <div className="quick-stat-item">
                <FiTrendingUp className="quick-stat-icon" />
                <div className="quick-stat-info">
                  <span className="quick-stat-label">Server Uptime</span>
                  <span className="quick-stat-value">99.9%</span>
                </div>
              </div>
            </Link>
            <Link to="/admin/status" className="quick-stat-link">
              <div className="quick-stat-item">
                <FaCheckCircle className="quick-stat-icon" />
                <div className="quick-stat-info">
                  <span className="quick-stat-label">System Health</span>
                  <span className="quick-stat-value success">Excellent</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}