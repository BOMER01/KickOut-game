import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";

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

  function givePointsToTeamOne() {
    setGameData({
      ...gameData,
      scoreTeamOne:
        gameData.scoreTeamOne +
        Number(question.points),
      usedQuestions: [
        ...gameData.usedQuestions,
        question.id,
      ],
    });

    navigate("/game");
  }

  function givePointsToTeamTwo() {
    setGameData({
      ...gameData,
      scoreTeamTwo:
        gameData.scoreTeamTwo +
        Number(question.points),
      usedQuestions: [
        ...gameData.usedQuestions,
        question.id,
      ],
    });

    navigate("/game");
  }

  function noWinner() {
    setGameData({
      ...gameData,
      usedQuestions: [
        ...gameData.usedQuestions,
        question.id,
      ],
    });

    navigate("/game");
  }

  return (
    <div>
      <h1>السؤال</h1>

      <h2>الفئة: {categoryName}</h2>

      <h3>النقاط: {question?.points}</h3>

      <h3>
        {teamOne} VS {teamTwo}
      </h3>

      <hr />

      <p>{question?.question}</p>

      <button onClick={() => setShowAnswer(true)}>
        إظهار الإجابة
      </button>

      {showAnswer && (
        <>
          <h3>الإجابة:</h3>

          <p>{question?.answer}</p>

          <h3>من حصل على النقاط؟</h3>

          <button onClick={givePointsToTeamOne}>
            {teamOne}
          </button>

          <button onClick={givePointsToTeamTwo}>
            {teamTwo}
          </button>

          <button onClick={noWinner}>
            لا أحد
          </button>
        </>
      )}
    </div>
  );
}

export default QuestionPage;