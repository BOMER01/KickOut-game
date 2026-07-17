import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  // حماية صفحة الأدمن
  useEffect(() => {
    const isAdmin = localStorage.getItem(
      "adminLoggedIn"
    );

    if (isAdmin !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  // تسجيل خروج
  function logout() {
    localStorage.removeItem(
      "adminLoggedIn"
    );

    navigate("/");
  }

  // Categories
  const [categories, setCategories] = useState(() => {
    const saved =
      localStorage.getItem("categories");

    return saved
      ? JSON.parse(saved)
      : ["WWE", "AEW", "Legends"];
  });

  const [newCategory, setNewCategory] =
    useState("");

  // Questions
  const [questions, setQuestions] = useState(
    () => {
      const saved =
        localStorage.getItem("questions");

      return saved
        ? JSON.parse(saved)
        : [];
    }
  );

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

  // حفظ الفئات
  useEffect(() => {
    localStorage.setItem(
      "categories",
      JSON.stringify(categories)
    );
  }, [categories]);

  // حفظ الأسئلة
  useEffect(() => {
    localStorage.setItem(
      "questions",
      JSON.stringify(questions)
    );
  }, [questions]);

  // إضافة فئة
  const addCategory = () => {
    if (!newCategory.trim()) return;

    setCategories([
      ...categories,
      newCategory,
    ]);

    setNewCategory("");
  };

  // حذف فئة
  const deleteCategory = (category) => {
    setCategories(
      categories.filter(
        (c) => c !== category
      )
    );
  };

  // إضافة أو تعديل سؤال
  const addQuestion = () => {
    if (
      !selectedCategory ||
      !questionText.trim() ||
      !answerText.trim() ||
      !questionPoints
    ) {
      return;
    }

    if (editingId) {
      setQuestions(
        questions.map((q) =>
          q.id === editingId
            ? {
                ...q,
                category:
                  selectedCategory,
                points:
                  Number(
                    questionPoints
                  ),
                question:
                  questionText,
                answer: answerText,
              }
            : q
        )
      );

      setEditingId(null);
    } else {
      const newQuestion = {
        id: Date.now(),
        category: selectedCategory,
        points:
          Number(questionPoints),
        question: questionText,
        answer: answerText,
      };

      setQuestions([
        ...questions,
        newQuestion,
      ]);
    }

    setQuestionText("");
    setAnswerText("");
    setQuestionPoints("");
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
  const deleteQuestion = (id) => {
    setQuestions(
      questions.filter(
        (q) => q.id !== id
      )
    );
  };

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

      <button onClick={addCategory}>
        Add Category
      </button>

      {categories.map((category) => (
        <div key={category}>
          {category}

          <button
            onClick={() =>
              deleteCategory(
                category
              )
            }
          >
            Delete
          </button>
        </div>
      ))}

      <hr />

      <h2>Questions</h2>

      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(
            e.target.value
          )
        }
      >
        <option value="">
          Select Category
        </option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
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

      <button onClick={addQuestion}>
        {editingId
          ? "Update Question"
          : "Add Question"}
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

          <button
            onClick={() =>
              editQuestion(
                question
              )
            }
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteQuestion(
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