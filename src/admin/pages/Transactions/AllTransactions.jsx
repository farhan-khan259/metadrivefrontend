// import axios from "axios";
// import { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Topbar from "../../components/Topbar";
// import "../../styles/admin.css";
// import "../../styles/userlist.css"; // for consistency

// export default function AllTransactions() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await axios.get(
//           "https://metadrivebackend.onrender.com/api/admin/transactions"
//         );
//         setTransactions(response.data.transactions || []);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//         setTransactions([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   const getRowStyle = (t) => {
//     // Determine background and text colors
//     if (t.depositStatus === "reject" || t.depositStatus === "rejected") {
//       return { backgroundColor: "#e53935", color: "#fff" }; // red for rejected deposits
//     } else if (t.depositStatus) {
//       return { backgroundColor: "#1e88e5", color: "#fff" }; // blue for deposits
//     } else if (t.withdrawalStatus) {
//       return { backgroundColor: "#fb8c00", color: "#fff" }; // orange for withdrawals
//     }
//     return {}; // default
//   };

//   if (loading) {
//     return (
//       <div className="admin-layout">
//         <Sidebar />
//         <div className="admin-main">
//           <Topbar />
//           <div className="admin-content">
//             <h2>Loading...</h2>
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
//           <h2>All Transactions</h2>
//           <div className="card-box" style={{ padding: 12 }}>
//             <table className="userlist-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Type</th>
//                   <th>UID</th>
//                   <th>Amount</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {transactions.map((t) => (
//                   <tr key={t._id} style={getRowStyle(t)}>
//                     <td data-label="ID">{t._id}</td>
//                     <td data-label="Type">
//                       {t.depositStatus ? "Deposit" : "Withdrawal"}
//                     </td>
//                     <td data-label="UID">{t.user_id}</td>
//                     <td data-label="Amount">
//                       {t.depositStatus ? (
//                         <>PKR {Number(t.depositsAmount).toLocaleString()}</>
//                       ) : (
//                         <>
//                           <div>
//                             Requested: PKR{" "}
//                             {Number(t.withdrawalsAmount).toLocaleString()}
//                           </div>
//                           <div>
//                             Net: PKR{" "}
//                             {t.netWithdrawal?.toLocaleString() ||
//                               Math.round(
//                                 t.withdrawalsAmount * 0.97
//                               )?.toLocaleString()}
//                           </div>
//                         </>
//                       )}
//                     </td>
//                     <td data-label="Date">
//                       {new Date(t.createdAt).toLocaleDateString()}
//                     </td>
//                     <td data-label="Status">
//                       {t.depositStatus || t.withdrawalStatus}
//                     </td>
//                   </tr>
//                 ))}

//                 {transactions.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       style={{ textAlign: "center", color: "#666" }}
//                     >
//                       No transactions found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaSearch, FaSync } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import "../../styles/transactions.css";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://metadrivebackend.onrender.com/api/admin/transactions"
      );
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter((transaction) =>
    JSON.stringify(transaction).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (transaction) => {
    const status = transaction.depositStatus || transaction.withdrawalStatus;
    const type = transaction.depositStatus ? "deposit" : "withdrawal";

    return <span className={`status-badge ${status} ${type}`}>{status}</span>;
  };

  const getAmountDisplay = (transaction) => {
    if (transaction.depositStatus) {
      return (
        <div className="amount-positive">
          +PKR {Number(transaction.depositsAmount).toLocaleString()}
        </div>
      );
    } else {
      return (
        <div className="withdrawal-amount">
          <div className="amount-negative">
            -PKR {Number(transaction.withdrawalsAmount).toLocaleString()}
          </div>
          <div className="net-amount">
            Net: PKR{" "}
            {(
              transaction.netWithdrawal ||
              Math.round(transaction.withdrawalsAmount * 0.97)
            ).toLocaleString()}
          </div>
        </div>
      );
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
              <p>Loading transactions...</p>
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
              <div className="page-icon">
                <FaMoneyBillWave />
              </div>
              <div>
                <h1>All Transactions</h1>
                <p>View and manage all deposit and withdrawal transactions</p>
              </div>
            </div>
            <button onClick={fetchTransactions} className="refresh-btn">
              <FaSync /> Refresh
            </button>
          </div>

          <div className="transaction-controls">
            <div className="search-box-transaction">
              <FaSearch className="search-icon-transaction" />
              <input
                type="text"
                placeholder="Search by UID, amount, status..."
                className="search-input-transaction"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="card-box">
            {filteredTransactions.length > 0 ? (
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>User ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className={`transaction-row-${
                        transaction.depositStatus ? "deposit" : "withdrawal"
                      }`}
                    >
                      <td data-label="Transaction ID">
                        <span className="transaction-id">
                          {transaction._id?.slice(-8)}
                        </span>
                      </td>
                      <td data-label="Type">
                        <span
                          className={`transaction-type ${
                            transaction.depositStatus ? "deposit" : "withdrawal"
                          }`}
                        >
                          {transaction.depositStatus ? "Deposit" : "Withdrawal"}
                        </span>
                      </td>
                      <td data-label="User ID">
                        {transaction.user_id?.randomCode ||
                          transaction.user_id?.slice(-8) ||
                          "N/A"}
                      </td>
                      <td data-label="Amount">
                        {getAmountDisplay(transaction)}
                      </td>
                      <td data-label="Date">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                        <div className="time">
                          {new Date(transaction.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td data-label="Status">{getStatusBadge(transaction)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="transaction-empty-state">
                <div className="empty-state-icon">
                  <FaMoneyBillWave />
                </div>
                <h3>No Transactions Found</h3>
                <p>No transactions match your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
