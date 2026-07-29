import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";
import { getQuestions } from "../services/questionService";

function GameBoard() {
  const { gameData } = useContext(GameContext);
  const navigate = useNavigate();

  const [questionsByPack, setQuestionsByPack] = useState({});

  useEffect(() => {
  async function loadQuestions() {
    const data = {};

    for (const category of gameData.categories) {
      const questions = await getQuestions(category.packId);

      data[category.packId] = questions;
    }

    setQuestionsByPack(data);
  }

  if (gameData.categories.length > 0) {
    loadQuestions();
  }
}, [gameData.categories]);

 

  function endGame() {
    navigate("/winner");
  }

  const {
    gameName,
    teamOne,
    teamTwo,
    categories,
    scoreTeamOne,
    scoreTeamTwo,
    usedQuestions,
  } = gameData;

  const totalQuestions = Object.values(questionsByPack)
  .flat()
  .length;

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
    <div>
      <h1 className="game-title">
        {gameName}
      </h1>

      <h1>لوحة اللعبة</h1>

      <h2>
        {teamOne}: {scoreTeamOne}
      </h2>

      <h2>
        {teamTwo}: {scoreTeamTwo}
      </h2>

      <button
        className="end-game-btn"
        onClick={endGame}
      >
        إنهاء المباراة
      </button>

      <div className="game-board-grid">
        {categories?.map((category) => {
        const categoryQuestions =
  [...(questionsByPack[category.packId] || [])]
    .sort((a, b) => a.points - b.points);

          return (
           <div
  key={category.categoryId}
  className="category-column"
>
              <h3>{category.categoryName}</h3>

              {categoryQuestions.map(
                (question) => {
                  const questionId =
`${category.packId}-${question.id}`;

                  if (
                    usedQuestions.includes(
                      questionId
                    )
                  ) {
                    return null;
                  }

                  return (
                    <button
                      key={question.id}
                      className="question-btn"
                      onClick={() =>
                        navigate(
                          "/question",
                          {
                           state: {
  categoryName: category.categoryName,
  teamOne,
  teamTwo,
  question,
}
                          }
                        )
                      }
                    >
                      {question.points}
                    </button>
                  );
                }
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameBoard;