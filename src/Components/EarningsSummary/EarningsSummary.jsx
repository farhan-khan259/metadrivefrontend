// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   FaArrowLeft,
//   FaCoins,
//   FaMoneyBillWave,
//   FaUsers,
//   FaWallet,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./EarningsSummary.css";

// export default function EarningsSummary() {
//   const [loading, setLoading] = useState(true);
//   const [teamData, setTeamData] = useState(null);
//   const [userData, setUserData] = useState(null);

//   const userString = localStorage.getItem("user");
//   const user = JSON.parse(userString);
//   const userId = user?._id;

//   // Fetch Team Data
//   useEffect(() => {
//     const fetchTeamData = async () => {
//       try {
//         const res = await axios.post("https://be.metadrive01.xyz/team", {
//           userId: userId,
//         });
//         setTeamData(res.data);
//         setUserData(res.data.user);
//       } catch (error) {
//         console.error("Error fetching team data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchTeamData();
//     }
//   }, [userId]);

//   if (!userId) return <div className="earnings-error">Please Login</div>;
//   if (loading) return <div className="earnings-loading">Loading...</div>;
//   if (!teamData)
//     return <div className="earnings-error">No data available.</div>;

//   // Calculate accurate totals from team data
//   const calculateTotals = () => {
//     if (!teamData) {
//       return {
//         totalDeposit: 0,
//         totalWithdraw: 0,
//         totalCommission: 0,
//         totalTeam: 0,
//         userDeposit: 0,
//         userWithdraw: 0,
//         teamDeposit: 0,
//         teamWithdraw: 0,
//       };
//     }

//     // User's personal data
//     const userDeposit = userData?.userTotalDeposits || 0;
//     const userWithdraw = userData?.userTotalWithdrawals || 0;

//     // Team data from all levels
//     const directStats = teamData.directReferrals?.stats || {};
//     const indirectStats = teamData.indirectReferrals?.stats || {};
//     const extendedStats = teamData.extendedReferrals?.stats || {};

//     // Calculate team totals (only team members, excluding user)
//     const totalTeamDeposit =
//       (directStats.totalTeamDeposit || 0) +
//       (indirectStats.totalTeamDeposit || 0) +
//       (extendedStats.totalTeamDeposit || 0);

//     const totalTeamWithdraw =
//       (directStats.totalTeamWithdrawal || 0) +
//       (indirectStats.totalTeamWithdrawal || 0) +
//       (extendedStats.totalTeamWithdrawal || 0);

//     // Commission is only from team (not including user's own deposits)
//     const totalCommission =
//       teamData.commissionSummary?.grandTotalCommission || 0;

//     // Total team members count
//     const totalTeamMembers =
//       (directStats.totalUsers || 0) +
//       (indirectStats.totalUsers || 0) +
//       (extendedStats.totalUsers || 0);

//     return {
//       // Personal + Team totals
//       totalDeposit: userDeposit + totalTeamDeposit,
//       totalWithdraw: userWithdraw + totalTeamWithdraw,
//       totalCommission: totalCommission,
//       totalTeam: totalTeamMembers,
//       // Individual components for breakdown
//       userDeposit,
//       userWithdraw,
//       teamDeposit: totalTeamDeposit,
//       teamWithdraw: totalTeamWithdraw,
//     };
//   };

//   const totals = calculateTotals();

//   const statsCards = [
//     {
//       title: "Total Deposit",
//       value: `${totals.totalDeposit.toFixed(2)} PKR`,
//       icon: <FaMoneyBillWave />,
//       color: "primary",
//       description: "Your deposits + Team deposits",
//     },
//     {
//       title: "Total Withdraw",
//       value: `${totals.totalWithdraw.toFixed(2)} PKR`,
//       icon: <FaWallet />,
//       color: "secondary",
//       description: "Your withdrawals + Team withdrawals",
//     },
//     {
//       title: "Team Commission",
//       value: `${totals.totalCommission.toFixed(2)} PKR`,
//       icon: <FaCoins />,
//       color: "accent",
//       description: "Commission from all team levels",
//     },
//     {
//       title: "Total Team",
//       value: totals.totalTeam.toString(),
//       icon: <FaUsers />,
//       color: "success",
//       description: "Total members in your team network",
//     },
//   ];

