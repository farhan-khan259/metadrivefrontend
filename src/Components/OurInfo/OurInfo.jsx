import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./OurInfo.css";

export default function OurInfo() {
  return (
    <div className="ourinfo-container-new">
      {/* Header with Orange Background */}
      <div className="ourinfo-header-section">
        <div className="ourinfo-header">
          <Link to="/dashboard" className="ourinfo-back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="ourinfo-title-new">About SolarX</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="ourinfo-content">
        <div className="ourinfo-card">
          <p className="ourinfo-text-new">
            At <strong className="solarx-highlight">SolarX</strong>, we are
            revolutionizing the energy landscape in Pakistan by harnessing the
            power of the sun! ☀ Our platform is designed to connect investors
            with innovative solar energy projects, ensuring that everyone can
            benefit from sustainable energy solutions. 🌍💡
          </p>

          <p className="ourinfo-text-new">
            By investing in SolarX, you are not just putting your money into a
            project; you are becoming a part of a movement that aims to restore
            and enhance energy resources across the nation. 🇵🇰✨ We carefully
            select companies that are committed to developing cutting-edge solar
            technologies, allowing our users to earn profits while contributing
            to a greener future. 📈🌱
          </p>

          <p className="ourinfo-text-new">
            Our mission is to empower individuals and businesses alike,
            providing them with the opportunity to invest in renewable energy
            and enjoy attractive returns. 💰💚 With SolarX, you can be confident
            that your investment is making a positive impact, helping to reduce
            carbon footprints and promote sustainable practices in Pakistan.
            🌿🌞
          </p>

          <div className="ourinfo-cta-new">
            <p>
              Join us on this exciting journey towards a brighter, cleaner, and
              more sustainable future! Together, we can illuminate lives and
              create a legacy of energy independence. 🌟🔋
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
