import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useAuth } from "../context/AuthContext";
import { consumeGame } from "../services/gameService";
import "../styles/MatchSetup.css";
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
  <div className="match-setup-page">

    <div className="match-setup-content">

      <h1 className="match-setup-title">
        بيانات المباراة
      </h1>

      <p className="match-setup-subtitle">
        أنشئ مباراة جديدة وأدخل أسماء الفريقين
      </p>


      {/* اسم المباراة */}
      <div className="match-name-card">

        <span className="match-label">
          اسم المباراة
        </span>

        <input
          className="match-input"
          type="text"
          value={gameName}
          placeholder="مثال: نزال الأبطال"
          onChange={(e) =>
            setGameName(e.target.value)
          }
        />

      </div>


      {/* الفريقين */}
      <div className="teams-setup">

        {/* الفريق الثاني */}
        <div className="team-setup-card team-blue">

          <span className="team-setup-label">
            الفريق الثاني
          </span>

          <input
            className="match-input"
            type="text"
            value={teamTwo}
            placeholder="اسم الفريق الثاني"
            onChange={(e) =>
              setTeamTwo(e.target.value)
            }
          />

        </div>


        {/* VS */}
        <div className="setup-vs">
          VS
        </div>


        {/* الفريق الأول */}
        <div className="team-setup-card team-red">

          <span className="team-setup-label">
            الفريق الأول
          </span>

          <input
            className="match-input"
            type="text"
            value={teamOne}
            placeholder="اسم الفريق الأول"
            onChange={(e) =>
              setTeamOne(e.target.value)
            }
          />

        </div>

      </div>


      {/* التصنيفات */}
      <div className="selected-categories">

        <h2>
          التصنيفات المختارة
        </h2>

        <div className="selected-category-list">

          {categories.map((category) => (
            <div
              key={category.categoryId}
              className="selected-category"
            >
              <strong>
                {category.categoryName}
              </strong>

           
            </div>
          ))}

        </div>

      </div>


      {/* زر إنشاء المباراة */}
      <button
        className="create-match-btn"
        onClick={handleStartGame}
        disabled={loading}
      >
        {loading
          ? "جاري بدء المباراة..."
          : "أنشئ المباراة"}
      </button>

    </div>

  </div>
);
}

export default MatchSetup;