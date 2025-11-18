// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // ✅ Add this
// import Card from "../components/Card";
// import Charts from "../components/Charts";
// import Topbar from "../components/Topbar";
// import "../styles/admin.css";

// export default function Dashboard() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         const response = await axios.get(
//           "https://be.solarx0.com/api/admin/dashboard-stats"
//         );
//         if (response.data.success) {
//           setStats(response.data.stats);
//         } else {
//           setError("Failed to fetch dashboard statistics");
//         }
//       } catch (err) {
//         console.error("Error fetching dashboard stats:", err);
//         setError("Error loading dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, []);

//   if (loading) {
//     return (
//       <div className="admin-layout">
//         <div className="main-content">
//           <Topbar />
//           <div className="dashboard-container">
//             <div className="loading">Loading dashboard data...</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="admin-layout">
//         <div className="main-content">
//           <Topbar />
//           <div className="dashboard-container">
//             <div className="error">{error}</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!stats) {
//     return (
//       <div className="admin-layout">
//         <div className="main-content">
//           <Topbar />
//           <div className="dashboard-container">
//             <div className="error">No data available</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const cards = [
//     { title: "Today Users Join", value: stats.todayUsers },
//     {
//       title: "Today Deposit ",
//       value: `PKR ${stats.todayDeposits?.toLocaleString()}`,
//     },
//     {
//       title: "Today Withdraw ",
//       value: `PKR ${stats.todayWithdrawals?.toLocaleString()}`,
//     },
//     { title: "Total Users", value: stats.totalUsers },
//     {
//       title: "Total Deposits ",
//       value: `PKR ${stats.totalDeposits?.toLocaleString()}`,
//     },
//     {
//       title: "Total Withdrawals ",
//       value: `PKR ${stats.totalWithdrawals?.toLocaleString()}`,
//     },
//     {
//       title: "Pending Deposits",
//       value: stats.pendingDeposits,
//       link: "/admin/deposits/pending", // ✅ Add link here
//     },
//     {
//       title: "Pending Withdrawals",
//       value: stats.pendingWithdrawals,
//       link: "/admin/withdrawals/pending", // ✅ Add link here
//     },
//     { title: "Active Plans", value: stats.activePlans },
//   ];

//   return (
//     <div className="admin-layout">
//       <div className="main-content">
//         <Topbar />
//         <div className="dashboard-container">
//           {/* Cards */}
//           <div className="dashboard-cards">
//             {cards.map((c, i) => {
//               // 🎨 Define custom color styles
//               let bgColor = "#fff";
//               let textColor = "#000";

//               if (
//                 c.title === "Pending Deposits" ||
//                 c.title === "Pending Withdrawals"
//               ) {
//                 bgColor = "#1e88e5"; // nice blue
//                 textColor = "#fff"; // white text
//               } else if (i < 3) {
//                 bgColor = "#e53935"; // red for first 3
//                 textColor = "#fff";
//               }

//               const cardContent = (
//                 <Card
//                   title={c.title}
//                   value={c.value}
//                   color={bgColor}
//                   textColor={textColor}
//                 />
//               );

//               return c.link ? (
//                 <Link
//                   to={c.link}
//                   key={i}
//                   className="card-link"
//                   style={{ textDecoration: "none" }}
//                 >
//                   {cardContent}
//                 </Link>
//               ) : (
//                 <div key={i}>{cardContent}</div>
//               );
//             })}
//           </div>

//           {/* Charts */}
//           <div className="charts-section">
//             <Charts
//               userGrowth={stats.userGrowth}
//               monthlyDeposits={stats.monthlyDeposits}
//             />
//           </div>

