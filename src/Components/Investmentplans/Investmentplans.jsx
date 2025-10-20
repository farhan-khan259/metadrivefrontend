import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Investmentplans.css";

import img1 from "../../Assets/Pictures/planpic1.jpeg";
import img10 from "../../Assets/Pictures/planpic10.jpeg";
import img2 from "../../Assets/Pictures/planpic2.jpeg";
import img3 from "../../Assets/Pictures/planpic3.jpeg";
import img4 from "../../Assets/Pictures/planpic4.jpeg";
import img5 from "../../Assets/Pictures/planpic5.jpeg";
import img6 from "../../Assets/Pictures/planpic6.jpeg";
import img7 from "../../Assets/Pictures/planpic7.jpeg";
import img8 from "../../Assets/Pictures/planpic8.jpeg";
import img9 from "../../Assets/Pictures/planpic9.jpeg";

// ✅ All Investment Plans
const initialPlans = [
  {
    name: "Starter Boost Plan: 1",
    img: img1,
    members: 100,
    amount: 1000,
    daily: 40,
    total: 4,
    validity: 90,
    locked: false,
  },
  {
    name: "Growth Accelerator Plan: 2",
    img: img2,
    members: 50,
    amount: 3000,
    daily: 120,
    total: 4,
    validity: 60,
    locked: false,
  },
  {
    name: "SolarSaver Plan: 3",
    img: img3,
    members: 75,
    amount: 5000,
    daily: 210,
    total: 4.2,
    validity: 90,
    locked: true,
  },
  {
    name: "Prosperity Plan: 4", // 🔓 Updated
    img: img4,
    members: 120,
    amount: 10000,
    daily: 430,
    total: 4.3,
    validity: 90,
    locked: false, // unlocked now
  },
  {
    name: "Wealth Builder Plan: 5",
    img: img5,
    members: 80,
    amount: 15000,
    daily: 660,
    total: 4.4,
    validity: 90,
    locked: true,
  },
  {
    name: "EcoEnergy Plan: 6",
    img: img6,
    members: 95,
    amount: 20000,
    daily: 900,
    total: 4.5,
    validity: 90,
    locked: true,
  },
  {
    name: "FutureFortune Plan: 7",
    img: img7,
    members: 60,
    amount: 30000,
    daily: 1400,
    total: 4.7,
    validity: 90,
    locked: true,
  },
  {
    name: "SmartInvest Plan: 8",
    img: img8,
    members: 40,
    amount: 40000,
    daily: 1920,
    total: 4.8,
    validity: 90,
    locked: true,
  },
  {
    name: "Premium Returns Plan: 9",
    img: img9,
    members: 30,
    amount: 50000,
    daily: 2450,
    total: 4.9,
    validity: 90,
    locked: true,
  },
  {
    name: "Premium Builder Plan: 10",
    img: img10,
    members: 20,
    amount: 70000,
    daily: 3500,
    total: 5,
    validity: 90,
    locked: true,
  },
];

