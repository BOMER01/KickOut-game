import { useEffect, useState } from "react";
import "../styles/QuestionModal.css";

function QuestionModal({
  question,
  categoryName,
  teamOne,
  teamTwo,
  onFinish,
  onClose,
}) {
  const [time, setTime] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // TIMER
  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  function toggleTimer() {
    setTimerRunning((prev) => !prev);
  }

  function resetTimer() {
    setTimerRunning(false);
    setTime(60);
  }

  if (!question) return null;

  return (
    <div className="modal">

      <div className="modal__overlay" />

      <div className="modal__box">

        {/* TOP */}
        <div className="modal__top">

          {/* POINTS */}
          <div className="modal__points">
            {question.points}
          </div>

          {/* TIMER */}
          <div className="timer">

            <div
              className={`timer__display ${
                timerRunning
                  ? "is-running"
                  : time === 0
                  ? "is-done"
                  : "is-paused"
              }`}
            >
              <span>◷</span>
              {minutes}:{seconds}
            </div>

            <div className="timer__controls">

              {/* RESET */}
              <button
                className="timer-btn timer-btn--icon"
                onClick={resetTimer}
              >
                ↻
              </button>

              {/* START / PAUSE / RESUME */}
              <button
                className={`timer-btn timer-btn--start ${
                  timerRunning
                    ? "is-running"
                    : "is-paused"
                }`}
                onClick={toggleTimer}
              >
                {timerRunning
                  ? "إيقاف المؤقت"
                  : time === 60
                  ? "ابدأ المؤقت"
                  : "استئناف"}

                <span>
                  {timerRunning ? "❚❚" : "▶"}
                </span>
              </button>

            </div>
          </div>

          {/* CATEGORY */}
          <div className="modal__category">
            {categoryName}
          </div>

        </div>

        {/* TURN */}
        <div className="modal__turn">
          دور <span>{teamOne}</span>
        </div>

        {/* ICONS */}
        <div className="modal-helpers">
          <button className="helper-btn">⚽</button>
          <button className="helper-btn">⚽</button>
          <button className="helper-btn">⚽</button>
        </div>

        {/* QUESTION */}
        <div className="modal__question">
          {question.question}
        </div>

        {/* ANSWER */}
        {showAnswer && (
          <div className="modal__answer">
            <div className="modal__answer-label">
              الإجابة
            </div>

            <div className="modal__answer-text">
              {question.answer}
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="modal__actions">

          <button
            className="qbtn qbtn--reveal"
            onClick={() => setShowAnswer((prev) => !prev)}
          >
            {showAnswer
              ? "إخفاء الإجابة"
              : "اكشف الإجابة"} 👁
          </button>

          <button
            className="qbtn qbtn--wrong"
            onClick={() => onFinish("teamOne")}
          >
            {teamOne}
          </button>

          <button
            className="qbtn qbtn--right"
            onClick={() => onFinish("teamTwo")}
          >
            {teamTwo}
          </button>

          <button
            className="qbtn qbtn--skip"
            onClick={() => onFinish(null)}
          >
            لا أحد
          </button>

        </div>

        <button
          className="modal__back"
          onClick={onClose}
        >
          الرجوع إلى اللوحة
        </button>

      </div>
    </div>
  );
}

export default QuestionModal;