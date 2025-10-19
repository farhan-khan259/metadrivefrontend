import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCopy,
  FaFire,
  FaGift,
  FaShareAlt,
  FaUsers,
} from "react-icons/fa";
import { IoGameControllerOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Team.css";

const Team = () => {
  const [activeTab, setActiveTab] = useState("invite");
  const [teamData, setTeamData] = useState(null);
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;
  console.log(userId);

  console.log(teamData?.user?.amount);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.post("https://be.solarx0.com/team", { userId });
        setTeamData(res.data);
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    fetchTeamData();
  }, [userId]);
  console.log(teamData?.directReferrals.members);

  if (!teamData) {
    return <p>plz login </p>;
  }

  return (
    <div className="team-wrapper">
      <div className="team-header">
        <Link to="/dashboard" className="back-home-link">
          <FaArrowLeft />
        </Link>
        <h2 className="team-title">Solar ✘ Loyal Team Data </h2>
      </div>

      <div className="team-buttons">
        <button
          className="team-button"
          style={{
            backgroundColor:
              activeTab === "invite"
                ? "var(--accent-color)"
                : "var(--primary-color)",
          }}
          onClick={() => setActiveTab("invite")}
        >
          Invite Link <IoGameControllerOutline />
        </button>
        <button
          className="team-button"
          style={{
            backgroundColor:
              activeTab === "data"
                ? "var(--accent-color)"
                : "var(--primary-color)",
          }}
          onClick={() => setActiveTab("data")}
        >
          Team Data <FaGift />
        </button>
        <button
          className="team-button"
          style={{
            backgroundColor:
              activeTab === "details"
                ? "var(--accent-color)"
                : "var(--primary-color)",
          }}
          onClick={() => setActiveTab("details")}
        >
          Team Details <FaFire />
        </button>
      </div>

      <div className="team-screen">
        {activeTab === "invite" && <InviteScreen teamData={teamData} />}
        {activeTab === "data" && <TeamDataScreen teamData={teamData} />}
        {activeTab === "details" && <TeamDetailsScreen teamData={teamData} />}
      </div>
    </div>
  );
};

const InviteScreen = ({ teamData }) => {
  const referralLink = `https://solarx0.com/signup?ref=${teamData.user.randomCode}`;
  const referralCode = teamData.user.randomCode;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // ❌ Removed alert
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join SolarX",
          text: "Join SolarX and start earning with me!",
          url: referralLink,
        });
        console.log("Link shared successfully!");
      } catch (err) {
        console.error("Sharing failed:", err.message);
      }
    } else {
      // Fallback: copy silently
      copyToClipboard(referralLink);
    }
  };

  return (
    <div className="invite-card">
      <h3 className="invite-heading">🔗 Referral Program</h3>
      <div className="invite-info-box">
        <strong>Earn with Referrals</strong>
        <ul>
          <li>Level 1: 8% from direct referrals</li>
          <li>Level 2: 3% from their referrals</li>
          <li>Level 3: 2% from third level</li>
        </ul>
      </div>

      <div className="invite-field">
        <label>Your Referral Link</label>
        <div className="invite-input-wrapper">
          <input type="text" value={referralLink} readOnly />
          <button onClick={() => copyToClipboard(referralLink)}>
            <FaCopy />
          </button>
        </div>
      </div>

      <div className="invite-field">
        <label>Your Referral Code</label>
        <div className="invite-input-wrapper purple">
          <input type="text" value={referralCode} readOnly />
          <button onClick={() => copyToClipboard(referralCode)}>
            <FaCopy />
          </button>
        </div>
      </div>

      <div className="invite-actions">
        <button className="btn share" onClick={shareLink}>
          <FaShareAlt /> Share Link
        </button>
        <button
          className="btn copy"
          onClick={() => copyToClipboard(referralLink)}
        >
          <FaCopy /> Copy Link
        </button>
      </div>
    </div>
  );
};

// TeamDataScreen and TeamDetailsScreen remain unchanged...

