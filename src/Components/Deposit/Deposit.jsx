// import { useEffect, useRef, useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { FiUploadCloud } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import "./Deposit.css";

// export default function Deposit() {
//   const [customAmount, setCustomAmount] = useState("");
//   const [image, setImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Popup state
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupType, setPopupType] = useState("success");
//   const [showPopup, setShowPopup] = useState(false);

//   const userString = localStorage.getItem("user");
//   const user = userString ? JSON.parse(userString) : null;
//   const userId = user?._id;

//   const accountNoRef = useRef(null);

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       window.location.href = "/";
//     }
//   }, []);

//   const bankDetails = {
//     bankName: "Easypaisa",
//     accountHolder: "Kashif Ali",
//     accountNo: "03248008331",
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       setImageFile(file);
//     }
//   };

//   const copyToClipboard = () => {
//     const numberText = accountNoRef.current?.textContent?.trim();
//     if (numberText) {
//       navigator.clipboard.writeText(numberText);
//       setPopupMessage("Account number copied to clipboard!");
//       setPopupType("success");
//       setShowPopup(true);
//       setTimeout(() => setShowPopup(false), 2000);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!customAmount || parseFloat(customAmount) < 1000) {
//       setPopupType("error");
//       setPopupMessage("❌ Minimum deposit amount is Rs. 1000");
//       setShowPopup(true);
//       return;
//     }

//     if (!imageFile) {
//       setPopupType("error");
//       setPopupMessage("❌ Please upload a screenshot of your payment");
//       setShowPopup(true);
//       return;
//     }

//     if (!userId) {
//       setPopupType("error");
//       setPopupMessage("❌ User not found. Please login again.");
//       setShowPopup(true);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("user_id", userId);
//       formData.append("amount", customAmount);
//       formData.append("payment_method", "Easypaisa");
//       formData.append("screenshot", imageFile);

//       const response = await fetch("https://be.solarx0.com/api/deposit", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setPopupType("success");
//         setPopupMessage("✅ Deposit request submitted successfully!");
//         setShowPopup(true);

//         // Reset form
//         setCustomAmount("");
//         setImage(null);
//         setImageFile(null);
//       } else {
//         setPopupType("error");
//         setPopupMessage(`❌ ${data.message || "Deposit request failed"}`);
//         setShowPopup(true);
//       }
//     } catch (error) {
//       console.error("Error submitting deposit:", error);
//       setPopupType("error");
//       setPopupMessage("❌ Network error. Please try again.");
//       setShowPopup(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="deposit-page">
//         {/* Header with orange background */}
//         <div className="deposit-header-section">
//           <div className="deposit-header">
//             <Link to="/dashboard" className="back-arrowdeposit">
//               <FaArrowLeft />
//             </Link>
//             <h2 className="deposit-title">Deposit Funds</h2>
//             <div className="header-spacer"></div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="deposit-content">
//           <div className="deposit-card">
//             {/* Bank Details Section */}
//             <div className="details-section">
//               <div className="detail-row">
//                 <label className="detail-label">Payment Method:</label>
//                 <div className="detail-value bank-name">
//                   {bankDetails.bankName}
//                 </div>
//               </div>

//               <div className="detail-row">
//                 <label className="detail-label">Account Holder:</label>
//                 <div className="detail-value">{bankDetails.accountHolder}</div>
//               </div>

//               <div className="detail-row">
//                 <label className="detail-label">Account No:</label>
//                 <div className="detail-value copyable">
//                   <span ref={accountNoRef}>{bankDetails.accountNo}</span>
//                   <button className="copy-btndeposit" onClick={copyToClipboard}>
//                     📋 Copy
//                   </button>
//                 </div>
//               </div>

//               {/* Deposit Amount */}
//               <div className="input-row">
//                 <label className="input-label">Deposit Amount:</label>
//                 <input
//                   type="number"
//                   className="amount-input"
//                   placeholder="Rs Min 1000 - Max Unlimited"
//                   value={customAmount}
//                   onChange={(e) => setCustomAmount(e.target.value)}
//                   min="1000"
//                 />
//               </div>

//               {/* Upload Section */}
//               <div className="upload-section">
//                 <label className="upload-label">Upload Payment Receipt</label>
//                 <div className="upload-area">
//                   <label htmlFor="receiptUpload" className="upload-box">
//                     {image ? (
//                       <div className="image-preview">
//                         <img
//                           src={image}
//                           alt="Receipt"
//                           className="preview-img"
//                         />
//                         <button
//                           className="remove-image"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setImage(null);
//                             setImageFile(null);
//                           }}
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="upload-placeholder">
//                         <FiUploadCloud className="upload-icon" />
//                         <span className="upload-text">
//                           Tap to upload receipt
//                         </span>
//                         <span className="upload-subtext">
//                           PNG, JPG up to 5MB
//                         </span>
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       id="receiptUpload"
//                       onChange={handleImageUpload}
//                       hidden
//                     />
//                   </label>
//                 </div>
//               </div>

//               {/* Continue Button */}
//               <button
//                 className={`continue-btn ${isLoading ? "loading" : ""}`}
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="spinner"></div>
//                     Processing...
//                   </>
//                 ) : (
//                   "Submit Deposit Request"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Popup */}
//       {showPopup && (
//         <div className="popup-overlay">
//           <div className={`popup ${popupType}`}>
//             <div className="popup-icon">
//               {popupType === "success" ? "✅" : "❌"}
//             </div>
//             <h3>{popupType === "success" ? "Success" : "Error"}</h3>
//             <p>{popupMessage}</p>
//             <button
//               className="popup-close-btn"
//               onClick={() => setShowPopup(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Deposit.css";

