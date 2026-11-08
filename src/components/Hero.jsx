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

  
  // Mouse Parallax — Background elements only
  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (reduceMotion || !finePointer) return;

    const layers = [
      ...arena.querySelectorAll("[data-depth]:not([data-depth='hero'])"),
    ].map((element) => {
      const depth = element.dataset.depth;

      const strength = {
        "rope-back": 0.35,
        "rope-front": 0.65,
        "card-mid": 0.85,
        "card-front": 1.2,
      }[depth] ?? 0.5;

      return {
        element,
        strength,
        x: 0,
        y: 0,
      };
    });

    let targetX = 0;
    let targetY = 0;
    let rafId = null;

    const animate = () => {
      let moving = false;

      layers.forEach((layer) => {
        const nextX = targetX * layer.strength;
        const nextY = targetY * layer.strength;

        // Smooth follow
        layer.x += (nextX - layer.x) * 0.055;
        layer.y += (nextY - layer.y) * 0.055;

        layer.element.style.setProperty("--px", `${layer.x}px`);
        layer.element.style.setProperty("--py", `${layer.y}px`);

        if (
          Math.abs(nextX - layer.x) > 0.05 ||
          Math.abs(nextY - layer.y) > 0.05
        ) {
          moving = true;
        }
      });

      if (moving) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    };

    const startAnimation = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event) => {
      const rect = arena.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalizedX = (event.clientX - centerX) / (rect.width / 2);
      const normalizedY = (event.clientY - centerY) / (rect.height / 2);

      const clamp = (value) => Math.max(-1, Math.min(1, value));

      // Horizontal follows the mouse.
      // Vertical moves in the opposite direction.
      targetX = clamp(normalizedX) * 22;
      targetY = -clamp(normalizedY) * 22;

      startAnimation();
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
      startAnimation();
    };

    arena.addEventListener("pointermove", handlePointerMove);
    arena.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      arena.removeEventListener("pointermove", handlePointerMove);
      arena.removeEventListener("pointerleave", handlePointerLeave);

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      layers.forEach(({ element }) => {
        element.style.removeProperty("--px");
        element.style.removeProperty("--py");
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
         الأنديز
        </div>

        <div
          className="tcard tcard--titles"
          data-depth="card-mid"
          style={{ "--r": "-4deg" }}
        >
          SPW
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
          600
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
         اول لعبة مصارعة بالوطن العربي
        </p>

        <h1 className="hero__title">

          <span
            className="hero__line1"
            data-seq="2"
          >
           جاهزين تتحدون 
          </span>

          <span
            className="hero__line2"
            data-seq="3"
          >
          

            <span
              className="ring-word"
              id="ringWord"
            >
             بعض  بلمصارعه؟
            </span>
          </span>

        </h1>

        <div
          className="hero__cta"
          data-seq="4"
        >
          {/*<span className="hero__prompt">
            اضغط للبدء
          </span>*/}

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