// import axios from "axios";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";
// import { FiBell, FiHome, FiPieChart, FiUser, FiUsers } from "react-icons/fi";
// import {
//   RiBankLine,
//   RiGroupLine,
//   RiMoneyDollarCircleLine,
// } from "react-icons/ri";
// import { Link, useNavigate } from "react-router-dom";
// import profileImg from "../../Assets/Pictures/download.jpeg";
// import placeholderPlanImg1 from "../../Assets/Pictures/newplan1.jpeg";
// import placeholderPlanImg2 from "../../Assets/Pictures/newplan2.jpeg";
// import placeholderPlanImg3 from "../../Assets/Pictures/newplan3.jpeg";
// import placeholderPlanImg4 from "../../Assets/Pictures/newplan4.jpeg";
// import placeholderPlanImg5 from "../../Assets/Pictures/newplan5.jpeg";
// import placeholderPlanImg6 from "../../Assets/Pictures/newplan6.jpeg";
// import placeholderPlanImg7 from "../../Assets/Pictures/newplan7.jpeg";
// import placeholderPlanImg8 from "../../Assets/Pictures/newplan8.jpeg";
// import Settings from "../Settings/Settings";
// import "./Dashboard.css";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [showSettings, setShowSettings] = useState(false);

//   // User from localStorage
//   const user = useMemo(() => {
//     const str = localStorage.getItem("user");
//     return str ? JSON.parse(str) : null;
//   }, []);
//   const userId = user?._id;

//   // Team data and user plans
//   const [teamData, setTeamData] = useState({
//     user: {},
//     plans: [],
//     commissionSummary: {},
//   });
//   const [userPlans, setUserPlans] = useState([]);
//   const [loadingTeam, setLoadingTeam] = useState(false);

//   // State for dynamic invested people counts
//   const [investedCounts, setInvestedCounts] = useState({});
//   const [lastUpdate, setLastUpdate] = useState(null);

//   // Fetch team data
//   const fetchTeamData = useCallback(async () => {
//     if (!userId) return;
//     setLoadingTeam(true);
//     try {
//       const res = await axios.post("https://be.solarx0.com/team", { userId });
//       setTeamData(res.data || {});
//     } catch (err) {
//       console.error("Error fetching team data:", err);
//     } finally {
//       setLoadingTeam(false);
//     }
//   }, [userId]);

//   // Fetch user plans
//   const fetchUserPlans = useCallback(async () => {
//     if (!userId) return;
//     try {
//       const res = await axios.get(
//         `https://be.solarx0.com/api/plans/user/active/${userId}`
//       );
//       if (res.data.success) {
//         setUserPlans(res.data.plans || []);
//       }
//     } catch (err) {
//       console.error("Error fetching user plans:", err);
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchTeamData();
//     fetchUserPlans();
//   }, [fetchTeamData, fetchUserPlans]);

//   // ✅ CORRECT TOTAL BALANCE CALCULATION
//   const totalBalance = useMemo(() => {
//     // User's available balance (includes deposits, withdrawals, commissions, claimed plans)
//     return teamData?.user?.userbalance || 0;
//   }, [teamData]);

//   // ✅ TOTAL NET WORTH (For display purposes - Available + Active Plans Value)
//   const totalNetWorth = useMemo(() => {
//     const availableBalance = teamData?.user?.userbalance || 0;

//     // Active plans current value (investment + earned profit)
//     const activePlansValue = userPlans.reduce((total, plan) => {
//       if (plan.status === "running") {
//         const startDate = new Date(plan.startingDate);
//         const currentDate = new Date();
//         const daysPassed = Math.floor(
//           (currentDate - startDate) / (1000 * 60 * 60 * 24)
//         );
//         const earnedDays = Math.min(daysPassed, plan.days);
//         const earnedAmount = plan.dailyEarning * earnedDays;
//         return total + plan.Investment + earnedAmount;
//       }
//       return total;
//     }, 0);

//     return availableBalance + activePlansValue;
//   }, [teamData, userPlans]);

//   // Initialize and update invested counts daily
//   useEffect(() => {
//     const generateInitialCounts = () => {
//       const counts = {};
//       for (let i = 0; i < 5; i++) {
//         counts[i] = Math.floor(Math.random() * 11) + 20;
//       }
//       for (let i = 5; i < 8; i++) {
//         counts[i] = Math.floor(Math.random() * 11) + 5;
//       }
//       return counts;
//     };

//     const loadCounts = () => {
//       const savedCounts = localStorage.getItem("dashboardInvestedCounts");
//       const savedLastUpdate = localStorage.getItem("dashboardLastUpdate");

//       if (savedCounts && savedLastUpdate) {
//         const lastUpdateDate = new Date(savedLastUpdate);
//         const today = new Date();
//         const isSameDay =
//           lastUpdateDate.toDateString() === today.toDateString();

//         if (isSameDay) {
//           setInvestedCounts(JSON.parse(savedCounts));
//           setLastUpdate(lastUpdateDate);
//           return JSON.parse(savedCounts);
//         }
//       }

//       const newCounts = generateInitialCounts();
//       const now = new Date();
//       localStorage.setItem(
//         "dashboardInvestedCounts",
//         JSON.stringify(newCounts)
//       );
//       localStorage.setItem("dashboardLastUpdate", now.toISOString());
//       setInvestedCounts(newCounts);
//       setLastUpdate(now);
//       return newCounts;
//     };

//     const updateCountsDaily = () => {
//       const now = new Date();
//       const savedLastUpdate = localStorage.getItem("dashboardLastUpdate");
//       if (!savedLastUpdate) {
//         loadCounts();
//         return;
//       }

