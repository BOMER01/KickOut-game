import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-section">

      {/* WRESTLING ROPES */}
      <div
        className="ropes ropes--back"
        data-depth="rope-back"
        aria-hidden="true"
      >
        <span className="rope rope--blue rope--b1"></span>
        <span className="rope rope--red rope--b2"></span>
      </div>

      <div
        className="ropes ropes--front"
        data-depth="rope-front"
        aria-hidden="true"
      >
        <span className="rope rope--red rope--f1"></span>
        <span className="rope rope--blue rope--f2"></span>
      </div>

      {/* FLOATING CARDS */}
      <div className="cards" aria-hidden="true">
        <div
          className="tcard tcard--wm"
          data-depth="card-mid"
          style={{ "--r": "-9deg" }}
        >
          راسلمينيا
        </div>

        <div
          className="tcard tcard--guess"
          data-depth="card-mid"
          style={{ "--r": "7deg" }}
        >
          خمن المصارع
        </div>

        <div
          className="tcard tcard--titles"
          data-depth="card-mid"
          style={{ "--r": "-4deg" }}
        >
          الألقاب
        </div>

        <div
          className="tcard tcard--who"
          data-depth="card-mid"
          style={{ "--r": "12deg" }}
        >
          من قالها؟
        </div>

        <div
          className="tcard tcard--blur2 tcard--moments"
          data-depth="card-mid"
          style={{
            "--r": "30deg",
            top: "550px",
          }}
        >
          اللحظات التاريخية
        </div>

        <div
          className="tcard tcard--pts500"
          data-depth="card-mid"
          style={{ "--r": "-15deg" }}
        >
          500
        </div>

        <div
          className="tcard tcard--blur tcard--pts300"
          data-depth="card-front"
          style={{ "--r": "6deg" }}
        >
          300
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="hero" id="hero" data-depth="hero">

        <p className="hero__eyebrow">
          جاهز تختبر معلوماتك؟
        </p>

        <h1 className="hero__title">
          <span className="hero__line1">
            تعرف المصارعة؟
          </span>

          <span className="hero__line2">
            أثبتها في{" "}
            <span
              className="ring-word"
              id="ringWord"
            >
              الحلبة.
            </span>
          </span>
        </h1>

        <div className="hero__cta">

          <span className="hero__prompt">
            اضغط للبدء
          </span>

          <Link
            to="/category"
            className="arcade-btn arcade-btn--lg"
            id="heroCta"
          >
            <span
              className="arcade-btn__face"
              id="heroCtaFace"
            >
              ادخل الحلبة
            </span>
          </Link>

        </div>

      </div>

      {/* Flash */}
      <span
        className="flash"
        id="flash"
        aria-hidden="true"
      ></span>

      {/* Scroll */}
      <div
        className="scroll-hint"
        aria-hidden="true"
      >
        <span className="scroll-hint__txt">
          مرّر للأسفل
        </span>

        <span className="scroll-hint__arrow"></span>
      </div>

    </section>
  );
}