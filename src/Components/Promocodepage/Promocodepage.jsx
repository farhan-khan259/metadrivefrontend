import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaInfoCircle, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Promocodepage.css";

function formatTimeAgo(value) {
  const now = Date.now();
  const time = new Date(value).getTime();

  if (!Number.isFinite(time)) {
    return "just now";
  }

  const diffMs = Math.max(0, now - time);
  const totalSeconds = Math.floor(diffMs / 1000);

  if (totalSeconds < 60) {
    return `${totalSeconds}s ago`;
  }

  const totalMinutes = Math.floor(totalSeconds / 60);
  if (totalMinutes < 60) {
    return `${totalMinutes}m ago`;
  }

  const totalHours = Math.floor(totalMinutes / 60);
  if (totalHours < 24) {
    const minutesPart = totalMinutes % 60;
    if (minutesPart === 0) {
      return `${totalHours}h ago`;
    }
    return `${totalHours}h ${minutesPart}m ago`;
  }

  const totalDays = Math.floor(totalHours / 24);
  return `${totalDays}d ago`;
}

const Promocodepage = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState(null);
  const [liveClaims, setLiveClaims] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.post("https://be.metadrive01.xyz/api/promoCode/liveClaims");
        setLiveClaims(response.data?.history || []);
      } catch (error) {
        console.error("Error fetching promo history:", error);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleRedeem = async () => {
    if (!promoCode.trim()) {
      setMessage({ type: "error", text: "Please enter a promo code" });
      return;
    }

    try {
      const response = await axios.post(
        "https://be.metadrive01.xyz/api/promoCode/apply",
        {
          code: promoCode,
          userId: userId,
        }
      );

      if (response.data.success) {
        setMessage({
          type: "success",
          text: `Promo applied successfully! You received Rs${response.data.amount}`,
        });
        if (response.data.claim) {
          setLiveClaims((prev) => [response.data.claim, ...prev]);
        }
        setPromoCode("");
      } else {
        setMessage({ type: "error", text: response.data.message });
      }
    } catch (error) {
      console.error("Error redeeming promo:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to redeem promo",
      });
    }
  };

  return (
    <div className="promo-container-new">
      <div className="promo-header-section">
        <div className="promo-header-row">
          <Link to="/setting" className="promo-back-link" aria-label="Back">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="promo-title">Promo Code</h1>
        </div>
      </div>

      <div className="promo-content">
        <div className="promo-card">
          <div className="promo-welcome-box">
            <p className="promo-subtitle">Daily reward opportunity for everyone!</p>
          </div>

          <div className="promo-input-box">
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="redeem-btn" onClick={handleRedeem}>
              Redeem
            </button>
          </div>

          {message && (
            <p className={`promo-message ${message.type}`}>{message.text}</p>
          )}

          <div className="promo-join">
            <p>
              <b>Want exclusive high-reward promo codes?</b>
              <br />
              Join our official WhatsApp channel for special Promo code!
            </p>
            <button className="join-btn">
              <Link to="https://chat.whatsapp.com/E3V0WcJKMru954hzfPIGMy?mode=wwt">
                <FaLink /> Join Channel
              </Link>
            </button>
          </div>

          <section className="promo-section">
            <h3>
              <FaInfoCircle /> How It Works
            </h3>
            <p className="promo-bullet-heading"><strong>🌟 Superior Leader Promotion 🌟</strong></p>
            <ul className="promo-bullets">
              <li>
                By successfully inviting <strong>50 active members,</strong> you will be promoted to the <strong>Superior Leader</strong> level. 🎖️
              </li>
              <li>
                At this level, the company authorizes you to <strong>generate one promo code daily</strong> for your team. 🔑
              </li>
              <li>
                👥 Each team member can <strong>redeem the promo code once within a 24-hour period.</strong>
              </li>
              <li>
                🎁 Rewards are <strong>randomly distributed,</strong> ranging from <strong>1 PKR to 1000 PKR.</strong>
              </li>
              <li>
                🚀 Grow your team, unlock leadership benefits, and enjoy exciting daily rewards!
              </li>
            </ul>
          </section>

          <section className="promo-history-section">
            <h3 className="promo-history-title">Live Rewards</h3>
            <p className="promo-history-subtitle">Recent Promo Code Claims(24h)</p>

            {historyLoading ? (
              <p className="promo-history-empty">Loading live rewards...</p>
            ) : liveClaims.length === 0 ? (
              <p className="promo-history-empty">No claims in the last 24 hours.</p>
            ) : (
              <div className="promo-live-list-wrap">
                <div className="promo-live-list">
                  {liveClaims.map((item, index) => (
                    <div className="promo-live-item" key={item._id || `${item.code}-${index}`}>
                      <div className="promo-live-left">
                        <strong className="promo-live-user">{item.userName || "User"}</strong>
                        <span className="promo-live-time">{formatTimeAgo(item.createdAt)}</span>
                      </div>
                      <div className="promo-live-right">
                        <strong className="promo-live-amount">PKR {Number(item.creditedAmount || 0).toFixed(2)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Promocodepage;
