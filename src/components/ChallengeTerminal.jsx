import { useEffect, useRef } from "react";

import ring from "../assets/images/ring.png";
import belt from "../assets/images/belt.png";
import who from "../assets/images/who.png";
import mic from "../assets/images/mic.png";
import burst from "../assets/images/burst.png";
import champ from "../assets/images/champ.png";

export default function ChallengeTerminal() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const machine = section.querySelector("#terminalMachine");

    const cards = [
      ...section.querySelectorAll(".terminal-card"),
    ];

    const screenStatus =
      section.querySelector(".screen-status");

    const screenCategory =
      section.querySelector("#screenCategory");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cancelled = false;
    let played = false;

    const wait = (ms) =>
      new Promise((resolve) => {
        setTimeout(resolve, ms);
      });

    /*
     * ============================
     * CATEGORY HOVER
     * ============================
     */

    const handleCardEnter = (event) => {
      const card = event.currentTarget;

      if (screenCategory) {
        screenCategory.textContent =
          card.dataset.title;
      }
    };

    cards.forEach((card) => {
      card.addEventListener(
        "mouseenter",
        handleCardEnter
      );
    });

    /*
     * ============================
     * TERMINAL INTRO ANIMATION
     * ============================
     */

    const playSequence = async () => {
      if (played || cancelled) return;

      played = true;

      section.classList.add("active");

      /*
       * Reduced motion
       */
      if (reduceMotion) {
        cards.forEach((card) => {
          card.classList.add("show");
        });

        if (screenStatus) {
          screenStatus.textContent =
            "SELECT YOUR CATEGORY";
        }

        return;
      }

      /*
       * Small delay before animation
       */
      await wait(500);

      if (cancelled) return;

      /*
       * Show cards one by one
       */
      for (const card of cards) {
        if (cancelled) return;

        card.classList.add("show");

        /*
         * Restart machine bump animation
         */
        if (machine) {
          machine.classList.remove("bump");

          void machine.offsetWidth;

          machine.classList.add("bump");
        }

        await wait(180);
      }

      if (cancelled) return;

      /*
       * Final machine bump
       */
      await wait(300);

      if (machine) {
        machine.classList.remove("bump");

        void machine.offsetWidth;

        machine.classList.add("bump");
      }

      /*
       * Change terminal screen
       */
      if (screenStatus) {
        screenStatus.textContent =
          "SELECT YOUR CATEGORY";
      }
    };

    /*
     * ============================
     * INTERSECTION OBSERVER
     * ============================
     *
     * Start animation when the
     * terminal enters the viewport.
     */

    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.2
          ) {
            playSequence();

            observer.disconnect();
          }
        },
        {
          threshold: 0.2,
        }
      );

    observer.observe(section);

    /*
     * ============================
     * CLEANUP
     * ============================
     */

    return () => {
      cancelled = true;

      observer.disconnect();

      cards.forEach((card) => {
        card.removeEventListener(
          "mouseenter",
          handleCardEnter
        );
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="challenge-terminal"
      id="challengeTerminal"
      aria-label="اختر ساحة التحدي"
    >

      {/* Background glow */}
      <div
        className="glow"
        id="giant"
        data-depth="bg"
        aria-hidden="true"
      ></div>

      {/* Background decorations */}
      <div className="terminal-bg">

        <span className="terminal-glow terminal-glow--blue"></span>

        <span className="terminal-glow terminal-glow--yellow"></span>

      </div>

      <div className="terminal-container">

        {/* ============================
            HEADING
        ============================ */}

        <div className="terminal-heading">

         {/* <span className="terminal-heading__eyebrow">
            اختر تحديك
          </span>*/}

          <h2 className="terminal-heading__title">
           الكتقوريات وغيرها الكثير 
          </h2>

          <p className="terminal-heading__text">
            كل تصنيف له تحدياته الخاصة...
            <br />
            أي واحد راح تبدأ فيه؟
          </p>

        </div>

        <div className="terminal-layout">

          {/* ============================
              ARCADE MACHINE
          ============================ */}

          <div
            className="terminal-machine"
            id="terminalMachine"
          >

            {/* Decorative Lights */}

            <div
              className="terminal-lights"
              aria-hidden="true"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Screen */}

            <div className="terminal-screen">

              <div className="terminal-screen__header">
                KICKOUT TERMINAL
              </div>

              <div className="terminal-screen__content">

                <span className="screen-status">
                  NOW LOADING...
                </span>

                <span
                  className="screen-category"
                  id="screenCategory"
                >
                  راسلمينيا
                </span>

              </div>

            </div>

            {/* Arcade Buttons */}

            <div className="terminal-controls">

              <button
                className="terminal-btn terminal-btn--blue"
                aria-hidden="true"
                type="button"
              ></button>

              <button
                className="terminal-btn terminal-btn--yellow"
                aria-hidden="true"
                type="button"
              ></button>

              <button
                className="terminal-btn terminal-btn--red"
                aria-hidden="true"
                type="button"
              ></button>

            </div>

            {/* Card Exit Slot */}

            <div className="terminal-slot">
              <div className="terminal-slot__shadow"></div>
            </div>

          </div>

          {/* ============================
              CATEGORY CARDS
          ============================ */}

          <div
            className="terminal-cards"
            id="terminalCards"
          >

            {/* Wrestlemania */}

            <article
              className="terminal-card terminal-card--wm"
              data-title="راسلمينيا"
            >
              <span className="terminal-card__badge">

                <img
                  src={ring}
                  className="terminal-card__image"
                  alt="راسلمينيا"
                />

              </span>

              <h3>
                راسلمينيا
              </h3>

              <p>
                أكبر الأحداث...
                <br />
                وأصعب الأسئلة.
              </p>

            </article>

            {/* Championships */}

            <article
              className="terminal-card terminal-card--titles"
              data-title="الألقاب"
            >
              <span className="terminal-card__badge">

                <img
                  src={belt}
                  className="terminal-card__image"
                  alt="الألقاب"
                />

              </span>

              <h3>
                الألقاب
              </h3>

              <p>
                من حمل الذهب...
                <br />
                ومن خسره؟
              </p>

            </article>

            {/* Guess Wrestler */}

            <article
              className="terminal-card terminal-card--guess"
              data-title="خمن المصارع"
            >
              <span className="terminal-card__badge">

                <img
                  src={who}
                  className="terminal-card__image"
                  alt="خمن المصارع"
                />

              </span>

              <h3>
                خمن المصارع
              </h3>

              <p>
                هل تعرفه
                <br />
                من مجرد تلميح؟
              </p>

            </article>

            {/* Promos */}

            <article
              className="terminal-card terminal-card--promo"
              data-title="من قالها؟"
            >
              <span className="terminal-card__badge">

                <img
                  src={mic}
                  className="terminal-card__image"
                  alt="من قالها؟"
                />

              </span>

              <h3>
                من قالها؟
              </h3>

              <p>
                أشهر البروموهات...
                <br />
                لمن كانت؟
              </p>

            </article>

            {/* Finishers */}

            <article
              className="terminal-card terminal-card--finishers"
              data-title="الضربات القاضية"
            >
              <span className="terminal-card__badge">

                <img
                  src={burst}
                  className="terminal-card__image"
                  alt="الضربات القاضية"
                />

              </span>

              <h3>
                الضربات القاضية
              </h3>

              <p>
                اعرف الحركة...
                <br />
                واعرف صاحبها.
              </p>

            </article>

            {/* Legends */}

            <article
              className="terminal-card terminal-card--legends"
              data-title="الأساطير"
            >
              <span className="terminal-card__badge">

                <img
                  src={champ}
                  className="terminal-card__image"
                  alt="الأساطير"
                />

              </span>

              <h3>
                الأساطير
              </h3>

              <p>
                أسئلة عن أعظم
                <br />
                النجوم عبر التاريخ.
              </p>

            </article>

          </div>

        </div>

      </div>

    </section>
  );
}