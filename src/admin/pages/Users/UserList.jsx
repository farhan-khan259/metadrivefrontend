// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import { FaEdit, FaEye, FaSync, FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import Topbar from "../../components/Topbar";
// import "../../styles/admin.css";
// import "../../styles/userlist.css";
// import UserProfileModal from "./UserProfileModal";

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [q, setQ] = useState(""); // ✅ search query

//   // ✅ Fetch users from API
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("https://be.solarx0.com/api/getalluser");

//       if (response.data.success) {
//         setUsers(response.data.users);
//       } else {
//         setError("Failed to fetch users");
//       }
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError("Error loading user data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ Filtered users (search by any field)
//   const filteredUsers = useMemo(() => {
//     return (users || []).filter((u) =>
//       JSON.stringify(u).toLowerCase().includes(q.toLowerCase())
//     );
//   }, [users, q]);

//   const handleView = (user) => setSelectedUser(user);
//   const handleCloseModal = () => setSelectedUser(null);

//   const handleSuspendToggle = async (id) => {
//     try {
//       const response = await axios.put(
//         `https://be.solarx0.com/api/admin/users/${id}/toggle-status`
//       );

//       if (response.data.success) {
//         // Update local state
//         setUsers((prev) =>
//           prev.map((u) =>
//             u._id === id
//               ? { ...u, status: u.status === "active" ? "suspended" : "active" }
//               : u
//           )
//         );

//         // Update modal if open
//         setSelectedUser((prev) =>
//           prev && prev._id === id
//             ? {
//                 ...prev,
//                 status: prev.status === "active" ? "suspended" : "active",
//               }
//             : prev
//         );
//       }
//     } catch (err) {
//       console.error("Error toggling user status:", err);
//       setError("Failed to update user status");
//     }
//   };

//   const handleDeleteUser = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const response = await axios.delete("https://be.solarx0.com/api/delete", {
//         data: { userId: id },
//       });

//       if (response.data.success) {
//         setUsers((prev) => prev.filter((u) => u._id !== id));
//         if (selectedUser && selectedUser._id === id) {
//           setSelectedUser(null);
//         }
//       }
//     } catch (err) {
//       console.error("Error deleting user:", err);
//       setError("Failed to delete user");
//     }
//   };

//   const refreshUsers = () => {
//     fetchUsers();
//   };

//   if (loading) {
//     return (
//       <div className="admin-layout">
//         <Sidebar />
//         <div className="admin-main">
//           <Topbar />
//           <div className="admin-content">
//             <h2>Users</h2>
//             <div
//               className="card-box"
//               style={{ padding: 12, textAlign: "center" }}
//             >
//               <div className="loading">Loading users...</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="admin-layout">
//         <Sidebar />
//         <div className="admin-main">
//           <Topbar />
//           <div className="admin-content">
//             <h2>Users</h2>
//             <div
//               className="card-box"
//               style={{ padding: 12, textAlign: "center" }}
//             >
//               <div className="error">{error}</div>
//               <button onClick={refreshUsers} className="refresh-btn">
//                 <FaSync /> Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Topbar />
//         <div className="admin-content">
//           <div className="page-header">
//             <h2>Users</h2>
//             <button onClick={refreshUsers} className="refresh-btn">
//               <FaSync /> Refresh
//             </button>
//           </div>

//           {/* 🔍 Search bar */}
//           <div style={{ marginBottom: 12 }}>
//             <input
//               type="text"
//               placeholder="Search by UID, name, email, phone..."
//               className="userlist-search"
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//             />
//           </div>

//           <div className="card-box" style={{ padding: 12 }}>
//             {error && <div className="error-message">{error}</div>}

//             <table className="userlist-table">
//               <thead>
//                 <tr>
//                   <th>UID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Role</th>
//                   <th>Status</th>
//                   <th>Joined</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map((user) => (
//                   <tr key={user._id}>
//                     <td data-label="UID">
//                       {user.randomCode || user._id?.slice(-6) || "N/A"}
//                     </td>
//                     <td data-label="Name">
//                       {user.fullName || user.name || "N/A"}
//                     </td>
//                     <td data-label="Email">{user.email}</td>
//                     <td data-label="Phone">
//                       {user.phoneNumber || user.whatsappNumber || "N/A"}
//                     </td>
//                     <td data-label="Role">
//                       <span
//                         className={`role-badge ${
//                           user.role === "admin" ? "admin" : "user"
//                         }`}
//                       >
//                         {user.role || "user"}
//                       </span>
//                     </td>
//                     <td data-label="Status">
//                       <span
//                         className={`status-badge ${
//                           user.status === "active" ? "active" : "suspended"
//                         }`}
//                       >
//                         {user.status || "active"}
//                       </span>
//                     </td>
//                     <td data-label="Joined">
//                       {user.createdAt
//                         ? new Date(user.createdAt).toLocaleDateString()
//                         : "N/A"}
//                     </td>
//                     <td data-label="Actions">
//                       <button
//                         className="action-btn view"
//                         onClick={() => handleView(user)}
//                         title="View Details"
//                       >
//                         <FaEye />
//                       </button>

//                       <Link to="/admin/userdetails" state={{ user }}>
//                         <button className="action-btn edit" title="Edit User">
//                           <FaEdit />
//                         </button>
//                       </Link>

//                       <button
//                         className="action-btn delete"
//                         onClick={() => handleDeleteUser(user._id)}
//                         title="Delete User"
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* 🟡 Empty state */}
//             {filteredUsers.length === 0 && (
//               <p style={{ textAlign: "center", marginTop: 10 }}>
//                 No matching users found
//               </p>
//             )}
//           </div>

