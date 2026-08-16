import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useAuth } from "../context/AuthContext";
import { consumeGame } from "../services/gameService";
function MatchSetup() {
  const location = useLocation();
  const navigate = useNavigate();

  const { setGameData } = useContext(GameContext);
  const { currentUser } = useAuth();


  const categories = location.state?.categories || [];

  const [gameName, setGameName] = useState("");
  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleStartGame() {
  if (!gameName || !teamOne || !teamTwo) {
    alert("الرجاء تعبئة جميع الحقول");
    return;
  }

  if (!currentUser) {
    alert("يجب تسجيل الدخول أولاً");
    navigate("/login");
    return;
  }

  if (loading) return;

  setLoading(true);

  try {
    // خصم لعبة واحدة
    await consumeGame(currentUser.uid);

    // حفظ بيانات المباراة
    setGameData({
      gameName,
      teamOne,
      teamTwo,
      scoreTeamOne: 0,
      scoreTeamTwo: 0,
      categories,
      usedQuestions: [],
    });

    // بدء المباراة
    navigate("/game");

  } catch (error) {
    console.error("Start Game Error:", error);

    if (error.message === "لا توجد ألعاب متبقية") {
      alert("لا يوجد لديك ألعاب متبقية.");
    } else if (error.message === "المستخدم غير موجود") {
      alert("لم يتم العثور على بيانات الحساب.");
    } else {
      alert("حدث خطأ أثناء بدء اللعبة.");
    }

  } finally {
    setLoading(false);
  }
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
          onChange={(e) =>
            setGameName(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>اسم الفريق الأول</label>

        <br />

        <input
          type="text"
          value={teamOne}
          onChange={(e) =>
            setTeamOne(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>اسم الفريق الثاني</label>

        <br />

        <input
          type="text"
          value={teamTwo}
          onChange={(e) =>
            setTeamTwo(e.target.value)
          }
        />
      </div>

      <br />

      <h2>الفئات المختارة</h2>

      {categories.map((category) => (
        <p key={category.categoryId}>
          {category.categoryName}{" "}
          ({category.packName})
        </p>
      ))}

      <button
        onClick={handleStartGame}
        disabled={loading}
      >
        {loading
          ? "جاري بدء المباراة..."
          : "ابدأ المباراة"}
      </button>
    </div>
  );
}

export default MatchSetup;