//       const lastUpdateDate = new Date(savedLastUpdate);
//       const today = new Date();
//       const isNewDay = lastUpdateDate.toDateString() !== today.toDateString();

//       if (isNewDay) {
//         setInvestedCounts((prev) => {
//           const newCounts = { ...prev };
//           Object.keys(newCounts).forEach((key) => {
//             const index = parseInt(key);
//             let randomIncrease =
//               index >= 5
//                 ? Math.floor(Math.random() * 11) + 5
//                 : Math.floor(Math.random() * 11) + 20;
//             newCounts[key] += randomIncrease;
//           });
//           localStorage.setItem(
//             "dashboardInvestedCounts",
//             JSON.stringify(newCounts)
//           );
//           localStorage.setItem("dashboardLastUpdate", now.toISOString());
//           setLastUpdate(now);
//           return newCounts;
//         });
//       }
//     };

//     loadCounts();
//     const interval = setInterval(updateCountsDaily, 60 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Announcements
//   const [announcements, setAnnouncements] = useState([]);
//   const [showAnnouncements, setShowAnnouncements] = useState(false);
//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const res = await axios.post(
//           "https://be.solarx0.com/api/announcements1"
//         );
//         if (res.status === 200) setAnnouncements(res.data.data || []);
//       } catch (err) {
//         console.error("Error announcements:", err);
//       }
//     };
//     fetchAnnouncements();
//   }, []);

//   // Subscribers counts
//   const [subscribersCounts, setSubscribersCounts] = useState([]);
//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const res = await axios.get(
//           "https://be.solarx0.com/api/plans/countSubscribePlanName"
//         );
//         setSubscribersCounts(res.data.plans || []);
//       } catch (err) {
//         console.error("Error fetching subscriber counts:", err);
//       }
//     };
//     fetchCounts();
//   }, []);

//   // Dynamic percentage calculations
//   const calcDaily = (amt, percent) =>
//     Math.round(Number(amt || 0) * (percent / 100));
//   const calcTotal = (amt, percent, days) =>
//     Math.round(calcDaily(amt, percent) * (days || 0));

//   // Plans to show on dashboard
//   const dashboardPlans = useMemo(() => {
//     const placeholderImages = [
//       placeholderPlanImg1,
//       placeholderPlanImg2,
//       placeholderPlanImg3,
//       placeholderPlanImg4,
//       placeholderPlanImg5,
//       placeholderPlanImg6,
//       placeholderPlanImg7,
//       placeholderPlanImg8,
//     ];

//     if (Array.isArray(teamData?.plans) && teamData.plans.length >= 2) {
//       return teamData.plans.slice(0, 2).map((p, i) => {
//         const title = p.title || p.PlanName || p.name || `Plan ${i + 1}`;
//         const days = p.durationDays || p.days || p.validity || p.duration || 3;
//         const min =
//           p.minAmount || p.min || p.minimum || p.rangeMin || p.amount || 1000;
//         const max = p.maxAmount || p.max || p.maximum || p.rangeMax || min * 2;
//         const percent = p.profitPerDay || p.dailyPercent || p.total || 4;
//         const img =
//           p.image || p.img || placeholderImages[i % placeholderImages.length];
//         const invested = p.investedPeople || p.subscribers || 0;
//         return { raw: p, title, days, min, max, percent, img, invested };
//       });
//     }

//     return [
//       {
//         title: "SOLARX PAKISTAN (3D)",
//         days: 3,
//         min: 1000,
//         max: 2000,
//         percent: 3.6,
//         img: placeholderPlanImg1,
//         invested: investedCounts[0] || 25,
//         locked: false,
//       },
//       {
//         title: "REON ENERGY (7D)",
//         days: 7,
//         min: 1000,
//         max: 4000,
//         percent: 3.7,
//         img: placeholderPlanImg2,
//         invested: investedCounts[1] || 25,
//         locked: false,
//       },
//       {
//         title: "SKY ELECTRIC (12D)",
//         days: 12,
//         min: 2000,
//         max: 10000,
//         percent: 3.9,
//         img: placeholderPlanImg3,
//         invested: investedCounts[2] || 25,
//         locked: false,
//       },
//       {
//         title: "NIZAM ENERGY (15D)",
//         days: 15,
//         min: 3000,
//         max: 20000,
//         percent: 4.1,
//         img: placeholderPlanImg4,
//         invested: investedCounts[3] || 25,
//         locked: true,
//       },
//       {
//         title: "ZONERGY (22D)",
//         days: 22,
//         min: 5000,
//         max: 25000,
//         percent: 4.2,
//         img: placeholderPlanImg5,
//         invested: investedCounts[4] || 25,
//         locked: true,
//       },
//       {
//         title: "GREEN POWER (30D)",
//         days: 30,
//         min: 1000,
//         max: 50000,
//         percent: 4.5,
//         img: placeholderPlanImg6,
//         invested: investedCounts[5] || 10,
//         locked: false,
//       },
//       {
//         title: "ALBARIO SOLARX (42D)",
//         days: 42,
//         min: 15000,
//         max: 70000,
//         percent: 5,
//         img: placeholderPlanImg7,
//         invested: investedCounts[6] || 10,
//         locked: true,
//       },
//       {
//         title: "PAK OMAN INVESTMENT COMPANY (60D)",
//         days: 60,
//         min: 20000,
//         max: 100000,
//         percent: 5.5,
//         img: placeholderPlanImg8,
//         invested: investedCounts[7] || 10,
//         locked: false,
//       },
//     ];
//   }, [teamData, investedCounts]);

