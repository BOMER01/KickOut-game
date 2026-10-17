
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getUserGameHistory } from "../services/gameHistoryService";

import logo from "../assets/images/logo-1-06.png";

import "../styles/GameHistory.css";

function GameHistory() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadHistory() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const history = await getUserGameHistory(
          currentUser.uid
        );

        if (active) {
          setGames(history);
        }
      } catch (err) {
        console.error("Failed to load game history:", err);

        if (active) {
          setError("تعذر تحميل سجل المباريات.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadHistory();

    return () => {
      active = false;
    };
  }, [currentUser]);

  function formatDate(timestamp) {
    if (!timestamp?.toDate) return "التاريخ غير متوفر";

    return timestamp.toDate().toLocaleString("ar", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <main className="game-history">
      
<header className="game-history__header">

  <button
    type="button"
    className="game-history__home"
    onClick={() => navigate("/")}
  >
    الصفحة الرئيسية
  </button>

  <div className="game-history__brand">
    <img
      src={logo}
      alt="KICKOUT"
      className="game-history__logo"
    />
  </div>

  <h1>ألعابي السابقة</h1>

</header>


      {loading ? (
        <p>جارٍ تحميل المباريات...</p>
      ) : !currentUser ? (
        <p>سجّل الدخول لعرض مبارياتك السابقة.</p>
      ) : error ? (
        <p>{error}</p>
      ) : games.length === 0 ? (
        <p>لا توجد مباريات سابقة حتى الآن.</p>
      ) : (
        <div className="game-history__list">
          {games.map((game) => (
            <article
              className="game-history__card"
              key={game.id}
            >
              <p className="game-history__date">
                {formatDate(game.playedAt)}
              </p>

              <h2>{game.gameName}</h2>

              <div className="game-history__score">
                <div>
                  <span>{game.teamOne}</span>
                  <strong>{game.scoreTeamOne}</strong>
                </div>

                <span className="game-history__vs">
                  VS
                </span>

                <div>
                  <span>{game.teamTwo}</span>
                  <strong>{game.scoreTeamTwo}</strong>
                </div>
              </div>

              <p className="game-history__winner">
                {game.winner === "تعادل"
                  ? "انتهت المباراة بالتعادل"
                  : `الفائز: ${game.winner}`}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default GameHistory;
