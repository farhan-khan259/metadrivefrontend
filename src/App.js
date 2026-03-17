import { BrowserRouter, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";


import ProtectedRoute from "./ProtectedRoute";

// ---- USER PANEL COMPONENTS ----
import Investmentplans from "./Components/Investmentplans/Investmentplans";
import Dashboard from "./Components/Dashboard/Dashboard";
import Deposit from "./Components/Deposit/Deposit";
import Forgetpassword from "./Components/Forgetpassword/Forgetpassword";
import InviteScreen from "./Components/InviteScreen/InviteScreen";
import Profile from "./Components/Profile/Profile";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import Support from "./Components/Support/Support";
import Team from "./Components/Team/Team";
import ManagerRankSystem from "./Components/ManagerRankSystem/ManagerRankSystem";
import TransactionHistory from "./Components/TransactionHistory/TransactionHistory";
import Withdraw from "./Components/Withdraw/Withdraw";

import Rankingdashboard from "./Components/Rankingdashboard/Rankingdashboard";

// ---- ADMIN PANEL COMPONENTS ----
import adminRoutes from "./admin/adminRoutes";
import EarningsSummary from "./Components/EarningsSummary/EarningsSummary";
import OurInfo from "./Components/OurInfo/OurInfo";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";


function AppRoutes() {
	return (
		<Routes>
			{/* -------- PUBLIC ROUTES -------- */}
			<Route path="/" element={<Signin />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/forgetpassword" element={<Forgetpassword />} />
			<Route path="/ourinfo" element={<OurInfo />} />

			{/* -------- USER PROTECTED ROUTES -------- */}
						<Route
							path="/rankingdashboard"
							element={
								<ProtectedRoute>
									<Rankingdashboard />
								</ProtectedRoute>
							}
						/>
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/deposit"
				element={
					<ProtectedRoute>
						<Deposit />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/withdraw"
				element={
					<ProtectedRoute>
						<Withdraw />
					</ProtectedRoute>
				}
			/>
			
			<Route
				path="/team"
				element={
					<ProtectedRoute>
						<Team />
					</ProtectedRoute>
				}
			/>

			<Route
				   path="/managerranksystem"
				   element={
					   <ProtectedRoute>
						   <ManagerRankSystem />
					   </ProtectedRoute>
				   }
			/>

			<Route
				path="/investmentplans"
				element={
					<ProtectedRoute>
						<Investmentplans />
					</ProtectedRoute>
				}
			/>
			
			

			<Route
				path="/support"
				element={
					<ProtectedRoute>
						<Support />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/privacypolicy"
				element={
					<ProtectedRoute>
						<PrivacyPolicy />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/invite"
				element={
					<ProtectedRoute>
						<InviteScreen />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/earningsummary"
				element={
					<ProtectedRoute>
						<EarningsSummary />
					</ProtectedRoute>
				}
			/>


			

			<Route
				   path="/transactionhistory"
				   element={
					   <ProtectedRoute>
						   <TransactionHistory />
					   </ProtectedRoute>
				   }
			/>

		


			{/* -------- ADMIN PROTECTED ROUTES -------- */}
			<Route
				path="/admin"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/users"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.UserList />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/admin/reports/daily"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.DailyReport />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/reports/monthly"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.MonthlyReport />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/cms/announcements"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.Announcements />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/userdetails"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.UserDetails />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/deposits/pending"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.PendingDeposits />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/deposits/completed"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.CompletedDeposits />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/withdrawals/pending"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.PendingWithdrawals />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/withdrawals/completed"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.CompletedWithdrawals />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/plans"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.PlansList />
					</ProtectedRoute>
				}
			/>



			{/* ✅ add the rest of admin routes here, all wrapped with <ProtectedRoute role="admin"> */}
			<Route
				path="/admin/userdetails"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.UserDetails />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/transactions"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.AllTransactions />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/cms/announcements"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.Announcements />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/reports/daily"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.DailyReport />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/reports/monthly"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.MonthlyReport />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/promocode"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.AdminPromoCodes />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}
