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
            <strong>Launching Date:</strong> 20/11/2025
          </p>

          <p className="privacy-intro">
            At <strong className="solarx-highlight">MetaDrive</strong>, we are
            committed to protecting your privacy. This Privacy Policy outlines
            how we collect, use, share, and safeguard your information when you
            use our services, including our website and solar energy solutions.
            By using our services, you agree to the practices described in this
            policy.
          </p>

          {/* Section 1 */}
          <div className="section">
            <h3 className="section-title">1. Information We Collect</h3>
            <ul className="bullet-listprivacy">
              <li>
                <strong className="solarx-highlight">
                  Personal Information:
                </strong>{" "}
                Your name, address, email, phone number, and other contact
                details.
              </li>
              <li>
                <strong className="solarx-highlight">Energy Usage Data:</strong>{" "}
                Information about your energy consumption and usage patterns.
              </li>
              <li>
                <strong className="solarx-highlight">
                  Technical Information:
                </strong>{" "}
                Your IP address, device type, browser type, cookies, and
                analytics data.
              </li>
              <li>
                <strong className="solarx-highlight">Transaction Data:</strong>{" "}
                Information about your purchases, installations, and service
                requests.
              </li>
              <li>
                <strong className="solarx-highlight">
                  Communication Data:
                </strong>{" "}
                Any messages or feedback you send us.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="section">
            <h3 className="section-title">2. How We Use Your Information</h3>
            <ul className="bullet-listprivacy">
              <li>Providing and maintaining our services.</li>
              <li>Processing orders, installations, and service requests.</li>
              <li>
                Communicating with you about your account, services, and
                promotions.
              </li>
              <li>Improving our services and user experience.</li>
              <li>Conducting market research and analysis.</li>
              <li>Complying with legal obligations.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="section">
            <h3 className="section-title">3. Data Sharing and Disclosure</h3>
            <ul className="bullet-listprivacy">
              <li>
                <strong className="solarx-highlight">Service Providers:</strong>{" "}
                Third-party vendors who assist us with payment processing,
                installation, and data storage.
              </li>
              <li>
                <strong className="solarx-highlight">
                  Regulatory Authorities:
                </strong>{" "}
                To comply with energy regulations or government requests.
              </li>
              <li>
                <strong className="solarx-highlight">Legal Obligations:</strong>{" "}
                If required by law or to protect MetaDrive or others.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="section">
            <h3 className="section-title">
              4. Cookies and Tracking Technologies
            </h3>
            <p className="privacy-text">
              We use cookies to enhance your experience and track user behavior.
              You can manage your cookie preferences through your browser
              settings.
            </p>
          </div>

          {/* Section 5 */}
          <div className="section">
            <h3 className="section-title">5. Data Security</h3>
            <p className="privacy-text">
              We implement industry-standard security measures to protect your
              data, including encryption and access controls. However, no system
              is completely secure, and we cannot guarantee absolute protection
              of your information.
            </p>
          </div>

          {/* Section 6 */}
          <div className="section">
            <h3 className="section-title">6. Your Rights</h3>
            <ul className="bullet-listprivacy">
              <li>
                <strong className="solarx-highlight">Access and Update:</strong>{" "}
                Request access to and update your personal information.
              </li>
              <li>
                <strong className="solarx-highlight">Data Deletion:</strong>{" "}
                Request deletion of your personal data, subject to legal
                obligations.
              </li>
              <li>
                <strong className="solarx-highlight">Opt-Out:</strong> Opt out
                of marketing communications anytime.
              </li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="section">
            <h3 className="section-title">7. Retention of Data</h3>
            <p className="privacy-text">
              We retain your personal and energy usage information for as long
              as necessary to fulfill the purposes of this Privacy Policy or as
              required by law.
            </p>
          </div>

          {/* Section 8 */}
          <div className="section">
            <h3 className="section-title">8. Children’s Privacy</h3>
            <p className="privacy-text">
              Our services are not intended for individuals under 13 years old.
              We do not knowingly collect personal information from children.
            </p>
          </div>

          {/* Section 9 */}
          <div className="section">
            <h3 className="section-title">9. Third-Party Websites</h3>
            <p className="privacy-text">
              Our website may contain links to third-party websites. We are not
              responsible for their privacy practices and encourage you to
              review their policies.
            </p>
          </div>

          {/* Section 10 */}
          <div className="section">
            <h3 className="section-title">
              10. Changes to this Privacy Policy
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
