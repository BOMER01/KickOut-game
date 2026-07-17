import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CategorySelection() {
 const [categories, setCategories] = useState([]);

 useEffect(() => {
  const savedCategories =
    localStorage.getItem("categories");

  if (savedCategories) {
    setCategories(
      JSON.parse(savedCategories)
    );
  }
}, []);

  const [teamOneCategories, setTeamOneCategories] = useState([]);
  const [teamTwoCategories, setTeamTwoCategories] = useState([]);

  const navigate = useNavigate();

  function handleCategoryClick(category) {
    if (
      teamOneCategories.includes(category) ||
      teamTwoCategories.includes(category)
    ) {
      return;
    }

    if (teamOneCategories.length < 2) {
      setTeamOneCategories([
        ...teamOneCategories,
        category,
      ]);
      return;
    }

    if (teamTwoCategories.length < 2) {
      setTeamTwoCategories([
        ...teamTwoCategories,
        category,
      ]);
      return;
    }

    alert("تم اختيار جميع الفئات");
  }
  function removeTeamOneCategory(category) {
  setTeamOneCategories(
    teamOneCategories.filter(
      (item) => item !== category
    )
  );
}

function removeTeamTwoCategory(category) {
  setTeamTwoCategories(
    teamTwoCategories.filter(
      (item) => item !== category
    )
  );
}

  function handleNext() {
    if (
      teamOneCategories.length !== 2 ||
      teamTwoCategories.length !== 2
    ) {
      alert("يجب اختيار فئتين لكل فريق");
      return;
    }

    navigate("/setup", {
      state: {
        categories: [
          ...teamOneCategories,
          ...teamTwoCategories,
        ],
      },
    });
  }
  let currentTurn = "";

if (teamOneCategories.length < 2) {
  currentTurn = "🎯 دور الفريق الأول لاختيار الفئات";
} else if (teamTwoCategories.length < 2) {
  currentTurn = "🎯 دور الفريق الثاني لاختيار الفئات";
} else {
  currentTurn = "✅ تم اختيار جميع الفئات";
}

  return (
    <div>
      <h1>اختيار الفئات</h1>

      <h2>{currentTurn}</h2>

      <h2>الفريق الأول</h2>

      {teamOneCategories.map((category) => (
  <div key={category}>
    <span>{category}</span>

    <button
      onClick={() =>
        removeTeamOneCategory(category)
      }
    >
      X
    </button>
  </div>
))}

      <hr />

      <h2>الفريق الثاني</h2>

      {teamTwoCategories.map((category) => (
  <div key={category}>
    <span>{category}</span>

    <button
      onClick={() =>
        removeTeamTwoCategory(category)
      }
    >
      X
    </button>
  </div>
))}

      <hr />

     <div className="categories-container">
  {categories.map((category) => (
    <div
  key={category}
  className={`category-card ${
    teamOneCategories.includes(category) ||
    teamTwoCategories.includes(category)
      ? "selected"
      : ""
  }`}
  onClick={() => handleCategoryClick(category)}
>
      {category}
    </div>
  ))}
</div>

      <hr />

      <button onClick={handleNext}>
        التالي
      </button>
    </div>
  );
}

export default CategorySelection;