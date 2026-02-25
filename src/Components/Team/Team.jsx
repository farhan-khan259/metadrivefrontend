// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaArrowLeft, FaUsers } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./Team.css";

// const Team = () => {
//   const [activeTab, setActiveTab] = useState("data");
//   const [teamData, setTeamData] = useState(null);
//   const userString = localStorage.getItem("user");
//   const user = JSON.parse(userString);
//   const userId = user?._id;

//   useEffect(() => {
//     const fetchTeamData = async () => {
//       try {
//         const res = await axios.post("https://be.metadrive01.xyz/team", { userId });
//         setTeamData(res.data);
//       } catch (err) {
//         console.error("Error fetching team data:", err);
//       }
//     };

//     fetchTeamData();
//   }, [userId]);

//   if (!teamData) {
//     return (
//       <div className="team-wrapper">
//         <div className="loading-state">Loading team data...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="team-wrapper">
//       {/* Header with orange background */}
//       <div className="team-header-section">
//         <div className="team-header">
//           <Link to="/dashboard" className="back-home-link">
//             <FaArrowLeft />
//           </Link>
//           <h2 className="team-title">MY TEAMS DETAILS</h2>
//         </div>
//       </div>

//       {/* Two Tabs Only */}
//       <div className="team-buttons">
//         <button
//           className={`team-tab-button ${activeTab === "data" ? "active" : ""}`}
//           onClick={() => setActiveTab("data")}
//         >
//           Team Data
//         </button>
//         <button
//           className={`team-tab-button ${
//             activeTab === "details" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("details")}
//         >
//           Team Details
//         </button>
//       </div>

//       {/* Screen Content */}
//       <div className="team-screen">
//         {activeTab === "data" && <TeamDataScreen teamData={teamData} />}
//         {activeTab === "details" && <TeamDetailsScreen teamData={teamData} />}
//       </div>
//     </div>
//   );
// };

// const TeamDataScreen = ({ teamData }) => {
//   // Calculate totals
//   const totalTeamMembers =
//     teamData.directReferrals.stats.totalUsers +
//     teamData.indirectReferrals.stats.totalUsers +
//     teamData.extendedReferrals.stats.totalUsers;

//   const totalTeamDeposit =
//     teamData.directReferrals.stats.totalTeamDeposit +
//     teamData.indirectReferrals.stats.totalTeamDeposit +
//     teamData.extendedReferrals.stats.totalTeamDeposit;

//   const totalTeamWithdraw =
//     teamData.directReferrals.stats.totalTeamWithdrawal +
//     teamData.indirectReferrals.stats.totalTeamWithdrawal +
//     teamData.extendedReferrals.stats.totalTeamWithdrawal;

//   const totalTeamCommission = Math.floor(
//     teamData.commissionSummary.grandTotalCommission
//   );

//   return (
//     <div className="team-data-container">
//       {/* Summary Cards */}
//       <div className="team-summary-cards">
//         <div className="summary-card total-team">
//           <h4>TOTAL TEAM</h4>
//           <p className="summary-number">{totalTeamMembers}</p>
//         </div>

//         <div className="summary-card total-deposit">
//           <h4>TOTAL TEAM DEPOSIT</h4>
//           <p className="summary-amount">
//             PKR: {totalTeamDeposit.toLocaleString()}
//           </p>
//         </div>

//         <div className="summary-card total-commission">
//           <h4>TOTAL TEAM COMMISSION</h4>
//           <p className="summary-amount">
//             PKR: {totalTeamCommission.toLocaleString()}
//           </p>
//         </div>

