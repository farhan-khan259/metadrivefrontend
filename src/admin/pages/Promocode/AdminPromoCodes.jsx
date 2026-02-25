import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import "../../styles/userlist.css";
import axios from "axios";

export default function AdminPromoCodes() {
  // const [codes, setCodes] = useState([]); // ✅ always start as an array
  const [showPopup, setShowPopup] = useState(false);
  const [limitUsers, setLimitUsers] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);

  // ✅ Fetch all promo codes
  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const res = await axios.post(
          "https://be.metadrive01.xyz/api/promoCodeGetAll"
        );

        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching promo codes:", err);
      }
    };
    fetchPromoCodes();
  }, []);

  // ✅ Create new promo code
  const addPromoCode = async () => {
    if (!limitUsers || !amount) return;

    try {
      const res = await axios.post("https://be.metadrive01.xyz/api/promoCode", {
        limit: Number(limitUsers),
        amount: Number(amount),
      });

      if (res.data.success) {
        // setCodes((prev) => [...prev, res.data.promo]);
        setLimitUsers("");
        setAmount("");
        setShowPopup(false);
        window.location.reload();
      } else {
        alert(res.data.message || "Failed to create promo code");
      }
    } catch (err) {
      console.error("Error creating promo code:", err);
      alert("Error creating promo code");
    }
  };

  // ✅ Delete promo code
  const deletePromoCode = async (id) => {
    if (!window.confirm("Are you sure you want to delete this promo code?"))
      return;

    try {
      const res = await axios.post(
        `https://be.metadrive01.xyz/api/promoCodeDelete1`,
        {
          id: id,
        }
      );

      if (res.data.success) {
        // setCodes((prev) => prev.filter((c) => c._id !== id));
        window.location.reload();
      } else {
        alert(res.data.message || "Failed to delete promo code");
      }
    } catch (err) {
      console.error("Error deleting promo code:", err);
      alert("Error deleting promo code");
    }
  };

  console.log(data);
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Promo Codes</h2>

          <button
            className="action-btn view"
            style={{ marginBottom: 20 }}
            onClick={() => setShowPopup(true)}
          >
            Create Promo Code
          </button>

          {/* Popup Modal */}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>Create Promo Code</h3>
                <label>
                  Limit of Users:
                  <input
                    type="number"
                    value={limitUsers}
                    onChange={(e) => setLimitUsers(e.target.value)}
                  />
                </label>
                <label>
                  Amount:
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </label>
                <div className="popup-actions">
                  <button className="action-btn view" onClick={addPromoCode}>
                    Create
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <table className="userlist-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Amount</th>
                <th>Limit</th>
                <th>Claimed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((code, index) => (
                  <tr key={code._id || index}>
                    <td data-label="ID">{index + 1}</td>
                    <td data-label="Code">{code.code}</td>
                    <td data-label="Amount">{code.amount || "-"}</td>
                    <td data-label="Limit">{code.limit || "-"}</td>
                    <td data-label="Claimed">{code.claimed || 0}</td>
                    <td data-label="Actions">
                      <button
                        className="action-btn delete"
                        onClick={() => deletePromoCode(code._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No promo codes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSS for popup */}
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          width: 300px;
          text-align: center;
        }
        .popup-content input {
          width: 100%;
          padding: 8px;
          margin: 8px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .popup-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
