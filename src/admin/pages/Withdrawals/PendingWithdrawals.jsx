import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaUserClock } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/transactions.css";

export default function PendingWithdrawals() {
  const [q, setQ] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://be.sparkx1.pro/api/payments");
      setWithdrawals(res.data.data || []);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      setWithdrawals([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return (withdrawals || [])
      .filter((d) => d.withdrawalStatus === "pending")
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [withdrawals, q]);

  const handleStatusChange = async (userId, newStatus, _id) => {
    try {
      const res = await axios.post("https://be.sparkx1.pro/api/status", {
        userId,
        status: newStatus,
        type: "withdrawal",
        requesId: _id,
      });

      alert(res.data.message);
      setWithdrawals((prev) =>
        prev.map((d) =>
          d._id === _id ? { ...d, withdrawalStatus: newStatus } : d
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const handleLoginAsUser = async (user) => {
    if (!window.confirm("Login to this user's account?")) return;

    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      const userId = user?._id || user;
      const response = await axios.post(
        `https://be.sparkx1.pro/api/adminLoginUserAccount`,
        { userId }
      );

      if (response.status === 200) {
        alert("Logging in as user...");
        localStorage.setItem("user", JSON.stringify({ _id: userId }));
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Error logging in as user:", error);
      alert("Failed to login as user account.");
    }
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <div className="transaction-loading">
              <div className="transaction-loading-spinner"></div>
              <p>Loading pending withdrawals...</p>
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
          <div className="admin-page-header">
            <div className="admin-page-title-section">
              <div className="admin-page-icon pending">
                <FaUserClock />
              </div>
              <div>
                <h1>Pending Withdrawals</h1>
                <p>Review and process pending withdrawal requests</p>
              </div>
            </div>
            <div className="admin-page-stats">
              <span className="admin-stat-card warning">
                <span className="admin-stat-value">{filtered.length}</span>
                <span className="admin-stat-label">Pending</span>
              </span>
            </div>
          </div>

          <div className="admin-search-section">
            <div className="admin-search-box">
              <FaSearch className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search UID, method, amount..."
                className="admin-search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-table-container">
            {filtered.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Method</th>
                    <th>Requested</th>
                    <th>Fee</th>
                    <th>Net Amount</th>
                    <th>Date</th>
                    <th>Account Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d._id} className="admin-table-row transaction-row-pending">
                      <td>
                        <span className="transaction-id">
                          {d._id?.slice(-8)}
                        </span>
                      </td>
                      <td>
                        <div className="user-info">
                          <span className="user-id">
                            {d.user_id?.randomCode ||
                              d.user_id?._id?.slice(-8) ||
                              "N/A"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="payment-method-badge">{d.payment_method}</span>
                      </td>
                      <td>
                        <div className="amount-negative">
                          PKR {d.withdrawalsAmount?.toLocaleString()}
                        </div>
                      </td>
                      <td>
                        <div className="fee-amount">
                          -PKR{" "}
                          {(
                            d.withdrawalFee ||
                            Math.round(d.withdrawalsAmount * 0.03)
                          )?.toLocaleString()}
                        </div>
                      </td>
                      <td>
                        <div className="net-amount">
                          PKR{" "}
                          {(
                            d.netWithdrawal ||
                            Math.round(d.withdrawalsAmount * 0.97)
                          )?.toLocaleString()}
                        </div>
                      </td>
                      <td>
                        {new Date(d.createdAt).toLocaleDateString()}
                        <div className="user-time">
                          {new Date(d.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td>
                        <div className="account-details">
                          <div>
                            <strong>{d.accountHolderName}</strong>
                          </div>
                          <div>{d.accountNumber}</div>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="admin-btn success"
                            onClick={() =>
                              handleStatusChange(d.user_id, "approved", d._id)
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="admin-btn danger"
                            onClick={() =>
                              handleStatusChange(d.user_id, "reject", d._id)
                            }
                          >
                            Reject
                          </button>
                          <button
                            className="admin-btn primary"
                            onClick={() => handleLoginAsUser(d.user_id)}
                          >
                            Login
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
                  <FaUserClock />
                </div>
                <h3>No Pending Withdrawals</h3>
                <p>All withdrawal requests have been processed.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}