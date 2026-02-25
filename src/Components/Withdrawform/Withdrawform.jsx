// import { useEffect, useState } from "react";
// import {
//   FaArrowLeft,
//   FaCheckCircle,
//   FaLock,
//   FaShieldAlt,
// } from "react-icons/fa";
// import { MdAccountBalance } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import "./Withdrawform.css";

// const Withdrawform = () => {
//   const [bankName, setBankName] = useState("");
//   const [accountName, setAccountName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [balance, setBalance] = useState(0);
//   const userString = localStorage.getItem("user");
//   const user = JSON.parse(userString);
//   const userId = user?._id;
//   console.log(userId);
//   const navgation = useNavigate();

//   // Check if user is logged in
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       window.location.href = "/";
//     }

//     // In a real app, this would come from an API
//     const userData = JSON.parse(user || "{}");
//     setBalance(userData.balance || 0);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Validation
//     if (!bankName) {
//       setError("Please select a bank or wallet");
//       return;
//     }

//     if (!accountName.trim()) {
//       setError("Please enter account holder name");
//       return;
//     }

//     if (!accountNumber || accountNumber.length < 5) {
//       setError("Please enter a valid account number");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // In a real application, you would send this data to your backend
//       const response = await fetch(
//         "https://be.metadrive01.xyz/api/bindAccountRoutes",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify({
//             userId: userId,
//             bankName,
//             AccountNumber: accountNumber,
//             Accountholder: accountName,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         // Store bank info in localStorage for demonstration
//         localStorage.setItem(
//           "bankInfo",
//           JSON.stringify({ bankName, accountName, accountNumber })
//         );
//         navgation("/withdraw");
//         setSuccess(true);
//       } else {
//         setError(data.message || "Failed to bind account");
//       }
//     } catch (err) {
//       setError("Network error. Please try again.");
//       console.error("Binding error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // If user is not logged in, don't render the form
//   if (!localStorage.getItem("user")) {
//     return null;
//   }

//   return (
//     <div className="withdraw-container2">
//       {/* Header with orange background */}
//       <div className="header-section2">
//         <div className="header2">
//           <Link to="/withdraw" className="back-link2">
//             <FaArrowLeft />
//           </Link>
//           <h1 className="wdrawfund">Bind Withdrawal Account</h1>
//         </div>
//       </div>

//       <div className="content-section2">
//         <div className="balance-box2">
//           <p>Available Balance</p>
//           <h2>{balance.toLocaleString()} PKR</h2>
//         </div>

//         {success ? (
//           <div className="success-container2">
//             <div className="success-icon2">
//               <FaCheckCircle />
//             </div>
//             <h2>Account Successfully Bound!</h2>
//             <p>
//               Your withdrawal account has been successfully linked to your
//               profile.
//             </p>
//             <div className="account-details2">
//               <p>
//                 <strong>Bank:</strong> {bankName}
//               </p>
//               <p>
//                 <strong>Account Name:</strong> {accountName}
//               </p>
//               <p>
//                 <strong>Account Number:</strong> {accountNumber}
//               </p>
//             </div>
//             <div className="success-actions2">
//               <Link to="/withdrawfunds" className="btn-primary2">
//                 Proceed to Withdrawal
//               </Link>
//               <Link to="/dashboard" className="btn-secondary2">
//                 Back to Dashboard
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="step-section2">
//             <h2>
//               <span className="step-number2">Step 1:</span> Withdrawal Account
//               Status
//             </h2>

//             <div className="status-box2">
//               <div className="icon-circle2">
//                 <FaShieldAlt />
//               </div>
//               <h3 className="status-title2">
//                 <FaLock className="lock-icon2" /> Account Not Bound
//               </h3>
//               <p className="status-2">
//                 You must bind your withdrawal account before applying for a
//                 withdrawal.
//               </p>

//               <form className="form-box2" onSubmit={handleSubmit}>
//                 <h4 className="form-heading2">
//                   <MdAccountBalance className="icon2" /> Bank Account Details
//                 </h4>

//                 {error && <div className="error-message2">{error}</div>}

//                 <div className="form-group2">
//                   <label>Bank / Wallet Name</label>
//                   <select
//                     className="bank-select2"
//                     value={bankName}
//                     onChange={(e) => setBankName(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Your Bank or Wallet</option>
//                     <optgroup label="Banks">
//                       <option>Habib Bank Limited (HBL)</option>
//                       <option>Meezan Bank</option>
//                       <option>Allied Bank</option>
//                       <option>United Bank Limited (UBL)</option>
//                       <option>Bank Alfalah</option>
//                       <option>Faysal Bank</option>
//                       <option>JS Bank</option>
//                     </optgroup>

//                     <optgroup label="Digital Wallets">
//                       <option>Easypaisa Wallet</option>
//                       <option>JazzCash Wallet</option>
//                       <option>SadaPay Wallet</option>
//                       <option>NayaPay Wallet</option>
//                       <option>UPaisa Wallet</option>
//                     </optgroup>
//                   </select>
//                 </div>

