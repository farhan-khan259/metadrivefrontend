
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiActivity,
  FiArrowDown,
  FiArrowUp,
  FiBell,
  FiCheckCircle,
  FiChevronRight,
  FiClipboard,
  FiPieChart,
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiMenu,
  FiShield,
  FiUploadCloud,
  FiUser,
  FiUsers,
  FiX,
  FiZap,
  FiArrowLeft,
} from "react-icons/fi";
import { FaGift, FaTags, FaWhatsapp } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Import all images at the top
import logoImage from "../../Assets/Pictures/sparkx-logo.jpeg";
import bankImage from "../../Assets/Pictures/bank.jpg";
import jazzcashImage from "../../Assets/Pictures/jazzcash.webp";
import easypaisaImage from "../../Assets/Pictures/easypasa.jpg";
import cryptoImage from "../../Assets/Pictures/crypto.jpg";
import trc20Logo from "../../Assets/Pictures/crypto.jpg";
import bep20Logo from "../../Assets/Pictures/crypto.jpg";
import erc20Logo from "../../Assets/Pictures/crypto.jpg";
import "./Deposit.css";

function Deposit() {
  const [step, setStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "success", message: "" });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize for responsive adjustments
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

  // Reset copied state after timeout
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Constants
  const whatsappGroupLink = "https://chat.whatsapp.com/FvRiiZs7DyhIDIDHxTdRNj?mode=gi_t";

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
      id: "bank",
      label: "Bank Transfer",
      icon: bankImage,
      accountHolder: "SparkX Pvt Ltd",
      accountNo: "1234 5678 9012 3456",
      bankName: "HBL",
    },
    {
      id: "jazzcash",
      label: "JazzCash",
      icon: jazzcashImage,
      accountHolder: "SparkX JazzCash",
      accountNo: "0300 1234567",
    },
    {
      id: "easypaisa",
      label: "EasyPaisa",
      icon: easypaisaImage,
      accountHolder: "SparkX EasyPaisa",
      accountNo: "0300 7654321",
    },
    {
      id: "crypto",
      label: "USDT (TRC20)",
      icon: cryptoImage,
      tokens: [
        {
          id: "usdt",
          label: "USDT",
          networks: [
            {
              id: "trc20",
              label: "TRC20",
              logo: trc20Logo,
              rate: "1 USDT = 280 PKR",
              address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
            },
            {
              id: "bep20",
              label: "BEP20",
              logo: bep20Logo,
              rate: "1 USDT = 279 PKR",
              address: "0x1234567890abcdef1234567890abcdef12345678",
            },
            {
              id: "erc20",
              label: "ERC20",
              logo: erc20Logo,
              rate: "1 USDT = 278 PKR",
              address: "0xabcdef1234567890abcdef1234567890abcdef12",
            },
          ],
        },
      ],
    },
  ];

  const QUICK_AMOUNTS = [1000, 2500, 5000, 10000, 25000];

  const getUsdAmount = (pkr) => {
    if (!pkr || isNaN(pkr)) return "0.00";
    return (Number(pkr) / 280).toFixed(2);
  };

  const INSTRUCTIONS = [
    "Send the exact amount shown above",
    "Include transaction ID in reference (if possible)",
    "Upload clear screenshot of payment",
    "Funds will be credited within 5-15 minutes",
  ];

  // Handlers
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAccountNo = () => {
    if (selectedMethod?.accountNo) {
      copyToClipboard(selectedMethod.accountNo);
    }
  };

  const copyCryptoAddress = (address) => {
    copyToClipboard(address);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setPopup({ 
          show: true, 
          type: "error", 
          message: "Image size should be less than 5MB" 
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        setPopup({ 
          show: true, 
          type: "error", 
          message: "Please upload an image file" 
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    const fileInput = document.getElementById("dep-screenshot");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async () => {
    if (!imagePreview) {
      setPopup({ 
        show: true, 
        type: "error", 
        message: "Please upload a payment screenshot" 
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPopup({ show: true, type: "success", message: "" });
      // Reset form after successful submission
      setStep(1);
      setSelectedMethod(null);
      setSelectedNetwork(null);
      setCustomAmount("");
      setTransactionId("");
      setImagePreview(null);
    }, 2000);
  };

  const handleLogout = () => {
    // Handle logout logic
    navigate("/login");
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    if (method.id === "crypto") {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(selectedMethod?.id === "crypto" ? 2 : 1);
    else if (step === 4) setStep(3);
  };

  // Validate amount input
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCustomAmount(value);
    }
  };

  // Step 1 UI (Method Selection)
  const stepOneContent = (
    <div className="dep-shell">
      <div className="dep-steps">
        <div className="dep-step dep-step-active">
          <span className="dep-step-num">1</span>
          <span className="dep-step-label">Method</span>
        </div>
        <FiChevronRight className="dep-step-sep" />
        <div className="dep-step">
          <span className="dep-step-num">2</span>
          <span className="dep-step-label">Amount</span>
        </div>
        <FiChevronRight className="dep-step-sep" />
        <div className="dep-step">
          <span className="dep-step-num">3</span>
          <span className="dep-step-label">Details</span>
        </div>
        <FiChevronRight className="dep-step-sep" />
        <div className="dep-step">
          <span className="dep-step-num">4</span>
          <span className="dep-step-label">Upload</span>
        </div>
      </div>

      <div className="dep-cols">
        <div className="dep-col-main">
          <div className="dep-card">
            <h3 className="dep-card-title">
              <FiCreditCard className="dep-card-title-icon" /> Select Payment Method
            </h3>
            <div className="dep-method-list">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`dep-method-btn${
                    selectedMethod?.id === method.id ? " dep-method-selected" : ""
                  }`}
                  onClick={() => handleMethodSelect(method)}
                >
                  <span className="dep-method-emoji">
                    <img
                      src={method.icon}
                      alt={method.label}
                      className="dep-method-img"
                      height="30"
                      width="30"
                      style={{ height: '30px', width: '30px', objectFit: 'contain' }}
                      onError={e => { 
                        console.error(`Failed to load image for ${method.label}`);
                        e.target.style.display = 'none';
                      }}
                    />
                  </span>
                  <div className="dep-method-info">
                    <span className="dep-method-name">{method.label}</span>
                    {method.accountNo && (
                      <span className="dep-method-soon">{method.accountNo}</span>
                    )}
                  </div>
                  {selectedMethod?.id === method.id && (
                    <FiCheckCircle className="dep-method-check" />
                  )}
                </button>
              ))}
            </div>
            {/* Payment input field when method is selected */}
            {selectedMethod && (
              <div className="dep-amount-input-wrap">
                <label htmlFor="dep-amount-usd" className="dep-amount-label">Enter Amount ($):</label>
                <input
                  id="dep-amount-usd"
                  type="number"
                  min="1"
                  className="dep-amount-input"
                  value={customAmount}
                  onChange={e => setCustomAmount(e.target.value)}
                  placeholder="Amount in USD"
                />
                <small className="dep-amount-pkr">≈ {customAmount && !isNaN(customAmount) ? (Number(customAmount) * 280).toLocaleString() : 0} PKR</small>
              </div>
            )}
          </div>
        </div>
        <div className="dep-col-side">
          <div className="dep-card dep-instr-card">
            <h3 className="dep-card-title">
              <FiShield className="dep-card-title-icon" /> Deposit Instructions
            </h3>
            <ul className="dep-instr-list">
              {INSTRUCTIONS.map((txt, i) => (
                <li key={i} className="dep-instr-item">
                  <span className="dep-instr-dot" />
                  {txt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2 UI (Token/Network Selection for Crypto)
  const stepTwoContent = (
    <div className="dep-shell">
      {/* Top back button */}
      <div className="dep-topbar">
        <button className="dep-back-btn-top" onClick={handleBack}>
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="dep-steps">
        <div className="dep-step dep-step-done">
          <span className="dep-step-num dep-step-num-done">
            <FiCheckCircle />
          </span>
          <span className="dep-step-label">Method</span>
        </div>
        <FiChevronRight className="dep-step-sep" />
        <div className="dep-step dep-step-active">
          <span className="dep-step-num">2</span>
          <span className="dep-step-label">Token/Network</span>
        </div>
        <FiChevronRight className="dep-step-sep" />
        <div className="dep-step">
          <span className="dep-step-num">3</span>
          <span className="dep-step-label">Details</span>
        </div>
        <FiChevronRight className="dep-step-sep" />
        <div className="dep-step">
          <span className="dep-step-num">4</span>
          <span className="dep-step-label">Upload</span>
        </div>
      </div>

      <div className="dep-cols">
        <div className="dep-col-main">
          {/* Token Selection */}
          <div className="dep-card">
            <h3 className="dep-card-title">
              <FiZap className="dep-card-title-icon" /> Select Token
            </h3>

            {selectedMethod?.tokens?.map((token) => (
              <div key={token.id}>
                <button
                  type="button"
                  className="dep-method-btn dep-method-selected"
                  disabled
                >
                  <div className="dep-method-info">
                    <span className="dep-method-name">{token.label}</span>
                  </div>
                  <FiCheckCircle className="dep-method-check" />
                </button>
              </div>
            ))}
          </div>

          {/* Network Selection */}
          <div className="dep-card">
            <h3 className="dep-card-title">
              <FiZap className="dep-card-title-icon" /> Select Crypto Network
            </h3>
            <div className="dep-method-list">
              {selectedMethod?.tokens && selectedMethod.tokens[0]?.networks?.map((network) => (
                <button
                  key={network.id}
                  type="button"
                  className={`dep-method-btn${
                    selectedNetwork?.id === network.id ? " dep-method-selected" : ""
                  }`}
                  onClick={() => setSelectedNetwork(network)}
                >
                  <img
                    src={network.logo}
                    alt={network.label}
                    className="dep-network-logo"
                    onError={(e) => {
                      console.error(`Failed to load network logo for ${network.label}`);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="dep-method-info">
                    <span className="dep-method-name">{network.label}</span>
                    <span className="dep-method-soon">Rate: {network.rate}</span>
                  </div>
                  {selectedNetwork?.id === network.id && (
                    <FiCheckCircle className="dep-method-check" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Amount input */}
          <div className="dep-card">
            <h3 className="dep-card-title">
              <FiCreditCard className="dep-card-title-icon" /> Deposit Amount
            </h3>
            <div className="dep-quick-amounts">
              {QUICK_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className={`dep-quick-btn${
                    customAmount === String(amt) ? " dep-quick-selected" : ""
                  }`}
                  onClick={() => setCustomAmount(String(amt))}
                >
                  <span className="dep-quick-amount-pkr">$ {amt.toLocaleString()}</span>
                  <span className="dep-quick-amount-usd">/${getUsdAmount(amt)}</span>
                </button>
              ))}
            </div>
            <div className="dep-amount-input-wrap">
              <span className="dep-amount-prefix">$</span>
              <input
                type="number"
                className="dep-amount-input"
                placeholder="Enter custom amount (min 500)"
                value={customAmount}
                onChange={handleAmountChange}
                min="500"
              />
              <span className="dep-amount-usd">${getUsdAmount(customAmount)}</span>
            </div>
            <p className="dep-amount-note">Minimum $ 500 · No maximum limit</p>
          </div>

          <button
            type="button"
            className={`dep-proceed-btn ${!selectedNetwork || !customAmount || Number(customAmount) < 500 ? 'dep-proceed-disabled' : ''}`}
            onClick={() => selectedNetwork && setStep(3)}
            disabled={!selectedNetwork || !customAmount || Number(customAmount) < 500}
          >
            Continue <FiChevronRight />
          </button>
        </div>

        <div className="dep-col-side">
          <div className="dep-card dep-instr-card">
            <h3 className="dep-card-title">
              <FiShield className="dep-card-title-icon" /> Deposit Instructions
            </h3>
            <ul className="dep-instr-list">
              {INSTRUCTIONS.map((txt, i) => (
                <li key={i} className="dep-instr-item">
                  <span className="dep-instr-dot" />
                  {txt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 3: Details (Bank/JazzCash or Crypto)
  const stepThreeContent = (
    <div className="dep-shell">
      {/* Top back button */}
      <div className="dep-topbar">
        <button className="dep-back-btn-top" onClick={handleBack}>
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="dep-steps">
        <div className="dep-step dep-step-done">
          <span className="dep-step-num dep-step-num-done">
            <FiCheckCircle />
          </span>
          <span className="dep-step-label">Method</span>
        </div>
        <FiChevronRight className="dep-step-sep" />

        {selectedMethod?.id === "crypto" ? (
          <>
            <div className="dep-step dep-step-done">
              <span className="dep-step-num dep-step-num-done">
                <FiCheckCircle />
              </span>
              <span className="dep-step-label">Token/Network</span>
            </div>
            <FiChevronRight className="dep-step-sep" />
          </>
        ) : null}

        <div className="dep-step dep-step-active">
          <span className="dep-step-num">3</span>
          <span className="dep-step-label">Details</span>
        </div>
        <FiChevronRight className="dep-step-sep" />

        <div className="dep-step">
          <span className="dep-step-num">4</span>
          <span className="dep-step-label">Upload</span>
        </div>
      </div>

      <div className="dep-confirm-wrap">
        <div className="dep-card dep-confirm-card">
          <div className="dep-confirm-header">
            <div className="dep-confirm-method-badge">
              <span className="dep-confirm-emoji">
                <img 
                  src={selectedMethod?.icon} 
                  alt={selectedMethod?.label}
                  style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                  onError={(e) => e.target.style.display = 'none'}
                />
              </span>
              <div>
                <p className="dep-confirm-method-label">Payment Method</p>
                <p className="dep-confirm-method-name">{selectedMethod?.label}</p>
              </div>
            </div>
            <div className="dep-confirm-amount-badge">
              <p className="dep-confirm-amount-label">Amount</p>
              <p className="dep-confirm-amount-val">
                $ {Number(customAmount).toLocaleString()}
              </p>
              <p className="dep-confirm-currency">
                ≈ ${getUsdAmount(customAmount)} USD
              </p>
            </div>
          </div>

          <div className="dep-confirm-divider" />

          {/* Account/Wallet details */}
          {selectedMethod?.id === "crypto" && selectedNetwork ? (
            <div className="dep-account-block">
              <p className="dep-account-heading">Send payment to this wallet address</p>
              <div className="dep-account-row">
                <div className="dep-account-info">
                  <p className="dep-account-holder">{selectedNetwork.label}</p>
                  <p className="dep-account-no dep-address-truncate">{selectedNetwork.address}</p>
                </div>
                <button
                  type="button"
                  className={`dep-copy-btn${copied ? " dep-copied" : ""}`}
                  onClick={() => copyCryptoAddress(selectedNetwork.address)}
                >
                  <FiClipboard />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="dep-qr-placeholder">
                <img
                  src={selectedNetwork.logo}
                  alt="Crypto Logo"
                  className="dep-crypto-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <p className="dep-qr-note">Scan QR code or copy address</p>
              </div>
            </div>
          ) : (
            <div className="dep-account-block">
              <p className="dep-account-heading">Send payment to this number</p>
              <div className="dep-account-row">
                <div className="dep-account-info">
                  <p className="dep-account-holder">{selectedMethod?.accountHolder}</p>
                  <p className="dep-account-no">{selectedMethod?.accountNo}</p>
                </div>
                <button
                  type="button"
                  className={`dep-copy-btn${copied ? " dep-copied" : ""}`}
                  onClick={copyAccountNo}
                >
                  <FiClipboard />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}

          <div className="dep-confirm-divider" />

          {/* Transaction ID */}
          <div className="dep-field-group">
            <label className="dep-field-label">
              Transaction ID{" "}
              <span className="dep-field-optional">(optional but recommended)</span>
            </label>
            <input
              type="text"
              className="dep-text-input"
              placeholder="Enter your transaction / reference ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="dep-proceed-btn"
            onClick={() => setStep(4)}
          >
            Continue <FiChevronRight />
          </button>
        </div>

        <div className="dep-card dep-instr-card dep-confirm-instr">
          <h3 className="dep-card-title">
            <FiShield className="dep-card-title-icon" /> Important Notes
          </h3>
          <ul className="dep-instr-list">
            {INSTRUCTIONS.map((txt, i) => (
              <li key={i} className="dep-instr-item">
                <span className="dep-instr-dot" />
                {txt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // Step 4: Upload screenshot and submit
  const stepFourContent = (
    <div className="dep-shell">
      {/* Top back button */}
      <div className="dep-topbar">
        <button className="dep-back-btn-top" onClick={handleBack}>
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="dep-steps">
        <div className="dep-step dep-step-done">
          <span className="dep-step-num dep-step-num-done">
            <FiCheckCircle />
          </span>
          <span className="dep-step-label">Method</span>
        </div>
        <FiChevronRight className="dep-step-sep" />

        {selectedMethod?.id === "crypto" ? (
          <>
            <div className="dep-step dep-step-done">
              <span className="dep-step-num dep-step-num-done">
                <FiCheckCircle />
              </span>
              <span className="dep-step-label">Token/Network</span>
            </div>
            <FiChevronRight className="dep-step-sep" />
          </>
        ) : null}

        <div className="dep-step dep-step-done">
          <span className="dep-step-num dep-step-num-done">
            <FiCheckCircle />
          </span>
          <span className="dep-step-label">Details</span>
        </div>
        <FiChevronRight className="dep-step-sep" />

        <div className="dep-step dep-step-active">
          <span className="dep-step-num">4</span>
          <span className="dep-step-label">Upload</span>
        </div>
      </div>

      <div className="dep-confirm-wrap">
        <div className="dep-card dep-confirm-card">
          <div className="dep-field-group">
            <label className="dep-field-label">
              Payment Screenshot <span className="dep-field-required">*</span>
            </label>
            <label htmlFor="dep-screenshot" className="dep-upload-zone">
              {imagePreview ? (
                <div className="dep-preview-frame">
                  <img
                    src={imagePreview}
                    alt="Receipt preview"
                    className="dep-preview-img"
                  />
                  <button
                    type="button"
                    className="dep-preview-remove"
                    onClick={removeImage}
                    aria-label="Remove image"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <div className="dep-upload-placeholder">
                  <FiUploadCloud className="dep-upload-icon" />
                  <p className="dep-upload-label-text">Tap to upload receipt</p>
                  <p className="dep-upload-sub">PNG, JPG · max 5 MB</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                id="dep-screenshot"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          </div>

          <button
            type="button"
            className={`dep-submit-btn${isLoading ? " dep-submitting" : ""}`}
            onClick={handleSubmit}
            disabled={isLoading || !imagePreview}
          >
            {isLoading ? (
              <>
                <span className="dep-spinner" /> Processing…
              </>
            ) : (
              <>
                <FiCheckCircle /> Verify &amp; Submit Deposit
              </>
            )}
          </button>
        </div>

        <div className="dep-card dep-instr-card dep-confirm-instr">
          <h3 className="dep-card-title">
            <FiShield className="dep-card-title-icon" /> Important Notes
          </h3>
          <ul className="dep-instr-list">
            {INSTRUCTIONS.map((txt, i) => (
              <li key={i} className="dep-instr-item">
                <span className="dep-instr-dot" />
                {txt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

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
              onError={(e) => {
                console.error('Failed to load logo');
                e.target.style.display = 'none';
              }}
            />
          </div>
          <button
            className="sx-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            type="button"
            aria-label="Close sidebar"
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
            <span className="sx-sidebar-icon">
              <FaWhatsapp />
            </span>
            <span>WhatsApp Group</span>
          </a>

          <button
            type="button"
            className="sx-sidebar-link sx-logout"
            onClick={handleLogout}
          >
            <span className="sx-sidebar-icon">
              <FiX />
            </span>
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

      {/* Main content */}
      <main className="sx-main">
        <header className="sx-header">
          <div className="sx-header-left">
            <button
              className="sx-menu-btn"
              onClick={() => setSidebarOpen(true)}
              type="button"
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
            <div>
              <h2 className="sx-title">Deposit Funds</h2>
              <p className="sx-subtitle">Add funds to your SparkX wallet</p>
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
            <button className="sx-icon-btn" type="button" aria-label="Notifications">
              <FiBell />
            </button>
            <button
              className="sx-profile-avatar-btn"
              onClick={() => navigate("/profile")}
              type="button"
              aria-label="Profile"
            >
              <FiUser className="sx-profile-avatar-icon" />
            </button>
          </div>
        </header>

        {step === 1 && stepOneContent}
        {step === 2 && stepTwoContent}
        {step === 3 && stepThreeContent}
        {step === 4 && stepFourContent}
      </main>

      {/* Popup */}
      {popup.show && (
        <div
          className="dep-popup-overlay"
          onClick={() => setPopup({ ...popup, show: false })}
        >
          <div
            className={`dep-popup dep-popup-${popup.type}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dep-popup-icon-wrap">
              {popup.type === "success" ? "🎉" : "⚠️"}
            </div>
            <h3 className="dep-popup-title">
              {popup.type === "success" ? "Deposit Submitted!" : "Action Required"}
            </h3>
            <p className="dep-popup-body">
              {popup.type === "success"
                ? "Your deposit request has been received and is under review. You will be notified once it is approved."
                : popup.message}
            </p>
            {popup.type === "success" && (
              <p className="dep-popup-note">⏳ Processing time: 5–15 minutes</p>
            )}
            <button
              type="button"
              className="dep-popup-close"
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

export default Deposit;