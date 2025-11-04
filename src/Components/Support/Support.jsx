import { FaArrowLeft, FaHeadset, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Support.css";

export default function Support() {
  return (
    <div className="support-container-new">
      {/* Header with Orange Background */}
      <div className="support-header-section">
        <div className="support-header">
          <Link to="/dashboard" className="support-back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="support-title-new">Service Management</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="support-content">
        <div className="support-card-new">
          {/* Welcome Message */}
          <div className="support-welcome-box">
            <p className="welcome-text">
              ہماری سپورٹ ٹیم آپ کی خدمت کے لیے موجود ہے۔ کسی بھی مسئلے یا سوال
              کے لیے رابطہ کریں۔
            </p>
          </div>

          {/* Support Cards */}
          <div className="support-cards-new">
            {/* WhatsApp Support Card */}
            <a
              href="https://chat.whatsapp.com/GQoVtPyb7elHuKugtp6ioD?mode=wwt"
              target="_blank"
              rel="noopener noreferrer"
              className="support-card-item whatsapp-card"
            >
              <div className="card-icon">
                <FaWhatsapp />
              </div>
              <h3 className="card-title">WhatsApp Group</h3>
              <p className="card-description">
                Join our WhatsApp group for daily updates and announcements
              </p>
              <p className="card-subtext">
                ڈیلی اپڈیٹس، آفرز اور سپورٹ کے لیے گروپ میں شامل ہوں
              </p>
            </a>

            {/* Customer Service Card */}
            <a
              href="https://wa.me/923239704664"
              className="support-card-item service-card"
            >
              <div className="card-icon">
                <FaHeadset />
              </div>
              <h3 className="card-title">Customer Service</h3>
              <p className="card-description">کسٹمر سروس سنٹر</p>
              <p className="card-subtext">براہ راست کال کے لیے</p>
            </a>
          </div>

          {/* Additional Info */}
          <div className="support-info">
            <h4>How can we help you?</h4>
            <p>
              Our support team is available 24/7 to assist you with any
              questions or issues you may have. Whether you need help with your
              investments, account management, or technical support, we're here
              for you.
            </p>
            <div className="contact-details">
              <p>
                <strong>Email:</strong> solarxofficial0@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> +92 323 9704664
              </p>
              <p>
                <strong>Hours:</strong> 24/7 Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
