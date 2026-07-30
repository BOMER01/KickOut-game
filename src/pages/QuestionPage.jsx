import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";


function QuestionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showAnswer, setShowAnswer] =
    useState(false);

  const { gameData, setGameData } = 
    useContext(GameContext);

  useEffect(() => {
    const savedQuestions =
      localStorage.getItem("questions");

    if (savedQuestions) {
      setQuestions(
        JSON.parse(savedQuestions)
      );
    }
  }, []);

 const {
  categoryName,
  teamOne,
  teamTwo,
  question,
} = location.state || {};

  const currentQuestion =
    questions.find(
      (q) =>
        q.category === category &&
        q.points === Number(points)
    )
    

 function givePointsToTeamOne() {
  const usedQuestionId = question.id;

  setGameData({
    ...gameData,
    scoreTeamOne:
      gameData.scoreTeamOne +
      Number(question.points),
    usedQuestions: [
      ...gameData.usedQuestions,
      usedQuestionId,
    ],
  });

  navigate("/game");
}

  function givePointsToTeamTwo() {
  const usedQuestionId = question.id;

  setGameData({
    ...gameData,
    scoreTeamTwo:
      gameData.scoreTeamTwo +
      Number(question.points),
    usedQuestions: [
      ...gameData.usedQuestions,
      usedQuestionId,
    ],
  });

  navigate("/game");
} 

function noWinner() {
  const usedQuestionId = question.id;

  setGameData({
    ...gameData,
    usedQuestions: [
      ...gameData.usedQuestions,
      usedQuestionId,
    ],
  });

  navigate("/game");
}

  return (
    <div>
      <h1>السؤال</h1>

      <h2>الفئة: {categoryName}</h2>

      <h3>النقاط: {points}</h3>

      <h3>
        {teamOne} VS {teamTwo}
      </h3>

      <hr />

      <p>
        {question?.question}
      </p>

      <button
        onClick={() =>
          setShowAnswer(true)
        }
      >
        إظهار الإجابة
      </button>

      {showAnswer && (
        <div>
          <h3>الإجابة:</h3>

          <p>
            {question?.answer}
          </p>
        </div>
      )}

      {showAnswer && (
        <div>
          <h3>
            من حصل على النقاط؟
          </h3>

          <button
            onClick={
              givePointsToTeamOne
            }
          >
            {teamOne}
          </button>

          <button
            onClick={
              givePointsToTeamTwo
            }
          >
            {teamTwo}
          </button>

          <button
            onClick={noWinner}
          >
            لا أحد
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionPage;