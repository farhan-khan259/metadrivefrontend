// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./UserDeposit.css";

// export default function UserDeposit() {
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
//   const depositPayments = payments.filter((p) => p.depositsAmount);

//   const transactionList = depositPayments.filter((p) => {
//     if (status === "pending") return p.depositStatus === "pending";
//     if (status === "complete") return p.depositStatus === "approved";
//     if (status === "rejected") return p.depositStatus === "rejected";
//     return true;
//   });

//   return (
//     <div className="deposit-history-container">
//       {/* Header with Orange Background */}
//       <div className="deposit-header-section">
//         <div className="deposit-header">
//           <Link to="/dashboard" className="deposit-back-link">
//             <FaArrowLeft className="back-icon" />
//           </Link>
//           <h1 className="deposit-title">Deposit History</h1>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="deposit-content">
//         <div className="deposit-card">
//           {/* Status Tabs */}
//           <div className="status-tabs-deposit">
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
//               <p>No deposit transactions available.</p>
//             </div>
//           ) : (
//             transactionList.map((item, index) => (
//               <div key={index} className="transaction-card-deposit">
//                 <h3>Deposit With {item.payment_method}</h3>
//                 <div className="transaction-details">
//                   <div className="detail-row">
//                     <span className="label">Amount:</span>
//                     <span className="value">{item.depositsAmount} PKR</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="label">Status:</span>
//                     <span className={`statusdeposit ${item.depositStatus}`}>
//                       {item.depositStatus}
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
import "./UserDeposit.css";

export default function UserDeposit() {
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
  const depositPayments = payments.filter((p) => p.depositsAmount);

  const transactionList = depositPayments.filter((p) => {
    if (status === "pending") return p.depositStatus === "pending";
    if (status === "complete") return p.depositStatus === "approved";
    if (status === "rejected") return p.depositStatus === "rejected";
    return true;
  });

  return (
    <div className="deposit-history-container">
      {/* Header with Orange Background */}
      <div className="deposit-header-section">
        <div className="deposit-header">
          <Link to="/dashboard" className="deposit-back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="deposit-title">Deposit History</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="deposit-content">
        <div className="deposit-card">
          {/* Status Tabs */}
          <div className="status-tabs-deposit">
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
              <p>No deposit transactions available.</p>
            </div>
          ) : (
            transactionList.map((item, index) => (
              <div key={index} className="transaction-card-deposit">
                <h3>Deposit With {item.payment_method}</h3>
                <div className="transaction-details">
                  <div className="detail-row">
                    <span className="label">Amount:</span>
                    <span className="value">{item.depositsAmount} PKR</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className={`statusdeposit ${item.depositStatus}`}>
                      {item.depositStatus}
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
