// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import {
// //   FaArrowLeft,
// //   FaCheckCircle,
// //   FaLock,
// //   FaRegClock,
// //   FaWallet,
// // } from "react-icons/fa";
// // import { Link, useLocation } from "react-router-dom";
// // import "./Withdrawfunds.css";

// // const Withdrawfunds = () => {
// //   const location = useLocation();
// //   const { bankName, accountNumber, accountName } = location.state || {};

// //   const [amount, setAmount] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);
// //   const [showError, setShowError] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [userBalance, setUserBalance] = useState(0);
// //   const [plans, setPlans] = useState([]);

// //   // ✅ Get user
// //   const userString = localStorage.getItem("user");
// //   const user = userString ? JSON.parse(userString) : null;
// //   const userId = user?._id;

// //   // ✅ Fetch user balance from DB
// //   const fetchBalance = async () => {
// //     try {
// //       const res = await axios.post("https://be.metadrive01.xyz/team", { userId });
// //       if (res.data?.user?.userbalance !== undefined) {
// //         setUserBalance(res.data.user.userbalance);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching user balance:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     if (userId) fetchBalance();
// //   }, [userId]);

// //   // ✅ Fetch plans (to ensure user has at least 1 active)
// //   useEffect(() => {
// //     const fetchPlan = async () => {
// //       try {
// //         const res = await axios.get(`https://be.metadrive01.xyz/api/plans/`, {
// //           params: { id: userId },
// //         });
// //         if (res.data.success) {
// //           setPlans(res.data.plans);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching plan:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     if (userId) fetchPlan();
// //   }, [userId]);

// //   // ✅ Withdraw handler (deduct instantly from DB & UI)
// //   const handleSubmit = async () => {
// //     if (!amount || Number(amount) < 300) {
// //       setErrorMessage("Minimum withdrawal amount is 300 PKR");
// //       setShowError(true);
// //       return;
// //     }

// //     if (plans.length === 0) {
// //       setErrorMessage("You need at least 1 active plan to withdraw");
// //       setShowError(true);
// //       return;
// //     }

