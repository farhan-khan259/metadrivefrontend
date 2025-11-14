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
          <h1 className="ourinfo-title-new">About MetaDrive</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="ourinfo-content">
        <div className="ourinfo-card">
          <p className="ourinfo-text-new">
            <strong className="metadrive-highlight">"MetaDrive"</strong> is a
            revolutionary investment platform that focuses on digital asset
            management and team-based earning opportunities in the modern
            digital economy.
          </p>

          <div className="section">
            <h3 className="section-title">
              Key Features of MetaDrive Platform:
            </h3>
            <ol className="numbered-list">
              <li>
                <strong className="metadrive-highlight">
                  Digital Investment Opportunities
                </strong>
                : Our platform allows individuals to invest in digital asset
                management with transparent returns and secure transaction
                processing.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Team Commission System
                </strong>
                : MetaDrive offers a multi-level commission structure where you
                can earn from your direct referrals and extended team network
                across three levels.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Focus on Financial Growth
                </strong>
                : We provide opportunities for both active and passive income
                generation through our structured investment plans and
                team-building incentives.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Return on Investment
                </strong>
                : Investors can earn profits through our carefully designed
                investment plans with competitive returns and bonus structures.
              </li>
              <li>
                <strong className="metadrive-highlight">Transparency</strong>:
                Our platform provides detailed information about investment
                plans, expected returns, risks, and timelines to ensure complete
                transparency.
              </li>
            </ol>
          </div>

          <div className="section">
            <h3 className="section-title">
              Benefits of Investing with MetaDrive:
            </h3>
            <ul className="bullet-list">
              <li>
                <strong className="metadrive-highlight">
                  Multiple Income Streams
                </strong>
                : Earn through direct investments, team commissions, and special
                bonuses.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Growth Potential
                </strong>
                : As the digital economy expands, MetaDrive positions you to
                benefit from emerging opportunities in digital asset management.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Team Building Rewards
                </strong>
                : Build your network and earn commissions from Level 1 (6%),
                Level 2 (3.1%), and Level 3 (1.5%) team members.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Flexible Investment Options
                </strong>
                : Choose from various investment plans that suit your financial
                goals and risk appetite.
              </li>
            </ul>
          </div>

          <div className="section">
            <h3 className="section-title">Commission Structure:</h3>
            <ul className="bullet-list">
              <li>
                <strong className="metadrive-highlight">Level 1 Team</strong>:
                Earn 6% commission from your direct referrals
              </li>
              <li>
                <strong className="metadrive-highlight">Level 2 Team</strong>:
                Earn 3.1% commission from your indirect team members
              </li>
              <li>
                <strong className="metadrive-highlight">Level 3 Team</strong>:
                Earn 1.5% commission from your extended network
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Bonus Incentives
                </strong>
                : Additional 3% extra commission on every 200k team deposit
                across all three levels
              </li>
            </ul>
          </div>

          <div className="section">
            <h3 className="section-title">Getting Started:</h3>
            <ol className="numbered-list">
              <li>
                <strong className="metadrive-highlight">Create Account</strong>:
                Sign up and complete your profile to start your investment
                journey.
              </li>
              <li>
                <strong className="metadrive-highlight">
                  Choose Investment Plan
                </strong>
                : Select from our range of investment plans that match your
                financial objectives.
              </li>
              <li>
                <strong className="metadrive-highlight">Build Your Team</strong>
                : Share your referral code and start building your team to
                maximize earning potential.
              </li>
              <li>
                <strong className="metadrive-highlight">Monitor Growth</strong>:
                Track your investments, team performance, and commissions
                through our comprehensive dashboard.
              </li>
            </ol>
          </div>

          <div className="section">
            <h3 className="section-title">Why Choose MetaDrive?</h3>
            <ul className="bullet-list">
              <li>✅ Secure and transparent platform operations</li>
              <li>✅ Multiple earning opportunities</li>
              <li>✅ Comprehensive team commission structure</li>
              <li>✅ Regular withdrawals and instant processing</li>
              <li>✅ 24/7 customer support</li>
              <li>✅ User-friendly interface and mobile accessibility</li>
            </ul>
          </div>

          <div className="notice-box">
            <h4>📢 Important Notice</h4>
            <p>
              Start your financial journey with MetaDrive today and unlock the
              potential of digital asset management with our proven investment
              strategies and team-based earning model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
