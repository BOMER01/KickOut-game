import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/images/logo-1-06.png";

import { GameContext } from "../context/GameContext";
import { getQuestions } from "../services/questionService";

import "../styles/ui.css";
import QuestionModal from "../components/QuestionModal";
/*import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";*/
import { useAuth } from "../context/AuthContext";

function GameBoard() {
  const {
    gameData,
    setGameData,
  } = useContext(GameContext);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

/*const [gamesRemaining, setGamesRemaining] = useState(0);*/

  const [questionsByPack, setQuestionsByPack] =
    useState({});

  const [selectedQuestion, setSelectedQuestion] =
    useState(null);

  const [selectedCategoryName, setSelectedCategoryName] =
    useState("");
   const [currentTurn, setCurrentTurn] =
  useState("teamOne");

// مضاعفة محجوزة لكل فريق بشكل مستقل
const [teamOneDoublePending, setTeamOneDoublePending] =
  useState(false);

const [teamTwoDoublePending, setTeamTwoDoublePending] =
  useState(false);
// هل ×2 مستخدمة نهائيًا للفريق الأول؟
const [teamOneDoubleUsed, setTeamOneDoubleUsed] =
  useState(false);

// هل ×2 مستخدمة نهائيًا للفريق الثاني؟
const [teamTwoDoubleUsed, setTeamTwoDoubleUsed] =
  useState(false);

// هل السؤال المفتوح حاليًا عليه ×2؟
const [doubleActiveForQuestion, setDoubleActiveForQuestion] =
  useState(false);

  // المساعدة الثانية — إجابتين بدل إجابة
const [teamOneTwoAnswersUsed, setTeamOneTwoAnswersUsed] =
  useState(false);

const [teamTwoTwoAnswersUsed, setTeamTwoTwoAnswersUsed] =
  useState(false);

  // الوقت الإضافي: مرة واحدة لكل فريق في المباراة
const [teamOneExtraTimeUsed, setTeamOneExtraTimeUsed] =
  useState(false);

const [teamTwoExtraTimeUsed, setTeamTwoExtraTimeUsed] =
  useState(false);

// الفريق الذي حجز المساعدة للسؤال القادم
const [twoAnswersNextTeam, setTwoAnswersNextTeam] =
  useState(null);

// هل السؤال الحالي يستخدم المساعدة الثانية؟
const [twoAnswersActiveForQuestion, setTwoAnswersActiveForQuestion] =
  useState(false);

  /*
   * =========================
   * تحميل الأسئلة
   * =========================
   */

 /* useEffect(() => {
  async function loadGamesRemaining() {
    if (!currentUser) return;

    try {
      const userRef = doc(
        db,
        "users",
        currentUser.uid
      );

      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        setGamesRemaining(
          userData.gamesRemaining || 0
        );
      }
    } catch (error) {
      console.error(
        "Failed to load games remaining:",
        error
      );
    }
  }

  loadGamesRemaining();
}, [currentUser]);*/

  useEffect(() => {
    async function loadQuestions() {
      const data = {};

      for (const category of gameData.categories) {
        const questions = await getQuestions(
          category.packId
        );

        data[category.packId] = questions;
      }

      setQuestionsByPack(data);
    }

    if (gameData.categories.length > 0) {
      loadQuestions();
    }
  }, [gameData.categories]);


  const {
    gameName,
    teamOne,
    teamTwo,
    categories,
    scoreTeamOne,
    scoreTeamTwo,
    usedQuestions,
  } = gameData;


  /*
   * =========================
   * إجمالي الأسئلة
   * =========================
   */

  const totalQuestions = Object.values(
    questionsByPack
  )
    .flat()
    .length;


  /*
   * =========================
   * الأسئلة المتبقية
   * =========================
   */

  const remainingQuestions =
    Math.max(
      totalQuestions - usedQuestions.length,
      0
    );


  /*
   * =========================
   * إنهاء المباراة
   * =========================
   */

  function endGame() {
    navigate("/winner");
  }
  function switchTurn() {
  setCurrentTurn((prev) =>
    prev === "teamOne"
      ? "teamTwo"
      : "teamOne"
  );
}
function activateDoubleNext(team) {
  if (team === "teamOne") {
    if (teamOneDoubleUsed) return;

    setTeamOneDoubleUsed(true);
    setTeamOneDoublePending(true);
    return;
  }

  if (team === "teamTwo") {
    if (teamTwoDoubleUsed) return;

    setTeamTwoDoubleUsed(true);
    setTeamTwoDoublePending(true);
  }
}
function activateTwoAnswersNext() {

  // الفريق الأول
  if (currentTurn === "teamOne") {

    if (teamOneTwoAnswersUsed) {
      return;
    }

    setTeamOneTwoAnswersUsed(true);
    setTwoAnswersNextTeam("teamOne");

    return;
  }

  // الفريق الثاني
  if (currentTurn === "teamTwo") {

    if (teamTwoTwoAnswersUsed) {
      return;
    }

    setTeamTwoTwoAnswersUsed(true);
    setTwoAnswersNextTeam("teamTwo");

    return;
  }
}

function activateExtraTime() {
  if (currentTurn === "teamOne") {
    if (teamOneExtraTimeUsed) return;

    setTeamOneExtraTimeUsed(true);
    return;
  }

  if (currentTurn === "teamTwo") {
    if (teamTwoExtraTimeUsed) return;

    setTeamTwoExtraTimeUsed(true);
  }
}




  /*
   * =========================
   * إنهاء السؤال
   * =========================
   */

  function finishQuestion(winner) {
  if (!selectedQuestion) return;

  const question =
    selectedQuestion.question;

  const questionId =
    question.id;

  // هل الفريق صاحب الدور لديه ×2 محفوظة؟
const doubleWasActive =
  doubleActiveForQuestion;

  /*
   * تسجيل السؤال كمستخدم
   */

  const newUsedQuestions =
    usedQuestions.includes(questionId)
      ? usedQuestions
      : [
          ...usedQuestions,
          questionId,
        ];

  /*
   * =========================
   * الفريق الأول
   * =========================
   */

  if (winner === "teamOne") {

    const points =
  Number(question.points) *
  (teamOneDoublePending ? 2 : 1);

if (teamOneDoublePending) {
  setTeamOneDoublePending(false);
}

    setGameData({
      ...gameData,

      scoreTeamOne:
        scoreTeamOne + points,

      usedQuestions:
        newUsedQuestions,
    });
  }

  /*
   * =========================
   * الفريق الثاني
   * =========================
   */

  else if (winner === "teamTwo") {

    const points =
  Number(question.points) *
  (teamTwoDoublePending ? 2 : 1);

if (teamTwoDoublePending) {
  setTeamTwoDoublePending(false);
}

    setGameData({
      ...gameData,

      scoreTeamTwo:
        scoreTeamTwo + points,

      usedQuestions:
        newUsedQuestions,
    });
  }

  /*
   * =========================
   * لا أحد
   * =========================
   */

  else {

    setGameData({
      ...gameData,

      usedQuestions:
        newUsedQuestions,
    });
  }

  /*
   * =========================
   * استهلاك ×2
   * =========================
   */

  

  /*
   * =========================
   * إغلاق السؤال
   * =========================
   */

  setSelectedQuestion(null);
setSelectedCategoryName("");

setDoubleActiveForQuestion(false);

// استهلاك المضاعفة بعد انتهاء السؤال المخصص لها
if (teamOneDoublePending) {
  setTeamOneDoublePending(false);
}

if (teamTwoDoublePending) {
  setTeamTwoDoublePending(false);
}
  /*
   * =========================
   * الانتقال للفريق التالي
   * =========================
   */

  setCurrentTurn((prev) =>
    prev === "teamOne"
      ? "teamTwo"
      : "teamOne"
  );
}


  /*
   * =========================
   * الانتقال للفائز
   * =========================
   */

  useEffect(() => {
    if (
      usedQuestions.length === totalQuestions &&
      totalQuestions > 0
    ) {
      navigate("/winner");
    }
  }, [
    usedQuestions,
    totalQuestions,
    navigate,
  ]);


  return (
    <>
      {/* =====================================
          ARENA BACKGROUND
      ====================================== */}

      <div className="bg-arena">

        <div className="bg-glow" />

        <div className="rope rope--red bg-rope-1" />
        <div className="rope rope--blue bg-rope-2" />
        <div className="rope rope--yellow bg-rope-3" />
        <div className="rope rope--blue bg-rope-4" />

      </div>


      {/* =====================================
          GLOBAL HUD
      ====================================== */}

      <header className="hud">

        <div className="hud__inner">

          {/* LEFT */}

          <div className="hud__group hud__group--start">

           {/* <button
              type="button"
              className="hud-btn hud-btn--ghost"
            >
              <span className="hud-btn__icon">
                ⚙
              </span>

              <span className="hud-btn__label">
                الخيارات
              </span>
            </button>*/}


            <button
              type="button"
              className="hud-btn hud-btn--ghost"
              onClick={() => navigate("/game-history")}
            >
              <span className="hud-btn__icon">
                ↶
              </span>

              <span className="hud-btn__label">
                العابي السابقة
              </span>
            </button>


           <button
  type="button"
  className="hud-btn hud-btn--turn"
  onClick={switchTurn}
>
  <span className="hud-btn__icon">
    ↻
  </span>

  <span className="hud-btn__label">
    تبديل الدور
  </span>
</button>

          </div>


          {/* LOGO */}

          <div className="hud__logo">

  <img
     src={logo}
          alt="KICKOUT"
    className="kickout-logo"
  />

</div>


          {/* RIGHT */}

          <div className="hud__group hud__group--end">

{/*<div className="hud-stat">

             <span className="hud-stat__value">
  {gamesRemaining}
</span> 

              <span className="hud-stat__label">
                الألعاب المتبقية
              </span>

              <span className="hud-stat__icon">
                🏆
              </span>

            </div>*/}


            <button
              type="button"
              className="hud-btn hud-btn--danger"
              onClick={endGame}
            >

              <span className="hud-btn__icon">
                ⚑
              </span>

              <span className="hud-btn__label">
                إنهاء المباراة
              </span>

            </button>


            <button
              type="button"
              className="hud-btn hud-btn--ghost"
              onClick={() => navigate("/")}
            >

              <span className="hud-btn__label">
                خروج
              </span>

              <span className="hud-btn__icon">
                ⇥
              </span>

            </button>

          </div>

        </div>

      </header>


      {/* =====================================
          MAIN STAGE
      ====================================== */}

      <main className="stage">

        <section
          className="screen screen--board is-active"
          data-screen="board"
        >


          {/* =================================
              SCOREBOARD
          ================================== */}

          <div className="scoreboard">

  {/* =========================
      TEAM ONE
  ========================= */}

  <div
    className={`control-panel control-panel--red ${
      currentTurn === "teamOne"
        ? "is-active-turn"
        : ""
    }`}
  >

    <div className="control-panel__top">

      <span className="control-panel__name">
        {teamOne}
      </span>

      {currentTurn === "teamOne" && (
        <span className="turn-badge">
          دور اللعب
        </span>
      )}

    </div>

    <div className="control-panel__points">
      {scoreTeamOne}
    </div>

    <div className="score-controls">

      <button
        type="button"
        onClick={() =>
          setGameData({
            ...gameData,
            scoreTeamOne:
              scoreTeamOne + 100,
          })
        }
      >
        100+
      </button>

      

      <button
        type="button"
        onClick={() =>
          setGameData({
            ...gameData,
            scoreTeamOne:
              scoreTeamOne - 100,
          })
        }
      >
        100-
      </button>

   <button
  type="button"
  className={`double-score-btn ${
    teamOneDoublePending ? "is-active" : ""
  }`}
  disabled={teamOneDoubleUsed}
  onClick={() => activateDoubleNext("teamOne")}
>
  <span className="helper-icon"></span>
  <span className="helper-text">
    {teamOneDoublePending
      ? "مضاعفة مفعّلة"
      : "مضاعفة النقاط القادمة"}
  </span>
</button>

    </div>

  </div>


  {/* =========================
      CENTER
  ========================= */}

  <div className="score-center">

    <div className="score-center__match">
      {gameName}
    </div>

    <img
      src={logo}
          alt="KICKOUT"
      className="score-center__logo"
    />

    <div className="score-center__meta">
      {totalQuestions - usedQuestions.length}
      {" "}
      سؤال متبقي
    </div>

  </div>


  {/* =========================
      TEAM TWO
  ========================= */}

  <div
    className={`control-panel control-panel--blue ${
      currentTurn === "teamTwo"
        ? "is-active-turn"
        : ""
    }`}
  >

    <div className="control-panel__top">

      <span className="control-panel__name">
        {teamTwo}
      </span>

      {currentTurn === "teamTwo" && (
        <span className="turn-badge">
          دور اللعب
        </span>
      )}

    </div>

    <div className="control-panel__points">
      {scoreTeamTwo}
    </div>

    <div className="score-controls">

      <button
        type="button"
        onClick={() =>
          setGameData({
            ...gameData,
            scoreTeamTwo:
              scoreTeamTwo + 100,
          })
        }
      >
        100+
      </button>

      

      <button
        type="button"
        onClick={() =>
          setGameData({
            ...gameData,
            scoreTeamTwo:
              scoreTeamTwo - 100,
          })
        }
      >
        100-
      </button>

      <button
  type="button"
  className={`double-score-btn ${
    teamTwoDoublePending ? "is-active" : ""
  }`}
  disabled={teamTwoDoubleUsed}
  onClick={() => activateDoubleNext("teamTwo")}
>
  <span className="helper-icon"></span>
  <span className="helper-text">
    {teamOneDoublePending
      ? "مضاعفة مفعّلة"
      : "مضاعفة النقاط القادمة"}
  </span>
</button>

    </div>

  </div>

</div>


          

         


          {/* =================================
              CATEGORIES BOARD
          ================================== */}

          <div className="board-grid">

            {categories?.map(
              (category, index) => {

                const categoryQuestions = [
                  ...(
                    questionsByPack[
                      category.packId
                    ] || []
                  ),
                ].sort(
                  (a, b) =>
                    a.points - b.points
                );


                /*
                 * ألوان التصنيفات
                 */

                const categoryColors = [
                  "var(--blue)",
                  "var(--red)",
                  "var(--red)",
                  "var(--blue)",
                ];


                return (
                  <section
                    key={category.categoryId}
                    className="cat-panel"
                    style={{
                      "--accent":
                        categoryColors[
                          index %
                          categoryColors.length
                        ],
                    }}
                  >

                    {/* CATEGORY HEADER */}

                    <div className="cat-panel__head">

                      <span className="cat-panel__icon">
                        {category.icon || "★"}
                      </span>

                      <span className="cat-panel__title">
                        {category.categoryName}
                      </span>

                    </div>


                    {/* QUESTIONS */}

                    <div className="cat-panel__body">

                      {categoryQuestions.map(
                        (question) => {

                          const questionId =
                            question.id;

                          const isUsed =
                            usedQuestions.includes(
                              questionId
                            );


                          return (
                            <button
                              key={questionId}
                              type="button"
                              className={
                                `qbtn-cell ${
                                  isUsed
                                    ? "is-used"
                                    : ""
                                }`
                              }
                              disabled={isUsed}
                              onClick={() => {

 


  // =========================
  // المساعدة الثانية
  // إجابتين بدل إجابة
  // =========================

  const shouldGiveTwoAnswers =
    twoAnswersNextTeam === currentTurn;

  setTwoAnswersActiveForQuestion(
    shouldGiveTwoAnswers
  );

  if (shouldGiveTwoAnswers) {

    if (currentTurn === "teamOne") {
      setTeamOneTwoAnswersUsed(true);
    }

    if (currentTurn === "teamTwo") {
      setTeamTwoTwoAnswersUsed(true);
    }

    setTwoAnswersNextTeam(null);
  }


  // =========================
  // فتح السؤال
  // =========================

  setSelectedQuestion({
    question,
  });

  setSelectedCategoryName(
    category.categoryName
  );

}}
                            >
                              {question.points}
                            </button>
                          );

                        }
                      )}

                    </div>

                  </section>
                );

              }
            )}

          </div>

        </section>

      </main>


      {/* =====================================
          QUESTION MODAL
      ====================================== */}

      {selectedQuestion && (

        <QuestionModal
  question={selectedQuestion.question}

  categoryName={selectedCategoryName}

  teamOne={teamOne}
  teamTwo={teamTwo}

  currentTurn={currentTurn}

  // =========================
  // المساعدة الأولى
  // =========================

 



  

  // =========================
  // المساعدة الثانية
  // =========================

  twoAnswersActive={
    twoAnswersActiveForQuestion
  }

  twoAnswersUsed={
    currentTurn === "teamOne"
      ? teamOneTwoAnswersUsed
      : teamTwoTwoAnswersUsed
  }

  onUseTwoAnswers={
    activateTwoAnswersNext
  }
  extraTimeUsed={
  currentTurn === "teamOne"
    ? teamOneExtraTimeUsed
    : teamTwoExtraTimeUsed
}

onUseExtraTime={activateExtraTime}

  onFinish={finishQuestion}

  onClose={() => {
    setSelectedQuestion(null);
    setSelectedCategoryName("");
  }}
/>

      )}

    </>
    
  );
}

export default GameBoard;