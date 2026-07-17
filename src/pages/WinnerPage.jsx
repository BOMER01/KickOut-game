import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";

function WinnerPage() {
  const { gameData } = useContext(GameContext);
  const navigate = useNavigate();

  const {
    teamOne,
    teamTwo,
    scoreTeamOne,
    scoreTeamTwo,
  } = gameData;

  let winner = "تعادل";

  if (scoreTeamOne > scoreTeamTwo) {
    winner = teamOne;
  } else if (scoreTeamTwo > scoreTeamOne) {
    winner = teamTwo;
  }

  function playAgain() {
    navigate("/");
  }

  return (
    <div className="winner-page">
      <h1 className="winner-title">
        🏆 الفائز
      </h1>

      <h2 className="winner-name">
        {winner}
      </h2>

      <div className="score-board">
        <p>
          {teamOne}: {scoreTeamOne}
        </p>

        <p>
          {teamTwo}: {scoreTeamTwo}
        </p>
      </div>

      <button
        className="play-again-btn"
        onClick={playAgain}
      >
        العب مرة أخرى
      </button>
    </div>
  );
}

export default WinnerPage;