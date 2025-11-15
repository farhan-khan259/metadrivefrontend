// import axios from "axios";
// import { useRef, useState } from "react";
// import {
//   FaArrowLeft,
//   FaCamera,
//   FaEdit,
//   FaKey,
//   FaSave,
//   FaUser,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import profileimg from "../../Assets/Pictures/profileelonmusk.jpeg";
// import "./Profile.css";

// export default function Profile() {
//   const [activeTab, setActiveTab] = useState("account");
//   const [isEditing, setIsEditing] = useState(false);
//   const [isEditingPassword, setIsEditingPassword] = useState(false);

//   // ✅ Store user in state
//   const [user, setUser] = useState(() => {
//     const userString = localStorage.getItem("user");
//     return userString ? JSON.parse(userString) : null;
//   });

//   const userId = user?._id;

//   const [formData, setFormData] = useState({
//     Name: user?.fullName || "",
//     email: user?.email || "",
//     phone: user?.whatsappNumber || "",
//   });

//   const [passwordData, setPasswordData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   // ✅ Profile picture upload
//   const fileInputRef = useRef(null);

//   const handleProfilePicClick = () => {
//     fileInputRef.current.click(); // open file picker
//   };

//   const handleProfilePicChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formDataUpload = new FormData();
//     formDataUpload.append("profilepicture", file);
//     formDataUpload.append("userId", userId);

//     try {
//       const response = await axios.post(
//         "https://be.solarx0.com/api/account",
//         formDataUpload,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data.success) {
//         alert("Profile picture updated!");
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         setUser(response.data.user);
//       } else {
//         alert(response.data.message || "Upload failed!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error uploading profile picture");
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePasswordChange = (e) => {
//     setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
//   };

//   // ✅ Update account info
//   const toggleEdit = async () => {
//     if (isEditing) {
//       try {
//         const response = await axios.post(
//           "https://be.solarx0.com/api/account",
//           {
//             userId,
//             fullName: formData.Name,
//             email: formData.email,
//             whatsappNumber: formData.phone,
//           }
//         );

//         if (response.data.success) {
//           alert("Profile updated successfully!");
//           localStorage.setItem("user", JSON.stringify(response.data.user));
//           setUser(response.data.user);
//         } else {
//           alert(response.data.message || "Update failed!");
//         }
//       } catch (error) {
//         console.error(error);
//         alert("Error updating profile");
//       }
//     }
//     setIsEditing(!isEditing);
//   };

//   // ✅ Change password
//   const togglePasswordEdit = async () => {
//     if (isEditingPassword) {
//       if (passwordData.newPassword !== passwordData.confirmPassword) {
//         alert("New password and confirm password do not match!");
//         return;
//       }

//       try {
//         const response = await axios.post(
//           "https://be.solarx0.com/api/changePassword",
//           {
//             userId,
//             oldpassword: passwordData.oldPassword,
//             newpassword: passwordData.newPassword,
//           }
//         );

//         if (response.data.success) {
//           alert("Password changed successfully!");
//           setPasswordData({
//             oldPassword: "",
//             newPassword: "",
//             confirmPassword: "",
//           });
//         } else {
//           alert(response.data.message || "Password change failed!");
//         }
//       } catch (error) {
//         console.error(error);
//         alert("Error changing password");
//       }
//     }
//     setIsEditingPassword(!isEditingPassword);
//   };

//   return (
//     <div className="profile-container7p">
//       {/* Header */}
//       <div className="profile-header-wrapper7p">
//         <Link to="/dashboard" className="back-linkpro7p">
//           <FaArrowLeft />
//         </Link>
//         <h2 className="profile-page-heading7p">Profile Settings</h2>
//       </div>

//       {/* User Info */}
//       <div className="profile-header7p">
//         <div className="profile-avatar-wrapper">
//           <img
//             src={
//               user?.profilepicture
//                 ? `https://be.solarx0.com${user.profilepicture}`
//                 : profileimg
//             }
//             alt="Profile"
//             className="profile-avatar7p"
//             onClick={handleProfilePicClick}
//             style={{ cursor: "pointer" }}
//           />
//           <div className="camera-icon" onClick={handleProfilePicClick}>
//             <FaCamera />
//           </div>
//         </div>
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: "none" }}
//           accept="image/*"
//           onChange={handleProfilePicChange}
//         />
//         <div className="profile-info7p">
//           <h3>{formData.Name}</h3>
//           <p>{formData.email}</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="tabs7p">
//         <button
//           className={`tab7p ${activeTab === "account" ? "active7p" : ""}`}
//           onClick={() => setActiveTab("account")}
//         >
//           <FaUser /> Account
//         </button>
//         <button
//           className={`tab7p ${activeTab === "password" ? "active7p" : ""}`}
//           onClick={() => setActiveTab("password")}
//         >
//           <FaKey /> Change Password
//         </button>
//       </div>

