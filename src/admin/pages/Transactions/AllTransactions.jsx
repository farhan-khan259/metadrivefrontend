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
//           "https://be.solarx0.com/api/admin/transactions"
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
//                       PKR{" "}
//                       {t.depositStatus
//                         ? Number(t.depositsAmount).toLocaleString()
//                         : Number(t.withdrawalsAmount).toLocaleString()}
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
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import "../../styles/userlist.css"; // for consistency

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://be.solarx0.com/api/admin/transactions"
        );
        setTransactions(response.data.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getRowStyle = (t) => {
    // Determine background and text colors
    if (t.depositStatus === "reject" || t.depositStatus === "rejected") {
      return { backgroundColor: "#e53935", color: "#fff" }; // red for rejected deposits
    } else if (t.depositStatus) {
      return { backgroundColor: "#1e88e5", color: "#fff" }; // blue for deposits
    } else if (t.withdrawalStatus) {
      return { backgroundColor: "#fb8c00", color: "#fff" }; // orange for withdrawals
    }
    return {}; // default
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <h2>Loading...</h2>
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
          <h2>All Transactions</h2>
          <div className="card-box" style={{ padding: 12 }}>
            <table className="userlist-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>UID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t._id} style={getRowStyle(t)}>
                    <td data-label="ID">{t._id}</td>
                    <td data-label="Type">
                      {t.depositStatus ? "Deposit" : "Withdrawal"}
                    </td>
                    <td data-label="UID">{t.user_id}</td>
                    <td data-label="Amount">
                      {t.depositStatus ? (
                        <>PKR {Number(t.depositsAmount).toLocaleString()}</>
                      ) : (
                        <>
                          <div>
                            Requested: PKR{" "}
                            {Number(t.withdrawalsAmount).toLocaleString()}
                          </div>
                          <div>
                            Net: PKR{" "}
                            {t.netWithdrawal?.toLocaleString() ||
                              Math.round(
                                t.withdrawalsAmount * 0.97
                              )?.toLocaleString()}
                          </div>
                        </>
                      )}
                    </td>
                    <td data-label="Date">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td data-label="Status">
                      {t.depositStatus || t.withdrawalStatus}
                    </td>
                  </tr>
                ))}

                {transactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", color: "#666" }}
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
