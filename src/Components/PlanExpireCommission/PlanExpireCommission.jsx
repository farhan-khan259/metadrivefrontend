import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./PlanExpireCommission.css";

export default function RebateCommission() {
  const [level, setLevel] = useState("level1");
  const [loading, setLoading] = useState(true);
  const [commissionData, setCommissionData] = useState(null);
  const [error, setError] = useState(null);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  // ✅ Fetch REAL Rebate Commission Data
  useEffect(() => {
    const fetchRebateCommission = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!userId) {
          setError("Please login to view commission history");
          setLoading(false);
          return;
        }

        console.log("🔍 Fetching rebate commission data for user:", userId);

        // ✅ Rebate endpoint with backend legacy compatibility
        const response = await axios.get(
          `http://localhost:3005/api/commissions/rebate-summary/${userId}`
        );
        console.log("📦 REAL API Response:", response.data);

        if (response.data.success) {
          setCommissionData(response.data.data);
          console.log("✅ Rebate commission data loaded successfully");

          // Log commission statistics
          if (response.data.data.transactions.length > 0) {
            console.log(
              `💰 Found ${response.data.data.transactions.length} rebate commission transactions`
            );
            console.log(
              `📈 Total Commission: ${response.data.data.summary.totalCommission} PKR`
            );
          }
        } else {
          setError(response.data.message || "Failed to load commission data");
        }
      } catch (error) {
        console.error(
          "❌ Error fetching rebate commission data:",
          error
        );

        if (error.response?.status === 404) {
          setError(
            "Commission endpoint not found. Please check backend setup."
          );
        } else if (error.response?.status === 500) {
          setError("Server error. Please try again later.");
        } else if (
          error.code === "NETWORK_ERROR" ||
          error.code === "ECONNREFUSED"
        ) {
          setError(
            "Cannot connect to server. Please check if backend is running."
          );
        } else {
          setError(
            error.response?.data?.message ||
              error.message ||
              "Failed to load commission data"
          );
        }

        // Set empty data structure for consistent UI
        setCommissionData({
          summary: {
            totalCommission: 0,
            levelTotals: { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
            totalTransactions: 0,
          },
          transactions: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRebateCommission();
  }, [userId]);

  // ✅ Commission Levels (rebate commission)
  const commissionLevels = {
    level1: { label: "Level 1", rate: 0.04 },
    level2: { label: "Level 2", rate: 0.022 },
    level3: { label: "Level 3", rate: 0.015 },
    level4: { label: "Level 4", rate: 0.012 },
    level5: { label: "Level 5", rate: 0.01 },
  };

  const currentLevel = commissionLevels[level];

  // Get transactions for the current level
  const levelNum = parseInt(level.replace("level", ""));
  const levelTransactions =
    commissionData?.transactions?.filter(
      (transaction) => transaction.metadata?.level === levelNum
    ) || [];

  const totalCommission = levelTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  console.log("🔄 Current Level:", level);
  console.log("📋 Level Transactions:", levelTransactions.length);
  console.log("💰 Level Total Commission:", totalCommission);

  if (!userId) {
    return (
      <div className="commission-history-container">
        <div className="error-message">
          <FaExclamationTriangle className="error-icon" />
          <p>Please Login to view commission history</p>
          <Link to="/login" className="login-redirect-btn">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="commission-history-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p className="loading-sub">Fetching from database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="commission-history-container">
      {/* Header with Gradient Background */}
      <div className="commission-header-section">
        <div className="commission-header">
          <Link to="/dashboard" className="commission-back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="commission-title">Daily Rebate Commission</h1>
          {/* <FaCalendarTimes className="header-icon" /> */}
        </div>
      </div>

      {/* Content Section */}
      <div className="commission-content">
        <div className="commission-card">
          {/* Level Tabs */}
          <div className="level-tabs-commission">
            {Object.keys(commissionLevels).map((key) => (
              <button
                key={key}
                className={level === key ? "active" : ""}
                onClick={() => setLevel(key)}
              >
                {commissionLevels[key].label}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="info-message">
              <FaExclamationTriangle className="info-icon" />
              <p>{error}</p>
              <p className="info-sub">
                This shows real data from your database. Commissions appear
                when your team members receive daily plan profit.
              </p>
            </div>
          )}

          {/* Commission Summary */}
          <div className="commission-summary">
            <h3>Total {currentLevel.label} Rebate Commission</h3>
            <div className="total-amount">{totalCommission.toFixed(2)} PKR</div>
            <p className="commission-rate">
              Commission Rate: {(currentLevel.rate * 100).toFixed(1)}%
            </p>
            <div className="transaction-count">
              Total Transactions: {levelTransactions.length}
            </div>
          </div>

          {/* Commission Records */}
          {levelTransactions.length === 0 ? (
            <div className="no-commissions">
              {/* <div className="no-commissions-icon">💸</div> */}
              <p>
                No rebate commission records available for{" "}
                {currentLevel.label}.
              </p>
              <p className="no-commissions-sub">
                Commissions will appear here when your team members earn daily
                plan profit.
                {commissionData?.transactions?.length > 0 && (
                  <span> You have commissions in other levels.</span>
                )}
              </p>
            </div>
          ) : (
            <div className="commission-records">
              {levelTransactions.map((transaction, i) => (
                <div
                  key={transaction._id || i}
                  className="commission-record-card"
                >
                  <div className="record-header">
                    <span className="user-id">
                      {transaction.metadata?.fromUserName || "Team Member"}
                    </span>
                    <span className="commission-amount">
                      +{transaction.amount.toFixed(2)} PKR
                    </span>
                  </div>
                  <div className="record-details">
                    <div className="detail-item">
                      <span className="label">Transaction ID:</span>
                      <span className="value transaction-id">
                        {transaction._id?.substring(18, 24) || "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Plan Name:</span>
                      <span className="value highlight">
                        {transaction.metadata?.planName || "Investment Plan"}
                      </span>
                    </div>
                    {/* <div className="detail-item">
                      <span className="label">Investment Amount:</span>
                      <span className="value">
                        {transaction.metadata?.investment?.toFixed(2) || "0.00"}{" "}
                        PKR
                      </span>
                    </div> */}
                    {/* <div className="detail-item">
                      <span className="label">Return Profit:</span>
                      <span className="value highlight">
                        {transaction.metadata?.returnProfit?.toFixed(2) ||
                          "0.00"}{" "}
                        PKR
                      </span>
                    </div> */}
                    <div className="detail-item">
                      <span className="label">Commission Rate:</span>
                      <span className="value rate-badge">
                        {(
                          (transaction.metadata?.commissionRate ||
                            currentLevel.rate) * 100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Date:</span>
                      <span className="value">
                        {transaction.createdAt
                          ? new Date(transaction.createdAt).toLocaleDateString(
                              "en-PK"
                            )
                          : "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Level:</span>
                      <span className="value level-badge">
                        Level {transaction.metadata?.level || 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
