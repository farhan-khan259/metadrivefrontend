// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import { FaSync } from "react-icons/fa";
// import Sidebar from "../../components/Sidebar";
// import Topbar from "../../components/Topbar";
// import "../../styles/userlist.css";

// export default function CompletedWithdrawals() {
//   const [q, setQ] = useState("");
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Fetch Withdrawals from backend
//   const fetchWithdrawals = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("https://be.metadrive01.xyz/api/payments");
//       setWithdrawals(res.data.data || []);
//       setError("");
//     } catch (error) {
//       console.error("Error fetching Withdrawals:", error);
//       setError("Failed to load withdrawals");
//       setWithdrawals([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWithdrawals();
//   }, []);

//   // ✅ Filter approved withdrawals + search
//   const filtered = useMemo(() => {
//     return (withdrawals || [])
//       .filter((d) => d.withdrawalStatus === "approved")
//       .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
//   }, [withdrawals, q]);

//   // ✅ Refresh button click handler
//   const handleRefresh = () => {
//     fetchWithdrawals();
//   };

//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Topbar />

//         <div className="admin-content">
//           <div className="page-header">
//             <h2>Completed Withdrawals</h2>
//             <button onClick={handleRefresh} className="refresh-btn">
//               <FaSync /> Refresh
//             </button>
//           </div>

//           <div style={{ marginBottom: 12 }}>
//             <input
//               placeholder="Search UID, method, amount..."
//               className="userlist-search"
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//             />
//           </div>

//           {loading ? (
//             <div className="loading">Loading completed withdrawals...</div>
//           ) : error ? (
//             <div className="error-message">{error}</div>
//           ) : (
//             <>
//               <table className="userlist-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>User ID</th>
//                     <th>Method</th>
//                     <th>Requested</th>
//                     <th>Fee</th>
//                     <th>Net Amount</th>
//                     <th>Date</th>
//                     <th>Account Number</th>
//                     <th>Holder Name</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.map((d) => (
//                     <tr key={d._id}>
//                       <td data-label="ID">{d._id}</td>
//                       <td data-label="User">
//                         {d.user_id?.randomCode || d.user_id?._id || "N/A"}
//                       </td>
//                       <td data-label="Method">{d.payment_method}</td>
//                       <td data-label="Requested">
//                         PKR {d.withdrawalsAmount?.toLocaleString()}
//                       </td>
//                       <td data-label="Fee">
//                         -PKR{" "}
//                         {d.withdrawalFee?.toLocaleString() ||
//                           Math.round(
//                             d.withdrawalsAmount * 0.03
//                           )?.toLocaleString()}
//                       </td>
//                       <td data-label="Net Amount">
//                         <strong>
//                           PKR{" "}
//                           {d.netWithdrawal?.toLocaleString() ||
//                             Math.round(
//                               d.withdrawalsAmount * 0.97
//                             )?.toLocaleString()}
//                         </strong>
//                       </td>
//                       <td data-label="Date">
//                         {new Date(d.createdAt).toLocaleDateString()}
//                       </td>
//                       <td data-label="Account Number">{d.accountNumber}</td>
//                       <td data-label="Holder Name">{d.accountHolderName}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {filtered.length === 0 && (
//                 <p style={{ marginTop: 20 }}>No completed withdrawals found.</p>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaCheckCircle, FaSearch, FaSync } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/transactions.css";

export default function CompletedWithdrawals() {
  const [q, setQ] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://be.metadrive01.xyz/api/payments");
      setWithdrawals(res.data.data || []);
      setError("");
    } catch (error) {
      console.error("Error fetching Withdrawals:", error);
      setError("Failed to load withdrawals");
      setWithdrawals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const filtered = useMemo(() => {
    return (withdrawals || [])
      .filter((d) => d.withdrawalStatus === "approved")
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [withdrawals, q]);

  const handleRefresh = () => {
    fetchWithdrawals();
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <div className="transaction-loading">
              <div className="transaction-loading-spinner"></div>
              <p>Loading completed withdrawals...</p>
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
            <div className="transaction-error">
              <div className="error-icon">⚠️</div>
              <h3>Error Loading Withdrawals</h3>
              <p>{error}</p>
              <button className="action-btn primary" onClick={handleRefresh}>
                <FaSync /> Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <div className="page-header">
            <div className="page-title-section">
              <div className="page-icon success">
                <FaCheckCircle />
              </div>
              <div>
                <h1>Completed Withdrawals</h1>
                <p>Approved and processed withdrawal requests</p>
              </div>
            </div>
            <button onClick={handleRefresh} className="refresh-btn">
              <FaSync /> Refresh
            </button>
          </div>

          <div className="transaction-controls">
            <div className="search-box-transaction">
              <FaSearch className="search-icon-transaction" />
              <input
                type="text"
                placeholder="Search UID, method, amount..."
                className="search-input-transaction"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

          <div className="card-box">
            {filtered.length > 0 ? (
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Method</th>
                    <th>Requested</th>
                    <th>Fee</th>
                    <th>Net Amount</th>
                    <th>Date</th>
                    <th>Account Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d._id} className="transaction-row-approved">
                      <td data-label="ID">
                        <span className="transaction-id">
                          {d._id?.slice(-8)}
                        </span>
                      </td>
                      <td data-label="User ID">
                        <div className="user-info">
                          <span className="user-id">
                            {d.user_id?.randomCode ||
                              d.user_id?._id?.slice(-8) ||
                              "N/A"}
                          </span>
                        </div>
                      </td>
                      <td data-label="Method">
                        <span className="method-badge">{d.payment_method}</span>
                      </td>
                      <td data-label="Requested">
                        <div className="amount-negative">
                          PKR {d.withdrawalsAmount?.toLocaleString()}
                        </div>
                      </td>
                      <td data-label="Fee">
                        <div className="fee-amount">
                          -PKR{" "}
                          {(
                            d.withdrawalFee ||
                            Math.round(d.withdrawalsAmount * 0.03)
                          )?.toLocaleString()}
                        </div>
                      </td>
                      <td data-label="Net Amount">
                        <div className="net-amount">
                          PKR{" "}
                          {(
                            d.netWithdrawal ||
                            Math.round(d.withdrawalsAmount * 0.97)
                          )?.toLocaleString()}
                        </div>
                      </td>
                      <td data-label="Date">
                        {new Date(d.createdAt).toLocaleDateString()}
                        <div className="time">
                          {new Date(d.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td data-label="Account Details">
                        <div className="account-details">
                          <div>
                            <strong>{d.accountHolderName}</strong>
                          </div>
                          <div>{d.accountNumber}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="transaction-empty-state">
                <div className="empty-state-icon">
                  <FaCheckCircle />
                </div>
                <h3>No Completed Withdrawals</h3>
                <p>No approved withdrawals found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
