// import axios from "axios";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import { FaHandHoldingUsd, FaRegMoneyBillAlt } from "react-icons/fa";
// import { FiRefreshCcw } from "react-icons/fi";

// import {
//   FiArrowLeft,
//   FiArrowRight,
//   FiBarChart2,
//   FiBell,
//   FiGrid,
//   FiSettings,
//   FiUsers,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";

// import "./Dashboard.css";

// import img5 from "../../Assets/Pictures/dash5.jpeg";
// import img2 from "../../Assets/Pictures/dashnewupdatepic1.jpeg";
// import img1 from "../../Assets/Pictures/dashnewupdatepic2.jpeg";
// import img3 from "../../Assets/Pictures/dashnewupdatepic3.jpeg";
// import profileImg from "../../Assets/Pictures/download.jpeg";
// import img4 from "../../Assets/Pictures/richticketdash.jpeg";
// import Newsboard from "../Newsboard/Newsboard";

// const slides = [
//   {
//     image: img1,
//     title: "Mining Server Facility",
//     subtitle: "High-Performance Computing Center",
//     profit: "$720/day",
//     hashpower: "4200+ TH/s",
//     description:
//       "Professional server room with organized mining hardware and advanced thermal management",
//   },
//   {
//     image: img2,
//     title: "Solar X Power Hub",
//     subtitle: "Sustainable Mining Through Solar Energy",
//     profit: "$650/day",
//     hashpower: "3900+ TH/s",
//     description:
//       "Eco-friendly mining infrastructure using solar power for low-cost, green crypto operations.",
//   },
//   {
//     image: img3,
//     title: "HelioMine Complex",
//     subtitle: "Sun-Powered Blockchain Infrastructure",
//     profit: "$980/day",
//     hashpower: "6900+ TH/s",
//     description:
//       "Advanced ASIC units running on solar arrays for maximum sustainability and ROI.",
//   },
//   {
//     image: img4,
//     title: "NextGen Solar Vault",
//     subtitle: "Future-Proof, Zero-Emission Mining",
//     profit: "$810/day",
//     hashpower: "5100+ TH/s",
//     description:
//       "Solar-powered mining facility with smart energy balancing and uptime optimization.",
//   },
//   {
//     image: img5,
//     title: "NextGen Solar Vault",
//     subtitle: "Future-Proof, Zero-Emission Mining",
//     profit: "$810/day",
//     hashpower: "5100+ TH/s",
//     description:
//       "Solar-powered mining facility with smart energy balancing and uptime optimization.",
//   },
// ];

// export default function Dashboard() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showAnnouncements, setShowAnnouncements] = useState(false);
//   const [showPopup, setShowPopup] = useState(true);
//   const [showProfilePopup, setShowProfilePopup] = useState(false);
//   const [announcements, setAnnouncements] = useState([]);
//   const [teamData, setTeamData] = useState({
//     user: {},
//     plans: [],
//     commissionSummary: {},
//   });
//   const [loading, setLoading] = useState(false);

//   // ✅ Get user from localStorage
//   const user = useMemo(() => {
//     const userString = localStorage.getItem("user");
//     return userString ? JSON.parse(userString) : null;
//   }, []);

//   const userId = useMemo(() => user?._id, [user]);

//   // ✅ useCallback for fetchTeamData
//   const fetchTeamData = useCallback(async () => {
//     if (!userId) return;
//     setLoading(true); // Set loading to true when fetching data
//     try {
//       const res = await axios.post("https://be.solarx0.com/team", { userId });
//       setTeamData(res.data);
//     } catch (err) {
//       console.error("Error fetching team data:", err);
//     } finally {
//       setLoading(false); // Set loading to false when fetching is done
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchTeamData();
//   }, [fetchTeamData]);

//   useEffect(() => {
//     const interval = setInterval(fetchTeamData, 60000);
//     return () => clearInterval(interval);
//   }, [fetchTeamData]);

//   useEffect(() => {
//     const hasSeen = sessionStorage.getItem("dashboardPopupShown");
//     if (!hasSeen) {
//       setShowPopup(true);
//       sessionStorage.setItem("dashboardPopupShown", "true");

