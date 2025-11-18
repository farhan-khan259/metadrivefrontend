// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Topbar from "../../components/Topbar";
// import "../../styles/userlist.css";

// export default function PendingWithdrawals() {
//   const [q, setQ] = useState("");
//   const [withdrawal, setWithdrawal] = useState([]);

//   // Fetch withdrawal data from backend
//   useEffect(() => {
//     const fetchWithdrawal = async () => {
//       try {
//         const res = await axios.get("https://be.solarx0.com/api/payments");
//         console.log(res.data.data);
//         setWithdrawal(res.data.data || []);
//       } catch (error) {
//         console.error("Error fetching withdrawal:", error);
//         setWithdrawal([]);
//       }
//     };

//     fetchWithdrawal();
//   }, []);

//   // Filter pending withdrawals + search
//   const filtered = useMemo(() => {
//     return (withdrawal || [])
//       .filter((d) => d.withdrawalStatus === "pending")
//       .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
//   }, [withdrawal, q]);

//   // ✅ Handle Approve/Reject
//   const handleStatusChange = async (userId, newStatus, _id) => {
//     try {
//       const res = await axios.post("https://be.solarx0.com/api/status", {
//         userId,
//         status: newStatus,
//         type: "withdrawal",
//         requesId: _id,
//       });

//       alert(res.data.message);

//       // Update UI instantly
//       setWithdrawal((prev) =>
//         prev.map((d) =>
//           d._id === _id ? { ...d, withdrawalStatus: newStatus } : d
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Failed to update status.");
//     }
//   };

//   // ✅ Admin Login to User Account
//   const handleLoginAsUser = async (user) => {
//     if (!window.confirm("Login to this user's account?")) return;

//     try {
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");

//       const userId = user?._id || user; // Make sure it's the actual ID

//       const response = await axios.post(
//         `https://be.solarx0.com/api/adminLoginUserAccount`,
//         { userId }
//       );

//       if (response.status === 200) {
//         alert("Logging in as user...");
//         // Save full user data instead of just ID (important for plans)
//         localStorage.setItem("user", JSON.stringify({ _id: userId }));
//         window.location.href = "/dashboard"; // Redirect to user's dashboard
//       }
//     } catch (error) {
//       console.error("Error logging in as user:", error);
//       alert("Failed to login as user account.");
//     }
//   };

//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Topbar />
//         <div className="admin-content">
//           <h2>Pending Withdrawals</h2>

//           <div style={{ marginBottom: 12 }}>
//             <input
//               placeholder="Search UID, method, amount..."
//               className="userlist-search"
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//             />
//           </div>

//           <table className="userlist-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>User ID</th>
//                 <th>Method</th>
//                 <th>Requested</th>
//                 <th>Fee</th>
//                 <th>Net Amount</th>
//                 <th>Date</th>
//                 <th>Account Number</th>
//                 <th>Holder Name</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((d) => (
//                 <tr key={d._id}>
//                   <td data-label="ID">{d._id}</td>
//                   <td data-label="User ID">
//                     {d.user_id?.randomCode || d.user_id?._id || "N/A"}
//                   </td>
//                   <td data-label="Method">{d.payment_method}</td>
//                   <td data-label="Requested">
//                     PKR {d.withdrawalsAmount?.toLocaleString()}
//                   </td>
//                   <td data-label="Fee">
//                     -PKR{" "}
//                     {d.withdrawalFee?.toLocaleString() ||
//                       Math.round(d.withdrawalsAmount * 0.03)?.toLocaleString()}
//                   </td>
//                   <td data-label="Net Amount">
//                     <strong>
//                       PKR{" "}
//                       {d.netWithdrawal?.toLocaleString() ||
//                         Math.round(
//                           d.withdrawalsAmount * 0.97
//                         )?.toLocaleString()}
//                     </strong>
//                   </td>
//                   <td data-label="Date">
//                     {new Date(d.createdAt).toLocaleDateString()}
//                   </td>
//                   <td data-label="Account Number">{d.accountNumber}</td>
//                   <td data-label="Holder Name">{d.accountHolderName}</td>
//                   <td data-label="Actions">
//                     <div className="action-buttons">
//                       <button
//                         className="action-btn view"
//                         onClick={() =>
//                           handleStatusChange(d.user_id, "approved", d._id)
//                         }
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="action-btn delete"
//                         onClick={() =>
//                           handleStatusChange(d.user_id, "reject", d._id)
//                         }
//                       >
//                         Reject
//                       </button>
//                       <button
//                         className="action-btn login"
//                         onClick={() => handleLoginAsUser(d.user_id)}
//                       >
//                         Login
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {filtered.length === 0 && (
//             <p style={{ marginTop: 20 }}>No pending withdrawals found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaUserClock } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/transactions.css";

export default function PendingWithdrawals() {
  const [q, setQ] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://be.solarx0.com/api/payments");
      setWithdrawals(res.data.data || []);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      setWithdrawals([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return (withdrawals || [])
      .filter((d) => d.withdrawalStatus === "pending")
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [withdrawals, q]);

  const handleStatusChange = async (userId, newStatus, _id) => {
    try {
      const res = await axios.post("https://be.solarx0.com/api/status", {
        userId,
        status: newStatus,
        type: "withdrawal",
        requesId: _id,
      });

      alert(res.data.message);
      setWithdrawals((prev) =>
        prev.map((d) =>
          d._id === _id ? { ...d, withdrawalStatus: newStatus } : d
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const handleLoginAsUser = async (user) => {
    if (!window.confirm("Login to this user's account?")) return;

    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      const userId = user?._id || user;
      const response = await axios.post(
        `https://be.solarx0.com/api/adminLoginUserAccount`,
        { userId }
      );

      if (response.status === 200) {
        alert("Logging in as user...");
        localStorage.setItem("user", JSON.stringify({ _id: userId }));
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Error logging in as user:", error);
      alert("Failed to login as user account.");
    }
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
              <p>Loading pending withdrawals...</p>
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
              <div className="page-icon warning">
                <FaUserClock />
              </div>
              <div>
                <h1>Pending Withdrawals</h1>
                <p>Review and process pending withdrawal requests</p>
              </div>
            </div>
            <div className="pending-stats">
              <span className="stat-badge">{filtered.length} Pending</span>
            </div>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d._id} className="transaction-row-pending">
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
                      <td data-label="Actions">
                        <div className="transaction-actions">
                          <button
                            className="action-btn approve"
                            onClick={() =>
                              handleStatusChange(d.user_id, "approved", d._id)
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="action-btn reject"
                            onClick={() =>
                              handleStatusChange(d.user_id, "reject", d._id)
                            }
                          >
                            Reject
                          </button>
                          <button
                            className="action-btn login"
                            onClick={() => handleLoginAsUser(d.user_id)}
                          >
                            Login
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="transaction-empty-state">
                <div className="empty-state-icon">
                  <FaUserClock />
                </div>
                <h3>No Pending Withdrawals</h3>
                <p>All withdrawal requests have been processed.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
