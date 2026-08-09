import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const arenaRef = useRef(null);

  useEffect(() => {
    const arena = arenaRef.current;

    if (!arena) return;

    const hero = arena.querySelector("#hero");
    const ringWord = arena.querySelector("#ringWord");
    const cards = [
      ...arena.querySelectorAll(".tcard"),
    ];

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const timers = [];

    const addTimer = (callback, delay) => {
      const timer = setTimeout(callback, delay);
      timers.push(timer);
      return timer;
    };

    // Hero entrance
    if (reduceMotion) {
      hero?.classList.add("seq-in", "cta-in");

      return () => {
        timers.forEach(clearTimeout);
      };
    }

    // 1. Show eyebrow + first title line
    hero?.classList.add("seq-in");

    // 2. Slam "الحلبة"
    addTimer(() => {
      if (ringWord) {
        ringWord.style.animation =
          "ring-slam 0.5s cubic-bezier(0.16,1,0.3,1) forwards";
      }

      // 3. Impact
      addTimer(() => {
        arena.classList.add("slam-shake");

        addTimer(() => {
          arena.classList.remove("slam-shake");
        }, 160);

        // Cards jump
        cards.forEach((card, index) => {
          addTimer(() => {
            card.classList.add("jump");

            addTimer(() => {
              card.classList.remove("jump");
            }, 420);
          }, index * 40);
        });
      }, 240);

      // 4. Show CTA
      addTimer(() => {
        hero?.classList.add("cta-in");
      }, 520);
    }, 420);

    return () => {
      timers.forEach(clearTimeout);

      hero?.classList.remove(
        "seq-in",
        "cta-in"
      );

      arena.classList.remove("slam-shake");

      cards.forEach((card) => {
        card.classList.remove("jump");
      });
    };
  }, []);

  return (
    <section
      ref={arenaRef}
      className="arena"
      id="arena"
      aria-label="حلبة كيك أوت"
    >
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

      {/* CENTER HERO */}

      <div
        className="hero"
        id="hero"
        data-depth="hero"
      >
        <p
          className="hero__eyebrow"
          data-seq="1"
        >
          جاهز تختبر معلوماتك؟
        </p>

        <h1 className="hero__title">

          <span
            className="hero__line1"
            data-seq="2"
          >
            تعرف المصارعة؟
          </span>

          <span
            className="hero__line2"
            data-seq="3"
          >
            أثبتها في{" "}

            <span
              className="ring-word"
              id="ringWord"
            >
              الحلبة.
            </span>
          </span>

        </h1>

        <div
          className="hero__cta"
          data-seq="4"
        >
          <span className="hero__prompt">
            اضغط للبدء
          </span>

          <Link
            to="/categories"
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

      {/* FLASH */}

      <span
        className="flash"
        id="flash"
        aria-hidden="true"
      ></span>

      {/* SCROLL HINT */}

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