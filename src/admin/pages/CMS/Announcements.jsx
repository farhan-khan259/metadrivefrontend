import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import "../../styles/userlist.css";

export default function Announcements() {
	const [msg, setMsg] = useState("Welcome to Solarx0!");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);

	const handlePost = async () => {
		if (!msg.trim()) {
			alert("Announcement message cannot be empty.");
			return;
		}

		setLoading(true);
		setSuccess(null);
		setError(null);

		try {
			const response = await fetch("https://metadrivebackend.onrender.com/api/announcements", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: msg }),
			});

			const data = await response.json();

			if (response.ok) {
				setSuccess("Announcement posted successfully!");
				setMsg(""); // Clear textarea or keep message
			} else {
				setError(data.message || "Failed to post announcement.");
			}
		} catch (err) {
			setError("Network error, please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="admin-layout">
			<Sidebar />
			<div className="admin-main">
				<Topbar />
				<div className="admin-content">
					<h2>Announcements</h2>
					<div className="card-box">
						<textarea
							style={{ width: "100%", minHeight: 120 }}
							value={msg}
							onChange={(e) => setMsg(e.target.value)}
							disabled={loading}
						/>
						<div style={{ marginTop: 12 }}>
							<button
								className="action-btn"
								onClick={handlePost}
								disabled={loading}>
								{loading ? "Posting..." : "Post"}
							</button>
						</div>
						{success && (
							<p style={{ color: "green", marginTop: 8 }}>{success}</p>
						)}
						{error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
					</div>
				</div>
			</div>
		</div>
	);
}
