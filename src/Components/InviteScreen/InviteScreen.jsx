import { useEffect, useState } from "react";
import { FaArrowLeft, FaCopy, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./InviteScreen.css";

const InviteScreen = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const buildReferralLink = (code) => {
    const safeCode = (code || "").trim();
    return `${window.location.origin}/signup?ref=${encodeURIComponent(
      safeCode || "REF174085491"
    )}`;
  };

  // Fetch team data when component mounts
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user?._id;

        if (!userId) {
          setError("User not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch("https://be.metadrive01.xyz/team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch team data");
        }

        const data = await response.json();
        setTeamData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const shareLink = async () => {
    const referralLink = buildReferralLink(teamData?.user?.randomCode);

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join MetaDrive",
          text: "Join MetaDrive and start earning with me!",
          url: referralLink,
        });
      } catch (err) {
        console.error("Share failed:", err.message);
        copyToClipboard(referralLink);
      }
    } else {
      copyToClipboard(referralLink);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="invite-screen-container">
        <div className="referral-card">
          <div className="referral-header">
            <button
              className="back-button"
              onClick={() => navigate("/dashboard")}
            >
              <FaArrowLeft className="back-icon" />
            </button>
            <h1 className="referral-title">Referral Program</h1>
          </div>
          <div className="loading-state">Loading referral data...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="invite-screen-container">
        <div className="referral-card">
          <div className="referral-header">
            <button
              className="back-button"
              onClick={() => navigate("/dashboard")}
            >
              <FaArrowLeft className="back-icon" />
            </button>
            <h1 className="referral-title">Referral Program</h1>
          </div>
          <div className="error-state">
            <p>Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="retry-btn"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback data if teamData is still null
  const referralCode = teamData?.user?.randomCode || "REF174085491";
  const referralLink = buildReferralLink(referralCode);

  return (
    <div className="invite-screen-container">
      {/* Header with orange background */}
      <div className="invite-header-section">
        <div className="referral-header">
          <button
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            <FaArrowLeft className="back-icon" />
          </button>
          <h1 className="referral-title">Referral Program</h1>
        </div>
      </div>

      {/* Main Referral Card */}
      <div className="referral-content">
        <div className="referral-card">
          {/* Earnings Section */}
          <div className="earnings-section">
            <h2 className="earnings-title">Earn with Referrals</h2>
            <ul className="earnings-list">
              <li className="earnings-item">
                <span className="level">Level 1:</span>
                <span className="percentage">6% from direct referrals</span>
              </li>
              <li className="earnings-item">
                <span className="level">Level 2:</span>
                <span className="percentage">3.1% from their referrals</span>
              </li>
              <li className="earnings-item">
                <span className="level">Level 3:</span>
                <span className="percentage">1.5% from third level</span>
              </li>
              <li className="earnings-item">
                <span className="level">Level 4:</span>
                <span className="percentage">1% from fourth level</span>
              </li>
              <li className="earnings-item">
                <span className="level">Level 5:</span>
                <span className="percentage">0.5% from fifth level</span>
              </li>
            </ul>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Referral Link */}
          <div className="referral-section">
            <h3 className="section-title">Your Referral Link</h3>
            <div className="link-box">
              <span className="link-text">{referralLink}</span>
            </div>
          </div>

          {/* Referral Code */}
          <div className="referral-section">
            <h3 className="section-title">Your Referral Code</h3>
            <div className="code-box">
              <span className="code-text">{referralCode}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons888">
            <button className="share-btn" onClick={shareLink}>
              <FaShareAlt className="btn-icon" />
              Share Link
            </button>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(referralLink)}
            >
              <FaCopy className="btn-icon" />
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteScreen;
