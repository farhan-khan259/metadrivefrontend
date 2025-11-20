// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./Activeplans.css";

// export default function Activeplans() {
//   const userString = localStorage.getItem("user");
//   const user = JSON.parse(userString);
//   const id = user?._id;

//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("inProgress"); // "inProgress" or "claimed"

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         let endpoint;
//         if (activeTab === "inProgress") {
//           endpoint = `https://be.solarx0.com/api/plans/user/active/${id}`;
//         } else {
//           endpoint = `https://be.solarx0.com/api/plans/user/claimed/${id}`;
//         }

//         const res = await axios.get(endpoint);
//         if (res.data.success) {
//           setPlans(res.data.plans);
//         }
//         console.log(res.data.plans);
//       } catch (err) {
//         console.error("Error fetching plans:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPlans();
//   }, [id, activeTab]); // Re-fetch when tab changes

//   // Calculate progress percentage - IMPROVED
//   const calculateProgress = (plan) => {
//     try {
//       const startDate = new Date(plan.startingDate || plan.createdAt);
//       const endDate = new Date(plan.endingDate || plan.expiryDate);
//       const today = new Date();

//       // If no valid end date, return 0
//       if (!plan.endingDate && !plan.expiryDate) return "0.00";

//       const totalDuration = endDate - startDate;
//       const elapsed = today - startDate;

//       if (totalDuration <= 0) return "100.00";

//       const progress = Math.min(
//         100,
//         Math.max(0, (elapsed / totalDuration) * 100)
//       );
//       return progress.toFixed(2);
//     } catch (error) {
//       console.error("Error calculating progress:", error);
//       return "0.00";
//     }
//   };

//   // Get remaining days - IMPROVED
//   const getRemainingDays = (plan) => {
//     try {
//       const endDate = new Date(plan.endingDate || plan.expiryDate);
//       const today = new Date();
//       const diffTime = endDate - today;
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       return Math.max(0, diffDays);
//     } catch (error) {
//       console.error("Error calculating remaining days:", error);
//       return plan.days || 0;
//     }
//   };

//   // Calculate return profit safely
//   const getReturnProfit = (plan) => {
//     return plan.returnProfit || plan.dailyEarning * (plan.days || 3);
//   };

//   // Check if plan is completed and ready to claim
//   const isPlanCompleted = (plan) => {
//     const endDate = new Date(plan.endingDate || plan.expiryDate);
//     const today = new Date();
//     return today >= endDate;
//   };

//   // Handle claim button click
//   const handleClaim = async (planId) => {
//     try {
//       const res = await axios.post(`https://be.solarx0.com/api/plans/claim`, {
//         planId,
//         user_id: id, // Changed from userId to user_id
//       });

//       if (res.data.success) {
//         // Remove the claimed plan from active plans
//         setPlans((prevPlans) =>
//           prevPlans.filter((plan) => plan._id !== planId)
//         );
//         alert("Plan claimed successfully! Amount added to your balance.");

//         // Refresh user balance in localStorage if needed
//         const updatedUser = {
//           ...user,
//           userbalance: user.userbalance + res.data.amount, // Fixed: use userbalance instead of balance
//         };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//       }
//     } catch (err) {
//       console.error("Error claiming plan:", err);
//       alert(
//         err.response?.data?.message || "Error claiming plan. Please try again."
//       );
//     }
//   };

//   if (loading)
//     return (
//       <div className="active-plans-container">
//         <div className="active-plans-header-section">
//           <div className="active-plans-header">
//             <Link to="/dashboard" className="back-link">
//               <FaArrowLeft className="back-icon" />
//             </Link>
//             <h1 className="active-plans-title">Active Plans</h1>
//           </div>
//         </div>
//         <div className="active-plans-content">
//           <div className="active-plans-card">
//             <div className="loading-state">Loading plan details...</div>
//           </div>
//         </div>
//       </div>
//     );

//   return (
//     <div className="active-plans-container">
//       {/* Header with orange background */}
//       <div className="active-plans-header-section">
//         <div className="active-plans-header">
//           <Link to="/dashboard" className="back-link">
//             <FaArrowLeft className="back-icon" />
//           </Link>
//           <h1 className="active-plans-title">Active Plans</h1>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="active-plans-content">
//         <div className="active-plans-card">
//           {/* Tab Buttons */}
//           <div className="tab-buttons">
//             <button
//               className={`tab-btn ${
//                 activeTab === "inProgress" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("inProgress")}
//             >
//               In Progress
//             </button>
//             <button
//               className={`tab-btn ${activeTab === "claimed" ? "active" : ""}`}
//               onClick={() => setActiveTab("claimed")}
//             >
//               Claimed
//             </button>
//           </div>

//           {plans.length === 0 ? (
//             <div className="no-plans">
//               <p>
//                 No {activeTab === "inProgress" ? "active" : "claimed"} plans
//                 found
//               </p>
//             </div>
//           ) : (
//             plans.map((plan, index) => (
//               <div key={plan._id || index} className="plan-card">
//                 {/* Plan Header */}
//                 <div className="plan-header">
//                   <h3 className="plan-status">
//                     {activeTab === "inProgress" ? "In Progress!" : "Claimed!"}
//                   </h3>
//                   {plan.status === "claimed" && (
//                     <span className="claimed-badge">Claimed</span>
//                   )}
//                 </div>

