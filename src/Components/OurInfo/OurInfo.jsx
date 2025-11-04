// import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./OurInfo.css";

export default function OurInfo() {
  return (
    <div className="ourinfo-container-new">
      {/* Header with Orange Background */}
      <div className="ourinfo-header-section">
        <div className="ourinfo-header">
          <Link to="/dashboard" className="ourinfo-back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="ourinfo-title-new">About Solar X</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="ourinfo-content">
        <div className="ourinfo-card">
          <p className="ourinfo-text-new">
            <strong className="solarx-highlight">"سولر ایکس"</strong> ایک سرمایہ
            کاری کا پلیٹ فارم ہے جو سولر انرجی پروجیکٹس پر توجہ مرکوز کرتا ہے۔
          </p>

          <div className="section">
            <h3 className="section-title">
              سولر سرمایہ کاری کے پلیٹ فارم کی عمومی خصوصیات:
            </h3>
            <ol className="numbered-list">
              <li>
                <strong className="solarx-highlight">
                  سرمایہ کاری کے مواقع
                </strong>
                : یہ پلیٹ فارم افراد کو سولر انرجی پروجیکٹس میں سرمایہ کاری کرنے
                کی اجازت دیتے ہیں، جیسے سولر فارم یا سولر پینل کی تنصیب۔ سرمایہ
                کاروں کو پیدا ہونے والی توانائی کی بنیاد پر منافع مل سکتا ہے۔
              </li>
              <li>
                <strong className="solarx-highlight">کروڈ فنڈنگ</strong>: بہت سے
                سولر سرمایہ کاری کے پلیٹ فارم کروڈ فنڈنگ ماڈل کا استعمال کرتے
                ہیں، جہاں متعدد سرمایہ کار چھوٹی رقمیں مل کر ایک بڑے پروجیکٹ کی
                فنڈنگ کرتے ہیں۔
              </li>
              <li>
                <strong className="solarx-highlight">پائیداری پر توجہ</strong>:
                سولر انرجی میں سرمایہ کاری کرنا قابل تجدید توانائی کو فروغ دینے
                اور کاربن کے اثرات کو کم کرنے میں مدد کرتا ہے، جو ماحولیاتی طور
                پر باخبر سرمایہ کاروں کے لیے دلچسپ ہے۔
              </li>
              <li>
                <strong className="solarx-highlight">سرمایہ پر منافع</strong>:
                سرمایہ کار توانائی کی فروخت، حکومت کی مراعات، یا پروجیکٹس سے
                منافع کی تقسیم کے ذریعے منافع حاصل کر سکتے ہیں۔
              </li>
              <li>
                <strong className="solarx-highlight">شفافیت</strong>: معتبر پلیٹ
                فارم اکثر پروجیکٹس کے بارے میں تفصیلی معلومات فراہم کرتے ہیں،
                بشمول متوقع منافع، خطرات، اور ٹائم لائنز۔
              </li>
            </ol>
          </div>

          <div className="section">
            <h3 className="section-title">
              سولر انرجی میں سرمایہ کاری کے فوائد:
            </h3>
            <ul className="bullet-list">
              <li>
                <strong className="solarx-highlight">مثبت ماحولیاتی اثر</strong>
                : قابل تجدید توانائی میں شراکت دینا ماحولیاتی تبدیلی کے خلاف
                مددگار ثابت ہوتا ہے۔
              </li>
              <li>
                <strong className="solarx-highlight">منافع کا امکان</strong>:
                جیسے جیسے صاف توانائی کی طلب بڑھتی ہے، سولر پروجیکٹس میں سرمایہ
                کاری مالی طور پر فائدہ مند ہو سکتی ہے۔
              </li>
              <li>
                <strong className="solarx-highlight">تنوع</strong>: سولر میں
                سرمایہ کاری آپ کے سرمایہ کاری کے پورٹ فولیو کو متنوع بنا سکتی
                ہے۔
              </li>
            </ul>
          </div>

          <div className="section">
            <h3 className="section-title">غور کرنے کے لیے خطرات:</h3>
            <ul className="bullet-list">
              <li>
                <strong className="solarx-highlight">
                  مارکیٹ کی اتار چڑھاؤ
                </strong>
                : قابل تجدید توانائی کی مارکیٹ میں اتار چڑھاؤ ہو سکتا ہے، اور
                منافع کی ضمانت نہیں ہوتی۔
              </li>
              <li>
                <strong className="solarx-highlight">قانونی تبدیلیاں</strong>:
                حکومت کی پالیسیوں یا مراعات میں تبدیلیاں پروجیکٹ کی منافع پر اثر
                انداز ہو سکتی ہیں۔
              </li>
              <li>
                <strong className="solarx-highlight">پروجیکٹ کے خطرات</strong>:
                مخصوص پروجیکٹس کو تاخیر یا تکنیکی مسائل جیسے چیلنجز کا سامنا
                کرنا پڑ سکتا ہے۔
              </li>
            </ul>
          </div>

          <div className="section">
            <h3 className="section-title">شروع کرنے کا طریقہ:</h3>
            <ol className="numbered-list">
              <li>
                <strong className="solarx-highlight">تحقیق کریں</strong>: معتبر
                سولر سرمایہ کاری کے پلیٹ فارم تلاش کریں اور جائزے پڑھیں۔
              </li>
              <li>
                <strong className="solarx-highlight">شرائط کو سمجھیں</strong>:
                یہ یقینی بنائیں کہ آپ سرمایہ کاری کی شرائط، خطرات، اور ممکنہ
                منافع کو سمجھتے ہیں۔
              </li>
              <li>
                <strong className="solarx-highlight">چھوٹے سے شروع کریں</strong>
                : اگر آپ سرمایہ کاری میں نئے ہیں تو، عمل کو سمجھنے کے لیے چھوٹی
                رقم سے شروع کرنے پر غور کریں۔
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
