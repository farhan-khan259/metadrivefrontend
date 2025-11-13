// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./UserWithdraw.css";

// export default function UserWithdraw() {
//   const [status, setStatus] = useState("pending");
//   const [loading, setLoading] = useState(true);
//   const [teamData, setTeamData] = useState(null);

//   const userString = localStorage.getItem("user");
//   const user = JSON.parse(userString);
//   const userId = user?._id;

//   // ✅ Fetch Team Data
//   useEffect(() => {
//     const fetchTeamData = async () => {
//       try {
//         const res = await axios.post("https://be.solarx0.com/team", {
//           userId: userId,
//         });
//         setTeamData(res.data);
//       } catch (error) {
//         console.error("Error fetching team data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeamData();
//   }, [userId]);

//   if (!userId) return <div>Please Login</div>;
//   if (loading) return <p>Loading...</p>;
//   if (!teamData) return <p>No data available.</p>;

//   // ✅ Payments
//   const payments = teamData?.payment || [];
//   const withdrawPayments = payments.filter((p) => p.withdrawalsAmount);

//   const transactionList = withdrawPayments.filter((p) => {
//     if (status === "pending") return p.withdrawalStatus === "pending";
//     if (status === "complete") return p.withdrawalStatus === "approved";
//     if (status === "rejected") return p.withdrawalStatus === "rejected";
//     return true;
//   });

//   return (
//     <div className="withdrawal-history-container">
//       {/* Header with Orange Background */}
//       <div className="withdrawal-header-section">
//         <div className="withdrawal-header">
//           <Link to="/dashboard" className="withdrawal-back-link">
//             <FaArrowLeft className="back-icon" />
//           </Link>
//           <h1 className="withdrawal-title">Withdrawal History</h1>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="withdrawal-content">
//         <div className="withdrawal-card">
//           {/* Status Tabs */}
//           <div className="status-tabs-withdrawal">
//             <button
//               className={status === "pending" ? "active" : ""}
//               onClick={() => setStatus("pending")}
//             >
//               PENDING
//             </button>
//             <button
//               className={status === "complete" ? "active" : ""}
//               onClick={() => setStatus("complete")}
//             >
//               COMPLETE
//             </button>
//             <button
//               className={status === "rejected" ? "active" : ""}
//               onClick={() => setStatus("rejected")}
//             >
//               REJECTED
//             </button>
//           </div>

//           {/* Transaction List */}
//           {transactionList.length === 0 ? (
//             <div className="no-transactions">
//               <p>No withdrawal transactions available.</p>
//             </div>
//           ) : (
//             transactionList.map((item, index) => (
//               <div key={index} className="transaction-card-withdrawal">
//                 <h3>Withdrawal With {item.payment_method}</h3>
//                 <div className="transaction-details">
//                   <div className="detail-row">
//                     <span className="label">Amount:</span>
//                     <span className="value">{item.withdrawalsAmount} PKR</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="label">Status:</span>
//                     <span className={`status ${item.withdrawalStatus}`}>
//                       {item.withdrawalStatus}
//                     </span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="label">Date:</span>
//                     <span className="value">
//                       {new Date(item.createdAt).toLocaleString()}
//                     </span>
//                   </div>
//                   {item.transactionId && (
//                     <div className="detail-row">
//                       <span className="label">Transaction ID:</span>
//                       <span className="value highlight">
//                         {item.transactionId}
//                       </span>
//                     </div>
//                   )}
//                   {item.accountNumber && (
//                     <div className="detail-row">
//                       <span className="label">Account Number:</span>
//                       <span className="value">{item.accountNumber}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./UserWithdraw.css";

export default function UserWithdraw() {
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;

  // ✅ Fetch Team Data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.post("https://be.solarx0.com/team", {
          userId: userId,
        });
        setTeamData(res.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [userId]);

  if (!userId) return <div>Please Login</div>;
  if (loading) return <p>Loading...</p>;
  if (!teamData) return <p>No data available.</p>;

  // ✅ Payments
  const payments = teamData?.payment || [];
  const withdrawPayments = payments.filter((p) => p.withdrawalsAmount);

  const transactionList = withdrawPayments.filter((p) => {
    if (status === "pending") return p.withdrawalStatus === "pending";
    if (status === "complete") return p.withdrawalStatus === "approved";
    if (status === "rejected") return p.withdrawalStatus === "rejected";
    return true;
  });

  return (
    <div className="withdrawal-history-container">
      {/* Header with Orange Background */}
      <div className="withdrawal-header-section">
        <div className="withdrawal-header">
          <Link to="/dashboard" className="withdrawal-back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="withdrawal-title">Withdrawal History</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="withdrawal-content">
        <div className="withdrawal-card">
          {/* Status Tabs */}
          <div className="status-tabs-withdrawal">
            <button
              className={status === "pending" ? "active" : ""}
              onClick={() => setStatus("pending")}
            >
              PENDING
            </button>
            <button
              className={status === "complete" ? "active" : ""}
              onClick={() => setStatus("complete")}
            >
              COMPLETE
            </button>
            <button
              className={status === "rejected" ? "active" : ""}
              onClick={() => setStatus("rejected")}
            >
              REJECTED
            </button>
          </div>

          {/* Transaction List */}
          {transactionList.length === 0 ? (
            <div className="no-transactions">
              <p>No withdrawal transactions available.</p>
            </div>
          ) : (
            transactionList.map((item, index) => (
              <div key={index} className="transaction-card-withdrawal">
                <h3>Withdrawal With {item.payment_method}</h3>
                <div className="transaction-details">
                  <div className="detail-row">
                    <span className="label">Amount:</span>
                    <span className="value">{item.withdrawalsAmount} PKR</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className={`status ${item.withdrawalStatus}`}>
                      {item.withdrawalStatus}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Date:</span>
                    <span className="value">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {item.transactionId && (
                    <div className="detail-row">
                      <span className="label">Transaction ID:</span>
                      <span className="value highlight">
                        {item.transactionId}
                      </span>
                    </div>
                  )}
                  {item.accountNumber && (
                    <div className="detail-row">
                      <span className="label">Account Number:</span>
                      <span className="value">{item.accountNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