//   return (
//     <div className="earnings-summary-container">
//       {/* Header with Gradient Background */}
//       <div className="earnings-header-section">
//         <div className="earnings-header">
//           <Link to="/dashboard" className="earnings-back-link">
//             <FaArrowLeft className="back-icon" />
//           </Link>
//           <h1 className="earnings-title2">Earnings Summary</h1>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="earnings-content">
//         <div className="earnings-card">
//           {/* Welcome Message */}
//           <div className="earnings-welcome-box">
//             <p className="welcome-text">
//               Complete overview of your earnings and team performance
//             </p>
//           </div>

//           {/* Stats Grid */}
//           <div className="stats-grid">
//             {statsCards.map((card, index) => (
//               <div
//                 key={index}
//                 className={`stat-card ${card.color}-card`}
//                 style={{ animationDelay: `${0.1 + index * 0.1}s` }}
//               >
//                 <div className="stat-icon">{card.icon}</div>
//                 <div className="stat-content">
//                   <h3 className="stat-title">{card.title}</h3>
//                   <div className="stat-value">{card.value}</div>
//                   <p className="stat-description">{card.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Detailed Breakdown */}
//           <div className="breakdown-section">
//             <h3 className="breakdown-title">Detailed Breakdown</h3>
//             <div className="breakdown-grid">
//               <div className="breakdown-item">
//                 <span className="breakdown-label">Your Personal Deposit:</span>
//                 <span className="breakdown-value">
//                   {totals.userDeposit.toFixed(2)} PKR
//                 </span>
//               </div>
//               <div className="breakdown-item">
//                 <span className="breakdown-label">Your Personal Withdraw:</span>
//                 <span className="breakdown-value">
//                   {totals.userWithdraw.toFixed(2)} PKR
//                 </span>
//               </div>
//               <div className="breakdown-item">
//                 <span className="breakdown-label">Team Total Deposit:</span>
//                 <span className="breakdown-value">
//                   {totals.teamDeposit.toFixed(2)} PKR
//                 </span>
//               </div>
//               <div className="breakdown-item">
//                 <span className="breakdown-label">Team Total Withdraw:</span>
//                 <span className="breakdown-value">
//                   {totals.teamWithdraw.toFixed(2)} PKR
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Commission Breakdown */}
//           <div className="commission-breakdown">
//             <h3 className="breakdown-title">Commission by Level</h3>
//             <div className="commission-levels">
//               <div className="commission-level">
//                 <span className="level-name">Level 1 (6%):</span>
//                 <span className="level-amount">
//                   {teamData.commissionSummary?.level1Commission?.toFixed(2) ||
//                     "0.00"}{" "}
//                   PKR
//                 </span>
//               </div>
//               <div className="commission-level">
//                 <span className="level-name">Level 2 (3.1%):</span>
//                 <span className="level-amount">
//                   {teamData.commissionSummary?.level2Commission?.toFixed(2) ||
//                     "0.00"}{" "}
//                   PKR
//                 </span>
//               </div>
//               <div className="commission-level">
//                 <span className="level-name">Level 3 (1.5%):</span>
//                 <span className="level-amount">
//                   {teamData.commissionSummary?.level3Commission?.toFixed(2) ||
//                     "0.00"}{" "}
//                   PKR
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Plan Expire Commission Section */}
//           <div className="plan-expire-section2">
//             <div className="plan-expire-header2">
//               <h3>Plan Expire Commission</h3>
//             </div>
//             <div className="plan-expire-levels2">
//               <div className="plan-level-item2">
//                 <span className="plan-level-label2">Level 1:</span>
//                 <span className="plan-level-value2">4%</span>
//               </div>
//               <div className="plan-level-item2">
//                 <span className="plan-level-label2">Level 2:</span>
//                 <span className="plan-level-value2">2.5%</span>
//               </div>
//               <div className="plan-level-item2">
//                 <span className="plan-level-label2">Level 3:</span>
//                 <span className="plan-level-value2">1.5%</span>
//               </div>
//             </div>
//           </div>

