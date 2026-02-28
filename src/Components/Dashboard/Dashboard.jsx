import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChartLine, FaEye, FaEyeSlash, FaWhatsapp } from "react-icons/fa";
import { FiHome, FiMenu, FiPieChart, FiUsers } from "react-icons/fi";
import {
  RiBankLine,
  RiGroupLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoimagemetadrive from "../../Assets/Pictures/metadrivelogo.jpeg";
import placeholderPlanImg1 from "../../Assets/Pictures/plan1.jpeg";
import placeholderPlanImg2 from "../../Assets/Pictures/plan2.jpeg";
import placeholderPlanImg3 from "../../Assets/Pictures/plan3.jpeg";
import placeholderPlanImg4 from "../../Assets/Pictures/plan4.jpeg";
import placeholderPlanImg5 from "../../Assets/Pictures/plan5.jpeg";
import placeholderPlanImg6 from "../../Assets/Pictures/plan6.jpeg";
import placeholderPlanImg7 from "../../Assets/Pictures/plan7.jpeg";
import placeholderPlanImg8 from "../../Assets/Pictures/plan8.jpeg";
import metaAiImg from "../../Assets/Pictures/metaai.jpg";
import metaBusinessImg from "../../Assets/Pictures/metabuisness.jpeg";
import Settings from "../Settings/Settings";
import WelcomePopup from "../WelcomePopup/WelcomePopup";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);

  const shouldShowWelcomePopup =
    new URLSearchParams(location.search).get("welcome") === "1" &&
    !welcomeDismissed;

  const handleCloseWelcomePopup = () => {
    setWelcomeDismissed(true);
    navigate("/dashboard", { replace: true });
  };

  // User from localStorage
  const user = useMemo(() => {
    const str = localStorage.getItem("user");
    return str ? JSON.parse(str) : null;
  }, []);
  const userId = user?._id;

  // Team data and user plans
  const [teamData, setTeamData] = useState({
    user: {},
    plans: [],
    commissionSummary: {},
  });
  const [userPlans, setUserPlans] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(false);

  // State for dynamic invested people counts
  const [investedCounts, setInvestedCounts] = useState({});
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fetch team data
  const fetchTeamData = useCallback(async () => {
    if (!userId) return;
    setLoadingTeam(true);
    try {
      const res = await axios.post("https://be.metadrive01.xyz/team", { userId });
      setTeamData(res.data || {});
    } catch (err) {
      console.error("Error fetching team data:", err);
    } finally {
      setLoadingTeam(false);
    }
  }, [userId]);

  // Fetch user plans
  const fetchUserPlans = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `https://be.metadrive01.xyz/api/plans/user/active/${userId}`
      );
      if (res.data.success) {
        setUserPlans(res.data.plans || []);
      }
    } catch (err) {
      console.error("Error fetching user plans:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchTeamData();
    fetchUserPlans();
  }, [fetchTeamData, fetchUserPlans]);

  // ✅ CORRECT TOTAL BALANCE CALCULATION
  const totalBalance = useMemo(() => {
    // User's available balance (includes deposits, withdrawals, commissions, claimed plans)
    return teamData?.user?.userbalance || 0;
  }, [teamData]);

  // ✅ TOTAL NET WORTH (For display purposes - Available + Active Plans Value)
  const totalNetWorth = useMemo(() => {
    const availableBalance = teamData?.user?.userbalance || 0;

    // Active plans current value (investment + earned profit)
    const activePlansValue = userPlans.reduce((total, plan) => {
      if (plan.status === "running") {
        const startDate = new Date(plan.startingDate);
        const currentDate = new Date();
        const daysPassed = Math.floor(
          (currentDate - startDate) / (1000 * 60 * 60 * 24)
        );
        const earnedDays = Math.min(daysPassed, plan.days);
        const earnedAmount = plan.dailyEarning * earnedDays;
        return total + plan.Investment + earnedAmount;
      }
      return total;
    }, 0);

    return availableBalance + activePlansValue;
  }, [teamData, userPlans]);

  // Initialize and update invested counts daily
  useEffect(() => {
    const generateInitialCounts = () => {
      const counts = {};
      for (let i = 0; i < 5; i++) {
        counts[i] = Math.floor(Math.random() * 11) + 20;
      }
      for (let i = 5; i < 8; i++) {
        counts[i] = Math.floor(Math.random() * 11) + 5;
      }
      return counts;
    };

    const loadCounts = () => {
      const savedCounts = localStorage.getItem("dashboardInvestedCounts");
      const savedLastUpdate = localStorage.getItem("dashboardLastUpdate");

      if (savedCounts && savedLastUpdate) {
        const lastUpdateDate = new Date(savedLastUpdate);
        const today = new Date();
        const isSameDay =
          lastUpdateDate.toDateString() === today.toDateString();

        if (isSameDay) {
          setInvestedCounts(JSON.parse(savedCounts));
          setLastUpdate(lastUpdateDate);
          return JSON.parse(savedCounts);
        }
      }

      const newCounts = generateInitialCounts();
      const now = new Date();
      localStorage.setItem(
        "dashboardInvestedCounts",
        JSON.stringify(newCounts)
      );
      localStorage.setItem("dashboardLastUpdate", now.toISOString());
      setInvestedCounts(newCounts);
      setLastUpdate(now);
      return newCounts;
    };

    const updateCountsDaily = () => {
      const now = new Date();
      const savedLastUpdate = localStorage.getItem("dashboardLastUpdate");
      if (!savedLastUpdate) {
        loadCounts();
        return;
      }

      const lastUpdateDate = new Date(savedLastUpdate);
      const today = new Date();
      const isNewDay = lastUpdateDate.toDateString() !== today.toDateString();

      if (isNewDay) {
        setInvestedCounts((prev) => {
          const newCounts = { ...prev };
          Object.keys(newCounts).forEach((key) => {
            const index = parseInt(key);
            let randomIncrease =
              index >= 5
                ? Math.floor(Math.random() * 11) + 5
                : Math.floor(Math.random() * 11) + 20;
            newCounts[key] += randomIncrease;
          });
          localStorage.setItem(
            "dashboardInvestedCounts",
            JSON.stringify(newCounts)
          );
          localStorage.setItem("dashboardLastUpdate", now.toISOString());
          setLastUpdate(now);
          return newCounts;
        });
      }
    };

    loadCounts();
    const interval = setInterval(updateCountsDaily, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const [showBalance, setShowBalance] = useState(true);

  // Subscribers counts
  const [subscribersCounts, setSubscribersCounts] = useState([]);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          "https://be.metadrive01.xyz/api/plans/countSubscribePlanName"
        );
        setSubscribersCounts(res.data.plans || []);
      } catch (err) {
        console.error("Error fetching subscriber counts:", err);
      }
    };
    fetchCounts();
  }, []);

  // Dynamic percentage calculations
  const calcDaily = (amt, percent) =>
    Math.round(Number(amt || 0) * (percent / 100));
  const calcTotal = (amt, percent, days) =>
    Math.round(calcDaily(amt, percent) * (days || 0));

  // Plans to show on dashboard
  const dashboardPlans = useMemo(() => {
    return [
      {
        title: "Meta Drive",
        days: 180,
        min: 1000,
        max: 1000,
        percent: 5.5,
        img: placeholderPlanImg1,
        invested: investedCounts[0] || 25,
        locked: false,
      },
      {
        title: "Meta Messenger Community",
        days: 180,
        min: 3000,
        max: 3000,
        percent: 5.7,
        img: placeholderPlanImg2,
        invested: investedCounts[1] || 25,
        locked: false,
      },
      {
        title: "Meta WhatsApp Team",
        days: 180,
        min: 5000,
        max: 5000,
        percent: 6,
        img: placeholderPlanImg3,
        invested: investedCounts[2] || 25,
        locked: false,
      },
      {
        title: "Meta Instagram / Social Studies",
        days: 180,
        min: 10000,
        max: 10000,
        percent: 6.3,
        img: placeholderPlanImg4,
        invested: investedCounts[3] || 25,
        locked: false,
      },
      {
        title: "Meta Facebook / Social Media",
        days: 180,
        min: 20000,
        max: 20000,
        percent: 6.5,
        img: placeholderPlanImg5,
        invested: investedCounts[4] || 25,
        locked: true,
      },
      {
        title: "Meta Oculus / Products",
        days: 180,
        min: 30000,
        max: 30000,
        percent: 6.7,
        img: placeholderPlanImg6,
        invested: investedCounts[5] || 10,
        locked: true,
      },
      {
        title: "Meta Workplace / Teams",
        days: 180,
        min: 40000,
        max: 40000,
        percent: 7,
        img: placeholderPlanImg7,
        invested: investedCounts[6] || 10,
        locked: true,
      },
      {
        title: "Meta Portal / LCD",
        days: 180,
        min: 50000,
        max: 50000,
        percent: 7.5,
        img: placeholderPlanImg8,
        invested: investedCounts[7] || 10,
        locked: true,
      },
      {
        title: "Meta AI / Artificial Intelligence",
        days: 180,
        min: 80000,
        max: 80000,
        percent: 8,
        img: metaAiImg,
        invested: investedCounts[8] || 10,
        locked: true,
      },
      {
        title: "Meta Business",
        days: 180,
        min: 100000,
        max: 100000,
        percent: 9,
        img: metaBusinessImg,
        invested: investedCounts[9] || 10,
        locked: true,
      },
    ];
  }, [investedCounts]);

  // INVEST MODAL state
  const [modalOpen, setModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(null);
  const [investAmount, setInvestAmount] = useState("");
  const [modalError, setModalError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openInvestModal = (plan) => {
    setActivePlan(plan);
    setInvestAmount(plan.min);
    setModalError("");
    setModalOpen(true);
  };

  const closeInvestModal = () => {
    setModalOpen(false);
    setActivePlan(null);
    setInvestAmount("");
    setModalError("");
  };

  const confirmInvest = async () => {
    setModalError("");
    if (!activePlan) return;
    const amt = Number(investAmount);
    if (!amt || isNaN(amt)) {
      setModalError("Enter a valid amount");
      return;
    }
    if (amt !== activePlan.min) {
      setModalError(`Amount must be exactly ${activePlan.min} PKR`);
      return;
    }
    const userBalance = teamData?.user?.userbalance || 0;
    if (amt > userBalance) {
      setModalError("Insufficient balance. Deposit first.");
      return;
    }
    if (!userId) {
      setModalError("Please login to invest.");
      return;
    }

    setSubmitting(true);
    try {
      // `percent` is DAILY profit percentage for the plan.
      const baseDaily = Math.round(amt * (activePlan.percent / 100));
      const totalProfit = baseDaily * activePlan.days;
      const lastDay = baseDaily;

      const payload = {
        user_id: userId,
        PlanName: activePlan.title,
        Investment: amt,
        days: activePlan.days,
        // Backend recomputes schedule too; we send these for transparency/backwards support.
        dailyEarning: baseDaily,
        returnProfit: totalProfit,
        lastDayEarning: lastDay,
        profitPercentage: activePlan.percent + "%",
      };

      console.log("Creating plan with payload:", payload);

      const res = await axios.post("https://be.metadrive01.xyz/api/plans", payload);
      if (res.data?.success) {
        // Update balance immediately
        setTeamData((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            userbalance: prev.user.userbalance - amt,
          },
        }));

        await fetchTeamData();
        await fetchUserPlans();

        closeInvestModal();
        navigate("/activeplans");
      } else {
        setModalError(res.data?.message || "Subscription failed.");
      }
    } catch (err) {
      console.error("subscribe err:", err);
      setModalError(err.response?.data?.message || "Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getSubscribersFor = (plan) => {
    if (!subscribersCounts || !Array.isArray(subscribersCounts))
      return plan.invested || 0;
    const found = subscribersCounts.find((s) => {
      if (!s?.planName) return false;
      if (s.planName.toString().includes(String(plan.days))) return true;
      if (
        plan.title &&
        s.planName.toLowerCase().includes(plan.title.toLowerCase())
      )
        return true;
      if (s.planName.toString().includes(String(plan.min))) return true;
      return false;
    });
    return found?.subscribers ?? plan.invested ?? 0;
  };

  const whatsappGroupLink =
    "https://chat.whatsapp.com/LCW0V5VeVAr9NFIx1asQis?mode=gi_t";

  const formatLastUpdate = () => {
    if (!lastUpdate) return "Today";
    const today = new Date();
    const updateDate = new Date(lastUpdate);
    if (updateDate.toDateString() === today.toDateString()) {
      return "Today";
    } else {
      return updateDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="sx-dashboard-root">
      <WelcomePopup
        userName={user?.fullName || user?.name || "Nisbat X"}
        isOpen={shouldShowWelcomePopup}
        onClose={handleCloseWelcomePopup}
      />

      {/* TOP: Welcome header */}

      <div className="sx-header">
        <div className="sx-header-left">
          <div className="sx-logo-container">
            <img src={logoimagemetadrive} alt="MetaDrive" className="sx-logo" />
          </div>
          <div className="sx-welcome-text">
            <div className="sx-welcome-main">Meta Drive</div>
            <div className="sx-welcome-name">
              Welcome back, {user?.fullName || user?.name || "User"}
            </div>
          </div>
        </div>

        <div className="sx-header-right">
          <div className="sx-nav-btn" onClick={() => setShowSettings(true)}>
            <FiMenu className="sx-nav-icon" />
          </div>
        </div>
      </div>

    {/* Total Balance Card */}
      <div className="sx-balance-card">
        <div className="sx-balance-header">
          <div className="sx-balance-title">Available Balance</div>
          <button
            className="sx-eye-toggle"
            onClick={() => setShowBalance(!showBalance)}
            type="button"
          >
            {showBalance ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div className="sx-balance-value">
          {showBalance
            ? Number(totalBalance || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) + " PKR"
            : "••••••"}
        </div>
        <div className="sx-net-worth">
          Net Worth:{" "}
          {showBalance
            ? Number(totalNetWorth || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) + " PKR"
            : "••••••"}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="sx-quick-actions">
        <div className="sx-action" onClick={() => navigate("/deposit")}>
          <div className="sx-action-icon">
            <RiBankLine className="sx-nav-icon" />
          </div>
          <div className="sx-action-label">Deposit</div>
        </div>
        <div className="sx-action" onClick={() => navigate("/withdraw")}>
          <div className="sx-action-icon">
            <RiMoneyDollarCircleLine className="sx-nav-icon" />
          </div>
          <div className="sx-action-label">Withdraw</div>
        </div>
        <div className="sx-action" onClick={() => navigate("/invite")}>
          <div className="sx-action-icon">
            <RiGroupLine className="sx-nav-icon" />
          </div>
          <div className="sx-action-label">Invite</div>
        </div>
        <a
          href={whatsappGroupLink}
          target="_blank"
          rel="noopener noreferrer"
          className="sx-action whatsapp-group-action"
        >
          <div className="sx-action-icon">
            <FaWhatsapp className="sx-nav-icon" />
          </div>
          <div className="sx-action-label">
            <span className="desktop-text">Join MetaDrive Whatsapp Group</span>
            <span className="mobile-text">WhatsApp Group</span>
          </div>
        </a>
      </div>

      {/* Investment Plans Heading */}
      <div className="sx-plans-header">
        <h3>INVESTMENT DIFFERENT PRODUCTS</h3>
        <p className="sx-sub">You can buy any product you want🔥</p>
        <div className="sx-update-indicator">
          📊 Investor counts updated daily • Last update: {formatLastUpdate()}
        </div>
      </div>

      {/* Plans List */}
      <div className="sx-plans-list">
        {dashboardPlans.map((p, idx) => (
          <div className="sx-plan-card" key={idx}>
            <div className="sx-plan-img-wrap">
              <img src={p.img} alt={p.title} className="sx-plan-img" />
              <div className="sx-plan-percent">{p.percent}%/PER DAY</div>
              {idx < 5 && <div className="sx-popular-badge">🔥 POPULAR</div>}
            </div>
            <div className="sx-plan-body">
              <div className="sx-plan-title">{p.title}</div>
              <div className="sx-plan-range">
                <span className="sx-range-min">{p.min.toLocaleString()} PKR</span>
              </div>
              <div className="sx-invested-people">
                <div className="sx-invested-header">
                  <span className="sx-invested-icon"></span>
                  Activate Your Product
                  <span className="sx-days-badge">{p.days} days</span>
                </div>
                <strong className="sx-invested-count">
                  {getSubscribersFor(p).toLocaleString()}
                </strong>
              </div>
              <div className="sx-plan-cta">
                <button
                  className="sx-invest-btn"
                  onClick={() => !p.locked && openInvestModal(p)}
                  disabled={p.locked}
                >
                  {p.locked ? "TEMPORARY OFF  🔐" : "INVEST NOW"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <footer className="sx-bottom-nav">
        <Link to="/dashboard" className="sx-nav-btn active">
          <FiHome className="sx-nav-icon" />
        </Link>
        <Link to="/activeplans" className="sx-nav-btn">
          <FiPieChart className="sx-nav-icon" />
        </Link>
        <Link to="/team" className="sx-nav-btn">
          <FiUsers className="sx-nav-icon" />
        </Link>{" "}
        <Link to="/earningsummary" className="sx-nav-btn">
          <FaChartLine className="sx-nav-icon" />
        </Link>
      </footer>

      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {/* INVEST MODAL */}
      {modalOpen && activePlan && (
        <div className="sx-modal-overlay">
          <div className="sx-modal">
            <div className="sx-modal-header">
              <h4>Invest in {activePlan.title}</h4>
              <button className="sx-modal-close" onClick={closeInvestModal}>
                ✖
              </button>
            </div>
            <div className="sx-modal-body">
              <img src={activePlan.img} alt="" className="sx-modal-img" />
              <p className="sx-modal-range">
                 Price : {activePlan.min.toLocaleString()} PKR
              </p>
              <div className="sx-popularity-info">
                <div className="sx-popularity-badge">
                  {getSubscribersFor(activePlan).toLocaleString()}+ active
                  investors
                </div>
                <p className="sx-popularity-note">
                  Join {getSubscribersFor(activePlan).toLocaleString()}{" "}
                  investors who trust this plan
                </p>
              </div>
              <div id="sx-balance-value">
                Total Balance :
                {showBalance
                  ? (totalBalance || 0).toLocaleString() + " PKR"
                  : "••••••"}
              </div>

              <div className="sx-calc">
                <div>
                  <small>Daily Profit ({activePlan.percent}%)</small>
                  <div className="sx-calc-value">
                    {calcDaily(
                      investAmount || activePlan.min,
                      activePlan.percent
                    )}{" "}
                    PKR
                  </div>
                </div>
                <div>
                  <small>Total Profit ({activePlan.days} days)</small>
                  <div className="sx-calc-value">
                    {calcTotal(
                      investAmount || activePlan.min,
                      activePlan.percent,
                      activePlan.days
                    )}{" "}
                    PKR
                  </div>
                </div>
              </div>
              {modalError && <div className="sx-modal-error">{modalError}</div>}
            </div>
            <div className="sx-modal-footer">
              <button className="sx-btn-cancel" onClick={closeInvestModal}>
                Cancel
              </button>
              <button
                className="sx-btn-confirm"
                onClick={confirmInvest}
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Confirm Invest"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