//   // INVEST MODAL state
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activePlan, setActivePlan] = useState(null);
//   const [investAmount, setInvestAmount] = useState("");
//   const [modalError, setModalError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const openInvestModal = (plan) => {
//     setActivePlan(plan);
//     setInvestAmount(plan.min);
//     setModalError("");
//     setModalOpen(true);
//   };

//   const closeInvestModal = () => {
//     setModalOpen(false);
//     setActivePlan(null);
//     setInvestAmount("");
//     setModalError("");
//   };

//   const confirmInvest = async () => {
//     setModalError("");
//     if (!activePlan) return;
//     const amt = Number(investAmount);
//     if (!amt || isNaN(amt)) {
//       setModalError("Enter a valid amount");
//       return;
//     }
//     if (amt < activePlan.min || amt > activePlan.max) {
//       setModalError(
//         `Amount must be between ${activePlan.min} and ${activePlan.max} PKR`
//       );
//       return;
//     }
//     const userBalance = teamData?.user?.userbalance || 0;
//     if (amt > userBalance) {
//       setModalError("Insufficient balance. Deposit first.");
//       return;
//     }
//     if (!userId) {
//       setModalError("Please login to invest.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const dailyEarning = Math.round(amt * (activePlan.percent / 100));
//       const returnProfit = dailyEarning * activePlan.days;

//       const payload = {
//         user_id: userId,
//         PlanName: activePlan.title,
//         Investment: amt,
//         dailyEarning: dailyEarning,
//         days: activePlan.days,
//         returnProfit: returnProfit,
//         profitPercentage: activePlan.percent + "%",
//       };

//       console.log("Creating plan with payload:", payload);

//       const res = await axios.post("https://be.solarx0.com/api/plans", payload);
//       if (res.data?.success) {
//         // Update balance immediately
//         setTeamData((prev) => ({
//           ...prev,
//           user: {
//             ...prev.user,
//             userbalance: prev.user.userbalance - amt,
//           },
//         }));

//         await fetchTeamData();
//         await fetchUserPlans();

//         closeInvestModal();
//         navigate("/activeplans");
//       } else {
//         setModalError(res.data?.message || "Subscription failed.");
//       }
//     } catch (err) {
//       console.error("subscribe err:", err);
//       setModalError(err.response?.data?.message || "Network error. Try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getSubscribersFor = (plan) => {
//     if (!subscribersCounts || !Array.isArray(subscribersCounts))
//       return plan.invested || 0;
//     const found = subscribersCounts.find((s) => {
//       if (!s?.planName) return false;
//       if (s.planName.toString().includes(String(plan.days))) return true;
//       if (
//         plan.title &&
//         s.planName.toLowerCase().includes(plan.title.toLowerCase())
//       )
//         return true;
//       if (s.planName.toString().includes(String(plan.min))) return true;
//       return false;
//     });
//     return found?.subscribers ?? plan.invested ?? 0;
//   };

//   const whatsappGroupLink = "https://chat.whatsapp.com/GQoVtPyb7elHuKugtp6ioD";

//   const formatLastUpdate = () => {
//     if (!lastUpdate) return "Today";
//     const today = new Date();
//     const updateDate = new Date(lastUpdate);
//     if (updateDate.toDateString() === today.toDateString()) {
//       return "Today";
//     } else {
//       return updateDate.toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       });
//     }
//   };

//   return (
//     <div className="sx-dashboard-root">
//       {/* TOP: Welcome header */}
//       <div className="sx-header">
//         <div className="sx-header-left">
//           <img
//             src={
//               user?.profilepicture
//                 ? `https://be.solarx0.com${user.profilepicture}`
//                 : profileImg
//             }
//             alt="avatar"
//             className="sx-avatar"
//           />
//           <div className="sx-welcome-text">
//             <div className="sx-welcome-main">Welcome Back!</div>
//             <div className="sx-welcome-name">
//               {user?.fullName || user?.name || "User"}
//             </div>
//           </div>
//         </div>

//         <div className="sx-header-right">
//           <a
//             href={whatsappGroupLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="sx-whatsapp-btn"
//           >
//             <FaWhatsapp />
//           </a>

//           <button
//             className={`sx-bell-btn ${
//               announcements.length > 0 ? "has-notifications" : ""
//             }`}
//             onClick={() => setShowAnnouncements(!showAnnouncements)}
//           >
//             <FiBell />
//           </button>