export default function Deposit() {
  const [customAmount, setCustomAmount] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Popup state
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");
  const [showPopup, setShowPopup] = useState(false);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  const accountNoRef = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/";
    }
  }, []);

  const bankDetails = {
    bankName: "Mazeen Bank",
    accountHolder: "Muhammed Abbas",
    accountNo: "00300113272752",
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const copyToClipboard = () => {
    const numberText = accountNoRef.current?.textContent?.trim();
    if (numberText) {
      navigator.clipboard.writeText(numberText);
      setPopupMessage("Account number copied to clipboard!");
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleSubmit = async () => {
    if (!customAmount || parseFloat(customAmount) < 1000) {
      setPopupType("error");
      setPopupMessage("❌ Minimum deposit amount is Rs. 1000");
      setShowPopup(true);
      return;
    }

    if (!imageFile) {
      setPopupType("error");
      setPopupMessage("❌ Please upload a screenshot of your payment");
      setShowPopup(true);
      return;
    }

    if (!userId) {
      setPopupType("error");
      setPopupMessage("❌ User not found. Please login again.");
      setShowPopup(true);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("amount", customAmount);
      formData.append("payment_method", "Easypaisa");
      formData.append("screenshot", imageFile);

      const response = await fetch("https://be.solarx0.com/api/deposit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPopupType("success");
        setPopupMessage("✅ Deposit request submitted successfully!");
        setShowPopup(true);

        // Reset form
        setCustomAmount("");
        setImage(null);
        setImageFile(null);
      } else {
        setPopupType("error");
        setPopupMessage(`❌ ${data.message || "Deposit request failed"}`);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error submitting deposit:", error);
      setPopupType("error");
      setPopupMessage("❌ Network error. Please try again.");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="depositmain-page">
        {/* Header with orange background */}
        <div className="depositmain-header-section">
          <div className="depositmain-header">
            <Link to="/dashboard" className="depositmain-back-arrow">
              <FaArrowLeft />
            </Link>
            <h2 className="depositmain-title">Deposit Funds</h2>
            <div className="depositmain-header-spacer"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="depositmain-content">
          <div className="depositmain-card">
            {/* Bank Details Section */}
            <div className="depositmain-details-section">
              <div className="depositmain-detail-row">
                <label className="depositmain-detail-label">
                  Payment Method:
                </label>
                <div className="depositmain-detail-value depositmain-bank-name">
                  {bankDetails.bankName}
                </div>
              </div>

              <div className="depositmain-detail-row">
                <label className="depositmain-detail-label">
                  Account Holder:
                </label>
                <div className="depositmain-detail-value">
                  {bankDetails.accountHolder}
                </div>
              </div>

              <div className="depositmain-detail-row">
                <label className="depositmain-detail-label">Account No:</label>
                <div className="depositmain-detail-value depositmain-copyable">
                  <span ref={accountNoRef}>{bankDetails.accountNo}</span>
                  <button
                    className="depositmain-copy-btn"
                    onClick={copyToClipboard}
                  >
                    📋 Copy
                  </button>
                </div>
              </div>

              {/* Deposit Amount */}
              <div className="depositmain-input-row">
                <label className="depositmain-input-label">
                  Deposit Amount:
                </label>
                <input
                  type="number"
                  className="depositmain-amount-input"
                  placeholder="Rs Min 1000 - Max Unlimited"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  min="1000"
                />
              </div>

              {/* Upload Section */}
              <div className="depositmain-upload-section">
                <label className="depositmain-upload-label">
                  Upload Payment Receipt
                </label>
                <div className="depositmain-upload-area">
                  <label
                    htmlFor="receiptUpload"
                    className="depositmain-upload-box"
                  >
                    {image ? (
                      <div className="depositmain-image-preview">
                        <img
                          src={image}
                          alt="Receipt"
                          className="depositmain-preview-img"
                        />
                        <button
                          className="depositmain-remove-image"
                          onClick={(e) => {
                            e.preventDefault();
                            setImage(null);
                            setImageFile(null);
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="depositmain-upload-placeholder">
                        <FiUploadCloud className="depositmain-upload-icon" />
                        <span className="depositmain-upload-text">
                          Tap to upload receipt
                        </span>
                        <span className="depositmain-upload-subtext">
                          PNG, JPG up to 5MB
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      id="receiptUpload"
                      onChange={handleImageUpload}
                      hidden
                    />
                  </label>
                </div>
              </div>

              {/* Continue Button */}
              <button
                className={`depositmain-continue-btn ${
                  isLoading ? "depositmain-loading" : ""
                }`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="depositmain-spinner"></div>
                    Processing...
                  </>
                ) : (
                  "Submit Deposit Request"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="depositmain-popup-overlay">
          <div className={`depositmain-popup ${popupType}`}>
            <div className="depositmain-popup-icon">
              {popupType === "success" ? "✅" : "❌"}
            </div>
            <h3>{popupType === "success" ? "Success" : "Error"}</h3>
            <p>{popupMessage}</p>
            <button
              className="depositmain-popup-close-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
