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
  FiArrowLeft,
  FiFileText,
  FiLock,
  FiEye,
  FiInfo,
} from "react-icons/fi";
import { FaGift, FaTags, FaWhatsapp, FaCrown } from "react-icons/fa";
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import "./PrivacyPolicy.css";

const whatsappGroupLink = "https://chat.whatsapp.com/LCW0V5VeVAr9NFIx1asQis?mode=gi_t";

const sidebarMain = [
  { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
  { to: "/investmentplans", icon: <FiPieChart />, label: "Investment Plans" },
  { to: "/deposit", icon: <FiArrowDown />, label: "Deposit" },
  { to: "/withdraw", icon: <FiArrowUp />, label: "Withdraw" },
  { to: "/invite", icon: <FiUsers />, label: "Refer & Invite" },
  { to: "/team", icon: <FiUsers />, label: "My Team" },
  { to: "/managerranksystem", icon: <FaCrown />, label: "Manager Rank System" },
  { to: "/earningsummary", icon: <FiActivity />, label: "Earning Summary" },
  { to: "/transactionhistory", icon: <FiCreditCard />, label: "Transaction History" },
  { to: "/rankingdashboard", icon: <FaTags />, label: "Ranking Dashboard" },
];

const sidebarMore = [
  { to: "/profile", icon: <FiUser />, label: "Profile" },
  { to: "/support", icon: <FiHelpCircle />, label: "Support" },
  { to: "/privacypolicy", icon: <FiShield />, label: "Privacy Policy" },
];

export default function PrivacyPolicy() {
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
              <h2 className="sx-title">Privacy Policy</h2>
              <p className="sx-subtitle">How we protect and handle your data</p>
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

        <div className="pp-shell">
          {/* Header Section */}
          <div className="pp-header-section">
            <div className="pp-header-content">
              <div className="pp-header-badge">
                <FiShield /> PRIVACY & SECURITY
              </div>
              <h1 className="pp-header-title">Privacy Policy</h1>
              <p className="pp-header-subtitle">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="pp-card">
            {/* Launch Date */}
            <div className="pp-launch-date">
              <FiFileText className="pp-launch-icon" />
              <span><strong>Launching Date:</strong> 21/3/2026</span>
            </div>

            {/* Introduction */}
            <div className="pp-intro">
              <p>
                At <strong className="pp-highlight">SparkX</strong>, we are committed to protecting your privacy and maintaining transparent platform operations. This Privacy Policy explains how we collect, use, share, and protect your information when you use our investment platform, team commission features, and related digital services.
              </p>
            </div>

            {/* Sections Grid */}
            <div className="pp-sections-grid">
              {/* Section 1 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(34, 232, 140, 0.1)', color: '#22e88c' }}>
                  <FiInfo />
                </div>
                <h3 className="pp-section-title">1. About SparkX</h3>
                <p className="pp-section-text">
                  SparkX is a digital investment platform focused on digital asset management and team-based earning opportunities. Our system provides structured investment plans, transparent returns, detailed dashboards, and a multi-level commission model.
                </p>
              </div>

              {/* Section 2 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(90, 166, 255, 0.1)', color: '#5aa6ff' }}>
                  <FiEye />
                </div>
                <h3 className="pp-section-title">2. Information We Collect</h3>
                <ul className="pp-bullet-list">
                  <li><strong className="pp-highlight">Personal Information:</strong> Your name, address, email, phone number, and other contact details.</li>
                  <li><strong className="pp-highlight">Account Data:</strong> Login details, profile setup, referral code data, and account preferences.</li>
                  <li><strong className="pp-highlight">Technical Information:</strong> Your IP address, device type, browser type, cookies, and analytics data.</li>
                  <li><strong className="pp-highlight">Investment & Transaction Data:</strong> Plan subscriptions, deposits, withdrawals, commissions, and daily earning history.</li>
                  <li><strong className="pp-highlight">Communication Data:</strong> Any messages or feedback you send us.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(199, 125, 255, 0.1)', color: '#c77dff' }}>
                  <FiActivity />
                </div>
                <h3 className="pp-section-title">3. How We Use Your Information</h3>
                <ul className="pp-bullet-list">
                  <li>Providing and maintaining our services.</li>
                  <li>Processing investment plans, commission calculations, and daily earning records.</li>
                  <li>Communicating with you about your account, services, and promotions.</li>
                  <li>Improving our services and user experience.</li>
                  <li>Conducting market research and analysis.</li>
                  <li>Complying with legal obligations.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(255, 177, 77, 0.1)', color: '#ffb14d' }}>
                  <FiUsers />
                </div>
                <h3 className="pp-section-title">4. Data Sharing and Disclosure</h3>
                <ul className="pp-bullet-list">
                  <li><strong className="pp-highlight">Service Providers:</strong> Third-party vendors who assist us with payment processing, technical infrastructure, and secure data storage.</li>
                  <li><strong className="pp-highlight">Regulatory Authorities:</strong> To comply with applicable laws and lawful requests.</li>
                  <li><strong className="pp-highlight">Legal Obligations:</strong> If required by law or to protect SparkX or others.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(255, 90, 135, 0.1)', color: '#ff5a87' }}>
                  <FaGift />
                </div>
                <h3 className="pp-section-title">5. Team Commission & Rewards Transparency</h3>
                <p className="pp-section-text">
                  SparkX uses a multi-level team commission structure and bonus incentives. Bonus incentives may apply on team deposit milestones, including 100k, 200k, and 300k thresholds.
                </p>
              </div>

              {/* Section 6 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(255, 215, 0, 0.1)', color: '#ffd700' }}>
                  <FiFileText />
                </div>
                <h3 className="pp-section-title">6. Cookies and Tracking Technologies</h3>
                <p className="pp-section-text">
                  We use cookies and analytics technologies to improve product performance and user experience. You can manage cookie settings through your browser.
                </p>
              </div>

              {/* Section 7 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(144, 96, 255, 0.1)', color: '#9060ff' }}>
                  <FiLock />
                </div>
                <h3 className="pp-section-title">7. Data Security</h3>
                <p className="pp-section-text">
                  We implement industry-standard security measures to protect your data, including encryption and access controls. However, no system is completely secure, and we cannot guarantee absolute protection of your information.
                </p>
              </div>

              {/* Section 8 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(34, 232, 140, 0.1)', color: '#22e88c' }}>
                  <FiUser />
                </div>
                <h3 className="pp-section-title">8. Your Rights</h3>
                <ul className="pp-bullet-list">
                  <li><strong className="pp-highlight">Access and Update:</strong> Request access to and update your personal information.</li>
                  <li><strong className="pp-highlight">Data Deletion:</strong> Request deletion of your personal data, subject to legal obligations.</li>
                  <li><strong className="pp-highlight">Opt-Out:</strong> Opt out of marketing communications anytime.</li>
                </ul>
              </div>

              {/* Section 9 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(90, 166, 255, 0.1)', color: '#5aa6ff' }}>
                  <FiActivity />
                </div>
                <h3 className="pp-section-title">9. Retention of Data</h3>
                <p className="pp-section-text">
                  We retain your personal, account, and transaction data for as long as needed for operational, legal, security, and compliance purposes.
                </p>
              </div>

              {/* Section 10 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(199, 125, 255, 0.1)', color: '#c77dff' }}>
                  <FiUser />
                </div>
                <h3 className="pp-section-title">10. Children’s Privacy</h3>
                <p className="pp-section-text">
                  Our services are not intended for individuals under 13 years old. We do not knowingly collect personal information from children.
                </p>
              </div>

              {/* Section 11 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(255, 177, 77, 0.1)', color: '#ffb14d' }}>
                  <FiEye />
                </div>
                <h3 className="pp-section-title">11. Third-Party Websites</h3>
                <p className="pp-section-text">
                  Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their policies.
                </p>
              </div>

              {/* Section 12 */}
              <div className="pp-section-card">
                <div className="pp-section-icon" style={{ background: 'rgba(255, 90, 135, 0.1)', color: '#ff5a87' }}>
                  <FiFileText />
                </div>
                <h3 className="pp-section-title">12. Changes to this Privacy Policy</h3>
                <p className="pp-section-text">
                  We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes through appropriate means.
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="pp-footer">
              <p className="pp-thankyou">Thank you for choosing SparkX!</p>
              <p className="pp-contact">
                If you have any questions about this Privacy Policy, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}