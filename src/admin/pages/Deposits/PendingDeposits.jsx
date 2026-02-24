import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaSync, FaSearch, FaClock, FaCheck, FaTimes } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/deposits.css";

export default function PendingDeposits() {
  const [q, setQ] = useState("");
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  // ✅ Fetch deposits function
  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://metadrivebackend.onrender.com/api/payments");
      setDeposits(res.data.data || []);
    } catch (error) {
      console.error("Error fetching deposits:", error);
      setDeposits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  // ✅ Search + filter
  const filtered = useMemo(() => {
    return (deposits || [])
      .filter((d) => d.depositStatus === "pending")
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [deposits, q]);

  // ✅ Approve / Reject Deposit
  const handleStatusChange = async (userId, newStatus, _id) => {
    try {
      setProcessingId(_id);
      const res = await axios.post("https://metadrivebackend.onrender.com/api/status", {
        userId: userId,
        status: newStatus,
        type: "deposit",
        requesId: _id,
      });

      // Update frontend instantly
      setDeposits((prev) =>
        prev.map((d) =>
          d._id === _id ? { ...d, depositStatus: newStatus } : d
        )
      );

      // Show success message
      const action = newStatus === "approved" ? "approved" : "rejected";
      console.log(`Deposit ${action}:`, res.data.message);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {/* Header Section */}
          <div className="admin-page-header">
            <div className="admin-page-title-section">
              <div className="admin-page-icon pending">
                <FaClock />
              </div>
              <div>
                <h1>Pending Deposits</h1>
                <p>Review and manage pending deposit requests</p>
              </div>
            </div>
            <div className="admin-page-actions">
              <div className="admin-page-stats">
                <div className="admin-stat-card warning">
                  <span className="admin-stat-value">{filtered.length}</span>
                  <span className="admin-stat-label">Awaiting Review</span>
                </div>
              </div>
              <button
                onClick={fetchDeposits}
                className="admin-refresh-btn"
                disabled={loading}
              >
                <FaSync className={loading ? "spinning" : ""} />
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>

          {/* Search Section */}
          <div className="admin-search-section">
            <div className="admin-search-box">
              <FaSearch className="admin-search-icon" />
              <input
                placeholder="Search by User ID, Method, Amount..."
                className="admin-search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="admin-table-container">
            {loading ? (
              <div className="admin-loading">
                <div className="admin-loading-spinner"></div>
                <p>Loading pending deposits...</p>
              </div>
            ) : (
              <>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Transaction</th>
                      <th>User</th>
                      <th>Method</th>
                      <th>Amount</th>
                      <th>Submitted</th>
                      <th>Proof</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((d) => (
                      <tr key={d._id} className="admin-table-row pending-row">
                        <td>
                          <div className="transaction-id">
                            <FaClock className="transaction-icon pending" />
                            {d._id.slice(-8)}
                          </div>
                        </td>
                        <td>
                          <div className="user-info-cell">
                            <div className="user-avatar-sm">
                              {d.user_id?.randomCode?.charAt(0) || "U"}
                            </div>
                            <div className="user-details">
                              <span className="user-id">
                                {d.user_id?.randomCode ||
                                  d.user_id?._id ||
                                  "N/A"}
                              </span>
                              <span className="user-time">
                                {getTimeAgo(d.createdAt)}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="payment-method-badge">
                            {d.payment_method}
                          </span>
                        </td>
                        <td>
                          <div className="amount-cell">
                            <span className="amount-value">
                              PKR {d.depositsAmount?.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="date-cell">
                            {formatDate(d.createdAt)}
                          </div>
                        </td>
                        <td>
                          {d.screenshot ? (
                            <a
                              href={`https://metadrivebackend.onrender.com/${d.screenshot}`}
                              target="_blank"
                              rel="noreferrer"
                              className="proof-link"
                            >
                              <div className="proof-thumbnail">
                                <img
                                  src={`https://metadrivebackend.onrender.com/${d.screenshot}`}
                                  alt="Deposit Proof"
                                />
                                <div className="proof-overlay">
                                  <span>View Proof</span>
                                </div>
                              </div>
                            </a>
                          ) : (
                            <span className="no-proof">No proof</span>
                          )}
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="admin-btn success"
                              onClick={() =>
                                handleStatusChange(d.user_id, "approved", d._id)
                              }
                              disabled={processingId === d._id}
                            >
                              <FaCheck />
                              {processingId === d._id
                                ? "Processing..."
                                : "Approve"}
                            </button>
                            <button
                              className="admin-btn danger"
                              onClick={() =>
                                handleStatusChange(d.user_id, "reject", d._id)
                              }
                              disabled={processingId === d._id}
                            >
                              <FaTimes />
                              {processingId === d._id
                                ? "Processing..."
                                : "Reject"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Empty State */}
                {filtered.length === 0 && !loading && (
                  <div className="admin-empty-state">
                    <div className="empty-state-icon">
                      <FaClock />
                    </div>
                    <h3>No Pending Deposits</h3>
                    <p>
                      All deposit requests have been processed. Great job! 🎉
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
