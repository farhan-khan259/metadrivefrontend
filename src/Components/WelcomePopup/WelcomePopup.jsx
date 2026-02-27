import { FaWhatsapp } from "react-icons/fa";
import "./WelcomePopup.css";

export default function WelcomePopup({ userName = "User", isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="welcome-popup-overlay" role="dialog" aria-modal="true">
      <div className="welcome-popup-box">
        <button className="welcome-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="welcome-launch-pill">🚀 Launched 28/2/2026</div>

        <h2 className="welcome-title">Welcome {userName}!</h2>

        <div className="welcome-stats">
          <div className="welcome-stat-row">
            <span>Minimum Deposit</span>
            <strong>PKR 1000</strong>
          </div>
          <div className="welcome-stat-row">
            <span>Minimum Withdrawal</span>
            <strong>PKR 300</strong>
          </div>
        </div>

        <ul className="welcome-features">
          <li>✓ No team required for withdrawal</li>
          <li>✓ Invest &amp; withdraw easily</li>
          <li>✓ Have team? Enjoy commission up to 5 levels</li>
        </ul>

        <a
          href="https://chat.whatsapp.com/LCW0V5VeVAr9NFIx1asQis?mode=gi_t"
          target="_blank"
          rel="noopener noreferrer"
          className="welcome-whatsapp-btn"
        >
          <FaWhatsapp />
          <span>Join WhatsApp Channel</span>
        </a>
      </div>
    </div>
  );
}
