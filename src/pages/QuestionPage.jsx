import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../services/questionService";

function QuestionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showAnswer, setShowAnswer] =
    useState(false);
   const [currentQuestion, setCurrentQuestion] = useState(null);

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
  categoryId,
  categoryName,
  packId,
  questionId,
  points,
  teamOne,
  teamTwo,
} = location.state || {}; 

  const currentQuestion =
    questions.find(
      (q) =>
        q.category === category &&
        q.points === Number(points)
    )
    useEffect(() => {
  async function loadQuestion() {
    const questions = await getQuestions(packId);

    const question = questions.find(
      (q) => q.id === questionId
    );

    setCurrentQuestion(question);
  }

  if (packId && questionId) {
    loadQuestion();
  }
}, [packId, questionId]);

  function givePointsToTeamOne() {
    const questionId =
      `${category}-${points}`;

    setGameData({
      ...gameData,
      scoreTeamOne:
        gameData.scoreTeamOne +
        Number(points),
      usedQuestions: [
        ...gameData.usedQuestions,
        questionId,
      ],
    });

    navigate("/game");
  }

  function givePointsToTeamTwo() {
    const questionId =
      `${category}-${points}`;

    setGameData({
      ...gameData,
      scoreTeamTwo:
        gameData.scoreTeamTwo +
        Number(points),
      usedQuestions: [
        ...gameData.usedQuestions,
        questionId,
      ],
    });

    navigate("/game");
  }

  function noWinner() {
   const usedQuestionId = questionId;

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
        {currentQuestion?.question}
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
            {currentQuestion?.answer}
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