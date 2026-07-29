import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/categoryService";
import { getRandomPack } from "../services/packService";

function CategorySelection() {
  const [categories, setCategories] = useState([]);

  const [teamOneCategories, setTeamOneCategories] = useState([]);
  const [teamTwoCategories, setTeamTwoCategories] = useState([]);

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

  function isSelected(category) {
    return (
      teamOneCategories.some((c) => c.id === category.id) ||
      teamTwoCategories.some((c) => c.id === category.id)
    );
  }

  function handleCategoryClick(category) {
    if (isSelected(category)) return;

    if (teamOneCategories.length < 4) {
      setTeamOneCategories([...teamOneCategories, category]);
      return;
    }

    if (teamTwoCategories.length < 4) {
      setTeamTwoCategories([...teamTwoCategories, category]);
      return;
    }

    alert("تم اختيار جميع الفئات");
  }

  function removeTeamOneCategory(categoryId) {
    setTeamOneCategories(
      teamOneCategories.filter((c) => c.id !== categoryId)
    );
  }

  function removeTeamTwoCategory(categoryId) {
    setTeamTwoCategories(
      teamTwoCategories.filter((c) => c.id !== categoryId)
    );
  }

  async function handleNext() {
  if (
    teamOneCategories.length !== 4 ||
    teamTwoCategories.length !== 4
  ) {
    alert("يجب اختيار 4 فئات لكل فريق");
    return;
  }

  try {
    const selectedCategories = [];

    const allCategories = [
      ...teamOneCategories,
      ...teamTwoCategories,
    ];

    for (const category of allCategories) {
      const randomPack = await getRandomPack(category.id);

      if (!randomPack) {
        alert(`الفئة ${category.name} لا تحتوي على أي Pack`);
        return;
      }

      selectedCategories.push({
        categoryId: category.id,
        categoryName: category.name,
        packId: randomPack.id,
        packName: randomPack.name,
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

  let currentTurn = "";

  if (teamOneCategories.length < 4) {
    currentTurn = "🎯 دور الفريق الأول لاختيار الفئات";
  } else if (teamTwoCategories.length < 4) {
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
        <div key={category.id}>
          <span>{category.name}</span>

          <button
            onClick={() =>
              removeTeamOneCategory(category.id)
            }
          >
            X
          </button>
        </div>
      ))}

      <hr />

      <h2>الفريق الثاني</h2>

      {teamTwoCategories.map((category) => (
        <div key={category.id}>
          <span>{category.name}</span>

          <button
            onClick={() =>
              removeTeamTwoCategory(category.id)
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
            key={category.id}
            className={`category-card ${
              isSelected(category) ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <h3>{category.name}</h3>

            <p>{category.description}</p>
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