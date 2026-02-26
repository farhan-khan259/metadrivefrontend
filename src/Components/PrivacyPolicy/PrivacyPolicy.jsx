import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      {/* Header Section */}
      <div className="privacy-header-section">
        <div className="privacy-header">
          <Link to="/dashboard" className="privacy-back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="privacy-title">Privacy Policy</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="privacy-content">
        <div className="privacy-card">
          <p className="launch-date">
            <strong>Launching Date:</strong> 1/3/2026
          </p>

          <p className="privacy-intro">
            At <strong className="metadrive-highlight">MetaDrive</strong>, we
            are committed to protecting your privacy and maintaining transparent
            platform operations. This Privacy Policy explains how we collect,
            use, share, and protect your information when you use our
            investment platform, team commission features, and related digital
            services.
          </p>

          {/* Section 1 */}
          <div className="section">
            <h3 className="section-title">1. About MetaDrive</h3>
            <p className="privacy-text">
              MetaDrive is a digital investment platform focused on digital
              asset management and team-based earning opportunities. Our system
              provides structured investment plans, transparent returns,
              detailed dashboards, and a multi-level commission model.
            </p>
          </div>

          {/* Section 2 */}
          <div className="section">
            <h3 className="section-title">2. Information We Collect</h3>
            <ul className="bullet-listprivacy">
              <li>
                <strong className="metadrive-highlight">
                  Personal Information:
                </strong>{" "}
                Your name, address, email, phone number, and other contact
                details.
              </li>
              <li>
                <strong className="metadrive-highlight">Account Data:</strong>{" "}
                Login details, profile setup, referral code data, and account
                preferences.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Technical Information:
                </strong>{" "}
                Your IP address, device type, browser type, cookies, and
                analytics data.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Investment & Transaction Data:
                </strong>{" "}
                Plan subscriptions, deposits, withdrawals, commissions, and
                daily earning history.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Communication Data:
                </strong>{" "}
                Any messages or feedback you send us.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="section">
            <h3 className="section-title">3. How We Use Your Information</h3>
            <ul className="bullet-listprivacy">
              <li>Providing and maintaining our services.</li>
              <li>
                Processing investment plans, commission calculations, and daily
                earning records.
              </li>
              <li>
                Communicating with you about your account, services, and
                promotions.
              </li>
              <li>Improving our services and user experience.</li>
              <li>Conducting market research and analysis.</li>
              <li>Complying with legal obligations.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="section">
            <h3 className="section-title">4. Data Sharing and Disclosure</h3>
            <ul className="bullet-listprivacy">
              <li>
                <strong className="metadrive-highlight">Service Providers:</strong>{" "}
                Third-party vendors who assist us with payment processing,
                technical infrastructure, and secure data storage.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Regulatory Authorities:
                </strong>{" "}
                To comply with applicable laws and lawful requests.
              </li>
              <li>
                <strong className="metadrive-highlight">Legal Obligations:</strong>{" "}
                If required by law or to protect MetaDrive or others.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="section">
            <h3 className="section-title">
              5. Team Commission & Rewards Transparency
            </h3>
            <p className="privacy-text">
              MetaDrive uses a multi-level team commission structure and bonus
              incentives. Current team rates are Level 1 (6.5%), Level 2
              (3.3%), Level 3 (2.5%), Level 4 (2%), and Level 5 (1.5%). Bonus
              incentives may apply on team deposit milestones, including 100k,
              200k, and 300k thresholds.
            </p>
          </div>

          {/* Section 6 */}
          <div className="section">
            <h3 className="section-title">6. Cookies and Tracking Technologies</h3>
            <p className="privacy-text">
              We use cookies and analytics technologies to improve product
              performance and user experience. You can manage cookie settings
              through your browser.
            </p>
          </div>

          {/* Section 7 */}
          <div className="section">
            <h3 className="section-title">7. Data Security</h3>
            <p className="privacy-text">
              We implement industry-standard security measures to protect your
              data, including encryption and access controls. However, no system
              is completely secure, and we cannot guarantee absolute protection
              of your information.
            </p>
          </div>

          {/* Section 8 */}
          <div className="section">
            <h3 className="section-title">8. Your Rights</h3>
            <ul className="bullet-listprivacy">
              <li>
                <strong className="metadrive-highlight">Access and Update:</strong>{" "}
                Request access to and update your personal information.
              </li>
              <li>
                <strong className="metadrive-highlight">Data Deletion:</strong>{" "}
                Request deletion of your personal data, subject to legal
                obligations.
              </li>
              <li>
                <strong className="metadrive-highlight">Opt-Out:</strong> Opt out
                of marketing communications anytime.
              </li>
            </ul>
          </div>

          {/* Section 9 */}
          <div className="section">
            <h3 className="section-title">9. Retention of Data</h3>
            <p className="privacy-text">
              We retain your personal, account, and transaction data for as
              long as needed for operational, legal, security, and compliance
              purposes.
            </p>
          </div>

          {/* Section 10 */}
          <div className="section">
            <h3 className="section-title">10. Children’s Privacy</h3>
            <p className="privacy-text">
              Our services are not intended for individuals under 13 years old.
              We do not knowingly collect personal information from children.
            </p>
          </div>

          {/* Section 11 */}
          <div className="section">
            <h3 className="section-title">11. Third-Party Websites</h3>
            <p className="privacy-text">
              Our website may contain links to third-party websites. We are not
              responsible for their privacy practices and encourage you to
              review their policies.
            </p>
          </div>

          {/* Section 12 */}
          <div className="section">
            <h3 className="section-title">
              12. Changes to this Privacy Policy
            </h3>
            <p className="privacy-text">
              We may update this Privacy Policy to reflect changes in our
              practices or legal requirements. We will notify you of significant
              changes through appropriate means.
            </p>
          </div>

          {/* Final Note */}
          <div className="privacy-cta">
            {/* <p>
              If you have any questions about this Privacy Policy, please
              contact us at <strong>[Insert Contact Information]</strong>.
            </p> */}
            <p className="thankyou">Thank you for choosing MetaDrive!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
