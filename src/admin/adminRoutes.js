// src/admin/adminRoutes.js

import Announcements from "./pages/CMS/Announcements";
import Pages from "./pages/CMS/Pages";
import Dashboard from "./pages/Dashboard";
import CompletedDeposits from "./pages/Deposits/CompletedDeposits";
import PendingDeposits from "./pages/Deposits/PendingDeposits";
import AddPlan from "./pages/Plans/AddPlan";
import PlansList from "./pages/Plans/PlansList";

import DailyReport from "./pages/Reports/DailyReport";
import MonthlyReport from "./pages/Reports/MonthlyReport";

import AllTransactions from "./pages/Transactions/AllTransactions";
import DepositHistory from "./pages/Transactions/DepositHistory";
import WithdrawalHistory from "./pages/Transactions/WithdrawalHistory";
import UserDetails from "./pages/Users/UserDetails";
import UserList from "./pages/Users/UserList";
import CompletedWithdrawals from "./pages/Withdrawals/CompletedWithdrawals";
import PendingWithdrawals from "./pages/Withdrawals/PendingWithdrawals";
import WithdrawalSettings from "./pages/Withdrawals/WithdrawalSettings";

const adminRoutes = {
    Dashboard,
    UserDetails,
    UserList,
    PendingDeposits,
    CompletedDeposits,
    PendingWithdrawals,
    CompletedWithdrawals,
    WithdrawalSettings,
    PlansList,
    AddPlan,
    AllTransactions,
    DepositHistory,
    WithdrawalHistory,
    DailyReport,
    MonthlyReport,
    Pages,
    Announcements,

};

export default adminRoutes;
