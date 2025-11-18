// src/admin/components/Charts.jsx
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "../styles/charts.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function buildUserData(apiData) {
  return months.map((month, idx) => {
    const found = apiData.find((d) => d._id === idx + 1 || d.month === month);
    return { month, users: found ? found.count : 0 };
  });
}

function buildDepositData(apiData) {
  return months.map((month, idx) => {
    const found = apiData.find((d) => d._id === idx + 1 || d.month === month);
    return { month, amount: found ? found.total : 0 };
  });
}

export default function Charts({ userGrowth = [], monthlyDeposits = [] }) {
  const userData = buildUserData(userGrowth);
  const depositData = buildDepositData(monthlyDeposits);

  return (
    <div className="admin-charts-grid">
      {/* User Growth - Area Chart */}
      <div className="admin-chart-card">
        <div className="admin-chart-header">
          <h3>User Growth</h3>
          <span className="admin-chart-badge">+12% this month</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={userData}>
            <defs>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D4AA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis dataKey="month" stroke="var(--gray)" fontSize={12} />
            <YAxis stroke="var(--gray)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "var(--darker)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "var(--light)",
              }}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#00D4AA"
              strokeWidth={3}
              fill="url(#userGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Deposits - Bar Chart */}
      <div className="admin-chart-card">
        <div className="admin-chart-header">
          <h3>Monthly Deposits</h3>
          <span className="admin-chart-badge">+8% growth</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={depositData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis dataKey="month" stroke="var(--gray)" fontSize={12} />
            <YAxis stroke="var(--gray)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "var(--darker)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "var(--light)",
              }}
            />
            <Bar
              dataKey="amount"
              fill="url(#depositGradient)"
              radius={[6, 6, 0, 0]}
            />
            <defs>
              <linearGradient id="depositGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6C63FF" />
                <stop offset="100%" stopColor="#00D4AA" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