//                 <div className="form-group2">
//                   <label>Account Holder Name</label>
//                   <input
//                     type="text"
//                     placeholder="Full name as per bank account"
//                     value={accountName}
//                     onChange={(e) => setAccountName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="form-group2">
//                   <label>Account Number</label>
//                   <input
//                     type="text"
//                     placeholder="Account number"
//                     value={accountNumber}
//                     onChange={(e) => setAccountNumber(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="form-actions2">
//                   <button
//                     type="submit"
//                     className="bind-btn2"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Processing..." : "Bind Now"}
//                   </button>
//                   <Link to="/withdraw" className="cancel-btn2">
//                     Cancel
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Withdrawform;

import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./Withdrawform.css";

const Withdrawform = () => {
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [balance, setBalance] = useState(0);
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;
  console.log(userId);
  const navgation = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/";
    }

    // In a real app, this would come from an API
    const userData = JSON.parse(user || "{}");
    setBalance(userData.balance || 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!bankName) {
      setError("Please select your financial institution");
      return;
    }

    if (!accountName.trim()) {
      setError("Please enter the account holder name");
      return;
    }

    if (!accountNumber || accountNumber.length < 5) {
      setError("Please enter a valid account number");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your backend
      const response = await fetch(
        "https://be.metadrive01.xyz/api/bindAccountRoutes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: userId,
            bankName,
            AccountNumber: accountNumber,
            Accountholder: accountName,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store bank info in localStorage for demonstration
        localStorage.setItem(
          "bankInfo",
          JSON.stringify({ bankName, accountName, accountNumber })
        );
        navgation("/withdraw");
        setSuccess(true);
      } else {
        setError(data.message || "Failed to bind account");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Binding error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If user is not logged in, don't render the form
  if (!localStorage.getItem("user")) {
    return null;
  }

  return (
    <div className="withdraw-container2">
      {/* Header with orange background */}
      <div className="header-section2">
        <div className="header2">
          <Link to="/withdraw" className="back-link2">
            <FaArrowLeft />
          </Link>
          <h1 className="wdrawfund">Account Verification</h1>
        </div>
      </div>

      <div className="content-section2">
        <div className="balance-box2">
          <p>Current Balance</p>
          <h2>{balance.toLocaleString()} PKR</h2>
        </div>

        {success ? (
          <div className="success-container2">
            <div className="success-icon2">
              <FaCheckCircle />
            </div>
            <h2>Verification Complete!</h2>
            <p>
              Your account has been successfully verified and is ready for
              transactions.
            </p>
            <div className="account-details2">
              <p>
                <strong>Bank:</strong> {bankName}
              </p>
              <p>
                <strong>Account Name:</strong> {accountName}
              </p>
              <p>
                <strong>Account Number:</strong> {accountNumber}
              </p>
            </div>
            <div className="success-actions2">
              <Link to="/withdrawfunds" className="btn-primary2">
                Continue to Withdrawal
              </Link>
              <Link to="/dashboard" className="btn-secondary2">
                Back to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="step-section2">
            <div className="security-notice2">
              <FaShieldAlt className="security-icon2" />
              <span>
                Your information is protected with bank-level security
              </span>
            </div>
            <h2>
              <span className="step-number2">Step 1:</span> Account Verification
            </h2>

            <div className="status-box2">
              <div className="icon-circle2">
                <FaShieldAlt />
              </div>
              <h3 className="status-title2">
                <FaLock className="lock-icon2" /> Verification Required
              </h3>
              <p className="status-2">
                Complete account verification to enable withdrawal
                functionality.
              </p>

              <form className="form-box2" onSubmit={handleSubmit}>
                <h4 className="form-heading2">
                  <MdAccountBalance className="icon2" /> Account Information
                </h4>

                {error && <div className="error-message2">{error}</div>}

                <div className="form-group2">
                  <label>Financial Institution</label>
                  <select
                    className="bank-select2"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    required
                  >
                    <option value="">Select Bank or Wallet</option>
                    <optgroup label="Banks">
                      <option>Habib Bank Limited (HBL)</option>
                      <option>Meezan Bank</option>
                      <option>Allied Bank</option>
                      <option>United Bank Limited (UBL)</option>
                      <option>Bank Alfalah</option>
                      <option>Faysal Bank</option>
                      <option>JS Bank</option>
                    </optgroup>

                    <optgroup label="Digital Wallets">
                      <option>Easypaisa Wallet</option>
                      <option>JazzCash Wallet</option>
                      <option>SadaPay Wallet</option>
                      <option>NayaPay Wallet</option>
                      <option>UPaisa Wallet</option>
                    </optgroup>
                  </select>
                </div>

                <div className="form-group2">
                  <label>Account Holder </label>
                  <input
                    type="text"
                    placeholder="Full name as per bank account"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group2">
                  <label>Account Number</label>
                  <input
                    type="text"
                    placeholder="Account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="form-actions2">
                  <button
                    type="submit"
                    className="bind-btn2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Verifying..." : "Verify Account"}
                  </button>
                  <Link to="/withdraw" className="cancel-btn2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdrawform;
