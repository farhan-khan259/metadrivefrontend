import { FaWhatsapp } from "react-icons/fa";
import { FaCheckCircle, FaMoneyBillWave, FaUsers, FaRocket } from "react-icons/fa";
import { MdOutlineWallet } from "react-icons/md";
import "./WelcomePopup.css";

export default function WelcomePopup({ userName = "User", isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="welcome-popup-overlay" role="dialog" aria-modal="true">
      <div className="welcome-popup-box">
        <button className="welcome-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="welcome-launch-pill">🚀 META DRIVE – Official Launch
</div>

        <h2 className="welcome-title">Launched: 28/2/2026
</h2>

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
          <li className="welcome-feature-item">
            <FaCheckCircle className="welcome-feature-icon" aria-hidden="true" />
            <span>No Team Needed For Withdrawal</span>
          </li>
          <li className="welcome-feature-item">
            <MdOutlineWallet className="welcome-feature-icon" aria-hidden="true" />
            <span>Easy Invest and Withdraw</span>
          </li>
          <li className="welcome-feature-item">
            <FaUsers className="welcome-feature-icon" aria-hidden="true" />
            <span>Enjoy commission up to 5 Levels</span>
          </li>
          <li className="welcome-feature-item">
            <FaWhatsapp className="welcome-feature-icon" aria-hidden="true" />
            <span>Join WhatsApp Channel</span>
          </li>
          <li className="welcome-feature-item">
            <FaRocket className="welcome-feature-icon" aria-hidden="true" />
            <span>Earn Daily with Meta Drive</span>
          </li>
        </ul>

        <a
          href="https://chat.whatsapp.com/FvRiiZs7DyhIDIDHxTdRNj?mode=gi_t"
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
