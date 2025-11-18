// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Topbar from "../../components/Topbar";
// import "../../styles/userlist.css";

// export default function CompletedDeposits() {
//   const [q, setQ] = useState("");
//   const [deposits, setDeposits] = useState([]);

//   // ✅ Fetch deposits from backend
//   useEffect(() => {
//     const fetchDeposits = async () => {
//       try {
//         const res = await axios.get("https://be.solarx0.com/api/payments");
//         // ✅ backend returns { success, data: [...] }
//         setDeposits(res.data.data || []);
//       } catch (error) {
//         console.error("Error fetching deposits:", error);
//         setDeposits([]);
//       }
//     };

//     fetchDeposits();
//   }, []);

//   // ✅ Search + filter for approved deposits only
//   const filtered = useMemo(() => {
//     return (deposits || [])
//       .filter((d) => d.depositStatus === "approved")
//       .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
//   }, [deposits, q]);

//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Topbar />
//         <div className="admin-content">
//           <h2>Completed Deposits</h2>

//           {/* 🔍 Search Input */}
//           <div style={{ marginBottom: 12 }}>
//             <input
//               placeholder="Search UID, method, amount..."
//               className="userlist-search"
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//             />
//           </div>

//           {/* 📋 Table */}
//           <table className="userlist-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>User ID</th>
//                 <th>Method</th>
//                 <th>Amount</th>
//                 <th>Date</th>
//                 <th>Proof</th> {/* ✅ Added screenshot column */}
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((d) => (
//                 <tr key={d._id}>
//                   <td data-label="ID">{d._id}</td>
//                   <td data-label="User">
//                     {d.user_id?.randomCode || d.user_id?._id || "N/A"}
//                   </td>
//                   <td data-label="Method">{d.payment_method}</td>
//                   <td data-label="Amount">
//                     PKR {d.depositsAmount?.toLocaleString()}
//                   </td>
//                   <td data-label="Date">
//                     {new Date(d.createdAt).toLocaleDateString()}
//                   </td>
//                   <td data-label="Proof">
//                     {d.screenshot ? (
//                       <a
//                         href={`https://be.solarx0.com/${d.screenshot}`}
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         <img
//                           src={`https://be.solarx0.com/${d.screenshot}`}
//                           alt="Proof"
//                           className="deposit-proof-thumb"
//                         />
//                       </a>
//                     ) : (
//                       <span>No proof</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* 🟡 Empty state */}
//           {filtered.length === 0 && <p>No completed deposits found.</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaCheckCircle, FaSearch, FaReceipt } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/deposits.css";

export default function CompletedDeposits() {
  const [q, setQ] = useState("");
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch deposits from backend
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://be.solarx0.com/api/payments");
        setDeposits(res.data.data || []);
      } catch (error) {
        console.error("Error fetching deposits:", error);
        setDeposits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []);

  // ✅ Search + filter for approved deposits only
  const filtered = useMemo(() => {
    return (deposits || [])
      .filter((d) => d.depositStatus === "approved")
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [deposits, q]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
                <FaCheckCircle />
              </div>
              <div>
                <h1>Completed Deposits</h1>
                <p>Approved deposit transactions and history</p>
              </div>
            </div>
            <div className="admin-page-stats">
              <div className="admin-stat-card">
                <span className="admin-stat-value">{filtered.length}</span>
                <span className="admin-stat-label">Total Completed</span>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="admin-search-section">
            <div className="admin-search-box">
              <FaSearch className="admin-search-icon" />
              <input
                placeholder="Search by User ID, Method, Amount..."
                className="admin-search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="admin-table-container">
            {loading ? (
              <div className="admin-loading">
                <div className="admin-loading-spinner"></div>
                <p>Loading deposits...</p>
              </div>
            ) : (
              <>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Transaction</th>
                      <th>User</th>
                      <th>Method</th>
                      <th>Amount</th>
                      <th>Date & Time</th>
                      <th>Proof</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((d) => (
                      <tr key={d._id} className="admin-table-row">
                        <td>
                          <div className="transaction-id">
                            <FaReceipt className="transaction-icon" />
                            {d._id.slice(-8)}
                          </div>
                        </td>
                        <td>
                          <div className="user-info-cell">
                            <div className="user-avatar-sm">
                              {d.user_id?.randomCode?.charAt(0) || "U"}
                            </div>
                            <div className="user-details">
                              <span className="user-id">
                                {d.user_id?.randomCode ||
                                  d.user_id?._id ||
                                  "N/A"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="payment-method-badge">
                            {d.payment_method}
                          </span>
                        </td>
                        <td>
                          <div className="amount-cell">
                            <span className="amount-value">
                              PKR {d.depositsAmount?.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="date-cell">
                            {formatDate(d.createdAt)}
                          </div>
                        </td>
                        <td>
                          {d.screenshot ? (
                            <a
                              href={`http://localhost:3005/${d.screenshot}`}
                              target="_blank"
                              rel="noreferrer"
                              className="proof-link"
                            >
                              <div className="proof-thumbnail">
                                <img
                                  src={`http://localhost:3005/${d.screenshot}`}
                                  alt="Deposit Proof"
                                />
                                <div className="proof-overlay">
                                  <span>View Proof</span>
                                </div>
                              </div>
                            </a>
                          ) : (
                            <span className="no-proof">No proof</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Empty State */}
                {filtered.length === 0 && !loading && (
                  <div className="admin-empty-state">
                    <div className="empty-state-icon">
                      <FaCheckCircle />
                    </div>
                    <h3>No Completed Deposits</h3>
                    <p>
                      There are no approved deposits to display at the moment.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
