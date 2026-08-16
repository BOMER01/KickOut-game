import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { GameContext } from "../context/GameContext";

function QuestionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showAnswer, setShowAnswer] = useState(false);

  const { gameData, setGameData } =
    useContext(GameContext);

  const {
    categoryName,
    teamOne,
    teamTwo,
    question,
  } = location.state || {};

  if (!question) {
    return (
      <div>
        <h2>لم يتم العثور على السؤال</h2>

        <button onClick={() => navigate("/game")}>
          العودة للعبة
        </button>
      </div>
    );
  }

  /*
   * تسجيل السؤال كمستخدم
   */
  function markQuestionAsUsed() {
    if (gameData.usedQuestions.includes(question.id)) {
      return gameData.usedQuestions;
    }

    return [
      ...gameData.usedQuestions,
      question.id,
    ];
  }

  /*
   * إعطاء النقاط للفريق الأول
   */
  function givePointsToTeamOne() {
    setGameData({
      ...gameData,

      scoreTeamOne:
        gameData.scoreTeamOne +
        Number(question.points),

      usedQuestions:
        markQuestionAsUsed(),
    });

    navigate("/game");
  }

  /*
   * إعطاء النقاط للفريق الثاني
   */
  function givePointsToTeamTwo() {
    setGameData({
      ...gameData,

      scoreTeamTwo:
        gameData.scoreTeamTwo +
        Number(question.points),

      usedQuestions:
        markQuestionAsUsed(),
    });

    navigate("/game");
  }

  /*
   * لا أحد يحصل على النقاط
   */
  function noWinner() {
    setGameData({
      ...gameData,

      usedQuestions:
        markQuestionAsUsed(),
    });

    navigate("/game");
  }

  /*
   * عرض محتوى السؤال
   */
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
              >
                متصفحك لا يدعم تشغيل الصوت.
              </audio>
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
              >
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
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
    <div>
      <h1>السؤال</h1>

      <h2>
        الفئة: {categoryName}
      </h2>

      <h3>
        النقاط: {question.points}
      </h3>

      <h3>
        {teamOne} VS {teamTwo}
      </h3>

      <hr />

      {/* محتوى السؤال */}
      {renderQuestionContent()}

      <button
        onClick={() => setShowAnswer(true)}
      >
        إظهار الإجابة
      </button>

      {showAnswer && (
        <>
          <h3>الإجابة:</h3>

          <p>
            {question.answer}
          </p>

          <h3>
            من حصل على النقاط؟
          </h3>

          <button
            onClick={givePointsToTeamOne}
          >
            {teamOne}
          </button>

          <button
            onClick={givePointsToTeamTwo}
          >
            {teamTwo}
          </button>

          <button
            onClick={noWinner}
          >
            لا أحد
          </button>
        </>
      )}
    </div>
  );
}

export default QuestionPage;