//           {/* Recent Deposits */}
//           <div className="recent-section">
//             <h3>Recent Deposits</h3>
//             <div className="table-responsive">
//               <table className="dashboard-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>User</th>
//                     <th>Amount</th>
//                     <th>Method</th>
//                     <th>Status</th>
//                     <th>Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {stats.recentDeposits.map((d, index) => (
//                     <tr key={d.id}>
//                       <td>D{String(index + 1).padStart(3, "0")}</td>
//                       <td>{d.user_id}</td>
//                       <td>{d.depositsAmount?.toLocaleString()}</td>
//                       <td>{d.payment_method}</td>
//                       <td
//                         className={
//                           d.depositStatus === "completed"
//                             ? "status-completed"
//                             : "status-pending"
//                         }
//                       >
//                         {d.depositStatus}
//                       </td>
//                       <td>{d.createdAt}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Recent Withdrawals */}
//           <div className="recent-section">
//             <h3>Recent Withdrawals</h3>
//             <div className="table-responsive">
//               <table className="dashboard-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>User</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                     <th>Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {stats.recentWithdrawals.map((w, index) => (
//                     <tr key={w.id}>
//                       <td>W{String(index + 1).padStart(3, "0")}</td>
//                       <td>{w.user_id}</td>
//                       <td>{w.withdrawalsAmount?.toLocaleString()}</td>
//                       <td
//                         className={
//                           w.withdrawalStatus === "completed"
//                             ? "status-completed"
//                             : "status-pending"
//                         }
//                       >
//                         {w.withdrawalStatus}
//                       </td>
//                       <td>{w.createdAt}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
} from "react-icons/fa";
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
          "https://be.solarx0.com/api/admin/dashboard-stats"
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

  const cards = [
    {
      title: "Today Users Join",
      value: stats.todayUsers,
      icon: FaUsers,
      variant: "primary",
      trend: "+12%",
      description: "New registrations today",
    },
    {
      title: "Today Deposit",
      value: `PKR ${stats.todayDeposits?.toLocaleString()}`,
      icon: FaMoneyBillWave,
      variant: "success",
      trend: "+8%",
      description: "Total deposits today",
    },
    {
      title: "Today Withdraw",
      value: `PKR ${stats.todayWithdrawals?.toLocaleString()}`,
      icon: FaWallet,
      variant: "accent",
      trend: "+5%",
      description: "Total withdrawals today",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FaUsers,
      variant: "secondary",
      trend: "+15%",
      description: "All-time users",
    },
    {
      title: "Total Deposits",
      value: `PKR ${stats.totalDeposits?.toLocaleString()}`,
      icon: FaChartLine,
      variant: "success",
      trend: "+22%",
      description: "All-time deposits",
    },
    {
      title: "Total Withdrawals",
      value: `PKR ${stats.totalWithdrawals?.toLocaleString()}`,
      icon: FaExchangeAlt,
      variant: "accent",
      trend: "+18%",
      description: "All-time withdrawals",
    },
    {
      title: "Pending Deposits",
      value: stats.pendingDeposits,
      icon: FaClock,
      variant: "warning",
      trend: "Needs attention",
      description: "Awaiting approval",
      link: "/admin/deposits/pending",
    },
    {
      title: "Pending Withdrawals",
      value: stats.pendingWithdrawals,
      icon: FaClock,
      variant: "warning",
      trend: "Needs attention",
      description: "Awaiting processing",
      link: "/admin/withdrawals/pending",
    },
    {
      title: "Active Plans",
      value: stats.activePlans,
      icon: FaRocket,
      variant: "primary",
      trend: "+10%",
      description: "Running investments",
    },
  ];

  const netProfit = (stats.totalDeposits || 0) - (stats.totalWithdrawals || 0);
  const todayProfit =
    (stats.todayDeposits || 0) - (stats.todayWithdrawals || 0);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {/* Header Section */}
          <div className="admin-dashboard-header">
            <div className="dashboard-welcome">
              <h1>Dashboard Overview</h1>
              <p>
                Welcome back! Here's what's happening with your platform today.
              </p>
            </div>
            <div className="dashboard-summary">
              <div className="summary-card profit">
                <div className="summary-icon">
                  <FaChartLine />
                </div>
                <div className="summary-content">
                  <h3>Net Profit</h3>
                  <p className="summary-value">
                    PKR {netProfit?.toLocaleString()}
                  </p>
                  <span className="summary-trend positive">
                    <FaArrowUp /> +15% this month
                  </span>
                </div>
              </div>
              <div className="summary-card today">
                <div className="summary-icon">
                  <FaRocket />
                </div>
                <div className="summary-content">
                  <h3>Today's Profit</h3>
                  <p className="summary-value">
                    PKR {todayProfit?.toLocaleString()}
                  </p>
                  <span className="summary-trend positive">
                    <FaArrowUp /> +8% from yesterday
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Cards Grid */}
          <div className="admin-cards-grid">
            {cards.map((card, index) => {
              const cardElement = (
                <Card
                  key={index}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  variant={card.variant}
                  trend={card.trend}
                  description={card.description}
                />
              );

              return card.link ? (
                <Link to={card.link} key={index} className="admin-card-link">
                  {cardElement}
                </Link>
              ) : (
                <div key={index} className="admin-card-wrapper">
                  {cardElement}
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="admin-charts-section">
            <div className="section-header">
              <h2>
                <FaChartLine className="section-icon" />
                Analytics & Trends
              </h2>
              <div className="chart-actions">
                <button className="admin-btn outline">Last 7 Days</button>
                <button className="admin-btn outline active">
                  Last 30 Days
                </button>
                <button className="admin-btn outline">Last 90 Days</button>
              </div>
            </div>
            <Charts
              userGrowth={stats.userGrowth}
              monthlyDeposits={stats.monthlyDeposits}
            />
          </div>

          {/* Recent Activity Section */}
          <div className="admin-activity-grid">
            {/* Recent Deposits */}
            <div className="activity-section">
              <div className="activity-header">
                <h3>
                  <FaMoneyBillWave className="activity-icon" />
                  Recent Deposits
                  <span className="activity-badge">
                    {stats.recentDeposits?.length || 0}
                  </span>
                </h3>
                <Link to="/admin/deposits/completed" className="view-all-link">
                  View All →
                </Link>
              </div>
              <div className="activity-table-container">
                {stats.recentDeposits?.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentDeposits.slice(0, 5).map((d, index) => (
                        <tr key={d.id || index} className="admin-table-row">
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-xs">
                                {d.user_id?.charAt(0) || "U"}
                              </div>
                              <span className="user-id">
                                User {d.user_id?.slice(-6) || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="amount-cell">
                              PKR {d.depositsAmount?.toLocaleString()}
                            </span>
                          </td>
                          <td>
                            <span className="method-badge">
                              {d.payment_method}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`status-badge ${
                                d.depositStatus === "approved"
                                  ? "success"
                                  : "pending"
                              }`}
                            >
                              {d.depositStatus}
                            </span>
                          </td>
                          <td>
                            <span className="date-cell">
                              {new Date(d.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="empty-activity">
                    <p>No recent deposits</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Withdrawals */}
            <div className="activity-section">
              <div className="activity-header">
                <h3>
                  <FaWallet className="activity-icon" />
                  Recent Withdrawals
                  <span className="activity-badge">
                    {stats.recentWithdrawals?.length || 0}
                  </span>
                </h3>
                <Link
                  to="/admin/withdrawals/completed"
                  className="view-all-link"
                >
                  View All →
                </Link>
              </div>
              <div className="activity-table-container">
                {stats.recentWithdrawals?.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentWithdrawals.slice(0, 5).map((w, index) => (
                        <tr key={w.id || index} className="admin-table-row">
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-xs">
                                {w.user_id?.charAt(0) || "U"}
                              </div>
                              <span className="user-id">
                                User {w.user_id?.slice(-6) || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="amount-cell">
                              PKR {w.withdrawalsAmount?.toLocaleString()}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`status-badge ${
                                w.withdrawalStatus === "completed"
                                  ? "success"
                                  : "pending"
                              }`}
                            >
                              {w.withdrawalStatus}
                            </span>
                          </td>
                          <td>
                            <span className="date-cell">
                              {new Date(w.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="empty-activity">
                    <p>No recent withdrawals</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats Footer */}
          <div className="dashboard-footer">
            <div className="quick-stats">
              <div className="quick-stat">
                <span className="stat-label">Active Sessions</span>
                <span className="stat-value">142</span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Avg. Response Time</span>
                <span className="stat-value">1.2s</span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Server Uptime</span>
                <span className="stat-value">99.9%</span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Platform Health</span>
                <span className="stat-value success">Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
