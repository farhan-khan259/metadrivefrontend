// // import { useState, useEffect } from "react";
// // import "../../styles/userdetails.css";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // export default function UserDetails() {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { user: initialUser } = location.state || {};

// //   const [user, setUser] = useState(initialUser || {}); // Initialize with initialUser if available
// //   const [loading, setLoading] = useState(!initialUser); // Set loading to true if we need to fetch user data

// //   // If user data wasn't passed via state, fetch it from API using ID from URL
// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       if (!initialUser) {
// //         try {
// //           setLoading(true);
// //           // Extract user ID from URL if needed
// //           const pathParts = location.pathname.split("/");
// //           const userId = pathParts[pathParts.length - 1];

// //           if (userId && userId !== "userdetails") {
// //             const response = await axios.get(
// //               `https://be.metadrive01.xyz/api/admin/users/${userId}`
// //             );
// //             if (response.data.success) {
// //               setUser(response.data.user);
// //             }
// //           }
// //         } catch (error) {
// //           console.error("Error fetching user data:", error);
// //         } finally {
// //           setLoading(false);
// //         }
// //       }
// //     };

// //     fetchUserData();
// //   }, [initialUser, location.pathname]);

// //   // Fetch team data when user ID is available

// //   console.log(user._id);
// //   // Balance Add
// //   const handleAddBalance = async () => {
// //     const amount = parseInt(prompt("Enter amount to add:"), 10);
// //     if (!isNaN(amount) && amount > 0) {
// //       try {
// //         const response = await axios.post(
// //           `https://be.metadrive01.xyz/api/addBalanceByAdmin`,
// //           {
// //             userId: user._id,
// //             balance: amount,
// //           }
// //         );

// //         if (response.data.success) {
// //           setUser({ ...user, balance: user.balance + amount });
// //           alert(`PKR ${amount} added to balance!`);
// //         }
// //       } catch (error) {
// //         console.error("Error adding balance:", error);
// //         alert("Failed to add balance");
// //       }
// //     }
// //   };

// //   // Balance Subtract
// //   const handleSubtractBalance = async () => {
// //     const amount = parseInt(prompt("Enter amount to subtract:"), 10);
// //     if (!isNaN(amount) && amount > 0) {
// //       try {
// //         const response = await axios.post(
// //           `https://be.metadrive01.xyz/api/addSubtractByAdmin`,
// //           {
// //             userId: user._id,
// //             balance: amount,
// //           }
// //         );

// //         if (response.data.success) {
// //           setUser({ ...user, balance: user.balance + amount });
// //           alert(`PKR ${amount} added to balance!`);
// //         }
// //       } catch (error) {
// //         console.error("Error adding balance:", error);
// //         alert("Failed to add balance");
// //       }
// //     } else {
// //       alert("Invalid amount.");
// //     }
// //   };

// //   // Delete Account
// //   const handleDelete = async () => {
// //     if (window.confirm("Are you sure you want to delete this account?")) {
// //       try {
// //         const response = await axios.delete(
// //           `https://be.metadrive01.xyz/api/delete`,
// //           { userId: user._id }
// //         );

// //         if (response.data.success) {
// //           alert("User account deleted successfully!");
// //           navigate("/admin/users"); // Redirect to users list
// //         }
// //       } catch (error) {
// //         console.error("Error deleting user:", error);
// //         alert("Failed to delete user account");
// //       }
// //     }
// //   };

// //   // Login to Account (Admin Impersonation)
// //   const handleLogin = async () => {
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("token");
// //     console.log("adsfas");
// //     try {
// //       const response = await axios.post(
// //         `https://be.metadrive01.xyz/api/adminLoginUserAccount`,
// //         {
// //           userId: user._id,
// //         }
// //       );
// //       console.log(response);

// //       if (response.status === 200) {
// //         alert(`Logging in as ${user.fullName}...`);
// //         localStorage.setItem("user", JSON.stringify(user));
// //         window.location.href = "/dashboard"; // Redirect to user dashboard
// //       }
// //     } catch (error) {
// //       console.error("Error impersonating user:", error);
// //       alert("Failed to login as user");
// //     }
// //   };

