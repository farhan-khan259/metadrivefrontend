import { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiArrowDown,
  FiArrowUp,
  FiBell,
  FiCheckCircle,
  FiChevronRight,
  FiClipboard,
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiMenu,
  FiShield,
  FiUser,
  FiUsers,
  FiX,
  FiArrowLeft,
  FiPieChart,
  FiPlus,
  FiTrash2,
  FiDollarSign,
  FiClock,
  FiInfo,
} from "react-icons/fi";
import { FaGift, FaTags, FaWhatsapp, FaRegCreditCard, FaWallet, FaUniversity, FaBitcoin } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Import all images
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import bankImage from "../../Assets/Pictures/bank.jpg";
import jazzcashImage from "../../Assets/Pictures/jazzcash.webp";
import easypaisaImage from "../../Assets/Pictures/easypasa.jpg";
import cryptoImage from "../../Assets/Pictures/crypto.jpg";
import "./Withdraw.css";

function Withdraw() {
  const [step, setStep] = useState(1); // 1: method, 2: accounts, 3: amount
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [accounts, setAccounts] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  // Add bankName to newAccount state
  const [newAccount, setNewAccount] = useState({ name: "", number: "", bankName: "" });
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "success", message: "" });
  const [history, setHistory] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && sidebarOpen && !e.target.closest('.sx-sidebar')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Constants
  const whatsappGroupLink = "https://chat.whatsapp.com/FvRiiZs7DyhIDIDHxTdRNj?mode=gi_t";

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userBalance = user?.userbalance || 0;

  const sidebarMain = [
    { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    { to: "/investmentplans", icon: <FiPieChart />, label: "Investment Plans" },
    { to: "/deposit", icon: <FiArrowDown />, label: "Deposit" },
    { to: "/withdraw", icon: <FiArrowUp />, label: "Withdraw" },
    { to: "/invite", icon: <FiUsers />, label: "Refer & Invite" },
    { to: "/team", icon: <FiUsers />, label: "My Team" },
    { to: "/managerranksystem", icon: <FaGift />, label: "Manager Rank System" },
    { to: "/earningsummary", icon: <FiActivity />, label: "Earning Summary" },
    { to: "/transactionhistory", icon: <FiCreditCard />, label: "Transaction History" },
    { to: "/rankingdashboard", icon: <FaTags />, label: "Ranking Dashboard" },
  ];

  const sidebarMore = [
    { to: "/profile", icon: <FiUser />, label: "Profile" },
    { to: "/support", icon: <FiHelpCircle />, label: "Support" },
    { to: "/privacypolicy", icon: <FiShield />, label: "Privacy Policy" },
  ];

  const PAYMENT_METHODS = [
    {
      id: "easypaisa",
      label: "Easypaisa",
      icon: easypaisaImage,
      type: "wallet",
      minAmount: 1,
      maxAmount: 1000,
      fee: "3%",
      processingTime: "5-15 minutes",
      limits: "Min $1, Max $1000",
    },
    {
      id: "jazzcash",
      label: "JazzCash",
      icon: jazzcashImage,
      type: "wallet",
      minAmount: 1,
      maxAmount: 1000,
      fee: "3%",
      processingTime: "5-15 minutes",
      limits: "Min $1, Max $1000",
    },
    {
      id: "crypto",
      label: "USDT (BEP-20)",
      icon: cryptoImage,
      type: "crypto",
      minAmount: 1,
      maxAmount: 1000,
      fee: "3%",
      processingTime: "5-15 minutes",
      limits: "Min $1, Max $1000",
      networks: [
        { id: "bep20", label: "BNB Smart Chain [BEP20]" },
        { id: "trc20", label: "Tron [TRC20]" },
        { id: "sol", label: "Solana" },
      ],
    },
    {
      id: "bank",
      label: "Bank Transfer",
      icon: bankImage,
      type: "bank",
      minAmount: 1,
      maxAmount: 1000,
      fee: "3%",
      processingTime: "24 hours",
      limits: "Min $1, Max $1000",
    },
  ];

  const WITHDRAWAL_INSTRUCTIONS = [
    {
      title: "PKR Withdrawal (Bank Transfer)",
      items: [
        "Withdrawals can be processed to all Pakistani banks in PKR",
        "A 3% withdrawal fee will be applied",
        "The 3% fee will be automatically deducted when the withdrawal request is submitted",
      ],
    },
    {
      title: "USDT Withdrawal",
      items: [
        "USDT withdrawals will be processed through BEP-20 network",
        "0% withdrawal fee will be charged for USDT withdrawals",
      ],
    },
    {
      title: "Withdrawal Conditions",
      items: [
        "Users cannot request a withdrawal until they have activated a plan or made a deposit",
        "Withdrawal requests will only be processed after a user has an active investment plan",
      ],
    },
    {
      title: "Withdrawal Timing",
      items: [
        "Withdrawal requests can be submitted between 9:00 AM and 6:00 PM only",
        "Any requests submitted outside this time period will be processed during the next available withdrawal window",
      ],
    },
  ];

  // Get method-specific limits
  const getMethodLimits = (methodId) => {
    const method = PAYMENT_METHODS.find(m => m.id === methodId);
    return method || PAYMENT_METHODS[0];
  };

  // Handle method selection
  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setStep(2);
    setSelectedAccount(null);
  };

  // Handle add account
  const handleAddAccount = () => {
    setShowAddModal(true);
    setNewAccount({ name: "", number: "", bankName: "", network: "", addressAlias: "" });
  };

  // Handle save account
  const handleSaveAccount = () => {
    if (selectedMethod?.type === "crypto") {
      if (!newAccount.network || !newAccount.number || !newAccount.addressAlias) return;
    } else {
      if (!newAccount.name || !newAccount.number || (selectedMethod?.id === "bank" && !newAccount.bankName)) return;
    }

    setAccounts(prev => ({
      ...prev,
      [selectedMethod.id]: [...(prev[selectedMethod.id] || []), {
        ...newAccount,
        id: Date.now(),
      }],
    }));

    setShowAddModal(false);
    setNewAccount({ name: "", number: "", bankName: "", network: "", addressAlias: "" });
  };

  // Handle delete account
  const handleDeleteAccount = (accountId) => {
    setAccounts(prev => ({
      ...prev,
      [selectedMethod.id]: prev[selectedMethod.id].filter(acc => acc.id !== accountId),
    }));

    if (selectedAccount?.id === accountId) {
      setSelectedAccount(null);
    }
  };

  // Handle select account
  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
    setStep(3);
  };

  // Handle back
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedMethod(null);
      setSelectedAccount(null);
    } else if (step === 3) {
      setStep(2);
      setAmount("");
    }
  };

  // Handle withdraw submit
  const handleWithdraw = async () => {
    if (!selectedAccount || !amount || Number(amount) <= 0) return;

    const method = getMethodLimits(selectedMethod.id);
    if (Number(amount) < method.minAmount) {
      setPopup({
        show: true,
        type: "error",
        message: `Minimum withdrawal amount is $${method.minAmount}`,
      });
      return;
    }

    if (Number(amount) > method.maxAmount) {
      setPopup({
        show: true,
        type: "error",
        message: `Maximum withdrawal amount is $${method.maxAmount}`,
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPopup({
        show: true,
        type: "success",
        message: "Withdrawal request submitted successfully!",
      });

      // Add to history
      const newWithdrawal = {
        id: Date.now(),
        method: selectedMethod.label,
        account: selectedAccount.name,
        amount: Number(amount),
        status: "pending",
        date: new Date().toISOString(),
      };
      setHistory(prev => [newWithdrawal, ...prev]);

      // Reset form
      setStep(1);
      setSelectedMethod(null);
      setSelectedAccount(null);
      setAmount("");
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace('PKR', '$');
  };

  return (
    <div className="sx-dashboard-root">
      {/* Sidebar */}
      <aside className={`sx-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sx-sidebar-top">
          <div className="sx-sidebar-brand">
            <span className="sx-sidebar-brand-text">SPARK</span>
            <img
              src={logoImage}
              alt="SparkX"
              className="sx-sidebar-logo"
            />
          </div>
          <button
            className="sx-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            type="button"
          >
            <FiX />
          </button>
        </div>

        <div className="sx-sidebar-links">
          {sidebarMain.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sx-sidebar-link ${
                location.pathname === item.to ? "active" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sx-sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="sx-sidebar-divider" />

        <div className="sx-sidebar-links">
          {sidebarMore.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sx-sidebar-link ${
                location.pathname === item.to ? "active" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sx-sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          <a
            href={whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="sx-sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="sx-sidebar-icon"><FaWhatsapp /></span>
            <span>WhatsApp Group</span>
          </a>

          <button
            type="button"
            className="sx-sidebar-link sx-logout"
            onClick={handleLogout}
          >
            <span className="sx-sidebar-icon"><FiX /></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sx-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="sx-main">
        <header className="sx-header">
          <div className="sx-header-left">
            <button
              className="sx-menu-btn"
              onClick={() => setSidebarOpen(true)}
              type="button"
            >
              <FiMenu />
            </button>
            <div>
              <h2 className="sx-title">Withdraw Funds</h2>
              <p className="sx-subtitle">Withdraw your earnings securely</p>
            </div>
          </div>

          <div className="sx-header-right">
            <a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="sx-whatsapp-pill"
            >
              <FaWhatsapp /> Join WhatsApp
            </a>
            <button className="sx-icon-btn" type="button">
              <FiBell />
            </button>
            <button
              className="sx-profile-avatar-btn"
              onClick={() => navigate("/profile")}
              type="button"
            >
              <FiUser className="sx-profile-avatar-icon" />
            </button>
          </div>
        </header>

        <div className="withdraw-shell">
          {/* Balance Card */}
          <div className="withdraw-balance-card">
            <div className="withdraw-balance-icon">
              <FaWallet />
            </div>
            <div className="withdraw-balance-info">
              <span className="withdraw-balance-label">Available Balance</span>
              <strong className="withdraw-balance-amount">
                {formatCurrency(userBalance)}
              </strong>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="withdraw-grid">
            {/* Left Column - Withdraw Form */}
            <div className="withdraw-main-col">
              {/* Step Indicator */}
              <div className="withdraw-steps">
                <div className={`withdraw-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
                  <span className="withdraw-step-num">
                    {step > 1 ? <FiCheckCircle /> : "1"}
                  </span>
                  <span className="withdraw-step-label">Method</span>
                </div>
                <FiChevronRight className="withdraw-step-sep" />
                <div className={`withdraw-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
                  <span className="withdraw-step-num">
                    {step > 2 ? <FiCheckCircle /> : "2"}
                  </span>
                  <span className="withdraw-step-label">Account</span>
                </div>
                <FiChevronRight className="withdraw-step-sep" />
                <div className={`withdraw-step ${step >= 3 ? "active" : ""}`}>
                  <span className="withdraw-step-num">3</span>
                  <span className="withdraw-step-label">Amount</span>
                </div>
              </div>

              {/* Back Button */}
              {step > 1 && (
                <button className="withdraw-back-btn" onClick={handleBack}>
                  <FiArrowLeft /> Back
                </button>
              )}

              {/* Step 1: Method Selection */}
              {step === 1 && (
                <div className="withdraw-card">
                  <h3 className="withdraw-card-title">
                    <FiCreditCard className="withdraw-card-icon" />
                    Select Payment Method
                  </h3>
                  <div className="withdraw-method-grid">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        className="withdraw-method-btn"
                        onClick={() => handleMethodSelect(method)}
                      >
                        <img
                          src={method.icon}
                          alt={method.label}
                          className="withdraw-method-icon"
                        />
                        <div className="withdraw-method-info">
                          <span className="withdraw-method-name">{method.label}</span>
                          <span className="withdraw-method-fee">Fee: {method.fee}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Account Selection */}
              {step === 2 && selectedMethod && (
                <div className="withdraw-card">
                  <h3 className="withdraw-card-title">
                    <FaWallet className="withdraw-card-icon" />
                    {selectedMethod.label} Accounts
                  </h3>

                  <div className="withdraw-accounts-list">
                    {(accounts[selectedMethod.id] || []).length === 0 ? (
                      <div className="withdraw-no-accounts">
                        <p>No saved accounts yet</p>
                        <button
                          className="withdraw-add-account-btn"
                          onClick={handleAddAccount}
                        >
                          <FiPlus /> Add New Account
                        </button>
                      </div>
                    ) : (
                      <>
                        {accounts[selectedMethod.id].map((account) => (
                          <div
                            key={account.id}
                            className={`withdraw-account-item ${
                              selectedAccount?.id === account.id ? "selected" : ""
                            }`}
                            onClick={() => handleSelectAccount(account)}
                          >
                            <div className="withdraw-account-details">
                              <span className="withdraw-account-name">{account.name}</span>
                              <span className="withdraw-account-number">{account.number}</span>
                            </div>
                            <button
                              className="withdraw-account-delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAccount(account.id);
                              }}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        ))}
                        <button
                          className="withdraw-add-account-btn"
                          onClick={handleAddAccount}
                        >
                          <FiPlus /> Add Another Account
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Amount Input */}
              {step === 3 && selectedAccount && (
                <div className="withdraw-card">
                  <h3 className="withdraw-card-title">
                    <FiDollarSign className="withdraw-card-icon" />
                    Enter Withdrawal Amount
                  </h3>

                  <div className="withdraw-selected-account-info">
                    <div className="withdraw-selected-account-details">
                      <span className="withdraw-selected-label">Withdrawing to:</span>
                      <span className="withdraw-selected-name">{selectedAccount.name}</span>
                      <span className="withdraw-selected-number">{selectedAccount.number}</span>
                    </div>
                  </div>

                  <div className="withdraw-amount-input-group">
                    <span className="withdraw-amount-prefix">$</span>
                    <input
                      type="number"
                      className="withdraw-amount-input"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min={selectedMethod.minAmount}
                      step="0.01"
                    />
                  </div>

                  <div className="withdraw-amount-limits">
                    <div className="withdraw-limit-item">
                      <span>Min: ${selectedMethod.minAmount}</span>
                      <span>Max: ${selectedMethod.maxAmount.toLocaleString()}</span>
                    </div>
                    <div className="withdraw-limit-item">
                      <span>Fee: {selectedMethod.fee}</span>
                      <span>Processing: {selectedMethod.processingTime}</span>
                    </div>
                  </div>

                  <button
                    className="withdraw-submit-btn"
                    onClick={handleWithdraw}
                    disabled={!amount || Number(amount) <= 0 || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="withdraw-spinner" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiCheckCircle /> Confirm Withdrawal
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Instructions & History */}
            <div className="withdraw-side-col">
              {/* Withdrawal Instructions */}
              <div className="withdraw-instructions-card">
                <h3 className="withdraw-instructions-title">
                  <FiInfo className="withdraw-instructions-icon" />
                  Withdrawal Process
                </h3>
                <div className="withdraw-instructions-content">
                  {WITHDRAWAL_INSTRUCTIONS.map((section, idx) => (
                    <div key={idx} className="withdraw-instruction-section">
                      <h4>{section.title}</h4>
                      <ul>
                        {section.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Withdrawal History */}
              <div className="withdraw-history-card">
                <h3 className="withdraw-history-title">
                  <FiClock className="withdraw-history-icon" />
                  Withdrawal History
                </h3>
                {history.length === 0 ? (
                  <div className="withdraw-no-history">
                    <p>No withdrawal history found</p>
                  </div>
                ) : (
                  <div className="withdraw-history-list">
                    {history.map((item) => (
                      <div key={item.id} className="withdraw-history-item">
                        <div className="withdraw-history-header">
                          <span className="withdraw-history-method">{item.method}</span>
                          <span className={`withdraw-history-status ${item.status}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="withdraw-history-details">
                          <span className="withdraw-history-amount">
                            {formatCurrency(item.amount)}
                          </span>
                          <span className="withdraw-history-date">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="withdraw-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="withdraw-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="withdraw-modal-title">
              Add {selectedMethod?.label} Account
            </h3>
            <p className="withdraw-modal-subtitle">
              Add your mobile wallet account details
            </p>

            <div className="withdraw-modal-form">
              {selectedMethod?.type === "crypto" ? (
                <>
                  <div className="withdraw-modal-field">
                    <label>Select Network</label>
                    <select
                      value={newAccount.network}
                      onChange={e => setNewAccount({ ...newAccount, network: e.target.value })}
                    >
                      <option value="">Choose network</option>
                      {selectedMethod?.networks?.map((net) => (
                        <option key={net.id} value={net.id}>{net.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="withdraw-modal-field">
                    <label>Wallet Address</label>
                    <input
                      type="text"
                      placeholder="Enter your wallet address"
                      value={newAccount.number}
                      onChange={e => setNewAccount({ ...newAccount, number: e.target.value })}
                    />
                  </div>
                  <div className="withdraw-modal-field">
                    <label>Address Alias</label>
                    <input
                      type="text"
                      placeholder="E.g., Binance, Metamask, etc."
                      value={newAccount.addressAlias}
                      onChange={e => setNewAccount({ ...newAccount, addressAlias: e.target.value })}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="withdraw-modal-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter account holder name"
                      value={newAccount.name}
                      onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    />
                  </div>
                  <div className="withdraw-modal-field">
                    <label>Account Number</label>
                    <input
                      type="text"
                      placeholder="Enter account number"
                      value={newAccount.number}
                      onChange={(e) => setNewAccount({ ...newAccount, number: e.target.value })}
                    />
                  </div>
                  {selectedMethod?.id === "bank" && (
                    <div className="withdraw-modal-field">
                      <label>Bank Name</label>
                      <input
                        type="text"
                        placeholder="Enter bank name"
                        value={newAccount.bankName}
                        onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="withdraw-modal-actions">
              <button
                className="withdraw-modal-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="withdraw-modal-save"
                onClick={handleSaveAccount}
                disabled={
                  selectedMethod?.type === "crypto"
                    ? (!newAccount.network || !newAccount.number || !newAccount.addressAlias)
                    : (!newAccount.name || !newAccount.number || (selectedMethod?.id === "bank" && !newAccount.bankName))
                }
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Popup */}
      {popup.show && (
        <div
          className="withdraw-popup-overlay"
          onClick={() => setPopup({ ...popup, show: false })}
        >
          <div
            className={`withdraw-popup withdraw-popup-${popup.type}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="withdraw-popup-icon">
              {popup.type === "success" ? "🎉" : "⚠️"}
            </div>
            <h3 className="withdraw-popup-title">
              {popup.type === "success" ? "Success!" : "Error"}
            </h3>
            <p className="withdraw-popup-message">{popup.message}</p>
            <button
              className="withdraw-popup-close"
              onClick={() => setPopup({ ...popup, show: false })}
            >
              {popup.type === "success" ? "Got It" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Withdraw;