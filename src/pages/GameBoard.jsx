import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";

function GameBoard() {
  const { gameData } = useContext(GameContext);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const savedQuestions =
      localStorage.getItem("questions");

    if (savedQuestions) {
      setQuestions(
        JSON.parse(savedQuestions)
      );
    }
  }, []);

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

  const totalQuestions = questions.filter(
    (q) => categories?.includes(q.category)
  ).length;

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
            questions
              .filter(
                (q) =>
                  q.category === category
              )
              .sort(
                (a, b) =>
                  a.points - b.points
              );

          return (
            <div
              key={category}
              className="category-column"
            >
              <h3>{category}</h3>

              {categoryQuestions.map(
                (question) => {
                  const questionId =
                    `${category}-${question.points}`;

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
                              category,
                              points:
                                question.points,
                              teamOne,
                              teamTwo,
                            },
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