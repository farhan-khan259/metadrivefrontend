import { FaWhatsapp } from "react-icons/fa";
import "./WelcomePopup.css";

export default function WelcomePopup({ userName = "User", isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="welcome-popup-overlay sx-theme-bg" role="dialog" aria-modal="true">
      <div className="welcome-popup-box sx-theme-card">
        <button 
          className="welcome-close-btn sx-theme-btn" 
          onClick={onClose} 
          aria-label="Close"
        >
          ✕
        </button>

        <div className="welcome-launch-pill sx-theme-pill">
          🚀 SPARKX
        </div>

        <h2 className="welcome-title sx-theme-gradient-text">
          Welcome to SparkX!
        </h2>

        <div className="welcomeline sx-theme-muted">
          Start earning daily rewards. Invest easily, withdraw anytime.
          <br />
          No team required. Secure, fast, and simple.
        </div>

        <div className="welcome-stats">
          <div className="welcome-stat-row">
            <span>Min Deposit</span>
            <strong>5$</strong>
          </div>
          <div className="welcome-stat-row">
            <span>Min Withdrawal</span>
            <strong>0.65$</strong>
          </div>
        </div>

        <a
          href="https://chat.whatsapp.com/FvRiiZs7DyhIDIDHxTdRNj?mode=gi_t"
          target="_blank"
          rel="noopener noreferrer"
          className="welcome-whatsapp-btn sx-theme-btn"
        >
          <FaWhatsapp />
          <span>Join WhatsApp Channel</span>
        </a>
      </div>
    </div>
  );
}