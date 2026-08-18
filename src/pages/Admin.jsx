import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categoryIcons } from "../categoryIcons";
import "../styles/Admin.css";
import { uploadMedia } from "../services/mediaService";
import {
  getPacks,
  addPack,
  deletePack,
} from "../services/packService";
import {
  getQuestions,
  addQuestion,
  deleteQuestion,
} from "../services/questionService";

import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../services/categoryService";

import {
  getPackages,
  addPackage,
  deletePackage,
  updatePackage,
} from "../services/packageService";

export default function Admin() {
  const navigate = useNavigate();

  // حماية صفحة الأدمن
useEffect(() => {
  const isAdmin =
    localStorage.getItem(
      "adminLoggedIn"
    );

  if (isAdmin !== "true") {
    navigate("/admin-login");
    return;
  }

  loadCategories();
  loadPackages();

}, [navigate]);

  async function loadCategories() {
  try {
    const data = await getCategories();
    setCategories(data);
  } catch (error) {
    console.error(error);
  }
}

  // تسجيل خروج
  function logout() {
    localStorage.removeItem(
      "adminLoggedIn"
    );

    navigate("/");
  }

  // Categories
  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] =
    useState("");
    const [newCategoryDescription, setNewCategoryDescription] =
  useState("");

const [newCategoryIcon, setNewCategoryIcon] =
  useState("trophy");

const [newCategoryColor, setNewCategoryColor] =
  useState("#3B82F6");

const [editingCategoryId, setEditingCategoryId] =
  useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

const [packs, setPacks] = useState([]);

const [newPack, setNewPack] = useState("");
const [selectedPackId, setSelectedPackId] = useState("");
const [selectedQuestionPackId, setSelectedQuestionPackId] = useState("");

const [questions, setQuestions] = useState([]);
const [questionType, setQuestionType] = useState("text");
const [questionMedia, setQuestionMedia] = useState(null);
const [uploadingMedia, setUploadingMedia] = useState(false);

const [packages, setPackages] = useState([]);

const [packageName, setPackageName] = useState("");

const [packageGames, setPackageGames] =
  useState("");

const [packagePrice, setPackagePrice] =
  useState("");

const [packageCurrency, setPackageCurrency] =
  useState("USD");



async function loadPacks(categoryId) {
  if (!categoryId) {
    setPacks([]);
    return;
  }

  try {
    const data = await getPacks(categoryId);
    setPacks(data);
  } catch (error) {
    console.error(error);
  }
}

async function loadPackages() {
  try {
    const data = await getPackages();

    setPackages(data);
  } catch (error) {
    console.error(error);
  }
}
async function loadQuestionPacks(categoryId) {
  if (!categoryId) {
    setQuestionPacks([]);
    return;
  }

  try {
    const data = await getPacks(categoryId);
    setQuestionPacks(data);
  } catch (error) {
    console.error(error);
  }
}

async function loadQuestions(packId) {
  if (!packId) {
    setQuestions([]);
    return;
  }

  try {
    const data = await getQuestions(packId);
    setQuestions(data);
  } catch (error) {
    console.error(error);
  }
}

async function addPackHandler() {
  if (!selectedCategoryId || !newPack.trim()) return;

  await addPack({
    categoryId: selectedCategoryId,
    name: newPack,
    order: packs.length + 1,
    isActive: true,
  });

  setNewPack("");

  loadPacks(selectedCategoryId);
}

async function deletePackHandler(id) {
  await deletePack(id);

  loadPacks(selectedCategoryId);
}

async function addPackageHandler() {
  if (
    !packageName.trim() ||
    !packageGames ||
    !packagePrice
  ) {
    return;
  }

  await addPackage({
    name: packageName,
    games: Number(packageGames),
    price: Number(packagePrice),
    currency: packageCurrency,
    order: packages.length + 1,
    isActive: true,
  });

  setPackageName("");
  setPackageGames("");
  setPackagePrice("");

  loadPackages();
}