//       {/* Account Section */}
//       {activeTab === "account" && (
//         <div className="account-section7p">
//           <div className="account-header7p">
//             <h4>Account</h4>
//             <button className="edit-btn7p" onClick={toggleEdit}>
//               {isEditing ? <FaSave /> : <FaEdit />}
//               {isEditing ? " Save" : " Edit"}
//             </button>
//           </div>
//           <div className="account-grid7p">
//             <div className="input-group7p">
//               <label>Name</label>
//               <input
//                 type="text"
//                 name="Name"
//                 placeholder="Enter your Name"
//                 value={formData.Name}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//               />
//             </div>
//             <div className="input-group7p">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//               />
//             </div>
//             <div className="input-group7p">
//               <label>Phone</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Change Password Section */}
//       {activeTab === "password" && (
//         <div className="account-section7p">
//           <div className="account-header7p">
//             <h4>Change Password</h4>
//             <button className="edit-btn7p" onClick={togglePasswordEdit}>
//               {isEditingPassword ? <FaSave /> : <FaEdit />}
//               {isEditingPassword ? " Save" : " Edit"}
//             </button>
//           </div>
//           <div className="account-grid7p">
//             <div className="input-group7p">
//               <label>Old Password</label>
//               <input
//                 type="password"
//                 name="oldPassword"
//                 placeholder="Enter old password"
//                 value={passwordData.oldPassword}
//                 onChange={handlePasswordChange}
//                 disabled={!isEditingPassword}
//               />
//             </div>
//             <div className="input-group7p">
//               <label>New Password</label>
//               <input
//                 type="password"
//                 name="newPassword"
//                 placeholder="Enter new password"
//                 value={passwordData.newPassword}
//                 onChange={handlePasswordChange}
//                 disabled={!isEditingPassword}
//               />
//             </div>
//             <div className="input-group7p">
//               <label>Confirm New Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm new password"
//                 value={passwordData.confirmPassword}
//                 onChange={handlePasswordChange}
//                 disabled={!isEditingPassword}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaKey, FaSave, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("account");
  const [teamData, setTeamData] = useState(null);
  const [uplinerName, setUplinerName] = useState("Loading...");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Store user in state
  const [user, setUser] = useState(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  const userId = user?._id;

  const [formData, setFormData] = useState({
    Name: user?.fullName || "",
    email: user?.email || "",
    phone: user?.whatsappNumber || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Function to get upliner name by referral code
  const getUplinerName = async (referralCode) => {
    if (!referralCode) return "No Upliner";

    try {
      const response = await axios.post(
        "https://be.solarx0.com/api/getUserByReferral",
        {
          referralCode: referralCode,
        }
      );

      if (response.data.success) {
        return response.data.user.fullName;
      } else {
        return "No Upliner";
      }
    } catch (error) {
      console.error("Error fetching upliner:", error);
      return "No Upliner";
    }
  };

  // Fetch team data and upliner name
  useEffect(() => {
    const fetchTeamDataAndUpliner = async () => {
      if (!userId) {
        console.log("No userId available");
        return;
      }

      try {
        // Fetch team data - using the same endpoint as Team component
        const response = await axios.post("https://be.solarx0.com/team", {
          userId: userId,
        });

        if (response.data.success) {
          setTeamData(response.data);
          console.log("Team data loaded:", response.data);

          // Get upliner name from user's referredBy field
          const userReferralCode = user?.referredBy;
          if (userReferralCode) {
            const upliner = await getUplinerName(userReferralCode);
            setUplinerName(upliner);
          } else {
            setUplinerName("No Upliner");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUplinerName("No Upliner");
      }
    };

    fetchTeamDataAndUpliner();
  }, [userId, user?.referredBy]);

  // Calculate total team size - same calculation as Team component
  const getTotalTeamSize = () => {
    if (!teamData) return 0;

    // Exact same calculation as in TeamDataScreen component
    return (
      (teamData.directReferrals?.stats?.totalUsers || 0) +
      (teamData.indirectReferrals?.stats?.totalUsers || 0) +
      (teamData.extendedReferrals?.stats?.totalUsers || 0)
    );
  };

  // Get additional stats for more info cards
  const getAdditionalStats = () => {
    if (!teamData) return { totalDeposit: 0, totalCommission: 0 };

    const totalTeamDeposit =
      (teamData.directReferrals?.stats?.totalTeamDeposit || 0) +
      (teamData.indirectReferrals?.stats?.totalTeamDeposit || 0) +
      (teamData.extendedReferrals?.stats?.totalTeamDeposit || 0);

    const totalTeamCommission = Math.floor(
      teamData.commissionSummary?.grandTotalCommission || 0
    );

    return {
      totalDeposit: totalTeamDeposit,
      totalCommission: totalTeamCommission,
    };
  };

  const additionalStats = getAdditionalStats();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // ✅ Update account info
  const toggleEdit = async () => {
    if (isEditing) {
      try {
        const response = await axios.post(
          "https://be.solarx0.com/api/account",
          {
            userId,
            fullName: formData.Name,
            email: formData.email,
            whatsappNumber: formData.phone,
          }
        );

        if (response.data.success) {
          alert("Profile updated successfully!");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
        } else {
          alert(response.data.message || "Update failed!");
        }
      } catch (error) {
        console.error(error);
        alert("Error updating profile");
      }
    }
    setIsEditing(!isEditing);
  };

  // ✅ Change password
  const togglePasswordEdit = async () => {
    if (isEditingPassword) {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("New password and confirm password do not match!");
        return;
      }

      try {
        const response = await axios.post(
          "https://be.solarx0.com/api/changePassword",
          {
            userId,
            oldpassword: passwordData.oldPassword,
            newpassword: passwordData.newPassword,
          }
        );

        if (response.data.success) {
          alert("Password changed successfully!");
          setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          alert(response.data.message || "Password change failed!");
        }
      } catch (error) {
        console.error(error);
        alert("Error changing password");
      }
    }
    setIsEditingPassword(!isEditingPassword);
  };

  // ✅ FIXED: Reliable back navigation
  const handleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="profile-container7p">
      {/* Header */}
      <div className="profile-header-wrapper7p">
        <button
          className="back-linkpro7p"
          onClick={handleBackClick}
          type="button"
        >
          <FaArrowLeft />
        </button>
        <h2 className="profile-page-heading7p">Profile Settings</h2>
      </div>

      {/* User Info Header */}
      <div className="profile-header7p">
        <div className="user-info-grid7p">
          <div className="info-card7p">
            <div className="info-icon7p user-icon">
              <FaUser />
            </div>
            <div className="info-content7p">
              <label>Username</label>
              <h3>{formData.Name || "Loading..."}</h3>
            </div>
          </div>

          <div className="info-card7p">
            <div className="info-icon7p upliner-icon">
              <FaUser />
            </div>
            <div className="info-content7p">
              <label>Upliner</label>
              <h3>{uplinerName}</h3>
            </div>
          </div>

          <div className="info-card7p">
            <div className="info-icon7p id-icon">
              <FaKey />
            </div>
            <div className="info-content7p">
              <label>User ID</label>
              <h3>{user?.randomCode || "N/A"}</h3>
            </div>
          </div>

          <div className="info-card7p">
            <div className="info-icon7p team-icon">
              <FaUser />
            </div>
            <div className="info-content7p">
              <label>Team Size</label>
              <h3>{getTotalTeamSize().toLocaleString()}</h3>
            </div>
          </div>

          {/* Additional Stats Cards */}
          <div className="info-card7p">
            <div className="info-icon7p deposit-icon">
              <FaKey />
            </div>
            <div className="info-content7p">
              <label>Team Deposit</label>
              <h3>PKR {additionalStats.totalDeposit.toLocaleString()}</h3>
            </div>
          </div>

          <div className="info-card7p">
            <div className="info-icon7p commission-icon">
              <FaKey />
            </div>
            <div className="info-content7p">
              <label>Team Commission</label>
              <h3>PKR {additionalStats.totalCommission.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs7p">
        <button
          className={`tab7p ${activeTab === "account" ? "active7p" : ""}`}
          onClick={() => setActiveTab("account")}
          type="button"
        >
          <FaUser /> Account
        </button>
        <button
          className={`tab7p ${activeTab === "password" ? "active7p" : ""}`}
          onClick={() => setActiveTab("password")}
          type="button"
        >
          <FaKey /> Change Password
        </button>
      </div>

      {/* Account Section */}
      {activeTab === "account" && (
        <div className="account-section7p">
          <div className="account-header7p">
            <h4>Account</h4>
            <button className="edit-btn7p" onClick={toggleEdit} type="button">
              {isEditing ? <FaSave /> : <FaEdit />}
              {isEditing ? " Save" : " Edit"}
            </button>
          </div>
          <div className="account-grid7p">
            <div className="input-group7p">
              <label>Name</label>
              <input
                type="text"
                name="Name"
                placeholder="Enter your Name"
                value={formData.Name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="input-group7p">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="input-group7p">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      )}

      {/* Change Password Section */}
      {activeTab === "password" && (
        <div className="account-section7p">
          <div className="account-header7p">
            <h4>Change Password</h4>
            <button
              className="edit-btn7p"
              onClick={togglePasswordEdit}
              type="button"
            >
              {isEditingPassword ? <FaSave /> : <FaEdit />}
              {isEditingPassword ? " Save" : " Edit"}
            </button>
          </div>
          <div className="account-grid7p">
            <div className="input-group7p">
              <label>Old Password</label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Enter old password"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                disabled={!isEditingPassword}
              />
            </div>
            <div className="input-group7p">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                disabled={!isEditingPassword}
              />
            </div>
            <div className="input-group7p">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                disabled={!isEditingPassword}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
