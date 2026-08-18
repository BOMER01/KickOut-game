import { useState, useContext } from "react";
import { GameContext } from "../context/GameContext";
import "../styles/QuestionPage.css";

function QuestionPage({
  question,
  categoryName,
  teamOne,
  teamTwo,
  onClose,
}) {

  const [showAnswer, setShowAnswer] = useState(false);

  const { gameData, setGameData } =
    useContext(GameContext);

  if (!question) {
    return null;
  }

  function markQuestionAsUsed() {

    if (
      gameData.usedQuestions.includes(question.id)
    ) {
      return gameData.usedQuestions;
    }

    return [
      ...gameData.usedQuestions,
      question.id,
    ];
  }

  function givePointsToTeamOne() {

    setGameData({
      ...gameData,

      scoreTeamOne:
        gameData.scoreTeamOne +
        Number(question.points),

      usedQuestions:
        markQuestionAsUsed(),
    });

    onClose();
  }

  function givePointsToTeamTwo() {

    setGameData({
      ...gameData,

      scoreTeamTwo:
        gameData.scoreTeamTwo +
        Number(question.points),

      usedQuestions:
        markQuestionAsUsed(),
    });

    onClose();
  }

  function noWinner() {

    setGameData({
      ...gameData,

      usedQuestions:
        markQuestionAsUsed(),
    });

    onClose();
  }

  function renderQuestionContent() {

    const type = question.type || "text";

    switch (type) {

      case "image":

        return (
          <div className="question-media">

            {question.mediaUrl ? (
              <img
                src={question.mediaUrl}
                alt="صورة السؤال"
              />
            ) : (
              <p>
                لا توجد صورة لهذا السؤال.
              </p>
            )}

          </div>
        );

      case "audio":

        return (
          <div className="question-media">

            {question.mediaUrl ? (
              <audio
                controls
                src={question.mediaUrl}
              />
            ) : (
              <p>
                لا يوجد ملف صوتي لهذا السؤال.
              </p>
            )}

          </div>
        );

      case "video":

        return (
          <div className="question-media">

            {question.mediaUrl ? (
              <video
                controls
                src={question.mediaUrl}
              />
            ) : (
              <p>
                لا يوجد فيديو لهذا السؤال.
              </p>
            )}

          </div>
        );

      case "text":
      default:

        return (
          <p className="question-text">
            {question.question}
          </p>
        );
    }
  }

  return (
    <div
      className="question-overlay"
      onClick={onClose}
    >

      <div
        className="question-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}

        <div className="question-header">

          <div className="question-points">
            {question.points}
          </div>

          <div className="question-category">
            {categoryName}
          </div>

          <button
            className="question-close"
            onClick={onClose}
          >
            ✕
          </button>

        </div>


        {/* TEAMS */}

        <div className="question-teams">

          <div className="question-team team-two">
            {teamTwo}
          </div>

          <div className="question-vs">
            VS
          </div>

          <div className="question-team team-one">
            {teamOne}
          </div>

        </div>


        {/* QUESTION */}

        <div className="question-content">

          {renderQuestionContent()}

        </div>


        {/* ANSWER */}

        {!showAnswer ? (

          <button
            className="show-answer-btn"
            onClick={() => setShowAnswer(true)}
          >
            👁 كشف الإجابة
          </button>

        ) : (

          <div className="answer-section">

            <div className="answer-box">

              <span>
                الإجابة
              </span>

              <p>
                {question.answer}
              </p>

            </div>


            <h3>
              من حصل على النقاط؟
            </h3>


            <div className="winner-buttons">

              <button
                className="team-one-btn"
                onClick={givePointsToTeamOne}
              >
                {teamOne}
              </button>

              <button
                className="team-two-btn"
                onClick={givePointsToTeamTwo}
              >
                {teamTwo}
              </button>

            </div>


            <button
              className="no-winner-btn"
              onClick={noWinner}
            >
              لا أحد
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default QuestionPage;