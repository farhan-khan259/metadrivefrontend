import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaChartLine,
  FaCoins,
  FaMoneyBillWave,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { FiHome, FiPieChart, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./EarningsSummary.css";

export default function EarningsSummary() {
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [rebateSummary, setRebateSummary] = useState({
    totalCommission: 0,
    levelTotals: {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
    },
    totalTransactions: 0,
  });

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  const safeNumber = (value) => Number(value || 0);

  const levelConfig = [
    {
      key: "directReferrals",
      label: "Level 1",
      teamRate: 6.5,
      rebateRate: 4,
      summaryKey: "level1",
    },
    {
      key: "indirectReferrals",
      label: "Level 2",
      teamRate: 3.3,
      rebateRate: 2.2,
      summaryKey: "level2",
    },
    {
      key: "extendedReferrals",
      label: "Level 3",
      teamRate: 2.5,
      rebateRate: 1.5,
      summaryKey: "level3",
    },
    {
      key: "level4Referrals",
      label: "Level 4",
      teamRate: 2,
      rebateRate: 1.2,
      summaryKey: "level4",
    },
    {
      key: "level5Referrals",
      label: "Level 5",
      teamRate: 1.5,
      rebateRate: 1,
      summaryKey: "level5",
    },
  ];

  // Fetch Team Data
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const [teamRes, rebateRes] = await Promise.allSettled([
          axios.post("http://localhost:3005/team", {
            userId: userId,
          }),
          axios.get(
            `http://localhost:3005/api/commissions/rebate-summary/${userId}`
          ),
        ]);

        if (teamRes.status !== "fulfilled") {
          throw teamRes.reason;
        }

        setTeamData(teamRes.value.data);
        setUserData(teamRes.value.data.user);

        if (
          rebateRes.status === "fulfilled" &&
          rebateRes.value?.data?.success &&
          rebateRes.value?.data?.data?.summary
        ) {
          setRebateSummary(rebateRes.value.data.data.summary);
        }
      } catch (error) {
        console.error("Error fetching earnings summary data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSummaryData();
    }
  }, [userId]);

  if (!userId) return <div className="earnings-error">Please Login</div>;
  if (loading) return <div className="earnings-loading">Loading...</div>;
  if (!teamData)
    return <div className="earnings-error">No data available.</div>;

  // Calculate accurate totals from team data
  const calculateTotals = () => {
    if (!teamData) {
      return {
        totalDeposit: 0,
        totalWithdraw: 0,
        totalCommission: 0,
        teamCommission: 0,
        rebateCommission: 0,
        totalTeam: 0,
        userDeposit: 0,
        userWithdraw: 0,
        teamDeposit: 0,
        teamWithdraw: 0,
        todayTeamDeposit: 0,
        todayTeamWithdraw: 0,
      };
    }

    const userDeposit = safeNumber(userData?.userTotalDeposits);
    const userWithdraw = safeNumber(userData?.userTotalWithdrawals);

    const totalTeamDeposit = levelConfig.reduce(
      (sum, level) => sum + safeNumber(teamData[level.key]?.stats?.totalTeamDeposit),
      0
    );

    const totalTeamWithdraw = levelConfig.reduce(
      (sum, level) =>
        sum + safeNumber(teamData[level.key]?.stats?.totalTeamWithdrawal),
      0
    );

    const todayTeamDeposit = levelConfig.reduce(
      (sum, level) => sum + safeNumber(teamData[level.key]?.stats?.todayTeamDeposit),
      0
    );

    const todayTeamWithdraw = levelConfig.reduce(
      (sum, level) =>
        sum + safeNumber(teamData[level.key]?.stats?.todayTeamWithdrawal),
      0
    );

    const teamCommission = safeNumber(teamData.commissionSummary?.grandTotalCommission);
    const rebateCommission = safeNumber(rebateSummary?.totalCommission);

    const totalTeamMembers = levelConfig.reduce(
      (sum, level) => sum + safeNumber(teamData[level.key]?.stats?.totalUsers),
      0
    );

    return {
      // Personal + Team totals
      totalDeposit: userDeposit + totalTeamDeposit,
      totalWithdraw: userWithdraw + totalTeamWithdraw,
      totalCommission: teamCommission + rebateCommission,
      teamCommission,
      rebateCommission,
      totalTeam: totalTeamMembers,
      // Individual components for breakdown
      userDeposit,
      userWithdraw,
      teamDeposit: totalTeamDeposit,
      teamWithdraw: totalTeamWithdraw,
      todayTeamDeposit,
      todayTeamWithdraw,
    };
  };

  const totals = calculateTotals();

  const statsCards = [
    {
      title: "Total Deposit",
      value: `${Math.round(totals.totalDeposit)} PKR`,
      icon: <FaMoneyBillWave />,
      color: "primary",
      description: "Your deposits + Team deposits",
    },
    {
      title: "Total Withdraw",
      value: `${Math.round(totals.totalWithdraw)} PKR`,
      icon: <FaWallet />,
      color: "secondary",
      description: "Your withdrawals + Team withdrawals",
    },
    {
      title: "Total Commission",
      value: `${Math.round(totals.totalCommission)} PKR`,
      icon: <FaCoins />,
      color: "accent",
      description: "Team commission + rebate commission",
    },
    {
      title: "Total Team",
      value: totals.totalTeam.toString(),
      icon: <FaUsers />,
      color: "success",
      description: "Total members in your team network",
    },
  ];

  return (
    <div className="earnings-summary-container">
      {/* Header with Gradient Background */}
      <div className="earnings-header-section">
        <div className="earnings-header">
          <Link to="/dashboard" className="earnings-back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="earnings-title2">Earnings Summary</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="earnings-content">
        <div className="earnings-card">
          {/* Welcome Message */}
          <div className="earnings-welcome-box">
            <p className="welcome-text">
              Complete overview of your earnings and team performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className={`stat-card ${card.color}-card`}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="stat-icon">{card.icon}</div>
                <div className="stat-content">
                  <h3 className="stat-title">{card.title}</h3>
                  <div className="stat-value">{card.value}</div>
                  <p className="stat-description">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Breakdown */}
          <div className="breakdown-section">
            <h3 className="breakdown-title">Detailed Breakdown</h3>
            <div className="breakdown-grid">
              <div className="breakdown-item">
                <span className="breakdown-label">Your Personal Deposit:</span>
                <span className="breakdown-value">
                  {Math.round(totals.userDeposit)} PKR
                </span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Your Personal Withdraw:</span>
                <span className="breakdown-value">
                  {Math.round(totals.userWithdraw)} PKR
                </span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Team Total Deposit:</span>
                <span className="breakdown-value">
                  {Math.round(totals.teamDeposit)} PKR
                </span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Team Total Withdraw:</span>
                <span className="breakdown-value">
                  {Math.round(totals.teamWithdraw)} PKR
                </span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Today Team Deposit:</span>
                <span className="breakdown-value">
                  {Math.round(totals.todayTeamDeposit)} PKR
                </span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Today Team Withdraw:</span>
                <span className="breakdown-value">
                  {Math.round(totals.todayTeamWithdraw)} PKR
                </span>
              </div>
              {levelConfig.map((level) => (
                <div className="breakdown-item" key={`deposit-${level.key}`}>
                  <span className="breakdown-label">{level.label} Team Deposit:</span>
                  <span className="breakdown-value">
                    {Math.round(
                      safeNumber(teamData[level.key]?.stats?.totalTeamDeposit)
                    )} PKR
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Commission Breakdown */}
          <div className="commission-breakdown">
            <h3 className="breakdown-title">Commission by Level</h3>
            <div className="commission-levels">
              {levelConfig.map((level) => (
                <div className="commission-level" key={`commission-${level.key}`}>
                  <span className="level-name">
                    {level.label} ({level.teamRate}%):
                  </span>
                  <span className="level-amount">
                    {Math.round(
                      safeNumber(
                        teamData.commissionSummary?.[
                          `${level.summaryKey}Commission`
                        ]
                      )
                    )} PKR
                  </span>
                </div>
              ))}
              <div className="commission-level">
                <span className="level-name">Total Team Commission:</span>
                <span className="level-amount">
                  {Math.round(totals.teamCommission)} PKR
                </span>
              </div>
              <div className="commission-level">
                <span className="level-name">Total Rebate Commission:</span>
                <span className="level-amount">
                  {Math.round(totals.rebateCommission)} PKR
                </span>
              </div>
              <div className="commission-level">
                <span className="level-name">Grand Total Commission:</span>
                <span className="level-amount">
                  {Math.round(totals.totalCommission)} PKR
                </span>
              </div>
            </div>
          </div>

          {/* Rebate Commission Section */}
          <div className="plan-expire-section2">
            <div className="plan-expire-header2">
              <h3>Rebate Commission</h3>
            </div>
            <div className="plan-expire-levels2">
              {levelConfig.map((level) => (
                <div className="plan-level-item2" key={`rebate-${level.key}`}>
                  <span className="plan-level-label2">{level.label}:</span>
                  <span className="plan-level-value2">
                    {level.rebateRate}% •{" "}
                    {Math.round(
                      safeNumber(rebateSummary?.levelTotals?.[level.summaryKey])
                    )} PKR
                  </span>
                </div>
              ))}
              <div className="plan-level-item2">
                <span className="plan-level-label2">Total Rebate:</span>
                <span className="plan-level-value2">
                  {Math.round(totals.rebateCommission)} PKR
                </span>
              </div>
              <div className="plan-level-item2">
                <span className="plan-level-label2">Rebate Transactions:</span>
                <span className="plan-level-value2">
                  {safeNumber(rebateSummary?.totalTransactions)}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="additional-info-section">
            <h3 className="breakdown-title">Additional Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Your Current Balance:</span>
                <span className="info-value">
                  {Math.round(safeNumber(userData?.userbalance))} PKR
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Your Total Investment:</span>
                <span className="info-value">
                  {Math.round(safeNumber(userData?.UserInvestment))} PKR
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Team Plan Investment:</span>
                <span className="info-value">
                  {Math.round(safeNumber(teamData?.teamPlanInvestment))} PKR
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Level 1-5 Total Plan Investment:</span>
                <span className="info-value">
                  {Math.round(
                    safeNumber(teamData?.teamPlanInvestmentBreakdown?.level1) +
                      safeNumber(teamData?.teamPlanInvestmentBreakdown?.level2) +
                      safeNumber(teamData?.teamPlanInvestmentBreakdown?.level3) +
                      safeNumber(teamData?.teamPlanInvestmentBreakdown?.level4) +
                      safeNumber(teamData?.teamPlanInvestmentBreakdown?.level5)
                  )} PKR
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Level 1-5 Team Members:</span>
                <span className="info-value">{totals.totalTeam}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Total Team + Rebate Commission:</span>
                <span className="info-value">
                  {Math.round(totals.totalCommission)} PKR
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Your User ID:</span>
                <span className="info-value highlight">
                  {userData?.randomCode || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <footer className="sx-bottom-nav">
        <Link to="/dashboard" className="sx-nav-btn">
          <FiHome className="sx-nav-icon" />
        </Link>
        <Link to="/activeplans" className="sx-nav-btn">
          <FiPieChart className="sx-nav-icon" />
        </Link>
        <Link to="/team" className="sx-nav-btn">
          <FiUsers className="sx-nav-icon" />
        </Link>
        <Link to="/earningsummary" className="sx-nav-btn active">
          <FaChartLine className="sx-nav-icon" />
        </Link>
      </footer>
    </div>
  );
}
