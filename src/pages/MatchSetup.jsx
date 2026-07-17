import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";

function MatchSetup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setGameData } = useContext(GameContext);

  const categories = location.state?.categories || [];

  const [gameName, setGameName] = useState("");
  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");

 function handleStartGame() {
  if (!gameName || !teamOne || !teamTwo) {
    alert("الرجاء تعبئة جميع الحقول");
    return;
  }

  setGameData({
  gameName,
  teamOne,
  teamTwo,
  scoreTeamOne: 0,
  scoreTeamTwo: 0,
  categories,
  usedQuestions: [],
});

navigate("/game");
}

  return (
    <div>
      <h1>إعداد المباراة</h1>

      <div>
        <label>اسم اللعبة</label>
        <br />
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>اسم الفريق الأول</label>
        <br />
        <input
          type="text"
          value={teamOne}
          onChange={(e) => setTeamOne(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>اسم الفريق الثاني</label>
        <br />
        <input
          type="text"
          value={teamTwo}
          onChange={(e) => setTeamTwo(e.target.value)}
        />
      </div>

      <br />

      <h2>الفئات المختارة</h2>

      {categories.map((category) => (
        <p key={category}>{category}</p>
      ))}

      <button onClick={handleStartGame}>
        ابدأ المباراة
      </button>
    </div>
  );
}

export default MatchSetup;