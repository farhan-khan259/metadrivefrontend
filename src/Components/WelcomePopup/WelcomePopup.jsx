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

        <div className="welcome-launch-pill">🚀 META DRIVE – Official Launch
</div>

        <h2 className="welcome-title">Launched: 28/2/2026
</h2>

        <div className="welcome-stats">
          <p className="welcomeline">🎉 Welcome to Meta Drive!
Start your earning journey today with simple and secure investment plans.
</p>
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
          <li>👥 No Team Required for Withdrawal
</li>
          <li>🔄 Easy Invest & Easy Withdraw System
</li>
          <li>🤝 Have a Team?
Enjoy commission up to 5 Levels and boost your income!
</li>
<li>
📲 Join Our WhatsApp Channel
Stay updated with latest news, offers & announcements.
</li>
<li>💡 Power Your Future with Meta Drive
Start Today – Earn Daily!</li>
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