//           {/* 👤 User modal */}
//           {selectedUser && (
//             <UserProfileModal
//               user={selectedUser}
//               onClose={handleCloseModal}
//               onSuspendToggle={handleSuspendToggle}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaSync,
  FaTrash,
  FaUsers,
  FaFilter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import "../../styles/userlist.css";
import UserProfileModal from "./UserProfileModal";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  // ✅ Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://be.solarx0.com/api/getalluser");

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error loading user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Filtered users with search and filters
  const filteredUsers = useMemo(() => {
    return (users || []).filter((u) => {
      const matchesSearch = JSON.stringify(u)
        .toLowerCase()
        .includes(q.toLowerCase());
      const matchesStatus = statusFilter === "all" || u.status === statusFilter;
      const matchesRole = roleFilter === "all" || u.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, q, statusFilter, roleFilter]);

  const handleView = (user) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

  const handleSuspendToggle = async (id) => {
    try {
      const response = await axios.put(
        `https://be.solarx0.com/api/admin/users/${id}/toggle-status`
      );

      if (response.data.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id
              ? { ...u, status: u.status === "active" ? "suspended" : "active" }
              : u
          )
        );

        setSelectedUser((prev) =>
          prev && prev._id === id
            ? {
                ...prev,
                status: prev.status === "active" ? "suspended" : "active",
              }
            : prev
        );
      }
    } catch (err) {
      console.error("Error toggling user status:", err);
      setError("Failed to update user status");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await axios.delete("https://be.solarx0.com/api/delete", {
        data: { userId: id },
      });

      if (response.data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        if (selectedUser && selectedUser._id === id) {
          setSelectedUser(null);
        }
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user");
    }
  };

  const refreshUsers = () => {
    fetchUsers();
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
              <p>Loading users...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <div className="admin-error-state">
              <div className="error-icon">⚠️</div>
              <h3>Error Loading Users</h3>
              <p>{error}</p>
              <button className="admin-btn primary" onClick={refreshUsers}>
                <FaSync /> Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {/* Header Section */}
          <div className="admin-page-header">
            <div className="admin-page-title-section">
              <div className="admin-page-icon">
                <FaUsers />
              </div>
              <div>
                <h1>User Management</h1>
                <p>Manage and monitor all platform users</p>
              </div>
            </div>
            <div className="admin-page-stats">
              <div className="admin-stat-card">
                <span className="admin-stat-value">{users.length}</span>
                <span className="admin-stat-label">Total Users</span>
              </div>
              <div className="admin-stat-card">
                <span className="admin-stat-value">
                  {users.filter((u) => u.status === "active").length}
                </span>
                <span className="admin-stat-label">Active Users</span>
              </div>
            </div>
          </div>

          {/* Search and Filters Section */}
          <div className="admin-controls-section">
            <div className="search-filters-grid">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search by UID, name, email, phone..."
                  className="search-input"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <div className="filter-item">
                  <FaFilter className="filter-icon" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div className="filter-item">
                  <FaFilter className="filter-icon" />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <button onClick={refreshUsers} className="refresh-btn">
                <FaSync /> Refresh
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="admin-table-container">
            {filteredUsers.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="admin-table-row">
                      <td>
                        <div className="user-info-cell">
                          {/* <div className="user-avatar">
                            {user.fullName?.charAt(0) ||
                              user.name?.charAt(0) ||
                              "U"}
                          </div> */}
                          <div className="user-details">
                            {/* <span className="user-name">
                              {user.fullName || user.name || "N/A"}
                            </span> */}
                            <span className="user-id">
                              {user.randomCode || user._id?.slice(-6) || "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <span className="user-email">{user.email}</span>
                          {/* <span className="user-phone">
                            {user.phoneNumber || user.whatsappNumber || "N/A"}
                          </span> */}
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge ${user.role || "user"}`}>
                          {user.role || "user"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${user.status || "active"}`}
                        >
                          {user.status || "active"}
                        </span>
                      </td>
                      <td>
                        <div className="date-cell">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn view"
                            onClick={() => handleView(user)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>

                          <Link to="/admin/userdetails" state={{ user }}>
                            <button
                              className="action-btn edit"
                              title="Edit User"
                            >
                              <FaEdit />
                            </button>
                          </Link>

                          {/* <button
                            className="action-btn suspend"
                            onClick={() => handleSuspendToggle(user._id)}
                            title={
                              user.status === "active"
                                ? "Suspend User"
                                : "Activate User"
                            }
                          >
                            {user.status === "active" ? "⏸️" : "▶️"}
                          </button> */}

                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteUser(user._id)}
                            title="Delete User"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty-state">
                <div className="empty-state-icon">
                  <FaUsers />
                </div>
                <h3>No Users Found</h3>
                <p>No users match your current search criteria.</p>
              </div>
            )}
          </div>

          {/* User Profile Modal */}
          {selectedUser && (
            <UserProfileModal
              user={selectedUser}
              onClose={handleCloseModal}
              onSuspendToggle={handleSuspendToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
