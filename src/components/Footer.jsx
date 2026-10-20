import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        {/* Top */}
        <div className="footer__top">

          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              KickOut
            </Link>

            <p className="footer__description">
              اختبر معلوماتك، تحدَّ أصدقاءك، وكن بطل الحلبة في
              أول لعبة مسابقات عربية لعشاق المصارعه
            </p>
          </div>

          {/* Navigation */}
          <nav className="footer__nav">

            {/*<Link to="/">
              الرئيسية
            </Link>

            <a href="#how-it-works">
              كيف تلعب؟
            </a>

            <a href="#categories">
              الفئات
            </a>

            <a href="#contact">
              تواصل معنا
            </a>*/}

          </nav>
        </div>

        {/* Divider */}
        <div className="footer__divider">
          <span></span>
          <i>★</i>
          <span></span>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">

          <p
            style={{ direction: "rtl" }}
            className="footer__copyright"
          >
            © 2026 KickOut
          </p>

          <p
            style={{ direction: "rtl" }}
            className="footer__copyright"
          >
            صُمم لمحبي المصارعه في الوطن العربي 
          </p>

          {/* Socials */}
          <div className="footer__socials">

            <a href="#" aria-label="Instagram">
              <i className="ph ph-instagram-logo"></i>
            </a>

            <a href="#" aria-label="TikTok">
              <i className="ph ph-tiktok-logo"></i>
            </a>

            <a href="#" aria-label="X">
              <i className="ph ph-x-logo"></i>
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}