//       const timer = setTimeout(() => setShowPopup(false), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   useEffect(() => {
//     startAutoSlide();
//     return () => clearInterval(window.solarXInterval);
//   }, []);

//   const startAutoSlide = () => {
//     clearInterval(window.solarXInterval);
//     window.solarXInterval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % slides.length);
//     }, 5000);
//   };

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const response = await axios.post(
//           "https://be.solarx0.com/api/announcements1"
//         );
//         if (response.status === 200) {
//           setAnnouncements(response.data.data || []);
//         }
//       } catch (error) {
//         console.error("Error fetching announcements:", error);
//       }
//     };
//     fetchAnnouncements();
//   }, []);

//   const { image, title, subtitle, profit, hashpower, description } =
//     slides[currentIndex];

//   // ✅ Total Balance = wallet balance + plans + commissions
//   const totalBalance = useMemo(() => {
//     const planEarnings =
//       teamData?.plans?.reduce((sum, p) => sum + (p.totalEarning || 0), 0) || 0;
//     const commissions = teamData?.commissionSummary?.grandTotalCommission || 0;
//     return (teamData?.user?.userbalance || 0) + planEarnings + commissions;
//   }, [teamData]);

//   return (
//     <div className="dashboard">
//       {/* Popup */}
//       {showPopup && (
//         <div className="solarx-popup-overlay">
//           <div className="solarx-popup">
//             <div className="popup-header">
//               <h2>☀️ Solar X</h2>
//               <button className="close-btn" onClick={() => setShowPopup(false)}>
//                 ✖
//               </button>
//             </div>
//             <div className="popup-body english">
//               <ol>
//                 <li>
//                   <strong>Launch Date</strong>: Solar X will launch in Pakistan
//                   on
//                   <span className="highlight-orange"> October 7, 2025</span>.
//                 </li>
//                 <li>
//                   You can withdraw money from
//                   <span className="highlight-orange"> 10 AM to 8 PM</span>.
//                 </li>
//                 <li>
//                   Your withdrawal will be credited to your account within{" "}
//                   <span className="highlight-orange">6-12 hours.</span>
//                 </li>
//                 <li>
//                   You can withdraw a minimum of
//                   <span className="highlight-orange"> 500 PKR</span>.
//                 </li>
//                 <li>
//                   The minimum deposit is also
//                   <span className="highlight-orange"> 500 PKR</span>.
//                 </li>
//                 <li>
//                   The price of a Rich Ticket is also a minimum of
//                   <span className="highlight-orange"> 500 PKR</span>.
//                 </li>
//                 <li>
//                   You will receive additional bonuses for referring more people
//                   to Solar X.
//                 </li>
//                 <li>
//                   A promo code will be shared daily at
//                   <span className="highlight-orange"> 10 PM</span> in the VIP
//                   group.
//                 </li>
//                 <li>
//                   You can earn ranking rewards, deposit commissions, and other
//                   rewards in the application.
//                 </li>
//                 <li>
//                   Don’t forget to join the
//                   <span className="highlight-orange"> Solar X group</span> for
//                   more information.
//                 </li>
//               </ol>
//             </div>

//             <div className="popup-actions">
//               <a
//                 href="https://chat.whatsapp.com/E3V0WcJKMru954hzfPIGMy?mode=wwt"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="popup-btn orange"
//               >
//                 Join WhatsApp Group
//               </a>
//               <button
//                 className="popup-btn grey"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="top-banner">
//         <p>
//           Claim smart watches, iPhone 17 Pro Max, bikes, Dubai tour and many
//           more!!! 💸
//         </p>
//       </div>
//       <header className="headerd">
//         <div className="header-leftd">
//           <img
//             src={
//               user?.profilepicture
//                 ? `https://be.solarx0.com${user.profilepicture}`
//                 : profileImg
//             }
//             className="header-avatar"
//             onClick={() => setShowProfilePopup(!showProfilePopup)}
//             alt="Profile"
//           />
//           <div className="welcome-text">
//             <p>Welcome Back,</p>
//             <h3>{user?.fullName || "User"}</h3>
//           </div>
//         </div>

//         <div className="header-centerd"></div>
//         <div className="header-rightd">
//           <div className="notification-wrapper">
//             <div
//               className="notification-icon"
//               onClick={() => setShowAnnouncements((prev) => !prev)}
//             >
//               <FiBell className="header-icond" title="Notifications" />
//               {announcements.length > 0 && (
//                 <span className="notification-badge">
//                   {announcements.length}
//                 </span>
//               )}
//             </div>

//             {showAnnouncements && (
//               <div className="announcement-popup">
//                 <h4>📢 Announcements</h4>
//                 <ul className="announcement-list">
//                   {announcements.length > 0 ? (
//                     announcements.map((item, index) => {
//                       const colors = ["orange", "blue"];
//                       const colorClass = colors[index % colors.length];
//                       return (
//                         <li
//                           key={item._id}
//                           className={`announcement-item ${colorClass}`}
//                         >
//                           <div className="announcement-box">
//                             <p>{item.message}</p>
//                           </div>
//                         </li>
//                       );
//                     })
//                   ) : (
//                     <li className="announcement-item grey">
//                       <div className="announcement-box">
//                         <p>No new announcements</p>
//                       </div>
//                     </li>
//                   )}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Slider */}

//       <div className="slider-container">
//         <img src={image} alt={title} className="slider-image" />
//         <button
//           className="slider-btn left"
//           onClick={() =>
//             setCurrentIndex(
//               (prev) => (prev - 1 + slides.length) % slides.length
//             )
//           }
//         >
//           <FiArrowLeft />
//         </button>
//         <button
//           className="slider-btn right"
//           onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
//         >
//           <FiArrowRight />
//         </button>
//         <div className="slider-caption">
//           <h1 className="bannerh1txt">{title}</h1>
//           <p className="desc">{subtitle}</p>
//           <div className="badges">
//             <span className="badge green">Up to {profit} profit</span>
//             <span className="badge blue">{hashpower}</span>
//           </div>
//           <p className="desc">{description}</p>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="actions">
//         <div className="action-card">
//           <div className="icon purple">
//             <FaRegMoneyBillAlt />
//           </div>
//           <h2 className="padd">Quick Deposit</h2>
//           <p className="grey">Deposit your funds 24/7</p>
//           <button className="card-btn orange">
//             <Link to="/deposit">Money In</Link>
//           </button>
//         </div>
//         <div className="action-card2">
//           <div className="icon green">
//             <FaHandHoldingUsd />
//           </div>
//           <h2 className="padd">Quick Withdraw</h2>
//           <p className="grey">Withdraw your funds 24/7</p>
//           <button className="card-btn green">
//             <Link to="/withdraw">Money Out</Link>
//           </button>
//         </div>
//       </div>

//       {/* Info Cards */}
//       <div className="info-cards">
//         <div className="info-card">
//           <div className="card-top">
//             <h2 className="resbal">Total Balance</h2>
//             <p className="balancepkr">
//               {teamData?.user?.userbalance
//                 ? teamData.user.userbalance.toFixed(1)
//                 : 0}{" "}
//               PKR
//             </p>
//             {/* Refresh Button */}
//             <button
//               className="refresh-btn"
//               onClick={fetchTeamData}
//               title="Refresh Balance"
//             >
//               <FiRefreshCcw className={loading ? "spin-icon" : ""} />
//             </button>
//           </div>
//         </div>
//         <div className="info-card2">
//           <div className="card-top">
//             <h2 className="resbal">Total Withdraw</h2>
//             <p className="earnpkr">
//               {(teamData?.user?.userTotalWithdrawals || 0).toLocaleString()} PKR
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* News Section */}
//       <div className="newsdash">
//         <Newsboard />
//       </div>