//           {/* Additional Info Section */}
//           <div className="additional-info-section">
//             <h3 className="breakdown-title">Additional Information</h3>
//             <div className="info-grid">
//               <div className="info-item">
//                 <span className="info-label">Your Current Balance:</span>
//                 <span className="info-value">
//                   {userData?.userbalance?.toFixed(2) || "0.00"} PKR
//                 </span>
//               </div>
//               <div className="info-item">
//                 <span className="info-label">Your Total Investment:</span>
//                 <span className="info-value">
//                   {userData?.UserInvestment?.toFixed(2) || "0.00"} PKR
//                 </span>
//               </div>
//               <div className="info-item">
//                 <span className="info-label">Team Plan Investment:</span>
//                 <span className="info-value">
//                   {teamData.teamPlanInvestment?.toFixed(2) || "0.00"} PKR
//                 </span>
//               </div>
//               <div className="info-item">
//                 <span className="info-label">Your User ID:</span>
//                 <span className="info-value highlight">
//                   {userData?.randomCode || "N/A"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaChartLine,
  FaCoins,
  FaMoneyBillWave,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { FiHome, FiPieChart, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./EarningsSummary.css";

export default function EarningsSummary() {
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);
  const [userData, setUserData] = useState(null);

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;

  // Fetch Team Data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.post("https://be.metadrive01.xyz/team", {
          userId: userId,
        });
        setTeamData(res.data);
        setUserData(res.data.user);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTeamData();
    }
  }, [userId]);

  if (!userId) return <div className="earnings-error">Please Login</div>;
  if (loading) return <div className="earnings-loading">Loading...</div>;
  if (!teamData)
    return <div className="earnings-error">No data available.</div>;

  // Calculate accurate totals from team data
  const calculateTotals = () => {
    if (!teamData) {
      return {
        totalDeposit: 0,
        totalWithdraw: 0,
        totalCommission: 0,
        totalTeam: 0,
        userDeposit: 0,
        userWithdraw: 0,
        teamDeposit: 0,
        teamWithdraw: 0,
      };
    }

    // User's personal data
    const userDeposit = userData?.userTotalDeposits || 0;
    const userWithdraw = userData?.userTotalWithdrawals || 0;

    // Team data from all levels
    const directStats = teamData.directReferrals?.stats || {};
    const indirectStats = teamData.indirectReferrals?.stats || {};
    const extendedStats = teamData.extendedReferrals?.stats || {};

    // Calculate team totals (only team members, excluding user)
    const totalTeamDeposit =
      (directStats.totalTeamDeposit || 0) +
      (indirectStats.totalTeamDeposit || 0) +
      (extendedStats.totalTeamDeposit || 0);

    const totalTeamWithdraw =
      (directStats.totalTeamWithdrawal || 0) +
      (indirectStats.totalTeamWithdrawal || 0) +
      (extendedStats.totalTeamWithdrawal || 0);

    // Commission is only from team (not including user's own deposits)
    const totalCommission =
      teamData.commissionSummary?.grandTotalCommission || 0;

    // Total team members count
    const totalTeamMembers =
      (directStats.totalUsers || 0) +
      (indirectStats.totalUsers || 0) +
      (extendedStats.totalUsers || 0);

    return {
      // Personal + Team totals
      totalDeposit: userDeposit + totalTeamDeposit,
      totalWithdraw: userWithdraw + totalTeamWithdraw,
      totalCommission: totalCommission,
      totalTeam: totalTeamMembers,
      // Individual components for breakdown
      userDeposit,
      userWithdraw,
      teamDeposit: totalTeamDeposit,
      teamWithdraw: totalTeamWithdraw,
    };
  };

  const totals = calculateTotals();

  const statsCards = [
    {
      title: "Total Deposit",
      value: `${Math.round(totals.totalDeposit)} PKR`,
      icon: <FaMoneyBillWave />,
      color: "primary",
      description: "Your deposits + Team deposits",
    },
    {
      title: "Total Withdraw",
      value: `${Math.round(totals.totalWithdraw)} PKR`,
      icon: <FaWallet />,
      color: "secondary",
      description: "Your withdrawals + Team withdrawals",
    },
    {
      title: "Team Commission",
      value: `${Math.round(totals.totalCommission)} PKR`,
      icon: <FaCoins />,
      color: "accent",
      description: "Commission from all team levels",
    },
    {
      title: "Total Team",
      value: totals.totalTeam.toString(),
      icon: <FaUsers />,
      color: "success",
      description: "Total members in your team network",
    },
  ];

  return (
    <div className="earnings-summary-container">
      {/* Header with Gradient Background */}
      <div className="earnings-header-section">
        <div className="earnings-header">
          <Link to="/dashboard" className="earnings-back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="earnings-title2">Earnings Summary</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="earnings-content">
        <div className="earnings-card">
          {/* Welcome Message */}
          <div className="earnings-welcome-box">
            <p className="welcome-text">
              Complete overview of your earnings and team performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className={`stat-card ${card.color}-card`}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="stat-icon">{card.icon}</div>
                <div className="stat-content">
                  <h3 className="stat-title">{card.title}</h3>
                  <div className="stat-value">{card.value}</div>
                  <p className="stat-description">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Breakdown */}
          <div className="breakdown-section">
            <h3 className="breakdown-title">Detailed Breakdown</h3>
            <div className="breakdown-grid">
              <div className="breakdown-item">
                <span className="breakdown-label">Your Personal Deposit:</span>
                <span className="breakdown-value">
                  {Math.round(totals.userDeposit)} PKR
                </span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Your Personal Withdraw:</span>
                <span className="breakdown-value">
                  {Math.round(totals.userWithdraw)} PKR
                </span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Team Total Deposit:</span>
                <span className="breakdown-value">
                  {Math.round(totals.teamDeposit)} PKR
                </span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Team Total Withdraw:</span>
                <span className="breakdown-value">
                  {Math.round(totals.teamWithdraw)} PKR
                </span>
              </div>
            </div>
          </div>

          {/* Commission Breakdown */}
          <div className="commission-breakdown">
            <h3 className="breakdown-title">Commission by Level</h3>
            <div className="commission-levels">
              <div className="commission-level">
                <span className="level-name">Level 1 (6%):</span>
                <span className="level-amount">
                  {Math.round(teamData.commissionSummary?.level1Commission) ||
                    0}{" "}
                  PKR
                </span>
              </div>
              <div className="commission-level">
                <span className="level-name">Level 2 (3.1%):</span>
                <span className="level-amount">
                  {Math.round(teamData.commissionSummary?.level2Commission) ||
                    0}{" "}
                  PKR
                </span>
              </div>
              <div className="commission-level">
                <span className="level-name">Level 3 (1.5%):</span>
                <span className="level-amount">
                  {Math.round(teamData.commissionSummary?.level3Commission) ||
                    0}{" "}
                  PKR
                </span>
              </div>
              <div className="commission-level">
                <span className="level-name">Level 4 (1%):</span>
                <span className="level-amount">
                  {Math.round(teamData.commissionSummary?.level4Commission) ||
                    0}{" "}
                  PKR
                </span>
              </div>
              <div className="commission-level">
                <span className="level-name">Level 5 (0.5%):</span>
                <span className="level-amount">
                  {Math.round(teamData.commissionSummary?.level5Commission) ||
                    0}{" "}
                  PKR
                </span>
              </div>
            </div>
          </div>

          {/* Plan Expire Commission Section */}
          <div className="plan-expire-section2">
            <div className="plan-expire-header2">
              <h3>Plan Expire Commission</h3>
            </div>
            <div className="plan-expire-levels2">
              <div className="plan-level-item2">
                <span className="plan-level-label2">Level 1:</span>
                <span className="plan-level-value2">4%</span>
              </div>
              <div className="plan-level-item2">
                <span className="plan-level-label2">Level 2:</span>
                <span className="plan-level-value2">2.5%</span>
              </div>
              <div className="plan-level-item2">
                <span className="plan-level-label2">Level 3:</span>
                <span className="plan-level-value2">1.5%</span>
              </div>
              <div className="plan-level-item2">
                <span className="plan-level-label2">Level 4:</span>
                <span className="plan-level-value2">1%</span>
              </div>
              <div className="plan-level-item2">
                <span className="plan-level-label2">Level 5:</span>
                <span className="plan-level-value2">0.5%</span>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="additional-info-section">
            <h3 className="breakdown-title">Additional Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Your Current Balance:</span>
                <span className="info-value">
                  {Math.round(userData?.userbalance) || 0} PKR
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Your Total Investment:</span>
                <span className="info-value">
                  {Math.round(userData?.UserInvestment) || 0} PKR
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Team Plan Investment:</span>
                <span className="info-value">
                  {Math.round(teamData.teamPlanInvestment) || 0} PKR
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Your User ID:</span>
                <span className="info-value highlight">
                  {userData?.randomCode || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <footer className="sx-bottom-nav">
        <Link to="/dashboard" className="sx-nav-btn">
          <FiHome className="sx-nav-icon" />
        </Link>
        <Link to="/activeplans" className="sx-nav-btn">
          <FiPieChart className="sx-nav-icon" />
        </Link>
        <Link to="/team" className="sx-nav-btn">
          <FiUsers className="sx-nav-icon" />
        </Link>
        <Link to="/earningsummary" className="sx-nav-btn active">
          <FaChartLine className="sx-nav-icon" />
        </Link>
      </footer>
    </div>
  );
}