const TeamDataScreen = ({ teamData }) => {
  // calculate actual team size
  const totalTeamMembers =
    teamData.directReferrals.stats.totalUsers +
    teamData.indirectReferrals.stats.totalUsers +
    teamData.extendedReferrals.stats.totalUsers;

  return (
    <div className="team-data-container">
      <div className="team-summary-cards">
        <div className="summary-card blue">
          <h4>Total Team</h4>
          <p>{totalTeamMembers}</p>
        </div>
        <div className="summary-card green">
          <h4>Total Team Commission</h4>
          <p>{Math.floor(teamData.commissionSummary.grandTotalCommission)}</p>
        </div>
      </div>

      {/* Level 1 */}
      <div className="team-referral-card">
        <div className="referral-header">
          <h3>Level 1 – Direct Referrals 👥</h3>
          <span className="referral-percent">8%</span>
        </div>

        <p>
          Today New User:{" "}
          <span>{teamData.directReferrals.stats.todayNewUsers}</span>
        </p>
        <p>
          Total Active User:{" "}
          <span>{teamData.directReferrals.stats.totalActiveUsers}</span>
        </p>
        <p>
          Total Users: <span>{teamData.directReferrals.stats.totalUsers}</span>
        </p>

        <p>
          Today Team Deposit:{" "}
          <span>{teamData.directReferrals.stats.todayTeamDeposit}</span>
        </p>
        <p>
          Total Team Deposit:{" "}
          <span>{teamData.directReferrals.stats.totalTeamDeposit}</span>
        </p>

        <p>
          Today Team Withdrawal:{" "}
          <span>{teamData.directReferrals.stats.todayTeamWithdrawal}</span>
        </p>
        <p>
          Total Team Withdrawal:{" "}
          <span>{teamData.directReferrals.stats.totalTeamWithdrawal}</span>
        </p>
      </div>

      {/* Level 2 */}
      <div className="team-referral-card">
        <div className="referral-header">
          <h3>Level 2 – Indirect Referrals 👥</h3>
          <span className="referral-percent">3%</span>
        </div>
        <p>
          Today New User:{" "}
          <span>{teamData.indirectReferrals.stats.todayNewUsers}</span>
        </p>
        <p>
          Total Active User:{" "}
          <span>{teamData.indirectReferrals.stats.totalActiveUsers}</span>
        </p>
        <p>
          Total Users:{" "}
          <span>{teamData.indirectReferrals.stats.totalUsers}</span>
        </p>

        <p>
          Today Team Deposit:{" "}
          <span>{teamData.indirectReferrals.stats.todayTeamDeposit}</span>
        </p>
        <p>
          Total Team Deposit:{" "}
          <span>{teamData.indirectReferrals.stats.totalTeamDeposit}</span>
        </p>

        <p>
          Today Team Withdrawal:{" "}
          <span>{teamData.indirectReferrals.stats.todayTeamWithdrawal}</span>
        </p>
        <p>
          Total Team Withdrawal:{" "}
          <span>{teamData.indirectReferrals.stats.totalTeamWithdrawal}</span>
        </p>
      </div>

      {/* Level 3 */}
      <div className="team-referral-card">
        <div className="referral-header">
          <h3>Level 3 – Extended Referrals 👥</h3>
          <span className="referral-percent">2%</span>
        </div>
        <p>
          Today New User:{" "}
          <span>{teamData.extendedReferrals.stats.todayNewUsers}</span>
        </p>
        <p>
          Total Active User:{" "}
          <span>{teamData.extendedReferrals.stats.totalActiveUsers}</span>
        </p>
        <p>
          Total Users:{" "}
          <span>{teamData.extendedReferrals.stats.totalUsers}</span>
        </p>

        <p>
          Today Team Deposit:{" "}
          <span>{teamData.extendedReferrals.stats.todayTeamDeposit}</span>
        </p>
        <p>
          Total Team Deposit:{" "}
          <span>{teamData.extendedReferrals.stats.totalTeamDeposit}</span>
        </p>

        <p>
          Today Team Withdrawal:{" "}
          <span>{teamData.extendedReferrals.stats.todayTeamWithdrawal}</span>
        </p>
        <p>
          Total Team Withdrawal:{" "}
          <span>{teamData.extendedReferrals.stats.totalTeamWithdrawal}</span>
        </p>
      </div>
    </div>
  );
};

