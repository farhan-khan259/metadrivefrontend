// import { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Topbar from "../../components/Topbar";
// import axios from "axios";
// import "../../styles/admin.css";

// export default function DailyReport() {
//   const [reportData, setReportData] = useState({
//     date: "",
//     day: "",
//     users: [],
//     dailyUserscount: 0,
//     deposits: 0,
//     withdrawals: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDailyReport = async () => {
//       try {
//         const response = await axios.get(
//           "https://be.metadrive01.xyz/api/admin/report/daily"
//         );

//         if (response.data.success) {
//           setReportData(response.data.stats);
//         } else {
//           setError("Failed to fetch daily report");
//         }
//       } catch (error) {
//         console.error("Error fetching daily report:", error);
//         setError("Error fetching daily report data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDailyReport();
//   }, []);

//   if (loading) {
//     return (
//       <div className="admin-layout">
//         <Sidebar />
//         <div className="admin-main">
//           <Topbar />
//           <div className="admin-content">Loading daily report...</div>
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
//             Daily Report - {reportData.date} ({reportData.day})
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
//               <h3>New Users Today</h3>
//               <p style={{ fontSize: "20px", fontWeight: "bold" }}>
//                 {reportData.dailyUserscount?.toLocaleString()}
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
//             <h3 style={{ marginBottom: "10px" }}>New Users Registered Today</h3>
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
//                         {new Date(user.createdAt).toLocaleString()}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       style={{ textAlign: "center", color: "#666" }}
//                     >
//                       No users registered today
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

// src/admin/pages/Reports/daily.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCalendarDay,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/reports.css";

export default function DailyReport() {
  const [reportData, setReportData] = useState({
    date: "",
    day: "",
    users: [],
    dailyUserscount: 0,
    deposits: 0,
    withdrawals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyReport = async () => {
      try {
        const response = await axios.get(
          "https://be.metadrive01.xyz/api/admin/report/daily"
        );

        if (response.data.success) {
          setReportData(response.data.stats);
        } else {
          setError("Failed to fetch daily report");
        }
      } catch (error) {
        console.error("Error fetching daily report:", error);
        setError("Error fetching daily report data");
      } finally {
        setLoading(false);
      }
    };

    fetchDailyReport();
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
              <p>Loading daily report...</p>
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

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {/* Header Section */}
          <div className="admin-page-header">
            <div className="admin-page-title-section">
              <div className="admin-page-icon">
                <FaCalendarDay />
              </div>
              <div>
                <h1>Daily Report</h1>
                <p>Overview of today's platform activity and performance</p>
                <div className="report-date">
                  {reportData.date} • {reportData.day}
                </div>
              </div>
            </div>
            <div className="admin-page-stats">
              <div className="admin-stat-card">
                <span className="admin-stat-value">
                  {reportData.dailyUserscount?.toLocaleString()}
                </span>
                <span className="admin-stat-label">New Users Today</span>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="report-cards-grid">
            <div className="report-card income">
              <div className="report-card-icon">
                <FaArrowUp />
              </div>
              <div className="report-card-content">
                <h3>Total Deposits</h3>
                <p className="report-card-value">
                  PKR {reportData.deposits?.toLocaleString()}
                </p>
                <span className="report-card-trend positive">
                  +12% from yesterday
                </span>
              </div>
            </div>

            <div className="report-card expense">
              <div className="report-card-icon">
                <FaArrowDown />
              </div>
              <div className="report-card-content">
                <h3>Total Withdrawals</h3>
                <p className="report-card-value">
                  PKR {reportData.withdrawals?.toLocaleString()}
                </p>
                <span className="report-card-trend">-5% from yesterday</span>
              </div>
            </div>

            <div className="report-card users">
              <div className="report-card-icon">
                <FaUsers />
              </div>
              <div className="report-card-content">
                <h3>New Users</h3>
                <p className="report-card-value">
                  {reportData.dailyUserscount?.toLocaleString()}
                </p>
                <span className="report-card-trend positive">
                  +8% from yesterday
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
                  {netProfit >= 0 ? "+15%" : "-5%"} from yesterday
                </span>
              </div>
            </div>
          </div>

          {/* New Users Table */}
          <div className="report-section">
            <div className="report-section-header">
              <h2>
                <FaUsers className="section-icon" />
                New Users Registered Today
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
                      <th>Contact</th>
                      <th>Referral Code</th>
                      <th>Registration Time</th>
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
                            {new Date(user.createdAt).toLocaleString()}
                          </div>
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
                  <h3>No New Users Today</h3>
                  <p>No users have registered on the platform today.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
