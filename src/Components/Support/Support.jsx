import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiArrowDown,
  FiArrowUp,
  FiUsers,
  FiActivity,
  FiCreditCard,
  FiGrid,
  FiUser,
  FiHelpCircle,
  FiShield,
  FiMenu,
  FiPieChart,
  FiX,
  FiMail,
  FiPhone,
  FiClock,
  FiMessageCircle,
} from "react-icons/fi";
import { FaGift, FaTags, FaWhatsapp, FaHeadset, FaTelegram, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./Support.css";

const whatsappGroupLink = "https://chat.whatsapp.com/LCW0V5VeVAr9NFIx1asQis?mode=gi_t";
const customerServiceLink = "https://wa.me/923306088097";

const sidebarMain = [
  { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
  { to: "/investmentplans", icon: <FiPieChart />, label: "Investment Plans" },
  { to: "/deposit", icon: <FiArrowDown />, label: "Deposit" },
  { to: "/withdraw", icon: <FiArrowUp />, label: "Withdraw" },
  { to: "/invite", icon: <FiUsers />, label: "Refer & Invite" },
  { to: "/team", icon: <FiUsers />, label: "My Team" },
  { to: "/managerranksystem", icon: <FaGift />, label: "Manager Rank System" },
  { to: "/earningsummary", icon: <FiActivity />, label: "Earning Summary" },
  { to: "/transactionhistory", icon: <FiCreditCard />, label: "Transaction History" },
  { to: "/rankingdashboard", icon: <FaTags />, label: "Ranking Dashboard" },
];

const sidebarMore = [
  { to: "/profile", icon: <FiUser />, label: "Profile" },
  { to: "/support", icon: <FiHelpCircle />, label: "Support" },
  { to: "/privacypolicy", icon: <FiShield />, label: "Privacy Policy" },
];

export default function Support() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && sidebarOpen && !e.target.closest('.sx-sidebar')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sx-dashboard-root">
      {/* Sidebar */}
      <aside className={`sx-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sx-sidebar-top">
          <div className="sx-sidebar-brand">
            <span className="sx-sidebar-brand-text">SPARK</span>
            <img
              src={logoImage}
              alt="SparkX"
              className="sx-sidebar-logo"
            />
          </div>
          <button
            className="sx-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            type="button"
          >
            <FiX />
          </button>
        </div>

        <div className="sx-sidebar-links">
          {sidebarMain.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sx-sidebar-link ${
                location.pathname === item.to ? "active" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sx-sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="sx-sidebar-divider" />

        <div className="sx-sidebar-links">
          {sidebarMore.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sx-sidebar-link ${
                location.pathname === item.to ? "active" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sx-sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          <a
            href={whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="sx-sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="sx-sidebar-icon"><FaWhatsapp /></span>
            <span>WhatsApp Group</span>
          </a>

          <button
            type="button"
            className="sx-sidebar-link sx-logout"
            onClick={handleLogout}
          >
            <span className="sx-sidebar-icon"><FiX /></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sx-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="sx-main">
        <header className="sx-header">
          <div className="sx-header-left">
            <button
              className="sx-menu-btn"
              onClick={() => setSidebarOpen(true)}
              type="button"
            >
              <FiMenu />
            </button>
            <div>
              <h2 className="sx-title">Help & Support</h2>
              <p className="sx-subtitle">We're here to help 24/7</p>
            </div>
          </div>

          <div className="sx-header-right">
            <a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="sx-whatsapp-pill"
            >
              <FaWhatsapp /> Join WhatsApp
            </a>
            <button className="sx-icon-btn" type="button">
              <FiHelpCircle />
            </button>
            <button
              className="sx-profile-avatar-btn"
              onClick={() => navigate("/profile")}
              type="button"
            >
              <FiUser className="sx-profile-avatar-icon" />
            </button>
          </div>
        </header>

        <div className="support-shell">
          {/* Header Section */}
          <div className="support-header-section">
            <div className="support-header-content">
              <div className="support-header-badge">
                <FaHeadset /> 24/7 SUPPORT
              </div>
              <h1 className="support-header-title">How Can We Help You?</h1>
              <p className="support-header-subtitle">
                Our dedicated support team is available around the clock to assist you with any questions or concerns
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="support-grid">
            {/* Left Column - Welcome Message */}
            <div className="support-welcome-card">
              <div className="support-welcome-content">
                <div className="support-welcome-icon">
                  <FaHeadset />
                </div>
                <h3>Our Support Team</h3>
               
                <div className="support-welcome-divider" />
                <p className="support-welcome-english">
                  Our support team is here to serve you. Contact us for any issues or questions.
                </p>
              </div>
            </div>

            {/* Right Column - Support Options */}
            <div className="support-options-grid">
              {/* WhatsApp Group Card */}
              <a
                href={whatsappGroupLink}
                target="_blank"
                rel="noopener noreferrer"
                className="support-option-card whatsapp-card"
              >
                <div className="support-option-icon">
                  <FaWhatsapp />
                </div>
                <div className="support-option-content">
                  <h3>WhatsApp Group</h3>
                 
                  <p className="support-option-english">
                    Join our WhatsApp group for daily updates and announcements
                  </p>
                  <div className="support-option-footer">
                    <span className="support-option-badge">Active 24/7</span>
                    <FiArrowUp className="support-option-arrow" />
                  </div>
                </div>
              </a>

              {/* Customer Service Card */}
              <a
                href={customerServiceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="support-option-card service-card"
              >
                <div className="support-option-icon">
                  <FaHeadset />
                </div>
                <div className="support-option-content">
                  <h3>Customer Service</h3>
                  
                  <p className="support-option-english">
                    Direct customer service support
                  </p>
                  <div className="support-option-footer">
                    
                   
                  </div>
                </div>
              </a>

              {/* Email Support Card */}
              <div className="support-option-card email-card">
                <div className="support-option-icon">
                  <FiMail />
                </div>
                <div className="support-option-content">
                  <h3>Email Support</h3>
                  <p className="support-option-email">sparkx@gmail.com</p>
                  <p className="support-option-english">
                    Send us an email and we'll respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Phone Support Card */}
              <div className="support-option-card phone-card">
                <div className="support-option-icon">
                  <FiPhone />
                </div>
                <div className="support-option-content">
                  <h3>Phone Support</h3>
                  <p className="support-option-phone">+92 330 6088097</p>
                  <p className="support-option-english">
                    Call us for immediate assistance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="support-contact-section">
            <h3 className="support-contact-title">Contact Information</h3>
            <div className="support-contact-grid">
              <div className="support-contact-item">
                <div className="support-contact-icon">
                  <FaEnvelope />
                </div>
                <div className="support-contact-info">
                  <span>Email</span>
                  <strong>sparkx@gmail.com</strong>
                </div>
              </div>

              <div className="support-contact-item">
                <div className="support-contact-icon">
                  <FaPhoneAlt />
                </div>
                <div className="support-contact-info">
                  <span>Phone</span>
                  <strong>+92 330 6088097</strong>
                </div>
              </div>

              <div className="support-contact-item">
                <div className="support-contact-icon">
                  <FiClock />
                </div>
                <div className="support-contact-info">
                  <span>Hours</span>
                  <strong>24/7 Available</strong>
                </div>
              </div>

              <div className="support-contact-item">
                <div className="support-contact-icon">
                  <FaTelegram />
                </div>
                <div className="support-contact-info">
                  <span>Response Time</span>
                  <strong>Within 24 hours</strong>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section (Optional) */}
          <div className="support-faq-section">
            <h3 className="support-faq-title">Frequently Asked Questions</h3>
            <div className="support-faq-grid">
              <div className="support-faq-item">
                <h4>How long do withdrawals take?</h4>
                <p>Withdrawals are typically processed within 24 hours on business days.</p>
              </div>
              <div className="support-faq-item">
                <h4>What are the minimum deposit amounts?</h4>
                <p>Minimum deposit is PKR 500 for all payment methods.</p>
              </div>
              <div className="support-faq-item">
                <h4>How can I track my investments?</h4>
                <p>You can track all your investments in the Dashboard and Earning Summary sections.</p>
              </div>
              <div className="support-faq-item">
                <h4>Is my information secure?</h4>
                <p>Yes, we use industry-standard encryption to protect your data.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}