const TeamDetailsScreen = ({ teamData }) => {
  const [activeLevel, setActiveLevel] = useState("1");

  return (
    <div className="team-details-wrapper">
      <h2 className="team-details-title">
        <FaUsers /> My Invite User Details
      </h2>

      {/* Tabs */}
      <div className="team-details-tabs">
        <button
          className={`tab-button ${activeLevel === "1" ? "active" : ""}`}
          onClick={() => setActiveLevel("1")}
        >
          Level (1)
        </button>
        <button
          className={`tab-button ${activeLevel === "2" ? "active" : ""}`}
          onClick={() => setActiveLevel("2")}
        >
          Level (2)
        </button>
        <button
          className={`tab-button ${activeLevel === "3" ? "active" : ""}`}
          onClick={() => setActiveLevel("3")}
        >
          Level (3)
        </button>
      </div>

      {/* Level 1 */}
      {activeLevel === "1" &&
        (teamData.directReferrals.members.length > 0 ? (
          teamData.directReferrals.members.map((user, index) => (
            <div className="user-cardteam" key={index}>
              <br />
              {/* <p>
                <strong>Upliner:</strong>{" "}
                <span className="blue">{teamData.user.fullName}</span>
              </p> */}
              <p>
                <strong>User Name:</strong>{" "}
                <span className="blue">{user.fullName}</span>
              </p>
              <p>
                <strong>Whatsapp No: </strong>{" "}
                <span className="blue">{user.whatsappNumber}</span>
              </p>
              <p>
                <strong>Joining Date:</strong>{" "}
                <span className="blue">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </p>
              <p>
                <strong>Investment: </strong>{" "}
                <span className="blue">{user.payments.totalDeposit}</span>
              </p>
              <p>
                <strong>Withdrawal: </strong>
                <span className="blue">{user.payments.totalWithdrawal}</span>
              </p>
            </div>
          ))
        ) : (
          <div className="no-referrals-message">
            <p>No direct referrals found</p>
          </div>
        ))}

      {/* Level 2 */}
      {activeLevel === "2" &&
        (teamData.indirectReferrals.members.length > 0 ? (
          teamData.indirectReferrals.members.map((user, index) => (
            <div className="user-cardteam" key={index}>
              <br />
              {/* <p>
                <strong>Upliner:</strong>{" "}
                <span className="blue">{teamData.user.fullName}</span>
              </p> */}
              <p>
                <strong>User Name:</strong>{" "}
                <span className="blue">{user.fullName}</span>
              </p>
              <p>
                <strong>Whatsapp No: </strong>{" "}
                <span className="blue">{user.whatsappNumber}</span>
              </p>
              <p>
                <strong>Joining Date:</strong>{" "}
                <span className="blue">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </p>
              <p>
                <strong>Investment: </strong>{" "}
                <span className="blue">{user.payments.totalDeposit}</span>
              </p>
              <p>
                <strong>Withdrawal: </strong>
                <span className="blue">{user.payments.totalWithdrawal}</span>
              </p>
            </div>
          ))
        ) : (
          <div className="no-referrals-message">
            <p>No indirect referrals found</p>
          </div>
        ))}

      {/* Level 3 */}
      {activeLevel === "3" &&
        (teamData.extendedReferrals.members.length > 0 ? (
          teamData.extendedReferrals.members.map((user, index) => (
            <div className="user-cardteam" key={index}>
              <br />
              {/* <p>
                <strong>Upliner:</strong>{" "}
                <span className="blue">{teamData.user.fullName}</span>
              </p> */}
              <p>
                <strong>User Name:</strong>{" "}
                <span className="blue">{user.fullName}</span>
              </p>
              <p>
                <strong>Whatsapp No: </strong>{" "}
                <span className="blue">{user.whatsappNumber}</span>
              </p>
              <p>
                <strong>Joining Date:</strong>{" "}
                <span className="blue">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </p>
              <p>
                <strong>Investment: </strong>{" "}
                <span className="blue">{user.payments.totalDeposit}</span>
              </p>
              <p>
                <strong>Withdrawal: </strong>
                <span className="blue">{user.payments.totalWithdrawal}</span>
              </p>
            </div>
          ))
        ) : (
          <div className="no-referrals-message">
            <p>No extended referrals found</p>
          </div>
        ))}
    </div>
  );
};

export default Team;