//                 {/* Plan Details */}
//                 <div className="plan-details">
//                   <div className="detail-row">
//                     <span className="label">Company name:</span>
//                     <span className="value">{plan.PlanName}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="label">Return Profit Amount:</span>
//                     <span className="value">{getReturnProfit(plan)} PKR</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="label">Invested Amount:</span>
//                     <span className="value">{plan.Investment} PKR</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="label">Progress:</span>
//                     <span className="value">{calculateProgress(plan)}%</span>
//                   </div>
//                   {activeTab === "inProgress" && (
//                     <div className="detail-row">
//                       <span className="label">Pending Days:</span>
//                       <span className="value">
//                         {getRemainingDays(plan)} days
//                       </span>
//                     </div>
//                   )}
//                   <div className="detail-row">
//                     <span className="label">Profit %:</span>
//                     <span className="value">
//                       {plan.profitPercentage || "5.6%"}
//                     </span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="label">Starting Date:</span>
//                     <span className="value">
//                       {new Date(
//                         plan.startingDate || plan.createdAt
//                       ).toLocaleDateString("en-GB", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="label">Ending Date:</span>
//                     <span className="value">
//                       {new Date(
//                         plan.endingDate || plan.expiryDate
//                       ).toLocaleDateString("en-GB", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="label">Status:</span>
//                     <span className="value">{plan.status || "running"}</span>
//                   </div>
//                 </div>

