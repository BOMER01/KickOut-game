import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
{/*import { doc, getDoc } from "firebase/firestore"; 
  import { db } from "../firebase"; */}

import { getCategories } from "../services/categoryService";
import { useAuth } from "../context/AuthContext";

import { getPacks } from "../services/packService";

import {
  getCompletedPackIds,
} from "../services/categoryProgressService";



import logo from "../assets/images/logo-1-06.png";
import "../styles/CategorySelection.css";
import { categoryIcons } from "../categoryIcons";

function CategorySelection() {
  const [categories, setCategories] = useState([]);

  const [teamOneCategories, setTeamOneCategories] = useState([]);
  const [teamTwoCategories, setTeamTwoCategories] = useState([]);

  const [packsByCategory, setPacksByCategory] = useState({});
const [completedCategoryIds, setCompletedCategoryIds] = useState([]);
const [unavailableCategoryIds, setUnavailableCategoryIds] = useState([]);
const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // 1 = الفريق الأول
  // 2 = الفريق الثاني
  const [currentTeam, setCurrentTeam] = useState(1);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

 {/*const [gamesRemaining, setGamesRemaining] = useState(0);*/}

  useEffect(() => {
  if (!currentUser) return;

  loadCategories();
}, [currentUser]);

async function loadCategories() {
  setIsLoadingCategories(true);

  try {
   const data = await getCategories();
console.log("Categories loaded:", data);

const packsResults = await Promise.all(
  data.map(async (category) => {
    try {
      const packs = await getPacks(category.id);
      console.log(`Packs loaded: ${category.name}`, packs);

      const completedPackIds = await getCompletedPackIds(
        currentUser.uid,
        category.id
      );

      console.log(
        `Progress loaded: ${category.name}`,
        completedPackIds
      );

      return {
        categoryId: category.id,
        packs,
        completedPackIds,
      };
    } catch (error) {
      console.error(
        `Failed loading category data: ${category.name}`,
        error
      );
      throw error;
    }
  })
);

    const newPacksByCategory = {};
    const completedIds = [];
    const unavailableIds = [];

    packsResults.forEach((result) => {
      newPacksByCategory[result.categoryId] = result.packs;

      if (result.packs.length === 0) {
        unavailableIds.push(result.categoryId);
        return;
      }

      const allCompleted = result.packs.every((pack) =>
        result.completedPackIds.includes(pack.id)
      );

      if (allCompleted) {
        completedIds.push(result.categoryId);
      }
    });

    setCategories(data);
    setPacksByCategory(newPacksByCategory);
    setCompletedCategoryIds(completedIds);
    setUnavailableCategoryIds(unavailableIds);

  } catch (error) {
    console.error("Failed to load categories:", error);
    alert("حدث خطأ أثناء تحميل التصنيفات");
  } finally {
    setIsLoadingCategories(false);
  }
}
  {/*useEffect(() => {
  async function loadGamesRemaining() {
    if (!currentUser) return;

    try {
      const userRef = doc(
        db,
        "users",
        currentUser.uid
      );

      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        setGamesRemaining(
          userData.gamesRemaining || 0
        );
      }
    } catch (error) {
      console.error(
        "Failed to load games remaining:",
        error
      );
    }
  }

  loadGamesRemaining();
}, [currentUser]);*/}

  // =========================
  // SELECTION LOGIC
  // =========================

  function isSelected(category) {
    return (
      teamOneCategories.some((c) => c.id === category.id) ||
      teamTwoCategories.some((c) => c.id === category.id)
    );
  }

  function isTeamOneCategory(category) {
    return teamOneCategories.some(
      (c) => c.id === category.id
    );
  }

  function isTeamTwoCategory(category) {
    return teamTwoCategories.some(
      (c) => c.id === category.id
    );
  }

  function handleCategoryClick(category) {
     if (
    completedCategoryIds.includes(category.id) ||
    unavailableCategoryIds.includes(category.id) ||
    isLoadingCategories
  ) {
    return;
  }
    // =========================
    // TEAM ONE
    // =========================

    if (currentTeam === 1) {
      // إلغاء الاختيار
      if (
        teamOneCategories.some(
          (c) => c.id === category.id
        )
      ) {
        setTeamOneCategories((prev) =>
          prev.filter(
            (c) => c.id !== category.id
          )
        );

        return;
      }

      // مستخدمة من الفريق الثاني
      if (
        teamTwoCategories.some(
          (c) => c.id === category.id
        )
      ) {
        return;
      }

      // الحد الأقصى
      if (teamOneCategories.length >= 2) {
        return;
      }

      setTeamOneCategories((prev) => [
        ...prev,
        category,
      ]);

      return;
    }

    // =========================
    // TEAM TWO
    // =========================

    if (currentTeam === 2) {
      // إلغاء الاختيار
      if (
        teamTwoCategories.some(
          (c) => c.id === category.id
        )
      ) {
        setTeamTwoCategories((prev) =>
          prev.filter(
            (c) => c.id !== category.id
          )
        );

        return;
      }

      // مقفلة للفريق الثاني
      if (
        teamOneCategories.some(
          (c) => c.id === category.id
        )
      ) {
        return;
      }

      // الحد الأقصى
      if (teamTwoCategories.length >= 2) {
        return;
      }

      setTeamTwoCategories((prev) => [
        ...prev,
        category,
      ]);
    }
  }

  // =========================
  // CONTINUE
  // =========================

  function handleContinue() {
    if (currentTeam === 1) {
      if (teamOneCategories.length !== 2) {
        alert("يجب على الفريق الأول اختيار فئتين");
        return;
      }

      setCurrentTeam(2);
      return;
    }

    if (currentTeam === 2) {
      if (teamTwoCategories.length !== 2) {
        alert("يجب على الفريق الثاني اختيار فئتين");
        return;
      }

      handleNext();
    }
  }

  // =========================
  // GET RANDOM PACKS
  // =========================

async function handleNext() {
  if (!currentUser) {
    alert("يجب تسجيل الدخول أولاً");
    return;
  }

  try {
    const selectedCategories = [];

    const allCategories = [
      ...teamOneCategories,
      ...teamTwoCategories,
    ];

    for (const category of allCategories) {
      // نعيد قراءة التقدم قبل بدء المباراة
      const [packs, completedPackIds] = await Promise.all([
        getPacks(category.id),
        getCompletedPackIds(currentUser.uid, category.id),
      ]);

      // الحزم مرتبة حسب order من getPacks
      const nextPack = packs.find(
        (pack) => !completedPackIds.includes(pack.id)
      );

      if (!nextPack) {
        alert(
          `لقد أكملت جميع الحزم في فئة ${category.name}`
        );

        await loadCategories();
        return;
      }

      const categoryIcon = categoryIcons.find(
        (icon) =>
          icon.id === category.icon ||
          icon.symbol === category.icon
      );

      selectedCategories.push({
        categoryId: category.id,
        categoryName: category.name,
        packId: nextPack.id,
        packName: nextPack.name,
        icon: categoryIcon?.symbol || "★",
      });
    }

    navigate("/setup", {
      state: {
        categories: selectedCategories,
      },
    });

  } catch (error) {
    console.error("Failed to prepare game:", error);
    alert("حدث خطأ أثناء تجهيز المباراة");
  }
}

  // =========================
  // PAGE DATA
  // =========================

  const selectedCount =
    currentTeam === 1
      ? teamOneCategories.length
      : teamTwoCategories.length;

  const teamName =
    currentTeam === 1
      ? "الفريق الأول"
      : "الفريق الثاني";

  // =========================
  // ICON
  // =========================

  function getCategoryIcon(category, index) {
    const name = category.name || "";

    if (name.includes("لقاب") || name.includes("الألقاب")) {
      return "🏆";
    }

    if (
      name.includes("أساطير") ||
      name.includes("الأساطير")
    ) {
      return "★";
    }

    if (
      name.includes("رويال") ||
      name.includes("رامبل")
    ) {
      return "🔔";
    }

    if (
      name.includes("موسيقى") ||
      name.includes("أغاني")
    ) {
      return "♫";
    }

    if (
      name.includes("سيدات") ||
      name.includes("النساء")
    ) {
      return "♛";
    }

    if (
      name.includes("حركات") ||
      name.includes("قاضية")
    ) {
      return "ϟ";
    }

    if (
      name.includes("فرق") ||
      name.includes("الثنائية")
    ) {
      return "♢";
    }

    if (
      name.includes("راسيل") ||
      name.includes("راسمينيا")
    ) {
      return "▣";
    }

    return ["★", "🏆", "ϟ", "♫", "♛", "🔔"][index % 6];
  }

 

  return (
    <div className="category-selection-page">

      {/* =====================================
          BACKGROUND ROPES
      ====================================== */}

      <div className="category-ropes">
        <span className="category-rope category-rope--red" />
        <span className="category-rope category-rope--blue" />
        <span className="category-rope category-rope--yellow" />
        <span className="category-rope category-rope--blue-bottom" />
      </div>

      {/* =====================================
          HEADER
      ====================================== */}

      <header className="category-hud">

        <div className="category-hud__side category-hud__side--right">


        
<button
  type="button"
  className="category-hud-btn"
  onClick={() => navigate("/game-history")}
>
  <span>◷</span>
  العابي السابقة
</button>


        </div>

        <div className="category-logo">
    <img
      src={logo}
      alt="KICKOUT"
      className="category-logo__image"
    />
  </div>

        <div className="category-hud__side category-hud__side--left">

         {/*} <div className="category-games-left">
  <span>🏆</span>
  الألعاب المتبقية
  <b>{gamesRemaining}</b>
</div>*/}

          {/*<button className="category-hud-btn">
            خروج
            <span>↪</span>
          </button>*/}

        </div>

      </header>

      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <main className="category-main">

        {/* TURN */}

        <div className="category-turn-badge">
          {teamName}
        </div>

        {/* TITLE */}

        <h1 className="category-main-title">

          <span
  className={`category-team-name ${
    currentTeam === 1 ? "team-one-color" : "team-two-color"
  }`}
>
  {teamName}
</span>
          <span>
            يختار تصنيفين
          </span>

        </h1>

        {/* COUNTER */}

        <div className="category-counter-new">

          <span>
            {selectedCount}
          </span>

          <span className="counter-slash">
            /
          </span>

          <span className="counter-total">
            2
          </span>

          <small>
            تم الاختيار
          </small>

        </div>

        {/* =====================================
            FILTER TABS
        ====================================== */}

        <div className="category-tabs">

          <button className="category-tab active">
            الكل
          </button>

          <button className="category-tab">
            البطولات
          </button>

          <button className="category-tab">
            النجوم
          </button>

          <button className="category-tab">
            الأحداث
          </button>

          <button className="category-tab">
            الحركات
          </button>

          <button className="category-tab">
            الموسيقى
          </button>

          <button className="category-tab">
            الفرق
          </button>

          <button className="category-tab">
            السيدات
          </button>

        </div>

        {/* =====================================
            CATEGORY CARDS
        ====================================== */}

        <div className="categories-container">

          {categories.map((category, index) => {
            const categoryIcon =
  categoryIcons.find(
    (icon) =>
      icon.id === category.icon ||
      icon.symbol === category.icon
  );

            const selectedByTeamOne =
              isTeamOneCategory(category);

            const selectedByTeamTwo =
              isTeamTwoCategory(category);

            const selected =
              isSelected(category);

            const locked =
              currentTeam === 2 &&
              selectedByTeamOne;
              const isCompleted = completedCategoryIds.includes(category.id);

const isUnavailable = unavailableCategoryIds.includes(category.id);

            let cardClass =
              "category-card-new";

              if (isCompleted || isUnavailable) {
  cardClass += " completed";
}

            const categoryColor = (
  category.color || "#3B82F6"
).toUpperCase();

const themeColors = {
  "#EF4444": "red",
  "#3B82F6": "blue",
  "#FACC15": "yellow",
};

const theme = themeColors[categoryColor];

if (theme) {
  cardClass += ` theme-${theme}`;
}

            if (selectedByTeamOne) {
              cardClass +=
                " selected-team-one";
            }

            if (selectedByTeamTwo) {
              cardClass +=
                " selected-team-two";
            }

            if (locked) {
              cardClass += " locked";
            }

            if (
              currentTeam === 1 &&
              selected
            ) {
              cardClass += " selected";
            }

            if (
              currentTeam === 2 &&
              selectedByTeamTwo
            ) {
              cardClass += " selected";
            }

            return (
             <button
  key={category.id}
  type="button"
  className={cardClass}
  disabled={
    locked ||
    isCompleted ||
    isUnavailable ||
    isLoadingCategories
  }
  style={{
    "--category-color": categoryColor,
  }}
  onClick={() => {
    if (!locked && !isCompleted && !isUnavailable) {
      handleCategoryClick(category);
    }
    {isCompleted && (
  <div className="category-check-new">
    ✓
  </div>
)}
  }}
>

                {/* CHECK */}

                {selected && (
                  <div className="category-check-new">
                    ✓
                  </div>
                )}

                

                

                {/* CONTENT */}

                <div className="category-card-content">

 
<div className="category-icon-box">
  {category.iconUrl ? (
    <img
      src={category.iconUrl}
      alt={category.name}
      className="category-icon category-custom-image"

      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  ) : (
    <span className="category-icon">
      {categoryIcon?.symbol || "★"}
    </span>
  )}
</div>


  <h3>
    {category.name}
  </h3>

  <p>
    {category.description}
  </p>

</div>

              </button>
            );
          })}

        </div>

      </main>

      {/* =====================================
          BOTTOM BAR
      ====================================== */}

      <footer className="category-bottom-new">

        <button
    className="category-back-btn"
    onClick={() => navigate(-1)}
>
     رجوع
     <span> › </span>
</button>

        <div className="category-bottom-message">

          {currentTeam === 1
            ? "اختر تصنيفين للمتابعة"
            : "جاهز — التالي دور الفريق الثاني"}

        </div>

        <button
          className={`category-next-btn-new ${
            selectedCount === 2
              ? "active"
              : "disabled"
          }`}
          onClick={handleContinue}
          disabled={selectedCount !== 2}
        >
          متابعة
          <span>›</span>
        </button>

      </footer>

    </div>
  );
}

export default CategorySelection;