export default function Investmentplans() {
  const [plans, setPlans] = useState(initialPlans);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const navigate = useNavigate();

  // ✅ Get user from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  // ✅ Fetch user balance (teamData)
  const [teamData, setTeamData] = useState({});
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.post("https://be.solarx0.com/team", { userId });
        setTeamData(res.data);
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };
    if (userId) fetchTeamData();
  }, [userId]);

  // ✅ Fetch subscribers count
  useEffect(() => {
    const fetchCountSubscribePlanName = async () => {
      try {
        const res = await axios.get(
          "https://be.solarx0.com/api/plans/countSubscribePlanName"
        );
        setSubscribers(res.data.plans);
      } catch (err) {
        console.error("Error fetching subscriber counts:", err);
      }
    };
    fetchCountSubscribePlanName();
  }, []);

  // ✅ Unlock first 3 plans immediately and then one every 7 days
  useEffect(() => {
    setPlans((prevPlans) => {
      const newPlans = [...prevPlans];
      // Unlock first 3 plans
      if (newPlans[0]) newPlans[0].locked = false;
      if (newPlans[1]) newPlans[1].locked = false;
      if (newPlans[2]) newPlans[2].locked = false;
      return newPlans;
    });

    // Then unlock one more every 7 days
    const interval = setInterval(() => {
      setPlans((prevPlans) => {
        const newPlans = [...prevPlans];
        const nextLockedIndex = newPlans.findIndex((p) => p.locked);
        if (nextLockedIndex !== -1) {
          newPlans[nextLockedIndex].locked = false;
        } else {
          clearInterval(interval);
        }
        return newPlans;
      });
    }, 7 * 24 * 60 * 60 * 1000); // 7 days interval

    return () => clearInterval(interval);
  }, []);

  // ✅ Handle subscription
  const handleSubscribe = async (plan) => {
    if (plan.locked) return;

    if (!userId) {
      setErrorMessage("Please login before subscribing.");
      setShowError(true);
      return;
    }

    if (teamData?.user?.userBalance < plan.amount) {
      setErrorMessage("Your balance is not enough to subscribe to this plan.");
      setShowError(true);
      return;
    }

    setLoadingPlan(plan.name);

    try {
      const response = await axios.post("https://be.solarx0.com/api/plans", {
        user_id: userId,
        PlanName: plan.name,
        Investment: plan.amount,
        dailyEarning: plan.daily,
        durationDays: plan.validity,
      });

      if (response.data.success) {
        navigate("/activeplans", { state: { plan } });
      } else {
        setErrorMessage(response.data.message || "Failed to subscribe.");
        setShowError(true);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage("Network error. Please check your connection.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setShowError(true);
    } finally {
      setLoadingPlan(null);
    }
  };

  // ✅ Button text
  const getButtonText = (plan) => {
    if (loadingPlan === plan.name) return "Processing...";
    if (plan.locked) return "Locked 🔒";
    return "Subscribe Plan";
  };

  // ✅ Button style
  const getButtonClass = (plan) => {
    if (plan.locked) return "locked-btn";
    return "";
  };

  return (
    <div className="app5">
      <div className="plans-header5">
        <Link to="/dashboard" className="back-btn5">
          <FaArrowLeft />
        </Link>
        <h1 className="main-heading5">SOLAR X INVESTMENT PANEL</h1>
      </div>

      <div className="plans5">
        {plans.map((plan, index) => (
          <div key={index} className="plan-card5">
            <div className="plan-header5">
              <img src={plan.img} alt="Plan Logo" className="plan-logo5" />
              <div className="active-users5">
                <b>ACTIVE USERS 💪</b>
                <span>
                  {subscribers.find((p) => p.planName === plan.name)
                    ?.subscribers || 0}
                </span>
              </div>
            </div>

            <h2 className="plan-title5">{plan.name}</h2>

            <div className="plan-details5">
              <p>
                <b className="label-green">Investment:</b>{" "}
                <span className="orange">{plan.amount} PKR</span>
              </p>
              <p>
                <b className="label-red">Daily Earning:</b>{" "}
                <span className="green">{plan.daily} PKR</span>
              </p>
              <p>
                <b className="label-orange">Daily Profit:</b>{" "}
                <span className="red">{plan.total} %</span>
              </p>
              <p>
                <b className="label-blue">Earning Return Time:</b>{" "}
                <span className="green">24 Hours After</span>
              </p>
            </div>

            <div className="subscribe-section5">
              <button
                disabled={plan.locked || loadingPlan === plan.name}
                onClick={() => handleSubscribe(plan)}
                className={`subscribe-btn5 ${getButtonClass(plan)}`}
              >
                {getButtonText(plan)}
              </button>

              {plan.locked && (
                <p className="coming-soon5">Plans are Locked 🔐 Coming Soon</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showError && (
        <div className="deposit-success-overlay">
          <div className="deposit-success-box">
            <h2>{!userId ? "Please login" : "❌ Subscription Failed"}</h2>
            <p>{errorMessage}</p>
            <button onClick={() => setShowError(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