async function deletePackageHandler(id) {
  await deletePackage(id);

  loadPackages();
}

  

    const [selectedCategory, setSelectedCategory] =
      useState("");
      

  const [questionPacks, setQuestionPacks] =
    useState([]);
      //

    const [questionPoints, setQuestionPoints] =
      useState("");

    const [questionText, setQuestionText] =
      useState("");

    const [answerText, setAnswerText] =
      useState("");

    const [editingId, setEditingId] =
      useState(null);


  



    // إضافة فئة
  const addCategoryHandler = async () => {
  if (!newCategory.trim()) {
    alert("اكتب اسم التصنيف");
    return;
  }

  try {
    await addCategory({
     name: newCategory.trim(),

  description:
    newCategoryDescription.trim(),

  icon: newCategoryIcon,

  color:
    newCategoryColor,

  order:
    categories.length + 1,

  packsCount: 0,

  isActive: true,
    });

    setNewCategory("");
    setNewCategoryDescription("");
    setNewCategoryIcon("trophy");
    setNewCategoryColor("#3B82F6");

    await loadCategories();

  } catch (error) {
    console.error(error);
    alert("حدث خطأ أثناء إضافة التصنيف");
  }
};

    // حذف فئة
    const deleteCategoryHandler = async (id) => {
    await deleteCategory(id);

    loadCategories();
  };

  const editCategory = (category) => {
  setEditingCategoryId(category.id);

  setNewCategory(
    category.name || ""
  );

  setNewCategoryDescription(
    category.description || ""
  );

  setNewCategoryIcon(
     category.icon || "trophy"
  );

  setNewCategoryColor(
    category.color || "#3B82F6"
  );
};