//           {showAnnouncements && (
//             <div className="announcement-popup">
//               <div className="announcement-popup-header">
//                 <h4>📢 Announcements</h4>
//                 <button
//                   className="announcement-close"
//                   onClick={() => setShowAnnouncements(false)}
//                 >
//                   ✕
//                 </button>
//               </div>
//               <div className="announcement-list">
//                 {announcements.length > 0 ? (
//                   announcements.map((item, index) => {
//                     const priority =
//                       index === 0 ? "high" : index < 3 ? "medium" : "low";
//                     const timestamp = new Date().toLocaleTimeString("en-US", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     });
//                     return (
//                       <div
//                         key={item._id}
//                         className={`announcement-item priority-${priority}`}
//                       >
//                         <div className="announcement-content">
//                           <div className="announcement-message">
//                             {item.message}
//                           </div>
//                           <div className="announcement-meta">
//                             <span className="announcement-time">
//                               {timestamp}
//                             </span>
//                             <span className="announcement-status">UPDATE</span>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div className="announcement-item no-announcements">
//                     <div className="announcement-content">
//                       <div className="no-announcements-icon">📭</div>
//                       <p>No new announcements</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Total Balance Card */}
//       <div className="sx-balance-card">
//         <div className="sx-balance-title">Available Balance</div>
//         <div className="sx-balance-value">
//           {(totalBalance || 0).toLocaleString()} PKR
//         </div>
//         <div className="sx-net-worth">
//           Net Worth: {(totalNetWorth || 0).toLocaleString()} PKR
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="sx-quick-actions">
//         <div className="sx-action" onClick={() => navigate("/deposit")}>
//           <div className="sx-action-icon">
//             <RiBankLine className="sx-nav-icon" />
//           </div>
//           <div className="sx-action-label">Deposit</div>
//         </div>
//         <div className="sx-action" onClick={() => navigate("/withdraw")}>
//           <div className="sx-action-icon">
//             <RiMoneyDollarCircleLine className="sx-nav-icon" />
//           </div>
//           <div className="sx-action-label">Withdraw</div>
//         </div>
//         <div className="sx-action" onClick={() => navigate("/invite")}>
//           <div className="sx-action-icon">
//             <RiGroupLine className="sx-nav-icon" />
//           </div>
//           <div className="sx-action-label">Invite</div>
//         </div>
//         <a
//           href={whatsappGroupLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="sx-action whatsapp-group-action"
//         >
//           <div className="sx-action-icon">
//             <FaWhatsapp className="sx-nav-icon" />
//           </div>
//           <div className="sx-action-label">
//             <span className="desktop-text">Join SolarX Whatsapp Group</span>
//             <span className="mobile-text">WhatsApp Group</span>
//           </div>
//         </a>
//       </div>

//       {/* Investment Plans Heading */}
//       <div className="sx-plans-header">
//         <h3>INVESTMENT PLANS</h3>
//         <p className="sx-sub">
//           Choose the plan that suits your investment goals!
//         </p>
//         <div className="sx-update-indicator">
//           📊 Investor counts updated daily • Last update: {formatLastUpdate()}
//         </div>
//       </div>

//       {/* Plans List */}
//       <div className="sx-plans-list">
//         {dashboardPlans.map((p, idx) => (
//           <div className="sx-plan-card" key={idx}>
//             <div className="sx-plan-img-wrap">
//               <img src={p.img} alt={p.title} className="sx-plan-img" />
//               <div className="sx-plan-percent">{p.percent}%/PAR DAY</div>
//               {idx < 5 && <div className="sx-popular-badge">🔥 POPULAR</div>}
//             </div>
//             <div className="sx-plan-body">
//               <div className="sx-plan-title">{p.title}</div>
//               <div className="sx-plan-range">
//                 <span className="sx-range-min">{p.min.toLocaleString()}</span>
//                 <span className="sx-dash"> - </span>
//                 <span className="sx-range-max">
//                   {p.max.toLocaleString()} PKR
//                 </span>
//               </div>
//               <div className="sx-invested-people">
//                 <div className="sx-invested-header">
//                   <span className="sx-invested-icon"></span>
//                    Activate Your Plan
//                 </div>
//                 <strong className="sx-invested-count">
//                   {getSubscribersFor(p).toLocaleString()}
//                 </strong>
//               </div>
//               <div className="sx-plan-cta">
//                 <button
//                   className="sx-invest-btn"
//                   onClick={() => !p.locked && openInvestModal(p)}
//                   disabled={p.locked}
//                 >
//                   {p.locked ? "LOCKED 🔐" : "INVEST NOW"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Navigation */}
//       <footer className="sx-bottom-nav">
//         <Link to="/dashboard" className="sx-nav-btn active">
//           <FiHome className="sx-nav-icon" />
//         </Link>
//         <Link to="/team" className="sx-nav-btn">
//           <FiUsers className="sx-nav-icon" />
//         </Link>
//         <Link to="/activeplans" className="sx-nav-btn">
//           <FiPieChart className="sx-nav-icon" />
//         </Link>
//         <div className="sx-nav-btn" onClick={() => setShowSettings(true)}>
//           <FiUser className="sx-nav-icon" />
//         </div>
//       </footer>

//       <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />

