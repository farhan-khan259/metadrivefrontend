import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import axios from "axios";

export default function ReferralTree() {
  const [search, setSearch] = useState("");
  const [expandedUser, setExpandedUser] = useState(null);
  const [referralsData, setReferralsData] = useState([]);

  // 🔹 Fetch API data
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await axios.get("https://be.metadrive01.xyz/team");

        if (res.data.success) {
          const mapped = res.data.data.map((item) => ({
            uid: item.user._id,
            code: item.user.randomCode,
            l1: item.user.referrals.direct.map((d) => d.randomCode),
            l2: item.user.referrals.indirect.map((i) => i.randomCode),
            l3: item.user.referrals.extended.map((e) => e.randomCode),
          }));
          setReferralsData(mapped);
        }
      } catch (err) {
        console.error("❌ Failed to fetch referrals", err);
      }
    };

    fetchReferrals();
  }, []);

  // 🔹 Filter referrals by search input
  const filteredReferrals = useMemo(() => {
    if (!search.trim()) return referralsData;
    return referralsData.filter(
      (r) =>
        r.uid.toLowerCase().includes(search.toLowerCase()) ||
        r.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [referralsData, search]);

  const toggleExpand = (uid) => {
    setExpandedUser(expandedUser === uid ? null : uid);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Referral Tree</h2>

          <div className="card-box" style={{ padding: 12, marginBottom: 16 }}>
            <strong>Total Users:</strong> {referralsData.length} <br />
            <strong>With Direct Referrals:</strong>{" "}
            {referralsData.filter((r) => r.l1 && r.l1.length > 0).length}
          </div>

          <div style={{ marginBottom: 16 }}>
            <input
              className="userlist-search"
              placeholder="Search by User ID or Code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", maxWidth: 300 }}
            />
          </div>

          <div className="card-box" style={{ padding: 12 }}>
            {filteredReferrals.length === 0 ? (
              <p>No referral data available.</p>
            ) : (
              filteredReferrals.map((r) => (
                <div
                  key={r.uid}
                  className="referral-card"
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    marginBottom: 12,
                    padding: 12,
                    background: "#fafafa",
                  }}
                >
                  <div
                    onClick={() => toggleExpand(r.uid)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    <span>
                      User ID: {r.uid} | Code: {r.code}
                    </span>
                    <span style={{ fontSize: 18 }}>
                      {expandedUser === r.uid ? "−" : "+"}
                    </span>
                  </div>

                  {expandedUser === r.uid && (
                    <div style={{ marginTop: 8, fontSize: 14 }}>
                      <div style={{ marginBottom: 6 }}>
                        <strong>Level 1:</strong>{" "}
                        {r.l1?.length ? r.l1.join(", ") : "—"}
                      </div>
                      <div style={{ marginBottom: 6 }}>
                        <strong>Level 2:</strong>{" "}
                        {r.l2?.length ? r.l2.join(", ") : "—"}
                      </div>
                      <div>
                        <strong>Level 3:</strong>{" "}
                        {r.l3?.length ? r.l3.join(", ") : "—"}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
