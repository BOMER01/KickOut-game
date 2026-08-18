import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { GameContext } from "../context/GameContext";
import { getQuestions } from "../services/questionService";


import "../styles/ui.css";
import QuestionModal from "../components/QuestionModal";

function GameBoard() {
  const {
    gameData,
    setGameData,
  } = useContext(GameContext);

  const navigate = useNavigate();

  const [questionsByPack, setQuestionsByPack] =
    useState({});

  const [selectedQuestion, setSelectedQuestion] =
    useState(null);

  const [selectedCategoryName, setSelectedCategoryName] =
    useState("");

  /*
   * تحميل الأسئلة
   */
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
   * عدد الأسئلة الكلي
   */
  const totalQuestions = Object.values(
    questionsByPack
  )
    .flat()
    .length;

  /*
   * إنهاء المباراة
   */
  function endGame() {
    navigate("/winner");
  }

  /*
   * إنهاء السؤال وإعطاء النقاط
   */
  function finishQuestion(winner) {
    if (!selectedQuestion) return;

    const question =
      selectedQuestion.question;

    const questionId = question.id;

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
     * الفريق الأول
     */
    if (winner === "teamOne") {
      setGameData({
        ...gameData,

        scoreTeamOne:
          scoreTeamOne +
          Number(question.points),

        usedQuestions:
          newUsedQuestions,
      });
    }

    /*
     * الفريق الثاني
     */
    else if (winner === "teamTwo") {
      setGameData({
        ...gameData,

        scoreTeamTwo:
          scoreTeamTwo +
          Number(question.points),

        usedQuestions:
          newUsedQuestions,
      });
    }

    /*
     * لا أحد
     */
    else {
      setGameData({
        ...gameData,

        usedQuestions:
          newUsedQuestions,
      });
    }

    /*
     * إغلاق السؤال
     */
    setSelectedQuestion(null);
    setSelectedCategoryName("");
  }

  /*
   * الانتقال للفائز عند انتهاء جميع الأسئلة
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
  <main className="screen screen--board">

    {/* =========================
        GAME TITLE
    ========================= */}

    <h1 className="screen-title">
      {gameName}
    </h1>

    <p className="screen-subtitle">
      لوحة اللعبة
    </p>


    {/* =========================
        SCORE BOARD
    ========================= */}

    <div className="scoreboard">

      {/* TEAM ONE */}

      <div className="control-panel control-panel--red">

        <div className="control-panel__top">

          <span className="control-panel__name">
            {teamOne}
          </span>

        </div>

        <div className="control-panel__points">
          {scoreTeamOne}
        </div>

      </div>


      {/* CENTER */}

      <div className="score-center">

        <div className="score-center__match">
          {gameName}
        </div>

        <div className="score-center__meta">
          {totalQuestions - usedQuestions.length}
          {" "}
          سؤال متبقي
        </div>

      </div>


      {/* TEAM TWO */}

      <div className="control-panel control-panel--blue">

        <div className="control-panel__top">

          <span className="control-panel__name">
            {teamTwo}
          </span>

        </div>

        <div className="control-panel__points">
          {scoreTeamTwo}
        </div>

      </div>

    </div>


    {/* =========================
        END GAME
    ========================= */}

    <button
      className="end-game-btn"
      onClick={endGame}
    >
      إنهاء المباراة
    </button>


    {/* =========================
        BOARD
    ========================= */}

    <div className="board-grid">

      {categories?.map((category, index) => {

        const categoryQuestions = [
          ...(questionsByPack[category.packId] || [])
        ].sort(
          (a, b) => a.points - b.points
        );


        const categoryColors = [
          "var(--blue)",
          "var(--red)",
          "var(--red)",
          "var(--blue)"
        ];


        return (
          <section
            key={category.categoryId}
            className="cat-panel"
            style={{
              "--accent":
                categoryColors[index % categoryColors.length]
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

              {categoryQuestions.map((question) => {

                const questionId = question.id;

                const isUsed =
                  usedQuestions.includes(questionId);


                return (
                  <button
                    key={questionId}
                    className={
                      `qbtn-cell ${
                        isUsed ? "is-used" : ""
                      }`
                    }

                    disabled={isUsed}

                    onClick={() => {

                      setSelectedQuestion({
                        question
                      });

                      setSelectedCategoryName(
                        category.categoryName
                      );

                    }}
                  >
                    {question.points}
                  </button>
                );

              })}

            </div>

          </section>
        );

      })}

    </div>


    {/* =========================
        QUESTION MODAL
    ========================= */}

    {selectedQuestion && (
      <QuestionModal
        question={
          selectedQuestion.question
        }

        categoryName={
          selectedCategoryName
        }

        teamOne={teamOne}
        teamTwo={teamTwo}

        onFinish={
          finishQuestion
        }

        onClose={() => {
          setSelectedQuestion(null);
          setSelectedCategoryName("");
        }}
      />
    )}

  </main>
);
}

export default GameBoard;