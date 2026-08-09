export default function HowToPlay() {
  return (
    <section
      className="how-to-play"
      id="howToPlay"
      aria-label="كيف تلعب؟"
    >
      <div
        className="how-to-play__rise"
        aria-hidden="true"
      ></div>

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

          {/* Progress */}
          <div
            className="tutorial-progress"
            aria-hidden="true"
          >
            <span className="ref-count ref-count--fill"></span>

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

          {/* Tutorial Text */}
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

          {/* Tutorial Board */}
          <div
            className="tutorial-board"
            id="tutorialBoard"
          >

            <span
              className="tutorial-cursor"
              id="tutCursor"
              aria-hidden="true"
            ></span>

            {/* Scoreboard */}
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

            {/* Stage 1 - Teams */}
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
                ></span>
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
                ></span>
              </div>
            </div>

            {/* Stage 2 - Categories */}
            <div
              className="tutorial-stage stage--cats"
              data-stage="1"
            >
              <div className="cat-grid">

                <div
                  className="cat-card"
                  id="catWM"
                  style={{ "--rot": "-2deg" }}
                >
                  راسلمنيا
                </div>

                <div
                  className="cat-card"
                  id="catTitles"
                  style={{ "--rot": "1.5deg" }}
                >
                  الألقاب
                </div>

                <div
                  className="cat-card"
                  style={{ "--rot": "-1deg" }}
                >
                  خمن المصارع
                </div>

                <div
                  className="cat-card"
                  style={{ "--rot": "2deg" }}
                >
                  من قالها؟
                </div>

                <div
                  className="cat-card"
                  style={{ "--rot": "-1.5deg" }}
                >
                  اللحظات التاريخية
                </div>

                <div
                  className="cat-card"
                  style={{ "--rot": "1deg" }}
                >
                  أبطال زمان
                </div>

              </div>
            </div>

            {/* Stage 3 - Playing */}
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
                  style={{ marginTop: "70px" }}
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

            {/* Stage 4 - Winner */}
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
            ></span>

          </div>
        </div>
      </div>

      <div
        className="how-to-play__rise1"
        aria-hidden="true"
      ></div>
    </section>
  );
}