//                 {/* Action Button */}
//                 <div className="action-section">
//                   {activeTab === "inProgress" && (
//                     <button
//                       className={`action-btn ${
//                         isPlanCompleted(plan) ? "claim" : "running"
//                       }`}
//                       onClick={() =>
//                         isPlanCompleted(plan) && handleClaim(plan._id)
//                       }
//                       disabled={!isPlanCompleted(plan)}
//                     >
//                       {isPlanCompleted(plan) ? "CLAIM" : "RUNNING"}
//                     </button>
//                   )}
//                   {activeTab === "claimed" && (
//                     <div className="claimed-info">
//                       <p>
//                         Total Received:{" "}
//                         {plan.Investment + getReturnProfit(plan)} PKR
//                       </p>
//                       {plan.claimedAt && (
//                         <p>
//                           Claimed on:{" "}
//                           {new Date(plan.claimedAt).toLocaleDateString(
//                             "en-GB",
//                             {
//                               day: "numeric",
//                               month: "short",
//                               year: "numeric",
//                             }
//                           )}
//                         </p>
//                       )}
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
import { FaArrowLeft, FaChartLine } from "react-icons/fa";
import { FiHome, FiPieChart, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Activeplans.css";

export default function Activeplans() {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const id = user?._id;

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("inProgress"); // "inProgress" or "claimed"

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        let endpoint;
        if (activeTab === "inProgress") {
          endpoint = `https://be.solarx0.com/api/plans/user/inprogress/${id}`;
        } else {
          endpoint = `https://be.solarx0.com/api/plans/user/claimed/${id}`;
        }

        const res = await axios.get(endpoint);
        if (res.data.success) {
          let fetchedPlans = res.data.plans || [];

          // ✅ Auto update plan status to "completed" if progress >= 100
          fetchedPlans = fetchedPlans.map((plan) => {
            const progress = calculateProgress(plan);
            if (progress >= 100 && plan.status === "running") {
              return { ...plan, status: "completed" };
            }
            return plan;
          });

          setPlans(fetchedPlans);
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [id, activeTab]);

  // Calculate progress percentage - IMPROVED
  const calculateProgress = (plan) => {
    try {
      const startDate = new Date(plan.startingDate || plan.createdAt);
      const endDate = new Date(plan.endingDate || plan.expiryDate);
      const today = new Date();

      // If plan is already completed or claimed, return 100
      if (plan.status === "completed" || plan.status === "claimed") {
        return 100;
      }

      if (!plan.endingDate && !plan.expiryDate) return 0;

      const totalDuration = endDate - startDate;
      const elapsed = today - startDate;

      if (totalDuration <= 0) return 100;

      const progress = Math.min(
        100,
        Math.max(0, (elapsed / totalDuration) * 100)
      );
      return parseFloat(progress.toFixed(2));
    } catch (error) {
      console.error("Error calculating progress:", error);
      return 0;
    }
  };

  // Get remaining days
  const getRemainingDays = (plan) => {
    try {
      const endDate = new Date(plan.endingDate || plan.expiryDate);
      const today = new Date();
      const diffTime = endDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, diffDays);
    } catch (error) {
      console.error("Error calculating remaining days:", error);
      return plan.days || 0;
    }
  };

  const getReturnProfit = (plan) => {
    return plan.returnProfit || plan.dailyEarning * (plan.days || 3);
  };

  const isPlanCompleted = (plan) => {
    const progress = calculateProgress(plan);
    return (
      progress >= 100 ||
      plan.status === "completed" ||
      new Date() >= new Date(plan.endingDate || plan.expiryDate)
    );
  };

  // ✅ Handle claim button click
  const handleClaim = async (planId) => {
    try {
      const res = await axios.post(`https://be.solarx0.com/api/plans/claim`, {
        planId,
        user_id: id,
      });

      if (res.data.success) {
        setPlans((prevPlans) =>
          prevPlans.filter((plan) => plan._id !== planId)
        );
        alert("Plan claimed successfully! Amount added to your balance.");

        const updatedUser = {
          ...user,
          userbalance: user.userbalance + res.data.amount,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // ✅ Switch to claimed tab automatically after claim
        setActiveTab("claimed");
      }
    } catch (err) {
      console.error("Error claiming plan:", err);
      alert(
        err.response?.data?.message || "Error claiming plan. Please try again."
      );
    }
  };

  if (loading)
    return (
      <div className="active-plans-container">
        <div className="active-plans-header-section">
          <div className="active-plans-header">
            <Link to="/dashboard" className="back-link">
              <FaArrowLeft className="back-icon" />
            </Link>
            <h1 className="active-plans-title">Purchased Products</h1>
          </div>
        </div>
        <div className="active-plans-content">
          <div className="active-plans-card">
            <div className="loading-state">Loading plan details...</div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="active-plans-container">
      <div className="active-plans-header-section">
        <div className="active-plans-header">
          <Link to="/dashboard" className="back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="active-plans-title">Purchased Products</h1>
        </div>
      </div>

      <div className="active-plans-content">
        <div className="active-plans-card">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${
                activeTab === "inProgress" ? "active" : ""
              }`}
              onClick={() => setActiveTab("inProgress")}
            >
              In Progress
            </button>
            <button
              className={`tab-btn ${activeTab === "claimed" ? "active" : ""}`}
              onClick={() => setActiveTab("claimed")}
            >
              Claimed
            </button>
          </div>

          {plans.length === 0 ? (
            <div className="no-plans">
              <p>
                No {activeTab === "inProgress" ? "active" : "claimed"} plans
                found
              </p>
            </div>
          ) : (
            plans.map((plan, index) => (
              <div key={plan._id || index} className="plan-card">
                <div className="plan-header">
                  <h3 className="plan-status">
                    {activeTab === "inProgress"
                      ? isPlanCompleted(plan)
                        ? "Completed!"
                        : "In Progress!"
                      : "Claimed!"}
                  </h3>
                  {plan.status === "claimed" && (
                    <span className="claimed-badge">Claimed</span>
                  )}
                </div>

                <div className="plan-details">
                  <div className="detail-row">
                    <span className="label">Company name:</span>
                    <span className="value">{plan.PlanName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Return Profit Amount:</span>
                    <span className="value">{getReturnProfit(plan)} PKR</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Invested Amount:</span>
                    <span className="value">{plan.Investment} PKR</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Progress:</span>
                    <span className="value">{calculateProgress(plan)}%</span>
                  </div>

                  {activeTab === "inProgress" && (
                    <div className="detail-row">
                      <span className="label">Pending Days:</span>
                      <span className="value">
                        {getRemainingDays(plan)} days
                      </span>
                    </div>
                  )}

                  <div className="detail-row">
                    <span className="label">Profit %:</span>
                    <span className="value">
                      {plan.profitPercentage || "5.6%"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="label">Starting Date:</span>
                    <span className="value">
                      {new Date(
                        plan.startingDate || plan.createdAt
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="label">Ending Date:</span>
                    <span className="value">
                      {new Date(
                        plan.endingDate || plan.expiryDate
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className="value">{plan.status || "running"}</span>
                  </div>
                </div>

                <div className="action-section">
                  {activeTab === "inProgress" && (
                    <button
                      className={`action-btn ${
                        isPlanCompleted(plan) ? "claim" : "running"
                      }`}
                      onClick={() =>
                        isPlanCompleted(plan) && handleClaim(plan._id)
                      }
                      disabled={!isPlanCompleted(plan)}
                    >
                      {isPlanCompleted(plan) ? "CLAIM" : "RUNNING"}
                    </button>
                  )}
                  {activeTab === "claimed" && (
                    <div className="claimed-info">
                      <p>
                        Total Received:{" "}
                        {plan.Investment + getReturnProfit(plan)} PKR
                      </p>
                      {plan.claimedAt && (
                        <p>
                          Claimed on:{" "}
                          {new Date(plan.claimedAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Bottom Navigation */}
      <footer className="sx-bottom-nav">
        <Link to="/dashboard" className="sx-nav-btn">
          <FiHome className="sx-nav-icon" />
        </Link>
        <Link to="/activeplans" className="sx-nav-btn active">
          <FiPieChart className="sx-nav-icon" />
        </Link>
        <Link to="/team" className="sx-nav-btn">
          <FiUsers className="sx-nav-icon" />
        </Link>
        <Link to="/earningsummary" className="sx-nav-btn">
          <FaChartLine className="sx-nav-icon" />
        </Link>
      </footer>
    </div>
  );
}
