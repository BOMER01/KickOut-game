import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/categoryService";
import { getRandomPack } from "../services/packService";
import logo from "../assets/images/logo-1-06.png";
import "../styles/CategorySelection.css";
import { categoryIcons } from "../categoryIcons";

function CategorySelection() {
  const [categories, setCategories] = useState([]);

  const [teamOneCategories, setTeamOneCategories] = useState([]);
  const [teamTwoCategories, setTeamTwoCategories] = useState([]);

  // 1 = الفريق الأول
  // 2 = الفريق الثاني
  const [currentTeam, setCurrentTeam] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

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
  try {
    const selectedCategories = [];

    const allCategories = [
      ...teamOneCategories,
      ...teamTwoCategories,
    ];

    for (const category of allCategories) {
      const randomPack = await getRandomPack(category.id);

      if (!randomPack) {
        alert(
          `الفئة ${category.name} لا تحتوي على أي Pack`
        );
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
        packId: randomPack.id,
        packName: randomPack.name,
        icon: categoryIcon?.symbol || "★",
      });
    }

    navigate("/setup", {
      state: {
        categories: selectedCategories,
      },
    });
  } catch (error) {
    console.error(error);
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

  function getCategoryTheme(index) {
    const themes = [
      "red",
      "blue",
      "yellow",
      "red",
      "blue",
      "red",
      "yellow",
      "blue",
    ];

    return themes[index % themes.length];
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

          <button className="category-hud-btn">
            <span>⚙</span>
            الخيارات
          </button>

          <button className="category-hud-btn">
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

          <div className="category-games-left">
            <span>🏆</span>
            الألعاب المتبقية
            <b>1</b>
          </div>

          <button className="category-hud-btn">
            خروج
            <span>↪</span>
          </button>

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

          <span className="category-team-name">
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

            let cardClass =
              "category-card-new";

            cardClass +=
              ` theme-${getCategoryTheme(index)}`;

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
                onClick={() => {
                  if (!locked) {
                    handleCategoryClick(category);
                  }
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
    <span className="category-icon">
      {categoryIcon?.symbol || "★"}
    </span>
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