//         {/* Add this new card for Total Team Withdraw */}
//         <div className="summary-card total-withdraw">
//           <h4>TOTAL TEAM WITHDRAW</h4>
//           <p className="summary-amount">
//             PKR: {totalTeamWithdraw.toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* Level 1 */}
//       <div className="level-section">
//         <div className="level-header">
//           <h3>LEVEL 1: 6%</h3>
//         </div>
//         <div className="level-stats">
//           <div className="stat-item">
//             <span className="stat-label">Level 1 Team Deposit:</span>
//             <span className="stat-value">
//               {teamData.directReferrals.stats.totalTeamDeposit.toLocaleString()}{" "}
//               PKR
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Level 1 Team Withdraw:</span>
//             <span className="stat-value">
//               {teamData.directReferrals.stats.totalTeamWithdrawal.toLocaleString()}{" "}
//               PKR
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Level 1 Total Team:</span>
//             <span className="stat-value">
//               {teamData.directReferrals.stats.totalUsers.toLocaleString()}
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Level 1 Team Commission:</span>
//             <span className="stat-value">
//               {Math.floor(
//                 teamData.commissionSummary.level1Commission || 0
//               ).toLocaleString()}{" "}
//               PKR
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Level 2 */}
//       <div className="level-section">
//         <div className="level-header">
//           <h3>LEVEL 2: 3.1%</h3>
//         </div>
//         <div className="level-stats">
//           <div className="stat-item">
//             <span className="stat-label">Level 2 Team Deposit:</span>
//             <span className="stat-value">
//               {teamData.indirectReferrals.stats.totalTeamDeposit.toLocaleString()}{" "}
//               PKR
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Level 2 Team Withdraw:</span>
//             <span className="stat-value">
//               {teamData.indirectReferrals.stats.totalTeamWithdrawal.toLocaleString()}{" "}
//               PKR
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Level 2 Total Team:</span>
//             <span className="stat-value">
//               {teamData.indirectReferrals.stats.totalUsers.toLocaleString()}
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Level 2 Team Commission:</span>
//             <span className="stat-value">
//               {Math.floor(
//                 teamData.commissionSummary.level2Commission || 0
//               ).toLocaleString()}{" "}
//               PKR
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Level 3 */}
//       <div className="level-section">
//         <div className="level-header">
//           <h3>LEVEL 3: 1.5%</h3>
//         </div>
//         <div className="level-stats">
//           <div className="stat-item">
//             <span className="stat-label">Level 3 Team Deposit:</span>
//             <span className="stat-value">
//               {teamData.extendedReferrals.stats.totalTeamDeposit.toLocaleString()}{" "}
//               PKR
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Level 3 Team Withdraw:</span>
//             <span className="stat-value">
//               {teamData.extendedReferrals.stats.totalTeamWithdrawal.toLocaleString()}{" "}
//               PKR
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Level 3 Total Team:</span>
//             <span className="stat-value">
//               {teamData.extendedReferrals.stats.totalUsers.toLocaleString()}
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Level 3 Team Commission:</span>
//             <span className="stat-value">
//               {Math.floor(
//                 teamData.commissionSummary.level3Commission || 0
//               ).toLocaleString()}{" "}
//               PKR
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TeamDetailsScreen = ({ teamData }) => {
//   const [activeLevel, setActiveLevel] = useState("1");

//   return (
//     <div className="team-details-wrapper">
//       <h2 className="team-details-title">
//         <FaUsers /> TEAM DATA UPTO 3 LEVELS
//       </h2>

//       {/* Level Tabs */}
//       <div className="level-tabs2">
//         <button
//           className={`level-tab2 ${activeLevel === "1" ? "active" : ""}`}
//           onClick={() => setActiveLevel("1")}
//         >
//           1
//         </button>
//         <button
//           className={`level-tab2 ${activeLevel === "2" ? "active" : ""}`}
//           onClick={() => setActiveLevel("2")}
//         >
//           2
//         </button>
//         <button
//           className={`level-tab2 ${activeLevel === "3" ? "active" : ""}`}
//           onClick={() => setActiveLevel("3")}
//         >
//           3
//         </button>
//       </div>

//       {/* Level 1 Members */}
//       {activeLevel === "1" && (
//         <div className="level-members">
//           {teamData.directReferrals.members.length > 0 ? (
//             teamData.directReferrals.members.map((user, index) => (
//               <div className="member-card" key={index}>
//                 <div className="member-header">
//                   <h4>Level: 1</h4>
//                   <span className="commission-rate">6%</span>
//                 </div>
//                 <div className="member-info">
//                   <div className="info-row">
//                     <span className="info-label">Upliner:</span>
//                     <span className="info-value">{teamData.user.fullName}</span>
//                   </div>
//                   <div className="info-row">
//                     <span className="info-label">UserName:</span>
//                     <span className="info-value">{user.fullName}</span>
//                   </div>
//                   <div className="info-row">
//                     <span className="info-label">Phone No:</span>
//                     <span className="info-value">{user.whatsappNumber}</span>
//                   </div>
//                   <div className="info-row">
//                     <span className="info-label">Gmail:</span>
//                     <span className="info-value">
//                       {user.email ||
//                         `${user.fullName
//                           .toLowerCase()
//                           .replace(/\s/g, "")}@gmail.com`}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-members">
//               <p>No direct referrals found</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Level 2 Members */}
//       {activeLevel === "2" && (
//         <div className="level-members">
//           {teamData.indirectReferrals.members.length > 0 ? (
//             teamData.indirectReferrals.members.map((user, index) => (
//               <div className="member-card" key={index}>
//                 <div className="member-header">
//                   <h4>Level: 2</h4>
//                   <span className="commission-rate">3.1%</span>
//                 </div>
//                 <div className="member-info">
//                   <div className="info-row">
//                     <span className="info-label">Upliner:</span>
//                     <span className="info-value">{teamData.user.fullName}</span>
//                   </div>
//                   <div className="info-row">
//                     <span className="info-label">UserName:</span>
//                     <span className="info-value">{user.fullName}</span>
//                   </div>
//                   <div className="info-row">
//                     <span className="info-label">Phone No:</span>
//                     <span className="info-value">{user.whatsappNumber}</span>
//                   </div>
//                   <div className="info-row">
//                     <span className="info-label">Gmail:</span>
//                     <span className="info-value">
//                       {user.email ||
//                         `${user.fullName
//                           .toLowerCase()
//                           .replace(/\s/g, "")}@gmail.com`}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-members">
//               <p>No indirect referrals found</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Level 3 Members */}
//       {activeLevel === "3" && (
//         <div className="level-members">
//           {teamData.extendedReferrals.members.length > 0 ? (
//             teamData.extendedReferrals.members.map((user, index) => (
//               <div className="member-card" key={index}>
//                 <div className="member-header">
//                   <h4>Level: 3</h4>
//                   <span className="commission-rate">1.5%</span>
//                 </div>
//                 <div className="member-info">
//                   <div className="info-row">
//                     <span className="info-label">Upliner:</span>
//                     <span className="info-value">{teamData.user.fullName}</span>
//                   </div>
//                   <div className="info-row">
//                     <span className="info-label">UserName:</span>
//                     <span className="info-value">{user.fullName}</span>
//                   </div>
//                   <div className="info-row">
//                     <span className="info-label">Phone No:</span>
//                     <span className="info-value">{user.whatsappNumber}</span>
//                   </div>
//                   <div className="info-row">
//                     <span className="info-label">Gmail:</span>
//                     <span className="info-value">
//                       {user.email ||
//                         `${user.fullName
//                           .toLowerCase()
//                           .replace(/\s/g, "")}@gmail.com`}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-members">
//               <p>No extended referrals found</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Team;
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaChartLine, FaUsers } from "react-icons/fa";
import { FiHome, FiPieChart, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Team.css";

const Team = () => {
  const [activeTab, setActiveTab] = useState("data");
  const [teamData, setTeamData] = useState(null);
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.post("https://be.metadrive01.xyz/team", { userId });
        setTeamData(res.data);
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    fetchTeamData();
  }, [userId]);

  if (!teamData) {
    return (
      <div className="team-wrapper">
        <div className="loading-state">Loading team data...</div>
      </div>
    );
  }

  return (
    <div className="team-wrapper">
      {/* Header with orange background */}
      <div className="team-header-section">
        <div className="team-header">
          <Link to="/dashboard" className="back-home-link">
            <FaArrowLeft />
          </Link>
          <h2 className="team-title">METADRIVE NETWORK</h2>
        </div>
      </div>

      {/* Two Tabs Only */}
      <div className="team-buttons">
        <button
          className={`team-tab-button ${activeTab === "data" ? "active" : ""}`}
          onClick={() => setActiveTab("data")}
        >
          Analytics
        </button>
        <button
          className={`team-tab-button ${
            activeTab === "details" ? "active" : ""
          }`}
          onClick={() => setActiveTab("details")}
        >
          Network
        </button>
      </div>

      {/* Screen Content */}
      <div className="team-screen">
        {activeTab === "data" && (
          <TeamDataScreen
            teamData={teamData}
            userId={userId}
            setTeamData={setTeamData}
          />
        )}
        {activeTab === "details" && <TeamDetailsScreen teamData={teamData} />}
      </div>
      <footer className="sx-bottom-nav">
        <Link to="/dashboard" className="sx-nav-btn">
          <FiHome className="sx-nav-icon" />
        </Link>
        <Link to="/activeplans" className="sx-nav-btn">
          <FiPieChart className="sx-nav-icon" />
        </Link>
        <Link to="/team" className="sx-nav-btn active">
          <FiUsers className="sx-nav-icon" />
        </Link>
        <Link to="/earningsummary" className="sx-nav-btn">
          <FaChartLine className="sx-nav-icon" />
        </Link>
      </footer>
    </div>
  );
};

