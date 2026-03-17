import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaTrophy, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./TeamReward.css";

export default function TeamReward() {
  const [loading, setLoading] = useState(true);
  const [claimingTarget, setClaimingTarget] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [rewardData, setRewardData] = useState(null);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const fetchRewards = async () => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://be.sparkx1.pro/team/level1-rewards", {
        userId,
      });
      setRewardData(response.data || null);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load rewards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const rewards = useMemo(() => rewardData?.rewards || [], [rewardData]);
  const validMembersCount = rewardData?.level1Stats?.validMembersCount || 0;
  const totalDirectMembers = rewardData?.level1Stats?.totalDirectMembers || 0;

  const handleClaim = async (target) => {
    if (!userId || claimingTarget) return;

    try {
      setClaimingTarget(target);
      const response = await axios.post("https://be.sparkx1.pro/team/claim-level1-reward", {
        userId,
        target,
      });

      const newBalance = Number(response?.data?.newBalance || 0);
      const claimedTargets = response?.data?.claimedTargets || [];

      setRewardData((prev) => {
        if (!prev) return prev;

        const nextRewards = (prev.rewards || []).map((item) => {
          if (Number(item.target) !== Number(target)) return item;
          return {
            ...item,
            claimed: true,
            canClaim: false,
          };
        });

        return {
          ...prev,
          rewards: nextRewards,
          user: {
            ...(prev.user || {}),
            userbalance: newBalance,
            level1TeamRewardClaimedTargets: claimedTargets,
          },
        };
      });

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser && storedUser._id === userId) {
        storedUser.userbalance = newBalance;
        localStorage.setItem("user", JSON.stringify(storedUser));
      }

      showToast(`Reward claimed: $ ${Number(response?.data?.rewardAmount || 0).toLocaleString()}`);
    } catch (err) {
      showToast(err?.response?.data?.message || "Unable to claim reward");
      await fetchRewards();
    } finally {
      setClaimingTarget(null);
    }
  };

  if (loading) {
    return (
      <div className="tr-container-new">
        <div className="tr-header-section">
          <div className="tr-header-row">
            <Link to="/dashboard" className="tr-back-link" aria-label="Back to dashboard">
              <FaArrowLeft />
            </Link>
            <h2 className="tr-title">Team Reward</h2>
          </div>
        </div>
        <div className="tr-content">
          <div className="tr-loading">Loading rewards...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tr-container-new">
        <div className="tr-header-section">
          <div className="tr-header-row">
            <Link to="/dashboard" className="tr-back-link" aria-label="Back to dashboard">
              <FaArrowLeft />
            </Link>
            <h2 className="tr-title">Team Reward</h2>
          </div>
        </div>
        <div className="tr-content">
          <div className="tr-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="tr-container-new">
      <div className="tr-header-section">
        <div className="tr-header-row">
          <Link to="/dashboard" className="tr-back-link" aria-label="Back to dashboard">
            <FaArrowLeft />
          </Link>
          <h2 className="tr-title">Team Growth Rewards</h2>
        </div>
      </div>

      <div className="tr-content">
        <div className="tr-card">
          <div className="tr-hero-box">
            <div className="tr-hero-title">
              <FaTrophy /> Level 1 Direct Team Reward
            </div>
            <p>Only direct (Level 1) users are counted.</p>
            <p>A member becomes valid only after activating a plan.</p>
          </div>

          <div className="tr-stats-row">
            <div className="tr-mini-stat">
              <FaUsers /> Direct Members: <strong>{totalDirectMembers}</strong>
            </div>
            <div className="tr-mini-stat tr-valid">
              <FaCheckCircle /> Valid Members: <strong>{validMembersCount}</strong>
            </div>
          </div>

          <div className="tr-reward-list">
            {rewards.map((reward) => {
              const disabled = !reward.canClaim || claimingTarget === reward.target;
              const buttonLabel = reward.claimed
                ? "Reward Claimed"
                : claimingTarget === reward.target
                ? "Claiming..."
                : "Claim Reward";

              return (
                <div className="tr-reward-card" key={reward.target}>
                  <div className="tr-card-top">
                    <div className="tr-target">Target: {reward.target} Members</div>
                    <div className="tr-amount">$ {Number(reward.rewardAmount || 0).toLocaleString()}</div>
                  </div>

                  <div className="tr-reward-title">{reward.title}</div>

                  <div className="tr-progress-meta">
                    Progress: {reward.progressCount}/{reward.target}
                  </div>

                  <div className="tr-progress-bar" aria-hidden="true">
                    <div
                      className="tr-progress-fill"
                      style={{ width: `${Math.max(0, Math.min(100, reward.progressPercent || 0))}%` }}
                    />
                  </div>

                  <button
                    type="button"
                    className={`tr-claim-btn ${reward.claimed ? "claimed" : ""}`}
                    onClick={() => handleClaim(reward.target)}
                    disabled={disabled}
                  >
                    {buttonLabel}
                  </button>
                </div>
              );
            })}
          </div>

          {toast ? <div className="tr-toast">{toast}</div> : null}
        </div>
      </div>
    </div>
  );
}
