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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiTrendingUp, FiPieChart } from "react-icons/fi";
import "../styles/charts.css";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const COLORS = ['#22e88c', '#9060ff', '#ffb14d', '#ff5a87', '#5aa6ff', '#c77dff'];

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

  // Sample pie data - replace with actual data
  const pieData = [
    { name: 'Active', value: 540 },
    { name: 'Pending', value: 120 },
    { name: 'Completed', value: 380 },
    { name: 'Cancelled', value: 60 },
  ];

  return (
    <div className="admin-charts-wrapper">
      {/* User Growth Chart */}
      <div className="admin-chart-container">
        <div className="admin-chart-header">
          <div className="admin-chart-title">
            <FiTrendingUp className="admin-chart-title-icon" />
            <h3>User Growth</h3>
          </div>
          <div className="admin-chart-badge">+12% this month</div>
        </div>
        <div className="admin-chart-body">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userData}>
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22e88c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22e88c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="var(--sx-muted)" fontSize={12} />
              <YAxis stroke="var(--sx-muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: 'var(--tx-card-bg)',
                  border: '1px solid var(--tx-card-border)',
                  borderRadius: '12px',
                  color: 'var(--sx-text)',
                  backdropFilter: 'blur(8px)',
                }}
                labelStyle={{ color: 'var(--sx-muted)' }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#22e88c"
                strokeWidth={3}
                fill="url(#userGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Deposits Chart */}
      <div className="admin-chart-container">
        <div className="admin-chart-header">
          <div className="admin-chart-title">
            <FiPieChart className="admin-chart-title-icon" />
            <h3>Monthly Deposits</h3>
          </div>
          <div className="admin-chart-badge">+8% growth</div>
        </div>
        <div className="admin-chart-body">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={depositData}>
              <defs>
                <linearGradient id="depositGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9060ff" />
                  <stop offset="100%" stopColor="#22e88c" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="var(--sx-muted)" fontSize={12} />
              <YAxis stroke="var(--sx-muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: 'var(--tx-card-bg)',
                  border: '1px solid var(--tx-card-border)',
                  borderRadius: '12px',
                  color: 'var(--sx-text)',
                  backdropFilter: 'blur(8px)',
                }}
                labelStyle={{ color: 'var(--sx-muted)' }}
              />
              <Bar dataKey="amount" fill="url(#depositGradient)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Pie Chart */}
      <div className="admin-chart-container admin-chart-full">
        <div className="admin-chart-header">
          <div className="admin-chart-title">
            <FiPieChart className="admin-chart-title-icon" />
            <h3>Transaction Distribution</h3>
          </div>
        </div>
        <div className="admin-chart-body">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--tx-card-bg)',
                  border: '1px solid var(--tx-card-border)',
                  borderRadius: '12px',
                  color: 'var(--sx-text)',
                  backdropFilter: 'blur(8px)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}