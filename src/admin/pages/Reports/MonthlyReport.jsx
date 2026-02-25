// import { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Topbar from "../../components/Topbar";
// import axios from "axios";
// import "../../styles/admin.css";

// export default function MonthlyReport() {
//   const [reportData, setReportData] = useState({
//     date: "",
//     day: "",
//     users: [],
//     monthlyUserscount: 0,
//     deposits: 0,
//     withdrawals: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchmonthlyReport = async () => {
//       try {
//         const response = await axios.get(
//           "https://be.metadrive01.xyz/api/admin/report/monthly"
//         );

//         if (response.data.success) {
//           setReportData(response.data.stats);
//         } else {
//           setError("Failed to fetch monthly report");
//         }
//       } catch (error) {
//         console.error("Error fetching monthly report:", error);
//         setError("Error fetching monthly report data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchmonthlyReport();
//   }, []);

//   if (loading) {
//     return (
//       <div className="admin-layout">
//         <Sidebar />
//         <div className="admin-main">
//           <Topbar />
//           <div className="admin-content">Loading monthly report...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="admin-layout">
//         <Sidebar />
//         <div className="admin-main">
//           <Topbar />
//           <div className="admin-content" style={{ color: "red" }}>
//             {error}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Topbar />
//         <div className="admin-content">
//           <h2>
//             monthly Report - {reportData.date} ({reportData.day})
//           </h2>

//           {/* Summary Cards */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//               gap: "16px",
//               marginBottom: "20px",
//             }}
//           >
//             <div
//               className="card-box"
//               style={{ padding: 16, textAlign: "center" }}
//             >
//               <h3>Total Deposits</h3>
//               <p style={{ fontSize: "20px", fontWeight: "bold" }}>
//                 PKR {reportData.deposits?.toLocaleString()}
//               </p>
//             </div>
//             <div
//               className="card-box"
//               style={{ padding: 16, textAlign: "center" }}
//             >
//               <h3>Total Withdrawals</h3>
//               <p style={{ fontSize: "20px", fontWeight: "bold" }}>
//                 PKR {reportData.withdrawals?.toLocaleString()}
//               </p>
//             </div>
//             <div
//               className="card-box"
//               style={{ padding: 16, textAlign: "center" }}
//             >
//               <h3>New Users Month</h3>
//               <p style={{ fontSize: "20px", fontWeight: "bold" }}>
//                 {reportData.usercount?.toLocaleString()}
//               </p>
//             </div>
//             <div
//               className="card-box"
//               style={{ padding: 16, textAlign: "center" }}
//             >
//               <h3>Net Profit</h3>
//               <p
//                 style={{
//                   fontSize: "20px",
//                   fontWeight: "bold",
//                   color: "green",
//                 }}
//               >
//                 PKR{" "}
//                 {(
//                   reportData.deposits - reportData.withdrawals
//                 )?.toLocaleString()}
//               </p>
//             </div>
//           </div>

//           {/* New Users Table */}
//           <div
//             className="card-box"
//             style={{ padding: 12, marginBottom: "20px" }}
//           >
//             <h3 style={{ marginBottom: "10px" }}>New Users Registered Month</h3>
//             <table className="userlist-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Full Name</th>
//                   <th>Email</th>
//                   <th>WhatsApp</th>
//                   <th>Referral Code</th>
//                   <th>Registration Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.users.length > 0 ? (
//                   reportData.users.map((user, i) => (
//                     <tr key={user._id}>
//                       <td data-label="ID">{i + 1}</td>
//                       <td data-label="Full Name">{user.fullName}</td>
//                       <td data-label="Email">{user.email}</td>
//                       <td data-label="WhatsApp">{user.whatsappNumber}</td>
//                       <td data-label="Referral Code">{user.randomCode}</td>
//                       <td data-label="Registration Date">
//                         {new Date(user.createdAt)?.toLocaleString()}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       style={{ textAlign: "center", color: "#666" }}
//                     >
//                       No users registered Month
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Note about deposits/withdrawals */}
//           <div
//             className="card-box"
//             style={{ padding: 12, backgroundColor: "#f8f9fa" }}
//           >
//             <h4>Note:</h4>
//             <p>
//               The API currently provides summary data for deposits and
//               withdrawals. For detailed transaction lists, you might need to
//               implement additional endpoints or modify the existing API to
//               include transaction details.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/admin/pages/Reports/monthly.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCalendarAlt,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/reports.css";

