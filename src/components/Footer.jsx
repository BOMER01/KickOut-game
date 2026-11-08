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

  {/* Instagram */}
  <a
    href="https://www.instagram.com/kickout_sa/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5"
        fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4"
        fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  </a>

  {/* TikTok */}
  <a
    href="https://www.tiktok.com/@kickout_sa"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="TikTok"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16 3c.4 2.5 1.8 4 4 4.3v3.2c-1.6 0-3-.5-4.2-1.4V16a6 6 0 1 1-6-6h.7v3.4H10a2.6 2.6 0 1 0 2.6 2.6V3H16Z"
        fill="currentColor"
      />
    </svg>
  </a>

  {/* X */}
  <a
    href="https://x.com/kickout_sa"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="X"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.4l7.3-8.4L1.9 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20Z"
        fill="currentColor"
      />
    </svg>
  </a>

</div>



        </div>

      </div>
    </footer>
  );
}