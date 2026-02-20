import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaSearch, FaSync } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/userlist.css";

const API_BASE = "https://metadrivebackend.onrender.com/api"; // ✅ Your backend base URL

export default function AdminTicketDashboard() {
  const [tickets, setTickets] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // ✅ Fetch all tickets
  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE}/admin/tickets${filter ? `?status=${filter}` : ""}`
      );
      setTickets(res.data.tickets || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // ✅ Filter + search
  const filteredTickets = useMemo(() => {
    return (tickets || []).filter((t) =>
      JSON.stringify(t).toLowerCase().includes(q.toLowerCase())
    );
  }, [tickets, q]);

  // ✅ Approve / Reject Ticket
  const handleAction = async (ticketId, action) => {
    const confirmMsg =
      action === "approve"
        ? "Are you sure you want to mark this ticket as WIN?"
        : "Are you sure you want to mark this ticket as LOSE?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.post(
        `${API_BASE}/admin/tickets/${ticketId}/${action}`
      );
      alert(res.data.message || "Ticket updated!");

      // ✅ Update instantly in UI
      setTickets((prev) =>
        prev.map((t) =>
          t._id === ticketId
            ? { ...t, status: action === "approve" ? "won" : "lost" }
            : t
        )
      );
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Error updating ticket status");
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />

        <div className="admin-content">
          {/* ===== Page Header ===== */}
          <div className="page-header">
            <h2>🎟️ Ticket Management</h2>
            <button onClick={fetchTickets} className="refresh-btn">
              <FaSync /> {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* ===== Filter + Search ===== */}
          <div className="userlist-controls">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FaSearch style={{ color: "#555" }} />
              <input
                type="text"
                placeholder="Search ticket number, user, email..."
                className="userlist-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <select
              className="userlist-search"
              style={{ maxWidth: 200 }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Tickets</option>
              <option value="pending">Pending</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          {/* ===== Tickets Table ===== */}
          <table className="userlist-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Ticket No.</th>
                <th>User Name</th>
                <th>Email</th>
                <th>WhatsApp</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((t, i) => {
                  const status = t.status ? t.status.toLowerCase() : "pending";
                  return (
                    <tr key={t._id}>
                      <td data-label="S.No">{i + 1}</td>
                      <td data-label="Ticket">{t.ticketNumber}</td>
                      <td data-label="User">{t.userId?.fullName || "N/A"}</td>
                      <td data-label="Email">{t.userId?.email || "N/A"}</td>
                      <td data-label="WhatsApp">
                        {t.userId?.whatsappNumber || "-"}
                      </td>
                      <td data-label="Price">
                        PKR {t.price?.toLocaleString()}
                      </td>

                      <td
                        data-label="Status"
                        style={{
                          color:
                            status === "won"
                              ? "#28a745"
                              : status === "lost"
                              ? "#dc3545"
                              : "#ffcc00",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {status}
                      </td>

                      <td data-label="Actions" className="action-buttons">
                        {status === "pending" ? (
                          <>
                            <button
                              className="action-btn approve"
                              onClick={() => handleAction(t._id, "approve")}
                            >
                              ✅ Approve
                            </button>
                            <button
                              className="action-btn reject"
                              onClick={() => handleAction(t._id, "reject")}
                            >
                              ❌ Reject
                            </button>
                          </>
                        ) : (
                          <span
                            className={`role-badge ${
                              status === "won" ? "admin" : "user"
                            }`}
                          >
                            {status === "won" ? "WIN" : "LOSE"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: 15 }}>
                    {loading ? "Loading tickets..." : "No tickets found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
