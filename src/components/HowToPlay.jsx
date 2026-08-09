import { useEffect, useRef } from "react";

export default function HowToPlay() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const board = section.querySelector("#tutorialBoard");
    const stages = [
      ...section.querySelectorAll(".tutorial-stage"),
    ];
    const copy = [
      ...section.querySelectorAll(".tutorial-copy__item"),
    ];
    const nodes = [
      ...section.querySelectorAll(".ref-node"),
    ];

    const scoreboard = section.querySelector("#scoreboard");
    const blueName = section.querySelector("#blueTeamName");
    const redName = section.querySelector("#redTeamName");
    const vs = section.querySelector("#vsBadge");

    const catWM = section.querySelector("#catWM");
    const catTitles = section.querySelector("#catTitles");

    const tile500 = section.querySelector("#tile500");
    const values = section.querySelector("#valueGrid");
    const question = section.querySelector("#questionPanel");

    const score = section.querySelector("#sbBlueScore");
    const redTeam = section.querySelector(".sb-team--red");

    const cursor = section.querySelector("#tutCursor");

    let active = -1;
    let run = 0;
    let tutorialStarted = false;

    const timers = new Set();

    const wait = (ms) =>
      new Promise((resolve) => {
        const timer = setTimeout(() => {
          timers.delete(timer);
          resolve();
        }, ms);

        timers.add(timer);
      });

    function clearTimers() {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    }

    function setCursorVisible(show) {
      if (!cursor) return;

      cursor.classList.toggle(
        "show",
        show && !reduceMotion
      );
    }

    function moveCursorTo(
      element,
      id,
      duration = 420
    ) {
      if (
        !cursor ||
        !element ||
        !board ||
        reduceMotion
      ) {
        return Promise.resolve();
      }

      if (id !== run) {
        return Promise.resolve();
      }

      const targetRect =
        element.getBoundingClientRect();

      const boardRect =
        board.getBoundingClientRect();

      cursor.style.transition = `
        left ${duration}ms cubic-bezier(.16,1,.3,1),
        top ${duration}ms cubic-bezier(.16,1,.3,1),
        transform .12s ease
      `;

      cursor.style.left =
        `${
          targetRect.left -
          boardRect.left +
          targetRect.width / 2
        }px`;

      cursor.style.top =
        `${
          targetRect.top -
          boardRect.top +
          targetRect.height / 2
        }px`;

      return wait(duration + 70);
    }

    function cursorClick() {
      if (!cursor || reduceMotion) return;

      cursor.classList.add("click");

      const timer = setTimeout(() => {
        cursor.classList.remove("click");
        timers.delete(timer);
      }, 130);

      timers.add(timer);
    }

    function reset() {
      run += 1;

      clearTimers();

      setCursorVisible(false);

      stages.forEach((element) => {
        element.classList.remove("active");
      });

      copy.forEach((element) => {
        element.classList.remove("active");
      });

      nodes.forEach((element) => {
        element.classList.remove(
          "active",
          "done"
        );
      });

      board?.classList.remove(
        "has-scoreboard",
        "to-winner",
        "shake"
      );

      scoreboard?.classList.remove("show");

      vs?.classList.remove("slam");

      catWM?.classList.remove(
        "sel-blue",
        "lift",
        "press"
      );

      catTitles?.classList.remove(
        "sel-red",
        "lift",
        "press"
      );

      tile500?.classList.remove(
        "lift",
        "flip"
      );

      values?.classList.remove("hide");

      question?.classList.remove("show");

      if (blueName) {
        blueName.textContent = "";
      }

      if (redName) {
        redName.textContent = "";
      }

      if (score) {
        score.textContent = "0";
      }

      const correctButton =
        question?.querySelector(
          ".answer-btn--correct"
        );

      correctButton?.classList.remove(
        "lift",
        "press"
      );
    }

    function type(element, text, id) {
      if (!element) {
        return Promise.resolve();
      }

      if (reduceMotion) {
        element.textContent = text;
        return Promise.resolve();
      }

      element.textContent = "";

      let index = 0;

      return new Promise((resolve) => {
        const timer = setInterval(() => {
          if (
            id !== run ||
            index >= text.length
          ) {
            clearInterval(timer);
            resolve();
            return;
          }

          element.textContent += text[index];
          index += 1;
        }, 75);
      });
    }

    async function play(stage, id) {
      if (reduceMotion) return;

      /*
       * STAGE 0
       * Team names + VS
       */
      if (stage === 0) {
        await type(
          blueName,
          "فريق الروك",
          id
        );

        await wait(150);

        if (id !== run) return;

        await type(
          redName,
          "فريق سينا",
          id
        );

        await wait(150);

        if (id !== run) return;

        vs?.classList.add("slam");
        board?.classList.add("shake");
      }

      /*
       * STAGE 1
       * Category selection
       */
      if (stage === 1) {
        await wait(300);

        if (id !== run) return;

        setCursorVisible(true);

        await moveCursorTo(
          catWM,
          id
        );

        if (id !== run) return;

        catWM?.classList.add("lift");

        await wait(180);

        if (id !== run) return;

        cursorClick();

        catWM?.classList.remove("lift");
        catWM?.classList.add("press");

        await wait(150);

        if (id !== run) return;

        catWM?.classList.remove("press");
        catWM?.classList.add("sel-blue");

        await wait(320);

        if (id !== run) return;

        await moveCursorTo(
          catTitles,
          id
        );

        if (id !== run) return;

        catTitles?.classList.add("lift");

        await wait(180);

        if (id !== run) return;

        cursorClick();

        catTitles?.classList.remove("lift");
        catTitles?.classList.add("press");

        await wait(150);

        if (id !== run) return;

        catTitles?.classList.remove("press");
        catTitles?.classList.add("sel-red");

        await wait(260);

        if (id !== run) return;

        setCursorVisible(false);
      }

      /*
       * STAGE 2
       * Choose 500 -> question -> answer
       */
      if (stage === 2) {
        await wait(280);

        if (id !== run) return;

        setCursorVisible(true);

        await moveCursorTo(
          tile500,
          id
        );

        if (id !== run) return;

        tile500?.classList.add("lift");

        await wait(180);

        if (id !== run) return;

        cursorClick();

        tile500?.classList.remove("lift");
        tile500?.classList.add("flip");

        await wait(250);

        if (id !== run) return;

        values?.classList.add("hide");
        question?.classList.add("show");

        await wait(420);

        if (id !== run) return;

        const correctButton =
          question?.querySelector(
            ".answer-btn--correct"
          );

        await moveCursorTo(
          correctButton,
          id
        );

        if (id !== run) return;

        correctButton?.classList.add("lift");

        await wait(170);

        if (id !== run) return;

        cursorClick();

        correctButton?.classList.remove("lift");
        correctButton?.classList.add("press");

        await wait(170);

        if (id !== run) return;

        setCursorVisible(false);
      }

      /*
       * STAGE 3
       * Score -> winner
       */
      if (stage === 3) {
        for (
          const value of ["100", "300", "500"]
        ) {
          await wait(180);

          if (id !== run) return;

          if (score) {
            score.textContent = value;
          }
        }

        board?.classList.add("shake");
        redTeam?.classList.add("wobble");

        await wait(400);

        if (id !== run) return;

        board?.classList.add("to-winner");
      }
    }

    function show(stage) {
      reset();

      const id = run;

      stages[stage]?.classList.add("active");
      copy[stage]?.classList.add("active");

      nodes.forEach(
        (node, index) => {
          node.classList.toggle(
            "done",
            index < stage
          );
        }
      );

      nodes[stage]?.classList.add("active");

      if (stage > 0) {
        board?.classList.add(
          "has-scoreboard"
        );

        scoreboard?.classList.add("show");
      }

      /*
       * Reduced motion fallback
       */
      if (
        reduceMotion &&
        stage === 0
      ) {
        if (blueName) {
          blueName.textContent =
            "فريق الروك";
        }

        if (redName) {
          redName.textContent =
            "فريق سينا";
        }

        vs?.classList.add("slam");
      }

      if (
        reduceMotion &&
        stage === 1
      ) {
        catWM?.classList.add(
          "sel-blue"
        );

        catTitles?.classList.add(
          "sel-red"
        );
      }

      if (
        reduceMotion &&
        stage === 2
      ) {
        values?.classList.add("hide");
        question?.classList.add("show");
      }

      if (
        reduceMotion &&
        stage === 3
      ) {
        if (score) {
          score.textContent = "500";
        }

        board?.classList.add(
          "to-winner"
        );
      }

      play(stage, id);
    }

    function update() {
      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const travel = Math.max(
        1,
        section.offsetHeight -
          window.innerHeight
      );

      const progress = Math.min(
        1,
        Math.max(
          0,
          -rect.top / travel
        )
      );

      section.style.setProperty(
        "--tut",
        progress.toFixed(3)
      );

      /*
       * Start tutorial when section
       * properly enters viewport.
       */
      const triggerPoint =
        window.innerHeight * 0.75;

      if (!tutorialStarted) {
        if (
          rect.top >
          triggerPoint
        ) {
          return;
        }

        tutorialStarted = true;
      }

      if (
        rect.bottom <= 0 ||
        rect.top >= window.innerHeight
      ) {
        return;
      }

      const next = Math.min(
        3,
        Math.floor(progress * 4)
      );

      if (next !== active) {
        active = next;
        show(next);
      }
    }

    window.addEventListener(
      "scroll",
      update,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      update
    );

    update();

    return () => {
      window.removeEventListener(
        "scroll",
        update
      );

      window.removeEventListener(
        "resize",
        update
      );

      run += 1;

      clearTimers();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="how-to-play"
      id="howToPlay"
      aria-label="كيف تلعب؟"
    >
      <div
        className="how-to-play__rise"
        aria-hidden="true"
      />

      <div className="how-to-sticky">

        <div className="tutorial-intro">
          <h2
            className="tutorial-intro__title"
            id="howTitle"
          >
            كيف تلعب؟
          </h2>

          <p
            className="tutorial-intro__sub"
            id="howSub"
          >
            بسيطة... بس الفوز مو مضمون
          </p>
        </div>

        <div className="tutorial-layout">

          <div
            className="tutorial-progress"
            aria-hidden="true"
          >
            <span className="ref-count ref-count--fill" />

            <span
              className="ref-node"
              data-stage="0"
            >
              <b>1</b>
            </span>

            <span
              className="ref-node"
              data-stage="1"
            >
              <b>2</b>
            </span>

            <span
              className="ref-node ref-node--wide"
              data-stage="2"
            >
              <b>2.99</b>
            </span>

            <span
              className="ref-node"
              data-stage="3"
            >
              <b>!</b>
            </span>
          </div>

          <div className="tutorial-copy">

            <div
              className="tutorial-copy__item"
              data-stage="0"
            >
              <span className="tutorial-copy__num">
                1
              </span>

              <h3 className="tutorial-copy__head">
                جهّز فرقك
              </h3>

              <p className="tutorial-copy__text">
                اختار اسم الفريقين... وابدأ التحدي.
              </p>
            </div>

            <div
              className="tutorial-copy__item"
              data-stage="1"
            >
              <span className="tutorial-copy__num">
                2
              </span>

              <h3 className="tutorial-copy__head">
                اختاروا التصنيفات
              </h3>

              <p className="tutorial-copy__text">
                كل فريق يختار تصنيفاته... اختاروا صح.
              </p>
            </div>

            <div
              className="tutorial-copy__item"
              data-stage="2"
            >
              <span className="tutorial-copy__num">
                3
              </span>

              <h3 className="tutorial-copy__head">
                العب وارفع النقاط
              </h3>

              <p className="tutorial-copy__text">
                اختار السؤال... وإذا تعرف الإجابة، النقاط لك.
              </p>
            </div>

            <div
              className="tutorial-copy__item"
              data-stage="3"
            >
              <span className="tutorial-copy__num">
                4
              </span>

              <h3 className="tutorial-copy__head">
                اجمع النقاط... وخذ الفوز
              </h3>

              <p className="tutorial-copy__text">
                الفريق اللي يجمع نقاط أكثر... ياخذ الفوز!
              </p>
            </div>

          </div>

          <div
            className="tutorial-board"
            id="tutorialBoard"
          >

            <span
              className="tutorial-cursor"
              id="tutCursor"
              aria-hidden="true"
            />

            <div
              className="tutorial-scoreboard"
              id="scoreboard"
            >
              <div className="sb-team sb-team--blue">
                <span className="sb-team__name">
                  فريق الروك
                </span>

                <span
                  className="sb-team__score"
                  id="sbBlueScore"
                >
                  0
                </span>
              </div>

              <div className="sb-vs">
                VS
              </div>

              <div className="sb-team sb-team--red">
                <span className="sb-team__name">
                  فريق سينا
                </span>

                <span className="sb-team__score">
                  0
                </span>
              </div>
            </div>

            <div
              className="tutorial-stage stage--teams"
              data-stage="0"
              id="stageTeams"
            >
              <div className="team-panel team-panel--blue">
                <span className="team-panel__label">
                  الفريق الأزرق
                </span>

                <span
                  className="team-panel__name"
                  id="blueTeamName"
                />
              </div>

              <div
                className="vs-badge"
                id="vsBadge"
              >
                VS
              </div>

              <div className="team-panel team-panel--red">
                <span className="team-panel__label">
                  الفريق الأحمر
                </span>

                <span
                  className="team-panel__name"
                  id="redTeamName"
                />
              </div>
            </div>

            <div
              className="tutorial-stage stage--cats"
              data-stage="1"
            >
              <div className="cat-grid">

                <div
                  className="cat-card"
                  id="catWM"
                  style={{
                    "--rot": "-2deg",
                  }}
                >
                  راسلمنيا
                </div>

                <div
                  className="cat-card"
                  id="catTitles"
                  style={{
                    "--rot": "1.5deg",
                  }}
                >
                  الألقاب
                </div>

                <div
                  className="cat-card"
                  style={{
                    "--rot": "-1deg",
                  }}
                >
                  خمن المصارع
                </div>

                <div
                  className="cat-card"
                  style={{
                    "--rot": "2deg",
                  }}
                >
                  من قالها؟
                </div>

                <div
                  className="cat-card"
                  style={{
                    "--rot": "-1.5deg",
                  }}
                >
                  اللحظات التاريخية
                </div>

                <div
                  className="cat-card"
                  style={{
                    "--rot": "1deg",
                  }}
                >
                  أبطال زمان
                </div>

              </div>
            </div>

            <div
              className="tutorial-stage stage--play"
              data-stage="2"
            >
              <div className="play-cat">
                راسلمنيا
              </div>

              <div
                className="value-grid"
                id="valueGrid"
              >
                <button
                  className="value-tile"
                  type="button"
                >
                  100
                </button>

                <button
                  className="value-tile"
                  type="button"
                >
                  200
                </button>

                <button
                  className="value-tile"
                  type="button"
                >
                  300
                </button>

                <button
                  className="value-tile"
                  type="button"
                >
                  400
                </button>

                <button
                  className="value-tile"
                  id="tile500"
                  type="button"
                >
                  500
                </button>

                <button
                  className="value-tile"
                  type="button"
                >
                  600
                </button>
              </div>

              <div
                className="question-panel"
                id="questionPanel"
              >
                <p
                  style={{
                    marginTop: "70px",
                  }}
                  className="question-panel__q"
                >
                  من فاز بالحدث الرئيسي في راسلمينيا؟
                </p>

                <div className="answer-row">
                  <button
                    className="answer-btn answer-btn--correct"
                    type="button"
                  >
                    ✓ إجابة صحيحة
                  </button>

                  <button
                    className="answer-btn answer-btn--wrong"
                    type="button"
                  >
                    ✕ إجابة خاطئة
                  </button>
                </div>

                <button
                  className="skip-btn"
                  type="button"
                >
                  ⏭ تخطي السؤال
                </button>
              </div>
            </div>

            <div
              className="tutorial-stage stage--winner"
              data-stage="3"
            >
              <span className="winner-team">
                فريق الروك
              </span>

              <span className="winner-label">
                الفائز!
              </span>

              <button
                className="arcade-btn arcade-btn--lg"
                type="button"
              >
                <span className="arcade-btn__face">
                  فهمت... يلا نلعب!
                </span>
              </button>
            </div>

            <span
              className="confetti"
              id="confetti"
              aria-hidden="true"
            />

          </div>
        </div>
      </div>

      <div
        className="how-to-play__rise1"
        aria-hidden="true"
      />
    </section>
  );
}