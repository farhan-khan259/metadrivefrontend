// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./UserCommission.css";

// export default function UserCommission() {
//   const [level, setLevel] = useState("directReferrals");
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

//   // ✅ Commission Levels
//   const commissionLevels = {
//     directReferrals: { label: "Level 1", rate: 0.06 },
//     indirectReferrals: { label: "Level 2", rate: 0.031 },
//     extendedReferrals: { label: "Level 3", rate: 0.015 },
//   };

//   const currentLevel = commissionLevels[level];
//   const members = teamData[level]?.members || [];

//   const totalCommission = members.reduce(
//     (sum, rec) => sum + rec.payments.totalDeposit * currentLevel.rate,
//     0
//   );

//   return (
//     <div className="commission-history-container">
//       {/* Header with Orange Background */}
//       <div className="commission-header-section">
//         <div className="commission-header">
//           <Link to="/dashboard" className="commission-back-link">
//             <FaArrowLeft className="back-icon" />
//           </Link>
//           <h1 className="commission-title">Commission History</h1>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="commission-content">
//         <div className="commission-card">
//           {/* Level Tabs */}
//           <div className="level-tabs-commission">
//             {Object.keys(commissionLevels).map((key) => (
//               <button
//                 key={key}
//                 className={level === key ? "active" : ""}
//                 onClick={() => setLevel(key)}
//               >
//                 {commissionLevels[key].label}
//               </button>
//             ))}
//           </div>

//           {/* Commission Summary */}
//           <div className="commission-summary">
//             <h3>Total {currentLevel.label} Commission</h3>
//             <div className="total-amount">{totalCommission.toFixed(2)} PKR</div>
//             <p className="commission-rate">
//               Commission Rate: {currentLevel.rate * 100}%
//             </p>
//           </div>

//           {/* Commission Records */}
//           {members.length === 0 ? (
//             <div className="no-commissions">
//               <p>No commission records available for {currentLevel.label}.</p>
//             </div>
//           ) : (
//             <div className="commission-records">
//               {members.map((rec, i) => (
//                 <div key={i} className="commission-record-card">
//                   <div className="record-header">
//                     <span className="user-id">{rec.randomCode}</span>
//                     <span className="commission-amount">
//                       +
//                       {(rec.payments.totalDeposit * currentLevel.rate).toFixed(
//                         2
//                       )}{" "}
//                       PKR
//                     </span>
//                   </div>
//                   <div className="record-details">
//                     <div className="detail-item">
//                       <span className="label">Name:</span>
//                       <span className="value">{rec.fullName}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="label">Email:</span>
//                       <span className="value">{rec.email}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="label">Deposit Amount:</span>
//                       <span className="value highlight">
//                         {rec.payments.totalDeposit} PKR
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="label">Joined:</span>
//                       <span className="value">
//                         {new Date(rec.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
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
import "./UserCommission.css";

export default function UserCommission() {
  const [level, setLevel] = useState("directReferrals");
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

  // ✅ Commission Levels
  const commissionLevels = {
    directReferrals: { label: "Level 1", rate: 0.06 },
    indirectReferrals: { label: "Level 2", rate: 0.031 },
    extendedReferrals: { label: "Level 3", rate: 0.015 },
  };

  const currentLevel = commissionLevels[level];
  const members = teamData[level]?.members || [];

  const totalCommission = members.reduce(
    (sum, rec) => sum + rec.payments.totalDeposit * currentLevel.rate,
    0
  );

  return (
    <div className="commission-history-container">
      {/* Header with Orange Background */}
      <div className="commission-header-section">
        <div className="commission-header">
          <Link to="/dashboard" className="commission-back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="commission-title">Commission History</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="commission-content">
        <div className="commission-card">
          {/* Level Tabs */}
          <div className="level-tabs-commission">
            {Object.keys(commissionLevels).map((key) => (
              <button
                key={key}
                className={level === key ? "active" : ""}
                onClick={() => setLevel(key)}
              >
                {commissionLevels[key].label}
              </button>
            ))}
          </div>

          {/* Commission Summary */}
          <div className="commission-summary">
            <h3>Total {currentLevel.label} Commission</h3>
            <div className="total-amount">{totalCommission.toFixed(2)} PKR</div>
            <p className="commission-rate">
              Commission Rate: {currentLevel.rate * 100}%
            </p>
          </div>

          {/* Commission Records */}
          {members.length === 0 ? (
            <div className="no-commissions">
              <p>No commission records available for {currentLevel.label}.</p>
            </div>
          ) : (
            <div className="commission-records">
              {members.map((rec, i) => (
                <div key={i} className="commission-record-card">
                  <div className="record-header">
                    <span className="user-id">{rec.randomCode}</span>
                    <span className="commission-amount">
                      +
                      {(rec.payments.totalDeposit * currentLevel.rate).toFixed(
                        2
                      )}{" "}
                      PKR
                    </span>
                  </div>
                  <div className="record-details">
                    <div className="detail-item">
                      <span className="label">Name:</span>
                      <span className="value">{rec.fullName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Email:</span>
                      <span className="value">{rec.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Deposit Amount:</span>
                      <span className="value highlight">
                        {rec.payments.totalDeposit} PKR
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Joined:</span>
                      <span className="value">
                        {new Date(rec.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