//       {/* Bottom Nav */}
//       <footer className="bottom-nav">
//         <Link to="/dashboard">
//           <button>
//             <FiGrid />
//             <span>Dashboard</span>
//           </button>
//         </Link>
//         <Link to="/team">
//           <button>
//             <FiUsers />
//             <span>About Team</span>
//           </button>
//         </Link>
//         <Link to="/plans">
//           <button>
//             <FiBarChart2 />
//             <span>Plans</span>
//           </button>
//         </Link>
//         <Link to="/setting">
//           <button>
//             <FiSettings />
//             <span>Settings</span>
//           </button>
//         </Link>
//       </footer>
//     </div>
//   );
// }

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaHandHoldingUsd, FaRegMoneyBillAlt } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

import {
  FiBarChart2,
  FiBell,
  FiGrid,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import profileImg from "../../Assets/Pictures/download.jpeg";
import "./Dashboard.css";

export default function Dashboard() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [teamData, setTeamData] = useState({
    user: {},
    plans: [],
    commissionSummary: {},
  });
  const [loading, setLoading] = useState(false);

  // ✅ Get user from localStorage
  const user = useMemo(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  }, []);

  const userId = useMemo(() => user?._id, [user]);

  // ✅ useCallback for fetchTeamData
  const fetchTeamData = useCallback(async () => {
    if (!userId) return;
    setLoading(true); // Set loading to true when fetching data
    try {
      const res = await axios.post("https://be.solarx0.com/team", { userId });
      setTeamData(res.data);
    } catch (err) {
      console.error("Error fetching team data:", err);
    } finally {
      setLoading(false); // Set loading to false when fetching is done
    }
  }, [userId]);

  useEffect(() => {
    fetchTeamData();
  }, [fetchTeamData]);

  useEffect(() => {
    const interval = setInterval(fetchTeamData, 60000);
    return () => clearInterval(interval);
  }, [fetchTeamData]);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("dashboardPopupShown");
    if (!hasSeen) {
      setShowPopup(true);
      sessionStorage.setItem("dashboardPopupShown", "true");

      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.post(
          "https://be.solarx0.com/api/announcements1"
        );
        if (response.status === 200) {
          setAnnouncements(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  // ✅ Total Balance = wallet balance + plans + commissions
  const totalBalance = useMemo(() => {
    const planEarnings =
      teamData?.plans?.reduce((sum, p) => sum + (p.totalEarning || 0), 0) || 0;
    const commissions = teamData?.commissionSummary?.grandTotalCommission || 0;
    return (teamData?.user?.userbalance || 0) + planEarnings + commissions;
  }, [teamData]);

  return (
    <div className="dashboard">
      {/* Popup */}
      {showPopup && (
        <div className="solarx-popup-overlay">
          <div className="solarx-popup">
            <div className="popup-header">
              <h2>☀️ Solar X</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                ✖
              </button>
            </div>
            <div className="popup-body english">
              <ol>
                <li>
                  <strong>Launch Date</strong>: Solar X will launch in Pakistan
                  on
                  <span className="highlight-orange"> October 7, 2025</span>.
                </li>
                <li>
                  You can withdraw money from
                  <span className="highlight-orange"> 10 AM to 8 PM</span>.
                </li>
                <li>
                  Your withdrawal will be credited to your account within{" "}
                  <span className="highlight-orange">6-12 hours.</span>
                </li>
                <li>
                  You can withdraw a minimum of
                  <span className="highlight-orange"> 500 PKR</span>.
                </li>
                <li>
                  The minimum deposit is also
                  <span className="highlight-orange"> 500 PKR</span>.
                </li>
                <li>
                  The price of a Rich Ticket is also a minimum of
                  <span className="highlight-orange"> 500 PKR</span>.
                </li>
                <li>
                  You will receive additional bonuses for referring more people
                  to Solar X.
                </li>
                <li>
                  A promo code will be shared daily at
                  <span className="highlight-orange"> 10 PM</span> in the VIP
                  group.
                </li>
                <li>
                  You can earn ranking rewards, deposit commissions, and other
                  rewards in the application.
                </li>
                <li>
                  Don’t forget to join the
                  <span className="highlight-orange"> Solar X group</span> for
                  more information.
                </li>
              </ol>
            </div>

            <div className="popup-actions">
              <a
                href="https://chat.whatsapp.com/E3V0WcJKMru954hzfPIGMy?mode=wwt"
                target="_blank"
                rel="noreferrer"
                className="popup-btn orange"
              >
                Join WhatsApp Group
              </a>
              <button
                className="popup-btn grey"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="top-banner">
        <p>
          Claim smart watches, iPhone 17 Pro Max, bikes, Dubai tour and many
          more!!! 💸
        </p>
      </div>
      <header className="headerd">
        <div className="header-leftd">
          <img
            src={
              user?.profilepicture
                ? `https://be.solarx0.com${user.profilepicture}`
                : profileImg
            }
            className="header-avatar"
            onClick={() => setShowProfilePopup(!showProfilePopup)}
            alt="Profile"
          />
          <div className="welcome-text">
            <p>Welcome Back,</p>
            <h3>{user?.fullName || "User"}</h3>
          </div>
        </div>

        <div className="header-centerd"></div>
        <div className="header-rightd">
          <div className="notification-wrapper">
            <div
              className="notification-icon"
              onClick={() => setShowAnnouncements((prev) => !prev)}
            >
              <FiBell className="header-icond" title="Notifications" />
              {announcements.length > 0 && (
                <span className="notification-badge">
                  {announcements.length}
                </span>
              )}
            </div>

            {showAnnouncements && (
              <div className="announcement-popup">
                <h4>📢 Announcements</h4>
                <ul className="announcement-list">
                  {announcements.length > 0 ? (
                    announcements.map((item, index) => {
                      const colors = ["orange", "blue"];
                      const colorClass = colors[index % colors.length];
                      return (
                        <li
                          key={item._id}
                          className={`announcement-item ${colorClass}`}
                        >
                          <div className="announcement-box">
                            <p>{item.message}</p>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="announcement-item grey">
                      <div className="announcement-box">
                        <p>No new announcements</p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Slider */}

      {/* Video Section */}
      <div className="video-container">
        <video
          src={require("../../Assets/Pictures/dashvideo.MP4")}
          className="dashboard-video"
          controls
          autoPlay
          loop
          muted
        />
      </div>

      {/* Actions */}
      <div className="actions">
        <div className="action-card">
          <div className="icon purple">
            <FaRegMoneyBillAlt />
          </div>
          <h2 className="padd">Quick Deposit</h2>
          <p className="grey">Deposit your funds 24/7</p>
          <button className="card-btn orange">
            <Link to="/deposit">Money In</Link>
          </button>
        </div>
        <div className="action-card2">
          <div className="icon green">
            <FaHandHoldingUsd />
          </div>
          <h2 className="padd">Quick Withdraw</h2>
          <p className="grey">Withdraw your funds 24/7</p>
          <button className="card-btn green">
            <Link to="/withdraw">Money Out</Link>
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="info-cards">
        <div className="info-card">
          <div className="card-top">
            <h2 className="resbal">Total Balance</h2>
            <p className="balancepkr">
              {teamData?.user?.userbalance
                ? teamData.user.userbalance.toFixed(1)
                : 0}{" "}
              PKR
            </p>
            {/* Refresh Button */}
            <button
              className="refresh-btn"
              onClick={fetchTeamData}
              title="Refresh Balance"
            >
              <FiRefreshCcw className={loading ? "spin-icon" : ""} />
            </button>
          </div>
        </div>
        <div className="info-card2">
          <div className="card-top">
            <h2 className="resbal">Total Withdraw</h2>
            <p className="earnpkr">
              {(teamData?.user?.userTotalWithdrawals || 0).toLocaleString()} PKR
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <footer className="bottom-nav">
        <Link to="/dashboard">
          <button>
            <FiGrid />
            <span>Dashboard</span>
          </button>
        </Link>
        <Link to="/team">
          <button>
            <FiUsers />
            <span>About Team</span>
          </button>
        </Link>
        <Link to="/plans">
          <button>
            <FiBarChart2 />
            <span>Plans</span>
          </button>
        </Link>
        <Link to="/setting">
          <button>
            <FiSettings />
            <span>Settings</span>
          </button>
        </Link>
      </footer>
    </div>
  );
}
