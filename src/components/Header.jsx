import { Link } from "react-router-dom";
import logo from "../assets/images/logo-1-06.png";

export default function Header() {
  return (
    <header className="hud" id="hud" aria-label="التنقل الرئيسي">
      <div className="hud__inner">

        {/* Right Navigation */}
        <nav className="hud__nav hud__nav--right" id="navRight">
          <ul>
            <li>
              <Link
                to="/login"
                className="navlink navlink--home"
                data-fx="underline"
              >
                تسجيل الدخول
              </Link>
            </li>

            <li>
              <a
                href="#howToPlay"
                className="navlink navlink--how"
                data-fx="qbounce"
              >
                كيف تلعب
                <span className="q">؟</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Center Logo */}
        <div className="hud__logo" id="hudLogo">
          <Link to="/" className="logo" id="logo">
            <img
              className="logo_img"
              src={logo}
              alt="كيك أوت"
            />
          </Link>
        </div>

        {/* Left Navigation */}
        <nav className="hud__nav hud__nav--left" id="navLeft">
          <ul>
            <li>
              <a
                href="#challengeTerminal"
                className="navlink navlink--cat"
                data-fx="fan"
              >
                التصنيفات
                <span className="fan">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
              </a>
            </li>

            <li>
              <a
                href="#contact"
                className="navlink navlink--contact"
                data-fx="bubble"
              >
                تواصل معنا
                <span className="bubble"></span>
              </a>
            </li>

            <li>
              <Link
                to="/category"
                className="arcade-btn arcade-btn--sm"
                id="headerCta"
                data-fx="press"
              >
                <span className="arcade-btn__face">
                  ابدأ التحدي!
                </span>
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}