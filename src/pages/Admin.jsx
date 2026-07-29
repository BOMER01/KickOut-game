import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "../services/categoryService";

export default function Admin() {
  const navigate = useNavigate();

  // حماية صفحة الأدمن
 useEffect(() => {
  const isAdmin = localStorage.getItem(
    "adminLoggedIn"
  );

  if (isAdmin !== "true") {
    navigate("/admin-login");
    return;
  }

  loadCategories();
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
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

const [packs, setPacks] = useState([]);

const [newPack, setNewPack] = useState("");
const [selectedPackId, setSelectedPackId] = useState("");
const [selectedQuestionPackId, setSelectedQuestionPackId] = useState("");

const [questions, setQuestions] = useState([]);



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

  

  const [selectedCategory, setSelectedCategory] =
    useState("");

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
  if (!newCategory.trim()) return;

  await addCategory({
    name: newCategory,
    description: "",
    imageUrl: "",
    color: "#3B82F6",
    order: categories.length + 1,
    packsCount: 0,
    isActive: true,
    //createdAt: new Date(),
   // updatedAt: new Date(),
  });

  setNewCategory("");

  loadCategories();
};

  // حذف فئة
  const deleteCategoryHandler = async (id) => {
  await deleteCategory(id);

  loadCategories();
};

  // إضافة أو تعديل سؤال
const addQuestionHandler = async () => {
  if (
    !selectedQuestionPackId ||
    !questionText.trim() ||
    !answerText.trim() ||
    !questionPoints
  ) {
    return;
  }

  await addQuestion({
    packId: selectedQuestionPackId,
    question: questionText,
    answer: answerText,
    points: Number(questionPoints),
    order: questions.length + 1,
    isActive: true,
  });

  setQuestionText("");
  setAnswerText("");
  setQuestionPoints("");

  loadQuestions(selectedQuestionPackId);
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
    <div>
      <h1>Admin Panel</h1>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      <h2>Categories</h2>

      <input
        value={newCategory}
        onChange={(e) =>
          setNewCategory(
            e.target.value
          )
        }
        placeholder="Category Name"
      />

      <button onClick={addCategoryHandler}>
        Add Category
      </button>

      {categories.map((category) => (
  <div key={category.id}>
    {category.name}

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

<br />
<br />

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

<br />
<br />

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

<hr />  

      <h2>Questions</h2>

      <select
  value={selectedQuestionPackId}
  onChange={(e) => {
    setSelectedQuestionPackId(e.target.value);
    loadQuestions(e.target.value);
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

      <input
        type="number"
        placeholder="Points"
        value={questionPoints}
        onChange={(e) =>
          setQuestionPoints(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Question"
        value={questionText}
        onChange={(e) =>
          setQuestionText(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Answer"
        value={answerText}
        onChange={(e) =>
          setAnswerText(
            e.target.value
          )
        }
      />

      <br />
      <br />

     <button onClick={addQuestionHandler}>
       
         
           "Add Question"
      </button>

      <hr />

      {questions.map((question) => (
        <div
          key={question.id}
          style={{
            border:
              "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>
              Category:
            </strong>{" "}
            {question.category}
          </p>

          <p>
            <strong>
              Points:
            </strong>{" "}
            {question.points}
          </p>

          <p>
            <strong>
              Question:
            </strong>{" "}
            {question.question}
          </p>

          <p>
            <strong>
              Answer:
            </strong>{" "}
            {question.answer}
          </p>

          {/*<button
            onClick={() =>
              editQuestion(
                question
              )
            }
          >
            Edit
          </button>*/}

          <button
  onClick={() =>
    deleteQuestionHandler(
      question.id
    )
  }
>
  Delete
</button>
        </div>
      ))}
    </div>
  );
}