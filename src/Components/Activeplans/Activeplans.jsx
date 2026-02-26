import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaChartLine } from "react-icons/fa";
import { FiHome, FiPieChart, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Activeplans.css";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function Activeplans() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const id = user?._id;

  const [plans, setPlans] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("inProgress"); // "inProgress" or "history"

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const [plansRes, historyRes] = await Promise.all([
          axios.get(`http://localhost:3005/api/plans/user/inprogress/${id}`),
          axios.get(`http://localhost:3005/api/plans/user/daily-earning-history/${id}`),
        ]);

        if (plansRes.data.success) {
          setPlans(plansRes.data.plans || []);
        }

        if (historyRes.data.success) {
          setHistory(historyRes.data.history || []);
        }
      } catch (err) {
        console.error("Error fetching plans/history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getCurrent24HourProgress = (plan) => {
    try {
      const start = new Date(plan.startingDate || plan.createdAt).getTime();
      const lastPaid = plan.lastProfitPaidAt
        ? new Date(plan.lastProfitPaidAt).getTime()
        : null;
      const cycleStart = lastPaid || start;
      const now = Date.now();

      if ((plan.profitPaidDays || 0) >= (plan.days || 180)) return 100;
      if (now <= cycleStart) return 0;

      const elapsed = now - cycleStart;
      const pct = Math.min(100, (elapsed / ONE_DAY_MS) * 100);
      return Number(pct.toFixed(2));
    } catch (error) {
      console.error("Error calculating 24h progress:", error);
      return 0;
    }
  };

  const getHoursRemaining = (plan) => {
    if ((plan.profitPaidDays || 0) >= (plan.days || 180)) return 0;

    const start = new Date(plan.startingDate || plan.createdAt).getTime();
    const lastPaid = plan.lastProfitPaidAt
      ? new Date(plan.lastProfitPaidAt).getTime()
      : null;
    const cycleStart = lastPaid || start;
    const nextPayout = cycleStart + ONE_DAY_MS;
    const remainingMs = Math.max(0, nextPayout - Date.now());
    return Number((remainingMs / (60 * 60 * 1000)).toFixed(1));
  };

  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [history]);

  if (loading)
    return (
      <div className="active-plans-container">
        <div className="active-plans-header-section">
          <div className="active-plans-header">
            <Link to="/dashboard" className="back-link">
              <FaArrowLeft className="back-icon" />
            </Link>
            <h1 className="active-plans-title">Active Plans</h1>
          </div>
        </div>
        <div className="active-plans-content">
          <div className="active-plans-card">
            <div className="loading-state">Loading plan details...</div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="active-plans-container">
      <div className="active-plans-header-section">
        <div className="active-plans-header">
          <Link to="/dashboard" className="back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="active-plans-title">Active Plans</h1>
        </div>
      </div>

      <div className="active-plans-content">
        <div className="active-plans-card">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === "inProgress" ? "active" : ""}`}
              onClick={() => setActiveTab("inProgress")}
            >
              In Progress
            </button>
            <button
              className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Daily Earning History
            </button>
          </div>

          {activeTab === "inProgress" ? (
            plans.length === 0 ? (
              <div className="no-plans">
                <p>No active plans found</p>
              </div>
            ) : (
              plans.map((plan, index) => {
                const currentCycleProgress = getCurrent24HourProgress(plan);
                const hoursRemaining = getHoursRemaining(plan);

                return (
                  <div key={plan._id || index} className="plan-card">
                    <div className="plan-header">
                      <h3 className="plan-status">In Progress!</h3>
                    </div>

                    <div className="plan-details">
                      <div className="detail-row">
                        <span className="label">Plan Name:</span>
                        <span className="value">{plan.PlanName}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Daily Earning:</span>
                        <span className="value">{plan.dailyEarning || 0} PKR</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Invested Amount:</span>
                        <span className="value">{plan.Investment} PKR</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Daily Profit %:</span>
                        <span className="value">{plan.profitPercentage || "0%"}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Payout Cycle Progress:</span>
                        <span className="value">{currentCycleProgress}%</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Next Earning In:</span>
                        <span className="value">{hoursRemaining} hours</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Paid Days:</span>
                        <span className="value">
                          {plan.profitPaidDays || 0}/{plan.days || 180}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Starting Date:</span>
                        <span className="value">
                          {new Date(plan.startingDate || plan.createdAt).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )
          ) : sortedHistory.length === 0 ? (
            <div className="no-plans">
              <p>No daily earnings recorded yet</p>
            </div>
          ) : (
            sortedHistory.map((entry, index) => (
              <div key={`${entry.planId}-${index}`} className="plan-card">
                <div className="plan-details">
                  <div className="detail-row">
                    <span className="label">Plan Name:</span>
                    <span className="value">{entry.planName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Amount:</span>
                    <span className="value">+{entry.amount} PKR</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Date:</span>
                    <span className="value">
                      {new Date(entry.date).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="sx-bottom-nav">
        <Link to="/dashboard" className="sx-nav-btn">
          <FiHome className="sx-nav-icon" />
        </Link>
        <Link to="/activeplans" className="sx-nav-btn active">
          <FiPieChart className="sx-nav-icon" />
        </Link>
        <Link to="/team" className="sx-nav-btn">
          <FiUsers className="sx-nav-icon" />
        </Link>
        <Link to="/earningsummary" className="sx-nav-btn">
          <FaChartLine className="sx-nav-icon" />
        </Link>
      </footer>
    </div>
  );
}