// //   console.log(user);
// //   // Delete Plan
// //   const handleDeletePlan = async () => {
// //     if (window.confirm("Are you sure you want to delete this user's plan?")) {
// //       try {
// //         const response = await axios.post(
// //           `https://be.metadrive01.xyz/api/admindeleteplainuser`,
// //           { userId: user._id }
// //         );

// //         if (response.data.success) {
// //           alert("Plan Deleted Successfully!");
// //         }
// //         if (response.status === 201) {
// //           alert("No plan found for this user");
// //         }
// //       } catch (error) {
// //         console.error("Error deleting plan:", error);
// //         alert("Failed to delete plan");
// //       }
// //     }
// //   };

// //   // Ban/Unban User

// //   if (loading) {
// //     return (
// //       <div className="admin-layout">
// //         <div className="main-content">
// //           <div className="userdetails-container">
// //             <div className="loading">Loading user details...</div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="admin-layout">
// //       <div className="main-content">
// //         <div className="userdetails-container">
// //           <h2>User Details</h2>

// //           <div className="user-card">
// //             <p>
// //               <strong>User Name:</strong> {user.fullName || user.name || "N/A"}
// //             </p>
// //             <p>
// //               <strong>UID:</strong> {user._id || user.uid || "N/A"}
// //             </p>
// //             <p>
// //               <strong>Email:</strong> {user.email || "N/A"}
// //             </p>
// //             <p>
// //               <strong>Phone:</strong>{" "}
// //               {user.phoneNumber || user.whatsappNumber || "N/A"}
// //             </p>
// //             <p>
// //               <strong>Status:</strong>
// //               <span className={`status-badge ${user.status || "active"}`}>
// //                 {user.status || "active"}
// //               </span>
// //             </p>
// //             <p>
// //               <strong>Deposit:</strong> {user.userTotalDeposits || 0} PKR
// //             </p>
// //             <p>
// //               <strong>Withdrawal:</strong> {user.userTotalWithdrawals || 0} PKR
// //             </p>
// //             <p>
// //               <strong>Total Team Members:</strong> {user.teamMembers || 0}
// //             </p>
// //             <p>
// //               <strong>Total Team Commission:</strong> {user.teamCommission || 0}{" "}
// //               PKR
// //             </p>
// //             <p>
// //               <strong>Current Balance:</strong> {user.userbalance || 0} PKR
// //             </p>
// //             <p>
// //               <strong>Joined Date:</strong>{" "}
// //               {user.createdAt
// //                 ? new Date(user.createdAt).toLocaleDateString()
// //                 : "N/A"}
// //             </p>
// //           </div>

// //           <div className="actions">
// //             <button className="btn green" onClick={handleAddBalance}>
// //               Add Balance
// //             </button>
// //             <button className="btn orange" onClick={handleSubtractBalance}>
// //               Subtract Balance
// //             </button>
// //             <button className="btn red" onClick={handleDelete}>
// //               Delete Account
// //             </button>
// //             <button className="btn blue" onClick={() => handleLogin()}>
// //               Login to Account
// //             </button>
// //             <button className="btn purple" onClick={handleDeletePlan}>
// //               Delete Plan
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "../../styles/userdetails.css";

// export default function UserDetails() {
//   const location = useLocation();
//   const { user: initialUser } = location.state || {};

//   const [user, setUser] = useState(initialUser || {});
//   const [teamData, setTeamData] = useState(null);
//   const [loading, setLoading] = useState(!initialUser);
//   const [teamLoading, setTeamLoading] = useState(true);