export default function MonthlyReport() {
  const [reportData, setReportData] = useState({
    date: "",
    day: "",
    users: [],
    monthlyUserscount: 0,
    deposits: 0,
    withdrawals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      try {
        const response = await axios.get(
          "https://be.metadrive01.xyz/api/admin/report/monthly"
        );

        if (response.data.success) {
          setReportData(response.data.stats);
        } else {
          setError("Failed to fetch monthly report");
        }
      } catch (error) {
        console.error("Error fetching monthly report:", error);
        setError("Error fetching monthly report data");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyReport();
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
              <p>Loading monthly report...</p>
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
              <h3>Error Loading Report</h3>
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

  const netProfit = reportData.deposits - reportData.withdrawals;
  const profitColor = netProfit >= 0 ? "success" : "danger";
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {/* Header Section */}
          <div className="admin-page-header">
            <div className="admin-page-title-section">
              <div className="admin-page-icon monthly">
                <FaCalendarAlt />
              </div>
              <div>
                <h1>Monthly Report</h1>
                <p>Comprehensive overview of monthly platform performance</p>
                <div className="report-date">
                  {currentMonth} • Complete Monthly Analysis
                </div>
              </div>
            </div>
            <div className="admin-page-stats">
              <div className="admin-stat-card monthly">
                <span className="admin-stat-value">
                  {reportData.monthlyUserscount?.toLocaleString()}
                </span>
                <span className="admin-stat-label">Monthly Users</span>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="report-cards-grid">
            <div className="report-card income large">
              <div className="report-card-icon">
                <FaArrowUp />
              </div>
              <div className="report-card-content">
                <h3>Monthly Deposits</h3>
                <p className="report-card-value">
                  PKR {reportData.deposits?.toLocaleString()}
                </p>
                <span className="report-card-trend positive">
                  +25% from last month
                </span>
                <div className="report-card-subtext">
                  Average: PKR {(reportData.deposits / 30).toLocaleString()}/day
                </div>
              </div>
            </div>

            <div className="report-card expense large">
              <div className="report-card-icon">
                <FaArrowDown />
              </div>
              <div className="report-card-content">
                <h3>Monthly Withdrawals</h3>
                <p className="report-card-value">
                  PKR {reportData.withdrawals?.toLocaleString()}
                </p>
                <span className="report-card-trend">+18% from last month</span>
                <div className="report-card-subtext">
                  Average: PKR {(reportData.withdrawals / 30).toLocaleString()}
                  /day
                </div>
              </div>
            </div>

            <div className="report-card users">
              <div className="report-card-icon">
                <FaUsers />
              </div>
              <div className="report-card-content">
                <h3>New Users</h3>
                <p className="report-card-value">
                  {reportData.monthlyUserscount?.toLocaleString()}
                </p>
                <span className="report-card-trend positive">
                  +32% from last month
                </span>
              </div>
            </div>

            <div className={`report-card profit ${profitColor}`}>
              <div className="report-card-icon">
                <FaChartLine />
              </div>
              <div className="report-card-content">
                <h3>Net Profit</h3>
                <p className="report-card-value">
                  PKR {netProfit?.toLocaleString()}
                </p>
                <span
                  className={`report-card-trend ${
                    netProfit >= 0 ? "positive" : "negative"
                  }`}
                >
                  {netProfit >= 0 ? "+22%" : "-8%"} from last month
                </span>
              </div>
            </div>
          </div>

          {/* New Users Table */}
          <div className="report-section">
            <div className="report-section-header">
              <h2>
                <FaUsers className="section-icon" />
                New Users This Month
                <span className="user-count-badge">
                  {reportData.users.length} users
                </span>
              </h2>
            </div>
            <div className="report-table-container">
              {reportData.users.length > 0 ? (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Details</th>
                      <th>Contact Information</th>
                      <th>Referral Code</th>
                      <th>Registration Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.users.map((user, i) => (
                      <tr key={user._id} className="admin-table-row">
                        <td>
                          <div className="user-index">{i + 1}</div>
                        </td>
                        <td>
                          <div className="user-info-cell">
                            <div className="user-avatar-sm">
                              {user.fullName?.charAt(0) || "U"}
                            </div>
                            <div className="user-details">
                              <span className="user-name">{user.fullName}</span>
                              <span className="user-email">{user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="contact-cell">
                            <span className="whatsapp-number">
                              {user.whatsappNumber}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="referral-code">
                            {user.randomCode}
                          </span>
                        </td>
                        <td>
                          <div className="date-cell">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          <span className="status-badge active">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="admin-empty-state">
                  <div className="empty-state-icon">
                    <FaUsers />
                  </div>
                  <h3>No New Users This Month</h3>
                  <p>No users have registered on the platform this month.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