// //     if (Number(amount) > userBalance) {
// //       setErrorMessage("Insufficient balance for this withdrawal");
// //       setShowError(true);
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const res = await axios.post("https://be.metadrive01.xyz/api/withdrawal", {
// //         userId,
// //         withdrawals: Number(amount),
// //         bankName,
// //         accountNumber,
// //         accountName,
// //       });

// //       if (res.data.success) {
// //         // ✅ Instantly reflect deduction in UI
// //         setUserBalance((prev) => prev - Number(amount));

// //         setShowSuccess(true);
// //         setAmount("");

// //         // ✅ Refresh actual balance from DB to stay in sync
// //         setTimeout(fetchBalance, 1500);
// //       } else {
// //         setErrorMessage(res.data.message || "Withdrawal failed");
// //         setShowError(true);
// //       }
// //     } catch (err) {
// //       console.error("Withdrawal error:", err);
// //       setErrorMessage("Server error. Please try again later.");
// //       setShowError(true);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="withdraw-container3">
// //       {/* Header with orange background */}
// //       <div className="header-section3">
// //         <div className="withdraw-header3">
// //           <Link to="/withdraw" className="back-link3">
// //             <FaArrowLeft />
// //           </Link>
// //           <h2 className="title3">Withdraw Funds</h2>
// //         </div>
// //       </div>

// //       <div className="content-section3">
// //         {/* ✅ Exact DB balance */}
// //         <div className="balance-card3">
// //           <span className="balance-label3">Available Balance</span>
// //           <h1 className="balance-amount3">
// //             {userBalance.toLocaleString()} PKR
// //           </h1>
// //         </div>

// //         <div className="card3">
// //           <h3 className="step-title3">
// //             <FaWallet className="step-icon3" /> Step 1: Withdrawal Account
// //             Status
// //           </h3>
// //           <div className="success-status3">
// //             <FaCheckCircle className="success-icon3" />
// //             <span>Account Bound Successfully</span>
// //           </div>

// //           <div className="account-info3">
// //             <p>
// //               <strong>{bankName}</strong>
// //             </p>
// //             <p>Account Name: {accountName}</p>
// //             <p>Account Number: {accountNumber}</p>
// //             <small className="note3">
// //               <FaLock className="lock-icon3" /> Account details are secured and
// //               can only be changed by Admin.
// //             </small>
// //           </div>
// //         </div>

// //         {/* 24/7 Withdrawal Service */}
// //         <div className="card3 service-card3">
// //           <h3 className="step-title3">
// //             <FaRegClock className="step-icon3" />
// //             Withdrawal Service 10:00 AM – 5:00 PM
// //           </h3>
// //           <p className="available-btn3">Withdrawals Available Anytime</p>
// //           <p className="service-note3">
// //             Your withdrawal will be credited to your account within{" "}
// //             <span className="highlight-orange3">6-12 hours.</span>
// //           </p>
// //         </div>

// //         {/* Step 2 */}
// //         <div className="card3">
// //           <h3 className="step-title3">
// //             <FaWallet className="step-icon3" /> Step 2: Enter Withdrawal Amount
// //           </h3>

// //           <input
// //             className="amount-input3"
// //             type="number"
// //             placeholder="Enter amount (Min 300)"
// //             value={amount}
// //             onChange={(e) => setAmount(e.target.value)}
// //             min="300"
// //           />

// //           <button
// //             className="submit-btn3"
// //             onClick={handleSubmit}
// //             disabled={loading}
// //           >
// //             {loading ? "Processing..." : "Submit Withdrawal Request"}
// //           </button>
// //         </div>

// //         {/* Success Popup */}
// //         {showSuccess && (
// //           <div className="popup-overlay3">
// //             <div className="popup-box3 success-popup3">
// //               <div className="popup-icon3">✅</div>
// //               <h2>Withdraw Request Submitted</h2>
// //               <p>Your withdrawal request has been submitted successfully.</p>
// //               <button onClick={() => setShowSuccess(false)}>Close</button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Error Popup */}
// //         {showError && (
// //           <div className="popup-overlay3">
// //             <div className="popup-box3 error-popup3">
// //               <div className="popup-icon3">❌</div>
// //               <h2>Withdrawal Failed</h2>
// //               <p>{errorMessage}</p>
// //               <button onClick={() => setShowError(false)}>Close</button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Withdrawfunds;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   FaArrowLeft,
//   FaCheckCircle,
//   FaLock,
//   FaRegClock,
//   FaWallet,
// } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import "./Withdrawfunds.css";

// const Withdrawfunds = () => {
//   const location = useLocation();
//   const { bankName, accountNumber, accountName } = location.state || {};

//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showError, setShowError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [userBalance, setUserBalance] = useState(0);
//   const [plans, setPlans] = useState([]);

//   // ✅ Get user
//   const userString = localStorage.getItem("user");
//   const user = userString ? JSON.parse(userString) : null;
//   const userId = user?._id;

//   // ✅ Fetch user balance from DB
//   const fetchBalance = async () => {
//     try {
//       const res = await axios.post("https://be.metadrive01.xyz/team", { userId });
//       if (res.data?.user?.userbalance !== undefined) {
//         setUserBalance(res.data.user.userbalance);
//       }
//     } catch (err) {
//       console.error("Error fetching user balance:", err);
//     }
//   };

//   useEffect(() => {
//     if (userId) fetchBalance();
//   }, [userId]);

//   // ✅ Fetch plans (to ensure user has at least 1 active)
//   useEffect(() => {
//     const fetchPlan = async () => {
//       try {
//         const res = await axios.get(`https://be.metadrive01.xyz/api/plans/`, {
//           params: { id: userId },
//         });
//         if (res.data.success) {
//           setPlans(res.data.plans);
//         }
//       } catch (err) {
//         console.error("Error fetching plan:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (userId) fetchPlan();
//   }, [userId]);

//   // ✅ Withdraw handler (deduct instantly from DB & UI)
//   const handleSubmit = async () => {
//     if (!amount || Number(amount) < 300) {
//       setErrorMessage("Minimum withdrawal amount is 300 PKR");
//       setShowError(true);
//       return;
//     }

//     if (plans.length === 0) {
//       setErrorMessage("You need at least 1 active plan to withdraw");
//       setShowError(true);
//       return;
//     }

//     if (Number(amount) > userBalance) {
//       setErrorMessage("Insufficient balance for this withdrawal");
//       setShowError(true);
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post("https://be.metadrive01.xyz/api/withdrawal", {
//         userId,
//         withdrawals: Number(amount),
//         bankName,
//         accountNumber,
//         accountName,
//       });

//       if (res.data.success) {
//         // ✅ Instantly reflect deduction in UI
//         setUserBalance((prev) => prev - Number(amount));

//         setShowSuccess(true);
//         setAmount("");

//         // ✅ Refresh actual balance from DB to stay in sync
//         setTimeout(fetchBalance, 1500);
//       } else {
//         setErrorMessage(res.data.message || "Withdrawal failed");
//         setShowError(true);
//       }
//     } catch (err) {
//       console.error("Withdrawal error:", err);
//       setErrorMessage("Server error. Please try again later.");
//       setShowError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="withdraw-container3">
//       {/* Header with orange background */}
//       <div className="header-section3">
//         <div className="withdraw-header3">
//           <Link to="/withdraw" className="back-link3">
//             <FaArrowLeft />
//           </Link>
//           <h2 className="title3">Withdraw Funds</h2>
//         </div>
//       </div>

//       <div className="content-section3">
//         {/* ✅ Exact DB balance */}
//         <div className="balance-card3">
//           <span className="balance-label3">Available Balance</span>
//           <h1 className="balance-amount3">
//             {userBalance.toLocaleString()} PKR
//           </h1>
//         </div>

//         <div className="card3">
//           <h3 className="step-title3">
//             <FaWallet className="step-icon3" /> Step 1: Withdrawal Account
//             Status
//           </h3>
//           <div className="success-status3">
//             <FaCheckCircle className="success-icon3" />
//             <span>Account Bound Successfully</span>
//           </div>

//           <div className="account-info3">
//             <p>
//               <strong>{bankName}</strong>
//             </p>
//             <p>Account Name: {accountName}</p>
//             <p>Account Number: {accountNumber}</p>
//             <small className="note3">
//               <FaLock className="lock-icon3" /> Account details are secured and
//               can only be changed by Admin.
//             </small>
//           </div>
//         </div>

//         {/* 24/7 Withdrawal Service */}
//         <div className="card3 service-card3">
//           <h3 className="step-title3">
//             <FaRegClock className="step-icon3" />
//             Withdrawal Service 10:00 AM – 5:00 PM
//           </h3>
//           <p className="available-btn3">Withdrawals Available Anytime</p>
//           <p className="service-note3">
//             Your withdrawal will be credited to your account within{" "}
//             <span className="highlight-orange3">6-12 hours.</span>
//           </p>
//         </div>

//         {/* Step 2 */}
//         <div className="card3">
//           <h3 className="step-title3">
//             <FaWallet className="step-icon3" /> Step 2: Enter Withdrawal Amount
//           </h3>

//           <input
//             className="amount-input3"
//             type="number"
//             placeholder="Enter amount (Min 300)"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             min="300"
//           />

//           <button
//             className="submit-btn3"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Submit Withdrawal Request"}
//           </button>
//         </div>

//         {/* Success Popup */}
//         {showSuccess && (
//           <div className="popup-overlay3">
//             <div className="popup-box3 success-popup3">
//               <div className="popup-icon3">✅</div>
//               <h2>Withdraw Request Submitted</h2>
//               <p>Your withdrawal request has been submitted successfully.</p>
//               <button onClick={() => setShowSuccess(false)}>Close</button>
//             </div>
//           </div>
//         )}

//         {/* Error Popup */}
//         {showError && (
//           <div className="popup-overlay3">
//             <div className="popup-box3 error-popup3">
//               <div className="popup-icon3">❌</div>
//               <h2>Withdrawal Failed</h2>
//               <p>{errorMessage}</p>
//               <button onClick={() => setShowError(false)}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Withdrawfunds;
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCalculator,
  FaCheckCircle,
  FaInfoCircle,
  FaLock,
  FaRegClock,
  FaWallet,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Withdrawfunds.css";

const Withdrawfunds = () => {
  const location = useLocation();
  const { bankName, accountNumber, accountName } = location.state || {};

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [plans, setPlans] = useState([]);

  // Constants
  const WITHDRAWAL_FEE_PERCENTAGE = 3;
  const MIN_WITHDRAWAL_AMOUNT = 300;

  // Calculate fees and net amount
  const withdrawalFee = amount
    ? (Number(amount) * WITHDRAWAL_FEE_PERCENTAGE) / 100
    : 0;
  const netAmount = amount ? Number(amount) - withdrawalFee : 0;

  // ✅ Get user
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  // ✅ Fetch user balance from DB
  const fetchBalance = async () => {
    try {
      const res = await axios.post("https://be.metadrive01.xyz/team", { userId });
      if (res.data?.user?.userbalance !== undefined) {
        setUserBalance(res.data.user.userbalance);
      }
    } catch (err) {
      console.error("Error fetching user balance:", err);
    }
  };

  useEffect(() => {
    if (userId) fetchBalance();
  }, [userId]);

  // ✅ Fetch plans (to ensure user has at least 1 active)
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`https://be.metadrive01.xyz/api/plans/`, {
          params: { id: userId },
        });
        if (res.data.success) {
          setPlans(res.data.plans);
        }
      } catch (err) {
        console.error("Error fetching plan:", err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchPlan();
  }, [userId]);

  // ✅ Withdraw handler (deduct instantly from DB & UI)
  const handleSubmit = async () => {
    if (!amount || Number(amount) < MIN_WITHDRAWAL_AMOUNT) {
      setErrorMessage(
        `Minimum withdrawal amount is ${MIN_WITHDRAWAL_AMOUNT.toLocaleString()} PKR`
      );
      setShowError(true);
      return;
    }

    if (plans.length === 0) {
      setErrorMessage("You need at least 1 active plan to withdraw");
      setShowError(true);
      return;
    }

    if (Number(amount) > userBalance) {
      setErrorMessage("Insufficient balance for this withdrawal");
      setShowError(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://be.metadrive01.xyz/api/withdrawal", {
        userId,
        withdrawals: Number(amount), // Original requested amount (1000)
        netWithdrawal: netAmount, // Amount after fee (970) - This is what admin will send
        withdrawalFee: withdrawalFee, // Fee amount (30)
        bankName,
        accountNumber,
        accountName,
      });

      if (res.data.success) {
        // ✅ Instantly reflect deduction in UI
        setUserBalance((prev) => prev - Number(amount));
        setShowSuccess(true);

        // ✅ Refresh actual balance from DB to stay in sync
        setTimeout(fetchBalance, 1500);
      } else {
        setErrorMessage(res.data.message || "Withdrawal failed");
        setShowError(true);
      }
    } catch (err) {
      console.error("Withdrawal error:", err);
      setErrorMessage("Server error. Please try again later.");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-container2">
      {/* Header with gradient background */}
      <div className="withdraw-header-section2">
        <div className="withdraw-header-content2">
          <Link to="/withdraw" className="back-button2">
            <FaArrowLeft />
          </Link>
          <h1 className="withdraw-title2">Withdrawal Funds</h1>
        </div>
      </div>

      <div className="header-balance2">
        <span className="balance-label2">Available Balance</span>
        <span className="balance-amount22">
          {userBalance.toLocaleString()} PKR
        </span>
      </div>
      <div className="withdraw-content2">
        {/* Account Information Card */}
        <div className="info-card2">
          <div className="card-header2">
            <FaWallet className="header-icon2" />
            <h3>Withdrawal Account</h3>
          </div>
          <div className="success-badge2">
            <FaCheckCircle className="success-icon2" />
            <span>Verified & Ready for Withdrawal</span>
          </div>
          <div className="account-details2">
            <div className="detail-row2">
              <span className="detail-label2">Bank Name:</span>
              <span className="detail-value2">{bankName}</span>
            </div>
            <div className="detail-row2">
              <span className="detail-label2">Account Name:</span>
              <span className="detail-value2">{accountName}</span>
            </div>
            <div className="detail-row2">
              <span className="detail-label2">Account Number:</span>
              <span className="detail-value2">{accountNumber}</span>
            </div>
          </div>
          <div className="security-note2">
            <FaLock className="lock-icon2" />
            <span>Your banking details are securely encrypted</span>
          </div>
        </div>

        {/* Service Hours Card */}
        <div className="info-card2 service-card2">
          <div className="card-header2">
            <FaRegClock className="header-icon2" />
            <h3>Withdrawal Service</h3>
          </div>
          <div className="service-status2">
            <span className="status-badge2">Available 24/7</span>
          </div>
          <div className="service-info2">
            <p>
              Processing Time: <strong>Time 24 hours to 48</strong>
            </p>
            <p>
              Service Hours: <strong>10:30 AM – 4:45 PM</strong>
            </p>
          </div>
        </div>

        {/* Amount Input Card */}
        <div className="info-card2">
          <div className="card-header2">
            <FaWallet className="header-icon2" />
            <h3>Enter Withdrawal Amount</h3>
          </div>
          <div className="amount-input-group2">
            <input
              className="amount-input2"
              type="number"
              placeholder={`Minimum ${MIN_WITHDRAWAL_AMOUNT.toLocaleString()} PKR`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={MIN_WITHDRAWAL_AMOUNT}
            />
            <div className="amount-hint2">
              <FaInfoCircle className="hint-icon2" />
              <span>Enter amount in Pakistani Rupees</span>
            </div>
          </div>
        </div>

        {/* Withdrawal Calculation Card */}
        {amount && Number(amount) >= MIN_WITHDRAWAL_AMOUNT && (
          <div className="info-card2 calculation-card2">
            <div className="card-header2">
              <FaCalculator className="header-icon2" />
              <h3>Withdrawal Calculation</h3>
            </div>
            <div className="calculation-details2">
              <div className="calc-row2">
                <span className="calc-label2">Requested Amount:</span>
                <span className="calc-value2">
                  {Number(amount).toLocaleString()} PKR
                </span>
              </div>
              <div className="calc-row2 fee-row2">
                <span className="calc-label2">
                  Processing Fee ({WITHDRAWAL_FEE_PERCENTAGE}%):
                </span>
                <span className="calc-value2 fee-value2">
                  -{withdrawalFee.toLocaleString()} PKR
                </span>
              </div>
              <div className="calc-divider2"></div>
              <div className="calc-row2 total-row2">
                <span className="calc-label2">You Will Receive:</span>
                <span className="calc-value2 total-value2">
                  {netAmount.toLocaleString()} PKR
                </span>
              </div>
            </div>
            <div className="calculation-note2">
              <FaInfoCircle className="note-icon2" />
              <span>
                The {WITHDRAWAL_FEE_PERCENTAGE}% processing fee will be
                deducted. Admin will send{" "}
                <strong>{netAmount.toLocaleString()} PKR</strong> to your bank
                account.
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          className={`submit-button2 ${loading ? "loading2" : ""}`}
          onClick={handleSubmit}
          disabled={
            loading || !amount || Number(amount) < MIN_WITHDRAWAL_AMOUNT
          }
        >
          {loading ? (
            <>
              <div className="spinner2"></div>
              Processing Withdrawal...
            </>
          ) : (
            `Withdraw ${amount ? netAmount.toLocaleString() : "0"} PKR`
          )}
        </button>
        {showSuccess && (
          <div className="popup-overlay2">
            <div className="popup-content2 success-popup2">
              <div className="popup-icon2">✅</div>
              <h2>Withdrawal Request Submitted!</h2>
              <div className="popup-details2">
                <div className="popup-row2">
                  <span>Requested Amount:</span>
                  <strong>{Number(amount).toLocaleString()} PKR</strong>
                </div>
                <div className="popup-row2">
                  <span>Processing Fee ({WITHDRAWAL_FEE_PERCENTAGE}%):</span>
                  <strong>-{withdrawalFee.toLocaleString()} PKR</strong>
                </div>
                <div className="popup-row2 total2">
                  <span>Amount to be Sent:</span>
                  <strong>{netAmount.toLocaleString()} PKR</strong>
                </div>
              </div>
              <p className="popup-message2">
                Your withdrawal request has been submitted. Admin will send{" "}
                <strong>{netAmount.toLocaleString()} PKR</strong> to your bank
                account after approval.
              </p>
              <button
                className="popup-button2"
                onClick={() => {
                  setShowSuccess(false);
                  setAmount(""); // Move setAmount here
                }}
              >
                Got It
              </button>
            </div>
          </div>
        )}

        {/* Error Popup */}
        {showError && (
          <div className="popup-overlay2">
            <div className="popup-content2 error-popup2">
              <div className="popup-icon2">❌</div>
              <h2>Withdrawal Failed</h2>
              <p className="error-message2">{errorMessage}</p>
              <button
                className="popup-button2"
                onClick={() => setShowError(false)}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdrawfunds;
