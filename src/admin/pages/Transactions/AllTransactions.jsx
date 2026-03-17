import axios from "axios";
import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaSearch, FaSync } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import "../../styles/transactions.css";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://be.sparkx1.pro/api/admin/transactions"
      );
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter((transaction) =>
    JSON.stringify(transaction).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (transaction) => {
    const status = transaction.depositStatus || transaction.withdrawalStatus;
    const type = transaction.depositStatus ? "deposit" : "withdrawal";

    return <span className={`status-badge ${status}`}>{status}</span>;
  };

  const getAmountDisplay = (transaction) => {
    if (transaction.depositStatus) {
      return (
        <div className="amount-positive">
          +PKR {Number(transaction.depositsAmount).toLocaleString()}
        </div>
      );
    } else {
      return (
        <div className="withdrawal-amount">
          <div className="amount-negative">
            -PKR {Number(transaction.withdrawalsAmount).toLocaleString()}
          </div>
          <div className="net-amount">
            Net: PKR{" "}
            {(
              transaction.netWithdrawal ||
              Math.round(transaction.withdrawalsAmount * 0.97)
            ).toLocaleString()}
          </div>
        </div>
      );
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
              <p>Loading transactions...</p>
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
              <div className="admin-page-icon">
                <FaMoneyBillWave />
              </div>
              <div>
                <h1>All Transactions</h1>
                <p>View and manage all deposit and withdrawal transactions</p>
              </div>
            </div>
            <button onClick={fetchTransactions} className="admin-refresh-btn">
              <FaSync /> Refresh
            </button>
          </div>

          <div className="admin-search-section">
            <div className="admin-search-box">
              <FaSearch className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search by UID, amount, status..."
                className="admin-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-table-container">
            {filteredTransactions.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>User ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className={`admin-table-row ${
                        transaction.depositStatus ? "transaction-row-deposit" : "transaction-row-withdrawal"
                      }`}
                    >
                      <td>
                        <span className="transaction-id">
                          {transaction._id?.slice(-8)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`transaction-type ${
                            transaction.depositStatus ? "deposit" : "withdrawal"
                          }`}
                        >
                          {transaction.depositStatus ? "Deposit" : "Withdrawal"}
                        </span>
                      </td>
                      <td>
                        {transaction.user_id?.randomCode ||
                          transaction.user_id?.slice(-8) ||
                          "N/A"}
                      </td>
                      <td>{getAmountDisplay(transaction)}</td>
                      <td>
                        {new Date(transaction.createdAt).toLocaleDateString()}
                        <div className="user-time">
                          {new Date(transaction.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td>{getStatusBadge(transaction)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty-state">
                <div className="empty-state-icon">
                  <FaMoneyBillWave />
                </div>
                <h3>No Transactions Found</h3>
                <p>No transactions match your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}