//   // Fetch user data if not provided in location.state
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!initialUser) {
//         try {
//           setLoading(true);
//           const pathParts = location.pathname.split("/");
//           const userId = pathParts[pathParts.length - 1];

//           if (userId && userId !== "userdetails") {
//             const response = await axios.get(
//               `https://be.metadrive01.xyz/api/admin/users/${userId}`
//             );
//             if (response.data.success) {
//               setUser(response.data.user);
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchUserData();
//   }, [initialUser, location.pathname]);

//   // Fetch team data when user ID is available
//   useEffect(() => {
//     const fetchTeamData = async () => {
//       if (!user?._id) return;
//       try {
//         setTeamLoading(true);
//         const res = await axios.post("https://be.metadrive01.xyz/team", {
//           userId: user._id,
//         });
//         setTeamData(res.data);
//       } catch (err) {
//         console.error("Error fetching team data:", err);
//       } finally {
//         setTeamLoading(false);
//       }
//     };

//     fetchTeamData();
//   }, [user?._id]);

//   // Add Balance
//   const handleAddBalance = async () => {
//     const amount = parseInt(prompt("Enter amount to add:"), 10);
//     if (!isNaN(amount) && amount > 0) {
//       try {
//         const response = await axios.post(
//           `https://be.metadrive01.xyz/api/addBalanceByAdmin`,
//           {
//             userId: user._id,
//             balance: amount,
//           }
//         );

//         if (response.data.success) {
//           setUser({ ...user, userbalance: (user.userbalance || 0) + amount });
//           alert(`PKR ${amount} added to balance!`);
//         }
//       } catch (error) {
//         console.error("Error adding balance:", error);
//         alert("Failed to add balance");
//       }
//     }
//   };

//   // Subtract Balance
//   const handleSubtractBalance = async () => {
//     const amount = parseInt(prompt("Enter amount to subtract:"), 10);
//     if (!isNaN(amount) && amount > 0) {
//       try {
//         const response = await axios.post(
//           `https://be.metadrive01.xyz/api/addSubtractByAdmin`,
//           {
//             userId: user._id,
//             balance: amount,
//           }
//         );

//         if (response.data.success) {
//           setUser({ ...user, userbalance: (user.userbalance || 0) - amount });
//           alert(`PKR ${amount} subtracted from balance!`);
//         }
//       } catch (error) {
//         console.error("Error subtracting balance:", error);
//         alert("Failed to subtract balance");
//       }
//     } else {
//       alert("Invalid amount.");
//     }
//   };

//   // Admin Login as User
//   const handleLogin = async () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");

//     try {
//       const response = await axios.post(
//         `https://be.metadrive01.xyz/api/adminLoginUserAccount`,
//         { userId: user._id }
//       );

//       if (response.status === 200) {
//         alert(`Logging in as ${user.fullName}...`);
//         localStorage.setItem("user", JSON.stringify(user));
//         window.location.href = "/dashboard";
//       }
//     } catch (error) {
//       console.error("Error impersonating user:", error);
//       alert("Failed to login as user");
//     }
//   };

//   // Delete User's Plan
//   const handleDeletePlan = async () => {
//     if (window.confirm("Are you sure you want to delete this user's plan?")) {
//       try {
//         const response = await axios.post(
//           `https://be.metadrive01.xyz/api/admindeleteplainuser`,
//           { userId: user._id }
//         );

//         if (response.data.success) {
//           alert("Plan Deleted Successfully!");
//         } else if (response.status === 201) {
//           alert("No plan found for this user");
//         }
//       } catch (error) {
//         console.error("Error deleting plan:", error);
//         alert("Failed to delete plan");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="admin-layout">
//         <div className="main-content">
//           <div className="userdetails-container">
//             <div className="loading">Loading user details...</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Calculate total team members & commission
//   const totalTeamMembers = teamData
//     ? teamData.directReferrals.stats.totalUsers +
//       teamData.indirectReferrals.stats.totalUsers +
//       teamData.extendedReferrals.stats.totalUsers
//     : 0;

//   const totalTeamCommission = teamData
//     ? Math.floor(teamData.commissionSummary.grandTotalCommission)
//     : 0;

//   return (
//     <div className="admin-layout">
//       <div className="main-content">
//         <div className="userdetails-container">
//           <h2>User Details</h2>

//           <div className="user-card">
//             <p>
//               <strong>User Name:</strong> {user.fullName || "N/A"}
//             </p>
//             <p>
//               <strong>UID:</strong> {user._id || "N/A"}
//             </p>
//             <p>
//               <strong>Email:</strong> {user.email || "N/A"}
//             </p>
//             <p>
//               <strong>Phone:</strong>{" "}
//               {user.phoneNumber || user.whatsappNumber || "N/A"}
//             </p>
//             <p>
//               <strong>Status:</strong>
//               <span className={`status-badge ${user.status || "active"}`}>
//                 {user.status || "active"}
//               </span>
//             </p>
//             <p>
//               <strong>Deposit:</strong> {user.userTotalDeposits || 0} PKR
//             </p>
//             <p>
//               <strong>Withdrawal:</strong> {user.userTotalWithdrawals || 0} PKR
//             </p>
//             <p>
//               <strong>Total Team Members:</strong>{" "}
//               {teamLoading ? "Loading..." : totalTeamMembers}
//             </p>
//             <p>
//               <strong>Total Team Commission:</strong>{" "}
//               {teamLoading ? "Loading..." : `${totalTeamCommission} PKR`}
//             </p>
//             <p>
//               <strong>Current Balance:</strong> {user.userbalance || 0} PKR
//             </p>
//             <p>
//               <strong>Joined Date:</strong>{" "}
//               {user.createdAt
//                 ? new Date(user.createdAt).toLocaleDateString()
//                 : "N/A"}
//             </p>
//           </div>

//           <div className="actions">
//             <button className="btn green" onClick={handleAddBalance}>
//               Add Balance
//             </button>
//             <button className="btn orange" onClick={handleSubtractBalance}>
//               Subtract Balance
//             </button>

//             <button className="btn purple" onClick={handleDeletePlan}>
//               Delete Plan
//             </button>
//             <button className="btn blue" onClick={handleLogin}>
//               Login to Account
//             </button>
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
  FaCalendar,
  FaChartLine,
  FaEdit,
  FaMoneyBillWave,
  FaSignInAlt,
  FaTrash,
  FaUser,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/userdetails.css";

export default function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: initialUser } = location.state || {};

  const [user, setUser] = useState(initialUser || {});
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(!initialUser);
  const [teamLoading, setTeamLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user data if not provided in location.state
  useEffect(() => {
    const fetchUserData = async () => {
      if (!initialUser) {
        try {
          setLoading(true);
          const pathParts = location.pathname.split("/");
          const userId = pathParts[pathParts.length - 1];

          if (userId && userId !== "userdetails") {
            const response = await axios.get(
              `https://be.metadrive01.xyz/api/admin/users/${userId}`
            );
            if (response.data.success) {
              setUser(response.data.user);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [initialUser, location.pathname]);

  // Fetch team data when user ID is available
  useEffect(() => {
    const fetchTeamData = async () => {
      if (!user?._id) return;
      try {
        setTeamLoading(true);
        const res = await axios.post("https://be.metadrive01.xyz/team", {
          userId: user._id,
        });
        setTeamData(res.data);
      } catch (err) {
        console.error("Error fetching team data:", err);
      } finally {
        setTeamLoading(false);
      }
    };

    fetchTeamData();
  }, [user?._id]);

  // Balance Management Functions
  const handleAddBalance = async () => {
    const amount = parseInt(prompt("Enter amount to add:"), 10);
    if (!isNaN(amount) && amount > 0) {
      try {
        const response = await axios.post(
          `https://be.metadrive01.xyz/api/addBalanceByAdmin`,
          {
            userId: user._id,
            balance: amount,
          }
        );

        if (response.data.success) {
          setUser({ ...user, userbalance: (user.userbalance || 0) + amount });
          alert(`PKR ${amount} added to balance!`);
        }
      } catch (error) {
        console.error("Error adding balance:", error);
        alert("Failed to add balance");
      }
    }
  };

  const handleSubtractBalance = async () => {
    const amount = parseInt(prompt("Enter amount to subtract:"), 10);
    if (!isNaN(amount) && amount > 0) {
      if (amount > (user.userbalance || 0)) {
        alert("Insufficient balance!");
        return;
      }

      try {
        const response = await axios.post(
          `https://be.metadrive01.xyz/api/addSubtractByAdmin`,
          {
            userId: user._id,
            balance: amount,
          }
        );

        if (response.data.success) {
          setUser({ ...user, userbalance: (user.userbalance || 0) - amount });
          alert(`PKR ${amount} subtracted from balance!`);
        }
      } catch (error) {
        console.error("Error subtracting balance:", error);
        alert("Failed to subtract balance");
      }
    } else {
      alert("Invalid amount.");
    }
  };

  // Admin Login as User
  const handleLogin = async () => {
    if (!window.confirm(`Login as ${user.fullName}?`)) return;

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    try {
      const response = await axios.post(
        `https://be.metadrive01.xyz/api/adminLoginUserAccount`,
        { userId: user._id }
      );

      if (response.status === 200) {
        alert(`Logging in as ${user.fullName}...`);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Error impersonating user:", error);
      alert("Failed to login as user");
    }
  };

  // Delete User's Plan
  const handleDeletePlan = async () => {
    if (window.confirm("Are you sure you want to delete this user's plan?")) {
      try {
        const response = await axios.post(
          `https://be.metadrive01.xyz/api/admindeleteplainuser`,
          { userId: user._id }
        );

        if (response.data.success) {
          alert("Plan Deleted Successfully!");
        } else if (response.status === 201) {
          alert("No plan found for this user");
        }
      } catch (error) {
        console.error("Error deleting plan:", error);
        alert("Failed to delete plan");
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <div className="admin-loading">
              <div className="admin-loading-spinner"></div>
              <p>Loading user details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate team statistics
  const totalTeamMembers = teamData
    ? teamData.directReferrals.stats.totalUsers +
      teamData.indirectReferrals.stats.totalUsers +
      teamData.extendedReferrals.stats.totalUsers
    : 0;

  const totalTeamCommission = teamData
    ? Math.floor(teamData.commissionSummary.grandTotalCommission)
    : 0;

  const netWorth = (user.userbalance || 0) + (user.userTotalDeposits || 0);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {/* Header Section */}
          <div className="user-details-header">
            <div className="header-actions">
              <button className="back-btn" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Back to Users
              </button>
            </div>
            <div className="user-profile-header">
              <div className="user-avatar-large">
                {user.fullName?.charAt(0) || user.name?.charAt(0) || "U"}
              </div>
              <div className="user-main-info">
                <h1>{user.fullName || user.name || "N/A"}</h1>
                <p className="user-email">{user.email}</p>
                <div className="user-meta">
                  <span className="user-id">
                    UID: {user.randomCode || user._id?.slice(-8)}
                  </span>
                  <span className={`status-badge ${user.status || "active"}`}>
                    {user.status || "active"}
                  </span>
                </div>
              </div>
              <div className="header-stats">
                <div className="stat-card">
                  <FaMoneyBillWave className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-value">
                      PKR {netWorth?.toLocaleString()}
                    </span>
                    <span className="stat-label">Net Worth</span>
                  </div>
                </div>
                <div className="stat-card">
                  <FaUsers className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-value">{totalTeamMembers}</span>
                    <span className="stat-label">Team Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="user-tabs">
            <button
              className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === "financial" ? "active" : ""}`}
              onClick={() => setActiveTab("financial")}
            >
              Financial
            </button>
            <button
              className={`tab-btn ${activeTab === "team" ? "active" : ""}`}
              onClick={() => setActiveTab("team")}
            >
              Team
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="tab-content">
              <div className="info-grid">
                <div className="info-card">
                  <FaUser className="info-icon" />
                  <div className="info-content">
                    <h3>Personal Information</h3>
                    <div className="info-list">
                      <div className="info-item">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">
                          {user.fullName || "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email</span>
                        <span className="info-value">{user.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Phone</span>
                        <span className="info-value">
                          {user.phoneNumber || user.whatsappNumber || "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Role</span>
                        <span className={`role-badge ${user.role || "user"}`}>
                          {user.role || "user"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <FaCalendar className="info-icon" />
                  <div className="info-content">
                    <h3>Account Information</h3>
                    <div className="info-list">
                      <div className="info-item">
                        <span className="info-label">Member Since</span>
                        <span className="info-value">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Status</span>
                        <span
                          className={`status-badge ${user.status || "active"}`}
                        >
                          {user.status || "active"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Referral Code</span>
                        <span className="info-value code">
                          {user.randomCode || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === "financial" && (
            <div className="tab-content">
              <div className="financial-grid">
                <div className="financial-card balance">
                  <FaWallet className="financial-icon" />
                  <div className="financial-content">
                    <h3>Current Balance</h3>
                    <p className="financial-value">
                      PKR {user.userbalance?.toLocaleString() || 0}
                    </p>
                    <div className="financial-actions">
                      <button
                        className="action-btn success"
                        onClick={handleAddBalance}
                      >
                        Add Balance
                      </button>
                      <button
                        className="action-btn warning"
                        onClick={handleSubtractBalance}
                      >
                        Subtract Balance
                      </button>
                    </div>
                  </div>
                </div>

                <div className="financial-card deposits">
                  <FaMoneyBillWave className="financial-icon" />
                  <div className="financial-content">
                    <h3>Total Deposits</h3>
                    <p className="financial-value">
                      PKR {user.userTotalDeposits?.toLocaleString() || 0}
                    </p>
                    <span className="financial-trend">Lifetime deposits</span>
                  </div>
                </div>

                <div className="financial-card withdrawals">
                  <FaChartLine className="financial-icon" />
                  <div className="financial-content">
                    <h3>Total Withdrawals</h3>
                    <p className="financial-value">
                      PKR {user.userTotalWithdrawals?.toLocaleString() || 0}
                    </p>
                    <span className="financial-trend">
                      Lifetime withdrawals
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div className="tab-content">
              <div className="team-grid">
                <div className="team-card">
                  <FaUsers className="team-icon" />
                  <div className="team-content">
                    <h3>Team Overview</h3>
                    <div className="team-stats">
                      <div className="team-stat">
                        <span className="team-stat-value">
                          {totalTeamMembers}
                        </span>
                        <span className="team-stat-label">Total Members</span>
                      </div>
                      <div className="team-stat">
                        <span className="team-stat-value">
                          PKR {totalTeamCommission?.toLocaleString()}
                        </span>
                        <span className="team-stat-label">Team Commission</span>
                      </div>
                    </div>
                  </div>
                </div>

                {teamLoading ? (
                  <div className="loading-card">
                    <div className="loading-spinner-small"></div>
                    <p>Loading team data...</p>
                  </div>
                ) : (
                  teamData && (
                    <div className="team-structure">
                      <h4>Team Structure</h4>
                      <div className="team-levels">
                        <div className="team-level">
                          <span className="level-name">Direct Referrals</span>
                          <span className="level-count">
                            {teamData.directReferrals.stats.totalUsers}
                          </span>
                        </div>
                        <div className="team-level">
                          <span className="level-name">Indirect Referrals</span>
                          <span className="level-count">
                            {teamData.indirectReferrals.stats.totalUsers}
                          </span>
                        </div>
                        <div className="team-level">
                          <span className="level-name">Extended Referrals</span>
                          <span className="level-count">
                            {teamData.extendedReferrals.stats.totalUsers}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h3>Quick Actions</h3>
            <div className="action-buttons-grid">
              <button className="action-btn primary" onClick={handleLogin}>
                <FaSignInAlt /> Login as User
              </button>
              <button className="action-btn warning" onClick={handleDeletePlan}>
                <FaTrash /> Delete User Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
