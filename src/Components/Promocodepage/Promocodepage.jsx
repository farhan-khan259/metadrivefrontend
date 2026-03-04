import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaInfoCircle, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Promocodepage.css";

const Promocodepage = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) {
        setHistoryLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "https://be.metadrive01.xyz/api/promoCode/history",
          { userId }
        );
        setHistory(response.data?.history || []);
      } catch (error) {
        console.error("Error fetching promo history:", error);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

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
          setHistory((prev) => [response.data.claim, ...prev]);
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
              <Link to="https://chat.whatsapp.com/FvRiiZs7DyhIDIDHxTdRNj?mode=gi_t">
                <FaLink /> Join Channel
              </Link>
            </button>
          </div>

          <section className="promo-section">
            <h3>
              <FaInfoCircle /> How It Works
            </h3>
            <p>
              By successfully inviting 30 active members, you will be promoted to a Superior Leader. At this level, the company authorizes you to generate one daily promo code for your team. Each team member can redeem this promo code once within a 24-hour period, with rewards randomly ranging between 1 PKR and 300 PKR.
            </p>
          </section>

          <section className="promo-history-section">
            <h3 className="promo-history-title">My Redeem History</h3>

            {historyLoading ? (
              <p className="promo-history-empty">Loading history...</p>
            ) : history.length === 0 ? (
              <p className="promo-history-empty">No promo redeemed yet.</p>
            ) : (
              <div className="promo-history-table-wrap">
                <table className="promo-history-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Code</th>
                      <th>Credited</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, index) => (
                      <tr key={item._id || `${item.code}-${index}`}>
                        <td data-label="#">{index + 1}</td>
                        <td data-label="Code">{item.code}</td>
                        <td data-label="Credited">Rs{item.creditedAmount}</td>
                        <td data-label="Date">
                          {new Date(item.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Promocodepage;