const TeamDataScreen = ({ teamData, userId, setTeamData }) => {
  const [claimingReward, setClaimingReward] = useState(false);
  const [rewardToast, setRewardToast] = useState(null);

  // Calculate totals
  const totalTeamMembers =
    teamData.directReferrals.stats.totalUsers +
    teamData.indirectReferrals.stats.totalUsers +
    teamData.extendedReferrals.stats.totalUsers +
    (teamData.level4Referrals?.stats?.totalUsers || 0) +
    (teamData.level5Referrals?.stats?.totalUsers || 0);

  const totalTeamDeposit =
    teamData.directReferrals.stats.totalTeamDeposit +
    teamData.indirectReferrals.stats.totalTeamDeposit +
    teamData.extendedReferrals.stats.totalTeamDeposit +
    (teamData.level4Referrals?.stats?.totalTeamDeposit || 0) +
    (teamData.level5Referrals?.stats?.totalTeamDeposit || 0);

  const totalTeamWithdraw =
    teamData.directReferrals.stats.totalTeamWithdrawal +
    teamData.indirectReferrals.stats.totalTeamWithdrawal +
    teamData.extendedReferrals.stats.totalTeamWithdrawal +
    (teamData.level4Referrals?.stats?.totalTeamWithdrawal || 0) +
    (teamData.level5Referrals?.stats?.totalTeamWithdrawal || 0);

  const totalTeamCommission = Math.floor(
    teamData.commissionSummary.grandTotalCommission
  );

  const rewardThreshold = 100000;
  const rewardClaimed = Boolean(teamData?.user?.teamDepositRewardClaimed);
  const progressDeposit = rewardClaimed
    ? rewardThreshold
    : Math.min(totalTeamDeposit, rewardThreshold);
  const progressPercent = Math.round((progressDeposit / rewardThreshold) * 100);
  const canClaimReward =
    !rewardClaimed && !claimingReward && totalTeamDeposit >= rewardThreshold;

  const showToast = (message) => {
    setRewardToast(message);
    window.setTimeout(() => setRewardToast(null), 2000);
  };

  const handleClaimReward = async () => {
    if (!userId || claimingReward) return;

    try {
      setClaimingReward(true);
      const res = await axios.post("https://be.metadrive01.xyz/team/claim-reward", {
        userId,
      });

      const newBalance = res?.data?.newBalance;
      setTeamData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          user: {
            ...prev.user,
            userbalance: Number(newBalance ?? prev.user?.userbalance ?? 0),
            teamDepositRewardClaimed: true,
            teamDepositRewardClaimedAt: res?.data?.claimedAt || new Date(),
          },
        };
      });

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser && storedUser._id === userId) {
        storedUser.userbalance = Number(newBalance ?? storedUser.userbalance ?? 0);
        localStorage.setItem("user", JSON.stringify(storedUser));
      }

      showToast("✅ Reward added in total balance");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Unable to claim reward right now";
      if (err?.response?.data?.claimed) {
        setTeamData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            user: {
              ...prev.user,
              teamDepositRewardClaimed: true,
            },
          };
        });
      }
      showToast(`❌ ${message}`);
    } finally {
      setClaimingReward(false);
    }
  };

  return (
    <div className="team-data-container">
      {/* Summary Cards */}
      <div className="team-summary-cards">
        <div className="summary-card total-team">
          <h4>TOTAL TEAM</h4>
          <p className="summary-number">{totalTeamMembers}</p>
        </div>

        <div className="summary-card total-deposit">
          <h4>TOTAL TEAM DEPOSIT</h4>
          <p className="summary-amount">
            PKR: {totalTeamDeposit.toLocaleString()}
          </p>
        </div>

        <div className="summary-card total-commission">
          <h4>TOTAL TEAM COMMISSION</h4>
          <p className="summary-amount">
            PKR: {totalTeamCommission.toLocaleString()}
          </p>
        </div>

        {/* Add this new card for Total Team Withdraw */}
        <div className="summary-card total-withdraw">
          <h4>TOTAL TEAM WITHDRAW</h4>
          <p className="summary-amount">
            PKR: {totalTeamWithdraw.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Level 1 */}
      <div className="level-section">
        <div className="level-header">
          <h3>LEVEL 1: 6%</h3>
        </div>
        <div className="level-stats">
          <div className="stat-item">
            <span className="stat-label">Level 1 Team Deposit:</span>
            <span className="stat-value">
              {teamData.directReferrals.stats.totalTeamDeposit.toLocaleString()}{" "}
              PKR
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 1 Team Withdraw:</span>
            <span className="stat-value">
              {teamData.directReferrals.stats.totalTeamWithdrawal.toLocaleString()}{" "}
              PKR
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 1 Total Team:</span>
            <span className="stat-value">
              {teamData.directReferrals.stats.totalUsers.toLocaleString()}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 1 Team Commission:</span>
            <span className="stat-value">
              {Math.floor(
                teamData.commissionSummary.level1Commission || 0
              ).toLocaleString()}{" "}
              PKR
            </span>
          </div>
        </div>
      </div>

      {/* Level 2 */}
      <div className="level-section">
        <div className="level-header">
          <h3>LEVEL 2: 3.1%</h3>
        </div>
        <div className="level-stats">
          <div className="stat-item">
            <span className="stat-label">Level 2 Team Deposit:</span>
            <span className="stat-value">
              {teamData.indirectReferrals.stats.totalTeamDeposit.toLocaleString()}{" "}
              PKR
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 2 Team Withdraw:</span>
            <span className="stat-value">
              {teamData.indirectReferrals.stats.totalTeamWithdrawal.toLocaleString()}{" "}
              PKR
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 2 Total Team:</span>
            <span className="stat-value">
              {teamData.indirectReferrals.stats.totalUsers.toLocaleString()}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 2 Team Commission:</span>
            <span className="stat-value">
              {Math.floor(
                teamData.commissionSummary.level2Commission || 0
              ).toLocaleString()}{" "}
              PKR
            </span>
          </div>
        </div>
      </div>

      {/* Level 3 */}
      <div className="level-section">
        <div className="level-header">
          <h3>LEVEL 3: 1.5%</h3>
        </div>
        <div className="level-stats">
          <div className="stat-item">
            <span className="stat-label">Level 3 Team Deposit:</span>
            <span className="stat-value">
              {teamData.extendedReferrals.stats.totalTeamDeposit.toLocaleString()}{" "}
              PKR
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 3 Team Withdraw:</span>
            <span className="stat-value">
              {teamData.extendedReferrals.stats.totalTeamWithdrawal.toLocaleString()}{" "}
              PKR
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 3 Total Team:</span>
            <span className="stat-value">
              {teamData.extendedReferrals.stats.totalUsers.toLocaleString()}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 3 Team Commission:</span>
            <span className="stat-value">
              {Math.floor(
                teamData.commissionSummary.level3Commission || 0
              ).toLocaleString()}{" "}
              PKR
            </span>
          </div>
        </div>
      </div>

      {/* Level 4 */}
      <div className="level-section">
        <div className="level-header">
          <h3>LEVEL 4: 1%</h3>
        </div>
        <div className="level-stats">
          <div className="stat-item">
            <span className="stat-label">Level 4 Team Deposit:</span>
            <span className="stat-value">
              {teamData.level4Referrals?.stats?.totalTeamDeposit?.toLocaleString?.() ||
                0}{" "}
              PKR
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 4 Team Withdraw:</span>
            <span className="stat-value">
              {teamData.level4Referrals?.stats?.totalTeamWithdrawal?.toLocaleString?.() ||
                0}{" "}
              PKR
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 4 Total Team:</span>
            <span className="stat-value">
              {teamData.level4Referrals?.stats?.totalUsers?.toLocaleString?.() ||
                0}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 4 Team Commission:</span>
            <span className="stat-value">
              {Math.floor(
                teamData.commissionSummary.level4Commission || 0
              ).toLocaleString()} PKR
            </span>
          </div>
        </div>
      </div>

      {/* Level 5 */}
      <div className="level-section">
        <div className="level-header">
          <h3>LEVEL 5: 0.5%</h3>
        </div>
        <div className="level-stats">
          <div className="stat-item">
            <span className="stat-label">Level 5 Team Deposit:</span>
            <span className="stat-value">
              {teamData.level5Referrals?.stats?.totalTeamDeposit?.toLocaleString?.() ||
                0}{" "}
              PKR
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 5 Team Withdraw:</span>
            <span className="stat-value">
              {teamData.level5Referrals?.stats?.totalTeamWithdrawal?.toLocaleString?.() ||
                0}{" "}
              PKR
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 5 Total Team:</span>
            <span className="stat-value">
              {teamData.level5Referrals?.stats?.totalUsers?.toLocaleString?.() ||
                0}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level 5 Team Commission:</span>
            <span className="stat-value">
              {Math.floor(
                teamData.commissionSummary.level5Commission || 0
              ).toLocaleString()} PKR
            </span>
          </div>
        </div>
      </div>

      {/* Plan Expire Commission Section */}
      <div className="plan-expire-section">
        <div className="plan-expire-header">
          <h3>Plan Expire Commission</h3>
        </div>
        <div className="plan-expire-levels">
          <div className="plan-level-item">
            <span className="plan-level-label">Level 1:</span>
            <span className="plan-level-value">4%</span>
          </div>
          <div className="plan-level-item">
            <span className="plan-level-label">Level 2:</span>
            <span className="plan-level-value">2.5%</span>
          </div>
          <div className="plan-level-item">
            <span className="plan-level-label">Level 3:</span>
            <span className="plan-level-value">1.5%</span>
          </div>
          <div className="plan-level-item">
            <span className="plan-level-label">Level 4:</span>
            <span className="plan-level-value">1%</span>
          </div>
          <div className="plan-level-item">
            <span className="plan-level-label">Level 5:</span>
            <span className="plan-level-value">0.5%</span>
          </div>
        </div>
      </div>
      {/* Commission Notice Box */}
      <div className="commission-notice-box">
        <div className="notice-header">
          <h3>NOTICE</h3>
        </div>
        <div className="notice-content">
          <p>You will get 3k extra reward on every 100k</p>
          <p>team deposit (upto 5 levels)</p>

          <div className="team-reward-progress">
            <div className="team-reward-progress-bar" aria-hidden="true">
              <div
                className="team-reward-progress-fill"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>

            <button
              type="button"
              className="team-reward-claim-btn"
              onClick={handleClaimReward}
              disabled={!canClaimReward}
            >
              {rewardClaimed
                ? "Reward Claimed"
                : claimingReward
                ? "Claiming..."
                : "Claim Reward"}
            </button>

            {rewardToast && <div className="team-reward-toast">{rewardToast}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamDetailsScreen = ({ teamData }) => {
  const [activeLevel, setActiveLevel] = useState("1");

  return (
    <div className="team-details-wrapper">
      <h2 className="team-details-title">
        <FaUsers /> NETWORK UPTO 5 LEVELS
      </h2>

      {/* Level Tabs */}
      <div className="level-tabs2">
        <button
          className={`level-tab2 ${activeLevel === "1" ? "active" : ""}`}
          onClick={() => setActiveLevel("1")}
        >
          1
        </button>
        <button
          className={`level-tab2 ${activeLevel === "2" ? "active" : ""}`}
          onClick={() => setActiveLevel("2")}
        >
          2
        </button>
        <button
          className={`level-tab2 ${activeLevel === "3" ? "active" : ""}`}
          onClick={() => setActiveLevel("3")}
        >
          3
        </button>
        <button
          className={`level-tab2 ${activeLevel === "4" ? "active" : ""}`}
          onClick={() => setActiveLevel("4")}
        >
          4
        </button>
        <button
          className={`level-tab2 ${activeLevel === "5" ? "active" : ""}`}
          onClick={() => setActiveLevel("5")}
        >
          5
        </button>
      </div>

      {/* Level 1 Members */}
      {activeLevel === "1" && (
        <div className="level-members">
          {teamData.directReferrals.members.length > 0 ? (
            teamData.directReferrals.members.map((user, index) => (
              <div className="member-card" key={index}>
                <div className="member-header">
                  <h4>Level: 1</h4>
                  <span className="commission-rateteam">6%</span>
                </div>
                <div className="member-info">
                  <div className="info-row">
                    <span className="info-label">Upliner:</span>
                    <span className="info-value">
                      {user.uplinerName || teamData.user.fullName}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">UserName:</span>
                    <span className="info-value">{user.fullName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone No:</span>
                    <span className="info-value">{user.whatsappNumber}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gmail:</span>
                    <span className="info-value">
                      {user.email ||
                        `${user.fullName
                          .toLowerCase()
                          .replace(/\s/g, "")}@gmail.com`}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-members">
              <p>No direct referrals found</p>
            </div>
          )}
        </div>
      )}

      {/* Level 2 Members */}
      {activeLevel === "2" && (
        <div className="level-members">
          {teamData.indirectReferrals.members.length > 0 ? (
            teamData.indirectReferrals.members.map((user, index) => (
              <div className="member-card" key={index}>
                <div className="member-header">
                  <h4>Level: 2</h4>
                  <span className="commission-rateteam">3.1%</span>
                </div>
                <div className="member-info">
                  <div className="info-row">
                    <span className="info-label">Upliner:</span>
                    <span className="info-value">
                      {user.uplinerName || teamData.user.fullName}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">UserName:</span>
                    <span className="info-value">{user.fullName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone No:</span>
                    <span className="info-value">{user.whatsappNumber}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gmail:</span>
                    <span className="info-value">
                      {user.email ||
                        `${user.fullName
                          .toLowerCase()
                          .replace(/\s/g, "")}@gmail.com`}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-members">
              <p>No indirect referrals found</p>
            </div>
          )}
        </div>
      )}

      {/* Level 3 Members */}
      {activeLevel === "3" && (
        <div className="level-members">
          {teamData.extendedReferrals.members.length > 0 ? (
            teamData.extendedReferrals.members.map((user, index) => (
              <div className="member-card" key={index}>
                <div className="member-header">
                  <h4>Level: 3</h4>
                  <span className="commission-rateteam">1.5%</span>
                </div>
                <div className="member-info">
                  <div className="info-row">
                    <span className="info-label">Upliner:</span>
                    <span className="info-value">
                      {user.uplinerName || teamData.user.fullName}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">UserName:</span>
                    <span className="info-value">{user.fullName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone No:</span>
                    <span className="info-value">{user.whatsappNumber}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gmail:</span>
                    <span className="info-value">
                      {user.email ||
                        `${user.fullName
                          .toLowerCase()
                          .replace(/\s/g, "")}@gmail.com`}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-members">
              <p>No extended referrals found</p>
            </div>
          )}
        </div>
      )}

      {/* Level 4 Members */}
      {activeLevel === "4" && (
        <div className="level-members">
          {(teamData.level4Referrals?.members || []).length > 0 ? (
            (teamData.level4Referrals.members || []).map((user, index) => (
              <div className="member-card" key={index}>
                <div className="member-header">
                  <h4>Level: 4</h4>
                  <span className="commission-rateteam">1%</span>
                </div>
                <div className="member-info">
                  <div className="info-row">
                    <span className="info-label">Upliner:</span>
                    <span className="info-value">
                      {user.uplinerName || teamData.user.fullName}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">UserName:</span>
                    <span className="info-value">{user.fullName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone No:</span>
                    <span className="info-value">{user.whatsappNumber}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gmail:</span>
                    <span className="info-value">
                      {user.email ||
                        `${user.fullName
                          .toLowerCase()
                          .replace(/\s/g, "")}@gmail.com`}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-members">
              <p>No level 4 referrals found</p>
            </div>
          )}
        </div>
      )}

      {/* Level 5 Members */}
      {activeLevel === "5" && (
        <div className="level-members">
          {(teamData.level5Referrals?.members || []).length > 0 ? (
            (teamData.level5Referrals.members || []).map((user, index) => (
              <div className="member-card" key={index}>
                <div className="member-header">
                  <h4>Level: 5</h4>
                  <span className="commission-rateteam">0.5%</span>
                </div>
                <div className="member-info">
                  <div className="info-row">
                    <span className="info-label">Upliner:</span>
                    <span className="info-value">
                      {user.uplinerName || teamData.user.fullName}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">UserName:</span>
                    <span className="info-value">{user.fullName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone No:</span>
                    <span className="info-value">{user.whatsappNumber}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gmail:</span>
                    <span className="info-value">
                      {user.email ||
                        `${user.fullName
                          .toLowerCase()
                          .replace(/\s/g, "")}@gmail.com`}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-members">
              <p>No level 5 referrals found</p>
            </div>
          )}
        </div>
      )}
      {/* Bottom Navigation */}
      <footer className="sx-bottom-nav">
        <Link to="/dashboard" className="sx-nav-btn">
          <FiHome className="sx-nav-icon" />
        </Link>
        <Link to="/activeplans" className="sx-nav-btn">
          <FiPieChart className="sx-nav-icon" />
        </Link>
        <Link to="/team" className="sx-nav-btn active">
          <FiUsers className="sx-nav-icon" />
        </Link>
        <Link to="/earningsummary" className="sx-nav-btn">
          <FaChartLine className="sx-nav-icon" />
        </Link>
      </footer>
    </div>
  );
};

export default Team;
