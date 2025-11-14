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
//       const res = await axios.get("https://be.solarx0.com/api/payments");
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
//                     <th>Amount</th>
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
//                         {" "}
//                         {d.user_id?.randomCode || d.user_id?._id || "N/A"}
//                       </td>
//                       <td data-label="Method">{d.payment_method}</td>
//                       <td data-label="Amount">
//                         PKR {d.withdrawalsAmount?.toLocaleString()}
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
import { FaSync } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/userlist.css";

export default function CompletedWithdrawals() {
  const [q, setQ] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch Withdrawals from backend
  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://be.solarx0.com/api/payments");
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

  // ✅ Filter approved withdrawals + search
  const filtered = useMemo(() => {
    return (withdrawals || [])
      .filter((d) => d.withdrawalStatus === "approved")
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [withdrawals, q]);

  // ✅ Refresh button click handler
  const handleRefresh = () => {
    fetchWithdrawals();
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />

        <div className="admin-content">
          <div className="page-header">
            <h2>Completed Withdrawals</h2>
            <button onClick={handleRefresh} className="refresh-btn">
              <FaSync /> Refresh
            </button>
          </div>

          <div style={{ marginBottom: 12 }}>
            <input
              placeholder="Search UID, method, amount..."
              className="userlist-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="loading">Loading completed withdrawals...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <table className="userlist-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Method</th>
                    <th>Requested</th>
                    <th>Fee</th>
                    <th>Net Amount</th>
                    <th>Date</th>
                    <th>Account Number</th>
                    <th>Holder Name</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d._id}>
                      <td data-label="ID">{d._id}</td>
                      <td data-label="User">
                        {d.user_id?.randomCode || d.user_id?._id || "N/A"}
                      </td>
                      <td data-label="Method">{d.payment_method}</td>
                      <td data-label="Requested">
                        PKR {d.withdrawalsAmount?.toLocaleString()}
                      </td>
                      <td data-label="Fee">
                        -PKR{" "}
                        {d.withdrawalFee?.toLocaleString() ||
                          Math.round(
                            d.withdrawalsAmount * 0.03
                          )?.toLocaleString()}
                      </td>
                      <td data-label="Net Amount">
                        <strong>
                          PKR{" "}
                          {d.netWithdrawal?.toLocaleString() ||
                            Math.round(
                              d.withdrawalsAmount * 0.97
                            )?.toLocaleString()}
                        </strong>
                      </td>
                      <td data-label="Date">
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>
                      <td data-label="Account Number">{d.accountNumber}</td>
                      <td data-label="Holder Name">{d.accountHolderName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <p style={{ marginTop: 20 }}>No completed withdrawals found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