//       {/* INVEST MODAL */}
//       {modalOpen && activePlan && (
//         <div className="sx-modal-overlay">
//           <div className="sx-modal">
//             <div className="sx-modal-header">
//               <h4>Invest in {activePlan.title}</h4>
//               <button className="sx-modal-close" onClick={closeInvestModal}>
//                 ✖
//               </button>
//             </div>
//             <div className="sx-modal-body">
//               <img src={activePlan.img} alt="" className="sx-modal-img" />
//               <p className="sx-modal-range">
//                 Range: {activePlan.min.toLocaleString()} -{" "}
//                 {activePlan.max.toLocaleString()} PKR
//               </p>
//               <div className="sx-popularity-info">
//                 <div className="sx-popularity-badge">
//                   {getSubscribersFor(activePlan).toLocaleString()}+ active
//                   investors
//                 </div>
//                 <p className="sx-popularity-note">
//                   Join {getSubscribersFor(activePlan).toLocaleString()}{" "}
//                   investors who trust this plan
//                 </p>
//               </div>
//               <label className="sx-label">Enter Amount</label>
//               <input
//                 className="sx-input"
//                 type="number"
//                 min={activePlan.min}
//                 max={activePlan.max}
//                 value={investAmount}
//                 onChange={(e) => setInvestAmount(e.target.value)}
//               />
//               <div className="sx-calc">
//                 <div>
//                   <small>Daily Profit ({activePlan.percent}%)</small>
//                   <div className="sx-calc-value">
//                     {calcDaily(
//                       investAmount || activePlan.min,
//                       activePlan.percent
//                     )}{" "}
//                     PKR
//                   </div>
//                 </div>
//                 <div>
//                   <small>Total Profit ({activePlan.days} days)</small>
//                   <div className="sx-calc-value">
//                     {calcTotal(
//                       investAmount || activePlan.min,
//                       activePlan.percent,
//                       activePlan.days
//                     )}{" "}
//                     PKR
//                   </div>
//                 </div>
//               </div>
//               {modalError && <div className="sx-modal-error">{modalError}</div>}
//             </div>
//             <div className="sx-modal-footer">
//               <button className="sx-btn-cancel" onClick={closeInvestModal}>
//                 Cancel
//               </button>
//               <button
//                 className="sx-btn-confirm"
//                 onClick={confirmInvest}
//                 disabled={submitting}
//               >
//                 {submitting ? "Processing..." : "Confirm Invest"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChartLine, FaEye, FaEyeSlash, FaWhatsapp } from "react-icons/fa";
import { FiHome, FiMenu, FiPieChart, FiUsers } from "react-icons/fi";
import {
  RiBankLine,
  RiGroupLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../../Assets/Pictures/download.jpeg";
import placeholderPlanImg1 from "../../Assets/Pictures/plan1.jpeg";
import placeholderPlanImg2 from "../../Assets/Pictures/plan2.jpeg";
import placeholderPlanImg3 from "../../Assets/Pictures/plan3.jpeg";
import placeholderPlanImg4 from "../../Assets/Pictures/plan4.jpeg";
import placeholderPlanImg5 from "../../Assets/Pictures/plan5.jpeg";
import placeholderPlanImg6 from "../../Assets/Pictures/plan6.jpeg";
import placeholderPlanImg7 from "../../Assets/Pictures/plan7.jpeg";
import placeholderPlanImg8 from "../../Assets/Pictures/plan8.jpeg";
import Settings from "../Settings/Settings";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  // User from localStorage
  const user = useMemo(() => {
    const str = localStorage.getItem("user");
    return str ? JSON.parse(str) : null;
  }, []);
  const userId = user?._id;

  // Team data and user plans
  const [teamData, setTeamData] = useState({
    user: {},
    plans: [],
    commissionSummary: {},
  });
  const [userPlans, setUserPlans] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(false);

  // State for dynamic invested people counts
  const [investedCounts, setInvestedCounts] = useState({});
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fetch team data
  const fetchTeamData = useCallback(async () => {
    if (!userId) return;
    setLoadingTeam(true);
    try {
      const res = await axios.post("https://be.solarx0.com/team", { userId });
      setTeamData(res.data || {});
    } catch (err) {
      console.error("Error fetching team data:", err);
    } finally {
      setLoadingTeam(false);
    }
  }, [userId]);

  // Fetch user plans
  const fetchUserPlans = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `https://be.solarx0.com/api/plans/user/active/${userId}`
      );
      if (res.data.success) {
        setUserPlans(res.data.plans || []);
      }
    } catch (err) {
      console.error("Error fetching user plans:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchTeamData();
    fetchUserPlans();
  }, [fetchTeamData, fetchUserPlans]);

  // ✅ CORRECT TOTAL BALANCE CALCULATION
  const totalBalance = useMemo(() => {
    // User's available balance (includes deposits, withdrawals, commissions, claimed plans)
    return teamData?.user?.userbalance || 0;
  }, [teamData]);

  // ✅ TOTAL NET WORTH (For display purposes - Available + Active Plans Value)
  const totalNetWorth = useMemo(() => {
    const availableBalance = teamData?.user?.userbalance || 0;

    // Active plans current value (investment + earned profit)
    const activePlansValue = userPlans.reduce((total, plan) => {
      if (plan.status === "running") {
        const startDate = new Date(plan.startingDate);
        const currentDate = new Date();
        const daysPassed = Math.floor(
          (currentDate - startDate) / (1000 * 60 * 60 * 24)
        );
        const earnedDays = Math.min(daysPassed, plan.days);
        const earnedAmount = plan.dailyEarning * earnedDays;
        return total + plan.Investment + earnedAmount;
      }
      return total;
    }, 0);

    return availableBalance + activePlansValue;
  }, [teamData, userPlans]);

  // Initialize and update invested counts daily
  useEffect(() => {
    const generateInitialCounts = () => {
      const counts = {};
      for (let i = 0; i < 5; i++) {
        counts[i] = Math.floor(Math.random() * 11) + 20;
      }
      for (let i = 5; i < 8; i++) {
        counts[i] = Math.floor(Math.random() * 11) + 5;
      }
      return counts;
    };

    const loadCounts = () => {
      const savedCounts = localStorage.getItem("dashboardInvestedCounts");
      const savedLastUpdate = localStorage.getItem("dashboardLastUpdate");

      if (savedCounts && savedLastUpdate) {
        const lastUpdateDate = new Date(savedLastUpdate);
        const today = new Date();
        const isSameDay =
          lastUpdateDate.toDateString() === today.toDateString();

        if (isSameDay) {
          setInvestedCounts(JSON.parse(savedCounts));
          setLastUpdate(lastUpdateDate);
          return JSON.parse(savedCounts);
        }
      }

      const newCounts = generateInitialCounts();
      const now = new Date();
      localStorage.setItem(
        "dashboardInvestedCounts",
        JSON.stringify(newCounts)
      );
      localStorage.setItem("dashboardLastUpdate", now.toISOString());
      setInvestedCounts(newCounts);
      setLastUpdate(now);
      return newCounts;
    };

    const updateCountsDaily = () => {
      const now = new Date();
      const savedLastUpdate = localStorage.getItem("dashboardLastUpdate");
      if (!savedLastUpdate) {
        loadCounts();
        return;
      }

      const lastUpdateDate = new Date(savedLastUpdate);
      const today = new Date();
      const isNewDay = lastUpdateDate.toDateString() !== today.toDateString();

      if (isNewDay) {
        setInvestedCounts((prev) => {
          const newCounts = { ...prev };
          Object.keys(newCounts).forEach((key) => {
            const index = parseInt(key);
            let randomIncrease =
              index >= 5
                ? Math.floor(Math.random() * 11) + 5
                : Math.floor(Math.random() * 11) + 20;
            newCounts[key] += randomIncrease;
          });
          localStorage.setItem(
            "dashboardInvestedCounts",
            JSON.stringify(newCounts)
          );
          localStorage.setItem("dashboardLastUpdate", now.toISOString());
          setLastUpdate(now);
          return newCounts;
        });
      }
    };

    loadCounts();
    const interval = setInterval(updateCountsDaily, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const [showBalance, setShowBalance] = useState(true);

  // Announcements
  // const [announcements, setAnnouncements] = useState([]);
  // const [showAnnouncements, setShowAnnouncements] = useState(false);
  // useEffect(() => {
  //   const fetchAnnouncements = async () => {
  //     try {
  //       const res = await axios.post(
  //         "https://be.solarx0.com/api/announcements1"
  //       );
  //       if (res.status === 200) setAnnouncements(res.data.data || []);
  //     } catch (err) {
  //       console.error("Error announcements:", err);
  //     }
  //   };
  //   fetchAnnouncements();
  // }, []);

  // Subscribers counts
  const [subscribersCounts, setSubscribersCounts] = useState([]);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          "https://be.solarx0.com/api/plans/countSubscribePlanName"
        );
        setSubscribersCounts(res.data.plans || []);
      } catch (err) {
        console.error("Error fetching subscriber counts:", err);
      }
    };
    fetchCounts();
  }, []);

  // Dynamic percentage calculations
  const calcDaily = (amt, percent) =>
    Math.round(Number(amt || 0) * (percent / 100));
  const calcTotal = (amt, percent, days) =>
    Math.round(calcDaily(amt, percent) * (days || 0));

  // Plans to show on dashboard
  const dashboardPlans = useMemo(() => {
    const placeholderImages = [
      placeholderPlanImg1,
      placeholderPlanImg2,
      placeholderPlanImg3,
      placeholderPlanImg4,
      placeholderPlanImg5,
      placeholderPlanImg6,
      placeholderPlanImg7,
      placeholderPlanImg8,
    ];

    if (Array.isArray(teamData?.plans) && teamData.plans.length >= 2) {
      return teamData.plans.slice(0, 2).map((p, i) => {
        const title = p.title || p.PlanName || p.name || `Plan ${i + 1}`;
        const days = p.durationDays || p.days || p.validity || p.duration || 3;
        const min =
          p.minAmount || p.min || p.minimum || p.rangeMin || p.amount || 1000;
        const max = p.maxAmount || p.max || p.maximum || p.rangeMax || min * 2;
        const percent = p.profitPerDay || p.dailyPercent || p.total || 4;
        const img =
          p.image || p.img || placeholderImages[i % placeholderImages.length];
        const invested = p.investedPeople || p.subscribers || 0;
        return { raw: p, title, days, min, max, percent, img, invested };
      });
    }

    return [
      {
        title: "Meta Drive🚘",
        days: 3,
        min: 1000,
        max: 2000,
        percent: 3.6,
        img: placeholderPlanImg1,
        invested: investedCounts[0] || 25,
        locked: false,
      },
      {
        title: "Meta Messenger/Community",
        days: 7,
        min: 1000,
        max: 4000,
        percent: 3.7,
        img: placeholderPlanImg2,
        invested: investedCounts[1] || 25,
        locked: false,
      },
      {
        title: "Meta WhatsApp/Team",
        days: 12,
        min: 2000,
        max: 10000,
        percent: 3.9,
        img: placeholderPlanImg3,
        invested: investedCounts[2] || 25,
        locked: false,
      },
      {
        title: "Meta Instagram/Social studies",
        days: 15,
        min: 3000,
        max: 20000,
        percent: 4.1,
        img: placeholderPlanImg4,
        invested: investedCounts[3] || 25,
        locked: true,
      },
      {
        title: "Meta Facebook/Social media",
        days: 22,
        min: 5000,
        max: 25000,
        percent: 4.2,
        img: placeholderPlanImg5,
        invested: investedCounts[4] || 25,
        locked: true,
      },
      {
        title: "Meta Oculus/Products",
        days: 30,
        min: 1000,
        max: 50000,
        percent: 4.5,
        img: placeholderPlanImg6,
        invested: investedCounts[5] || 10,
        locked: false,
      },
      {
        title: "Meta Workplace/Team's",
        days: 42,
        min: 15000,
        max: 70000,
        percent: 5,
        img: placeholderPlanImg7,
        invested: investedCounts[6] || 10,
        locked: true,
      },
      {
        title: "Meta Portal/LCD",
        days: 60,
        min: 20000,
        max: 100000,
        percent: 5.5,
        img: placeholderPlanImg8,
        invested: investedCounts[7] || 10,
        locked: false,
      },
    ];
  }, [teamData, investedCounts]);

  // INVEST MODAL state
  const [modalOpen, setModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(null);
  const [investAmount, setInvestAmount] = useState("");
  const [modalError, setModalError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openInvestModal = (plan) => {
    setActivePlan(plan);
    setInvestAmount(plan.min);
    setModalError("");
    setModalOpen(true);
  };

  const closeInvestModal = () => {
    setModalOpen(false);
    setActivePlan(null);
    setInvestAmount("");
    setModalError("");
  };

  const confirmInvest = async () => {
    setModalError("");
    if (!activePlan) return;
    const amt = Number(investAmount);
    if (!amt || isNaN(amt)) {
      setModalError("Enter a valid amount");
      return;
    }
    if (amt < activePlan.min || amt > activePlan.max) {
      setModalError(
        `Amount must be between ${activePlan.min} and ${activePlan.max} PKR`
      );
      return;
    }
    const userBalance = teamData?.user?.userbalance || 0;
    if (amt > userBalance) {
      setModalError("Insufficient balance. Deposit first.");
      return;
    }
    if (!userId) {
      setModalError("Please login to invest.");
      return;
    }

    setSubmitting(true);
    try {
      const dailyEarning = Math.round(amt * (activePlan.percent / 100));
      const returnProfit = dailyEarning * activePlan.days;

      const payload = {
        user_id: userId,
        PlanName: activePlan.title,
        Investment: amt,
        dailyEarning: dailyEarning,
        days: activePlan.days,
        returnProfit: returnProfit,
        profitPercentage: activePlan.percent + "%",
      };

      console.log("Creating plan with payload:", payload);

      const res = await axios.post("https://be.solarx0.com/api/plans", payload);
      if (res.data?.success) {
        // Update balance immediately
        setTeamData((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            userbalance: prev.user.userbalance - amt,
          },
        }));

        await fetchTeamData();
        await fetchUserPlans();

        closeInvestModal();
        navigate("/activeplans");
      } else {
        setModalError(res.data?.message || "Subscription failed.");
      }
    } catch (err) {
      console.error("subscribe err:", err);
      setModalError(err.response?.data?.message || "Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getSubscribersFor = (plan) => {
    if (!subscribersCounts || !Array.isArray(subscribersCounts))
      return plan.invested || 0;
    const found = subscribersCounts.find((s) => {
      if (!s?.planName) return false;
      if (s.planName.toString().includes(String(plan.days))) return true;
      if (
        plan.title &&
        s.planName.toLowerCase().includes(plan.title.toLowerCase())
      )
        return true;
      if (s.planName.toString().includes(String(plan.min))) return true;
      return false;
    });
    return found?.subscribers ?? plan.invested ?? 0;
  };

  const whatsappGroupLink = "https://chat.whatsapp.com/GQoVtPyb7elHuKugtp6ioD";

  const formatLastUpdate = () => {
    if (!lastUpdate) return "Today";
    const today = new Date();
    const updateDate = new Date(lastUpdate);
    if (updateDate.toDateString() === today.toDateString()) {
      return "Today";
    } else {
      return updateDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="sx-dashboard-root">
      {/* TOP: Welcome header */}
      <div className="sx-header">
        <div className="sx-header-left">
          <div className="profileandicon">
            <img
              src={
                user?.profilepicture
                  ? `https://be.solarx0.com${user.profilepicture}`
                  : profileImg
              }
              alt="avatar"
              className="sx-avatar"
            />
            {/* <a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="sx-whatsapp-btn"
            >
              <FaWhatsapp />
            </a> */}
          </div>
          <div className="sx-welcome-text">
            <div className="sx-welcome-main">Welcome Back!</div>
            <div className="sx-welcome-name">
              {user?.fullName || user?.name || "User"}
            </div>
          </div>
        </div>

        <div className="sx-header-right">
          <div className="sx-nav-btn" onClick={() => setShowSettings(true)}>
            <FiMenu className="sx-nav-icon" />
          </div>

          {/* <button
            className={`sx-bell-btn ${
              announcements.length > 0 ? "has-notifications" : ""
            }`}
            onClick={() => setShowAnnouncements(!showAnnouncements)}
          >
            <FiBell />
          </button>

          {showAnnouncements && (
            <div className="announcement-popup">
              <div className="announcement-popup-header">
                <h4>📢 Announcements</h4>
                <button
                  className="announcement-close"
                  onClick={() => setShowAnnouncements(false)}
                >
                  ✕
                </button>
              </div>
              <div className="announcement-list">
                {announcements.length > 0 ? (
                  announcements.map((item, index) => {
                    const priority =
                      index === 0 ? "high" : index < 3 ? "medium" : "low";
                    const timestamp = new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    return (
                      <div
                        key={item._id}
                        className={`announcement-item priority-${priority}`}
                      >
                        <div className="announcement-content">
                          <div className="announcement-message">
                            {item.message}
                          </div>
                          <div className="announcement-meta">
                            <span className="announcement-time">
                              {timestamp}
                            </span>
                            <span className="announcement-status">UPDATE</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="announcement-item no-announcements">
                    <div className="announcement-content">
                      <div className="no-announcements-icon">📭</div>
                      <p>No new announcements</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div> */}
        </div>
      </div>

      {/* Total Balance Card */}
      <div className="sx-balance-card">
        <div className="sx-balance-header">
          <div className="sx-balance-title">Available Balance</div>
          <button
            className="sx-eye-toggle"
            onClick={() => setShowBalance(!showBalance)}
            type="button"
          >
            {showBalance ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div className="sx-balance-value">
          {showBalance
            ? (totalBalance || 0).toLocaleString() + " PKR"
            : "••••••"}
        </div>
        <div className="sx-net-worth">
          Net Worth:{" "}
          {showBalance
            ? (totalNetWorth || 0).toLocaleString() + " PKR"
            : "••••••"}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="sx-quick-actions">
        <div className="sx-action" onClick={() => navigate("/deposit")}>
          <div className="sx-action-icon">
            <RiBankLine className="sx-nav-icon" />
          </div>
          <div className="sx-action-label">Deposit</div>
        </div>
        <div className="sx-action" onClick={() => navigate("/withdraw")}>
          <div className="sx-action-icon">
            <RiMoneyDollarCircleLine className="sx-nav-icon" />
          </div>
          <div className="sx-action-label">Withdraw</div>
        </div>
        <div className="sx-action" onClick={() => navigate("/invite")}>
          <div className="sx-action-icon">
            <RiGroupLine className="sx-nav-icon" />
          </div>
          <div className="sx-action-label">Invite</div>
        </div>
        <a
          href={whatsappGroupLink}
          target="_blank"
          rel="noopener noreferrer"
          className="sx-action whatsapp-group-action"
        >
          <div className="sx-action-icon">
            <FaWhatsapp className="sx-nav-icon" />
          </div>
          <div className="sx-action-label">
            <span className="desktop-text">Join MetaDrive Whatsapp Group</span>
            <span className="mobile-text">WhatsApp Group</span>
          </div>
        </a>
      </div>

      {/* Investment Plans Heading */}
      <div className="sx-plans-header">
        <h3>INVESTMENT PLANS</h3>
        <p className="sx-sub">
          Choose the plan that suits your investment goals!
        </p>
        <div className="sx-update-indicator">
          📊 Investor counts updated daily • Last update: {formatLastUpdate()}
        </div>
      </div>

      {/* Plans List */}
      <div className="sx-plans-list">
        {dashboardPlans.map((p, idx) => (
          <div className="sx-plan-card" key={idx}>
            <div className="sx-plan-img-wrap">
              <img src={p.img} alt={p.title} className="sx-plan-img" />
              <div className="sx-plan-percent">{p.percent}%/PAR DAY</div>
              {idx < 5 && <div className="sx-popular-badge">🔥 POPULAR</div>}
            </div>
            <div className="sx-plan-body">
              <div className="sx-plan-title">{p.title}</div>
              <div className="sx-plan-range">
                <span className="sx-range-min">{p.min.toLocaleString()}</span>
                <span className="sx-dash"> - </span>
                <span className="sx-range-max">
                  {p.max.toLocaleString()} PKR
                </span>
              </div>
              <div className="sx-invested-people">
                <div className="sx-invested-header">
                  <span className="sx-invested-icon"></span>
                  Activate Your Plan
                </div>
                <strong className="sx-invested-count">
                  {getSubscribersFor(p).toLocaleString()}
                </strong>
              </div>
              <div className="sx-plan-cta">
                <button
                  className="sx-invest-btn"
                  onClick={() => !p.locked && openInvestModal(p)}
                  disabled={p.locked}
                >
                  {p.locked ? "LOCKED 🔐" : "INVEST NOW"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <footer className="sx-bottom-nav">
        <Link to="/dashboard" className="sx-nav-btn active">
          <FiHome className="sx-nav-icon" />
        </Link>
        <Link to="/activeplans" className="sx-nav-btn">
          <FiPieChart className="sx-nav-icon" />
        </Link>
        <Link to="/team" className="sx-nav-btn">
          <FiUsers className="sx-nav-icon" />
        </Link>{" "}
        <Link to="/earningsummary" className="sx-nav-btn">
          <FaChartLine className="sx-nav-icon" />
        </Link>
      </footer>

      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {/* INVEST MODAL */}
      {modalOpen && activePlan && (
        <div className="sx-modal-overlay">
          <div className="sx-modal">
            <div className="sx-modal-header">
              <h4>Invest in {activePlan.title}</h4>
              <button className="sx-modal-close" onClick={closeInvestModal}>
                ✖
              </button>
            </div>
            <div className="sx-modal-body">
              <img src={activePlan.img} alt="" className="sx-modal-img" />
              <p className="sx-modal-range">
                Range: {activePlan.min.toLocaleString()} -{" "}
                {activePlan.max.toLocaleString()} PKR
              </p>
              <div className="sx-popularity-info">
                <div className="sx-popularity-badge">
                  {getSubscribersFor(activePlan).toLocaleString()}+ active
                  investors
                </div>
                <p className="sx-popularity-note">
                  Join {getSubscribersFor(activePlan).toLocaleString()}{" "}
                  investors who trust this plan
                </p>
              </div>
              <label className="sx-label">Enter Amount</label>
              <input
                className="sx-input"
                type="number"
                min={activePlan.min}
                max={activePlan.max}
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
              />
              <div className="sx-calc">
                <div>
                  <small>Daily Profit ({activePlan.percent}%)</small>
                  <div className="sx-calc-value">
                    {calcDaily(
                      investAmount || activePlan.min,
                      activePlan.percent
                    )}{" "}
                    PKR
                  </div>
                </div>
                <div>
                  <small>Total Profit ({activePlan.days} days)</small>
                  <div className="sx-calc-value">
                    {calcTotal(
                      investAmount || activePlan.min,
                      activePlan.percent,
                      activePlan.days
                    )}{" "}
                    PKR
                  </div>
                </div>
              </div>
              {modalError && <div className="sx-modal-error">{modalError}</div>}
            </div>
            <div className="sx-modal-footer">
              <button className="sx-btn-cancel" onClick={closeInvestModal}>
                Cancel
              </button>
              <button
                className="sx-btn-confirm"
                onClick={confirmInvest}
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Confirm Invest"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
