import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaCheckCircle, FaSearch, FaSync } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/transactions.css";

export default function CompletedWithdrawals() {
  const [q, setQ] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://be.sparkx1.pro/api/payments");
      setWithdrawals(res.data.data || []);
      setError("");
    } catch (error) {
      console.error("Error fetching Withdrawals:", error);
      setError("Failed to load withdrawals");
      setWithdrawals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const filtered = useMemo(() => {
    return (withdrawals || [])
      .filter((d) => d.withdrawalStatus === "approved")
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [withdrawals, q]);

  const handleRefresh = () => {
    fetchWithdrawals();
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
              <p>Loading completed withdrawals...</p>
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
            <div className="transaction-error">
              <div className="error-icon">⚠️</div>
              <h3>Error Loading Withdrawals</h3>
              <p>{error}</p>
              <button className="admin-btn primary" onClick={handleRefresh}>
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
          <div className="admin-page-header">
            <div className="admin-page-title-section">
              <div className="admin-page-icon success">
                <FaCheckCircle />
              </div>
              <div>
                <h1>Completed Withdrawals</h1>
                <p>Approved and processed withdrawal requests</p>
              </div>
            </div>
            <button onClick={handleRefresh} className="admin-refresh-btn">
              <FaSync /> Refresh
            </button>
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
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d._id} className="admin-table-row transaction-row-approved">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty-state">
                <div className="empty-state-icon">
                  <FaCheckCircle />
                </div>
                <h3>No Completed Withdrawals</h3>
                <p>No approved withdrawals found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}