const updateCategoryHandler = async () => {
  if (!editingCategoryId) return;

  if (!newCategory.trim()) {
    alert("اكتب اسم التصنيف");
    return;
  }

  try {
    await updateCategory(
      editingCategoryId,
      {
        name: newCategory.trim(),

        description:
          newCategoryDescription.trim(),

        icon: newCategoryIcon,

        color:
          newCategoryColor,
      }
    );

    setEditingCategoryId(null);

    setNewCategory("");
    setNewCategoryDescription("");
    setNewCategoryIcon("trophy");
    setNewCategoryColor("#3B82F6");

    await loadCategories();

  } catch (error) {
    console.error(error);
    alert("حدث خطأ أثناء تعديل التصنيف");
  }
};

    // إضافة أو تعديل سؤال
  const addQuestionHandler = async () => {
  if (
    !selectedQuestionPackId ||
    !questionText.trim() ||
    !answerText.trim() ||
    !questionPoints
  ) {
    alert("الرجاء تعبئة جميع بيانات السؤال");
    return;
  }

  if (
    questionType !== "text" &&
    !questionMedia
  ) {
    alert("الرجاء اختيار ملف للسؤال");
    return;
  }

  try {
    setUploadingMedia(true);

    let mediaUrl = "";

    // رفع الملف إذا كان السؤال Media
    if (
      questionType !== "text" &&
      questionMedia
    ) {
      mediaUrl =
        await uploadMedia(questionMedia);
    }

    await addQuestion({
      packId: selectedQuestionPackId,

      type: questionType,

      question: questionText,

      answer: answerText,

      points: Number(questionPoints),

      mediaUrl: mediaUrl,

      order: questions.length + 1,

      isActive: true,
    });

    // تنظيف الحقول
    setQuestionText("");
    setAnswerText("");
    setQuestionPoints("");
    setQuestionType("text");
    setQuestionMedia(null);

    await loadQuestions(
      selectedQuestionPackId
    );

  } catch (error) {
    console.error(error);

    alert(
      "حدث خطأ أثناء إضافة السؤال"
    );

  } finally {
    setUploadingMedia(false);
  }
};

  // تعديل سؤال
  const editQuestion = (question) => {
    setEditingId(question.id);

    setSelectedCategory(
      question.category
    );

    setQuestionPoints(
      question.points
    );

    setQuestionText(
      question.question
    );

    setAnswerText(
      question.answer
    );
  };

  // حذف سؤال
 async function deleteQuestionHandler(id) {
  await deleteQuestion(id);

  loadQuestions(selectedQuestionPackId);
}

  return (
    <div className="admin-page" >
      <h1>Admin Panel</h1>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      <h2>Categories</h2>

      <div className="category-admin-form">

  <input
    value={newCategory}
    onChange={(e) =>
      setNewCategory(e.target.value)
    }
    placeholder="Category Name"
  />

  <textarea
    value={newCategoryDescription}
    onChange={(e) =>
      setNewCategoryDescription(e.target.value)
    }
    placeholder="Category Description"
  />

  <div className="category-icon-picker">

  <label className="category-icon-picker-title">
    اختر أيقونة التصنيف
  </label>

  <div className="category-icon-grid">

    {categoryIcons.map((icon) => (
      <button
        type="button"
        key={icon.id}
        className={`category-icon-option ${
          newCategoryIcon === icon.id
            ? "selected"
            : ""
        }`}
        onClick={() =>
          setNewCategoryIcon(icon.id)
        }
      >

        <span className="category-icon-symbol">
          {icon.symbol}
        </span>

        {newCategoryIcon === icon.id && (
          <span className="category-icon-check">
            ✓
          </span>
        )}

      </button>
    ))}

  </div>

</div>

  <input
    type="color"
    value={newCategoryColor}
    onChange={(e) =>
      setNewCategoryColor(e.target.value)
    }
  />

  {editingCategoryId ? (
    <>
      <button onClick={updateCategoryHandler}>
        Update Category
      </button>

      <button
        onClick={() => {
          setEditingCategoryId(null);

          setNewCategory("");
          setNewCategoryDescription("");
          setNewCategoryIcon("trophy");
          setNewCategoryColor("#3B82F6");
        }}
      >
        Cancel
      </button>
    </>
  ) : (
    <button onClick={addCategoryHandler}>
      Add Category
    </button>
  )}

</div>

   {categories.map((category) => (
  <div
    key={category.id}
    className="admin-category-item"
  >

    <div className="admin-category-icon">
  {
    categoryIcons.find(
      (icon) => icon.id === category.icon
    )?.symbol || "🏆"
  }
</div>

    <div>
      <strong>
        {category.name}
      </strong>

      <p>
        {category.description}
      </p>

      <small>
        Color: {category.color}
      </small>
    </div>

    <button
      onClick={() =>
        editCategory(category)
      }
    >
      Edit
    </button>

    <button
      onClick={() =>
        deleteCategoryHandler(category.id)
      }
    >
      Delete
    </button>

  </div>
))}

      <hr />

      <h2>Packs</h2>

<div className="admin-pack-section">

  <select
    value={selectedCategoryId}
    onChange={(e) => {
      setSelectedCategoryId(e.target.value);
      loadPacks(e.target.value);
    }}
  >
    <option value="">
      Select Category
    </option>

    {categories.map((category) => (
      <option
        key={category.id}
        value={category.id}
      >
        {category.name}
      </option>
    ))}
  </select>

  <input
    type="text"
    placeholder="Pack Name"
    value={newPack}
    onChange={(e) =>
      setNewPack(e.target.value)
    }
  />

  <button onClick={addPackHandler}>
    Add Pack
  </button>

  {packs.map((pack) => (
    <div key={pack.id}>
      {pack.name}

      <button
        onClick={() =>
          deletePackHandler(pack.id)
        }
      >
        Delete
      </button>
    </div>
  ))}

</div>

<hr />

<h2>Questions</h2>
<div className="admin-question-section">

{/* Category */}

<select
  value={selectedCategoryId}
  onChange={(e) => {
    const categoryId = e.target.value;

    setSelectedCategoryId(categoryId);
    setSelectedQuestionPackId("");

    loadPacks(categoryId);
    setQuestions([]);
  }}
>
  <option value="">
    Select Category
  </option>

  {categories.map((category) => (
    <option
      key={category.id}
      value={category.id}
    >
      {category.name}
    </option>
  ))}
</select>

<br />
<br />

{/* Pack */}

<select
  value={selectedQuestionPackId}
  onChange={(e) => {
    const packId = e.target.value;

    setSelectedQuestionPackId(packId);
    loadQuestions(packId);
  }}
>
  <option value="">
    Select Pack
  </option>

  {packs.map((pack) => (
    <option
      key={pack.id}
      value={pack.id}
    >
      {pack.name}
    </option>
  ))}
</select>

<br />
<br />

{/* Question Type */}

<select
  value={questionType}
  onChange={(e) =>
    setQuestionType(e.target.value)
  }
>
  <option value="text">
    Text Question
  </option>

  <option value="image">
    Image Question
  </option>

  <option value="audio">
    Audio Question
  </option>

  <option value="video">
    Video Question
  </option>
</select>

{questionType !== "text" && (
  <div className="question-media-upload">

    <label>
      اختر ملف السؤال
    </label>

    <input
      type="file"
      accept={
        questionType === "image"
          ? "image/*"
          : questionType === "audio"
          ? "audio/*"
          : "video/*"
      }
      onChange={(e) =>
        setQuestionMedia(
          e.target.files?.[0] || null
        )
      }
    />

    {questionMedia && (
      <p>
        الملف المختار: {questionMedia.name}
      </p>
    )}

  </div>
)}

<br />
<br />

{/* Points */}

<input
  type="number"
  placeholder="Points"
  value={questionPoints}
  onChange={(e) =>
    setQuestionPoints(e.target.value)
  }
/>

<br />
<br />

{/* Question */}

<input
  type="text"
  placeholder="Question"
  value={questionText}
  onChange={(e) =>
    setQuestionText(e.target.value)
  }
/>

<br />
<br />

{/* Answer */}

<input
  type="text"
  placeholder="Answer"
  value={answerText}
  onChange={(e) =>
    setAnswerText(e.target.value)
  }
/>

<br />
<br />
<button
  onClick={addQuestionHandler}
  disabled={uploadingMedia}
>
  {uploadingMedia
    ? "جاري رفع الملف..."
    : "Add Question"}
</button>

      <hr />

      {questions.map((question) => (
  <div
    key={question.id}
    style={{
      border: "1px solid gray",
      padding: "10px",
      marginBottom: "10px",
    }}
    
  >
    <p>
      <strong>Type:</strong>{" "}
      {question.type || "text"}
    </p>

    <p>
      <strong>Category:</strong>{" "}
      {question.category}
    </p>

    <p>
      <strong>Points:</strong>{" "}
      {question.points}
    </p>

    <p>
      <strong>Question:</strong>{" "}
      {question.question}
    </p>

    <p>
      <strong>Answer:</strong>{" "}
      {question.answer}
    </p>

    <button
      onClick={() =>
        deleteQuestionHandler(question.id)
      }
    >
      Delete
    </button>
  </div>
))}
</div>



      <hr />

<h2>Packages</h2>
<div className="admin-package-section">

<input
  type="text"
  placeholder="Package Name"
  value={packageName}
  onChange={(e) =>
    setPackageName(e.target.value)
  }
/>

<br />
<br />

<input
  type="number"
  placeholder="Games"
  value={packageGames}
  onChange={(e) =>
    setPackageGames(e.target.value)
  }
/>

<br />
<br />

<input
  type="number"
  placeholder="Price"
  value={packagePrice}
  onChange={(e) =>
    setPackagePrice(e.target.value)
  }
/>

<br />
<br />

<select
  value={packageCurrency}
  onChange={(e) =>
    setPackageCurrency(e.target.value)
  }
>
 

  <option value="SAR">
    SAR
  </option>
</select>

<br />
<br />

<button onClick={addPackageHandler}>
  Add Package
</button>

<hr />

{packages.map((pkg) => (
  <div
    key={pkg.id}
    style={{
      border: "1px solid gray",
      padding: "10px",
      marginBottom: "10px",
    }}
  >
    <p>
      <strong>Name:</strong> {pkg.name}
    </p>

    <p>
      <strong>Games:</strong> {pkg.games}
    </p>

    <p>
      <strong>Price:</strong> {pkg.price}{" "}
      {pkg.currency}
    </p>

    <button
      onClick={() =>
        deletePackageHandler(pkg.id)
      }
    >
      Delete
    </button>
  </div>
))}
</div>
    </div>
  );
}