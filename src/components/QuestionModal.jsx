import { useEffect, useState } from "react";

function QuestionModal({
  question,
  categoryName,
  teamOne,
  teamTwo,
  onFinish,
  currentTurn,

  // المساعدة الأولى
  onUseDoubleNext,
  doubleNextActive,
  doubleNextUsed,

  // المساعدة الثانية
  onUseTwoAnswers,
  twoAnswersActive,
  twoAnswersUsed,

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

  const minutes = String(
    Math.floor(time / 60)
  ).padStart(2, "0");

  const seconds = String(
    time % 60
  ).padStart(2, "0");

  function toggleTimer() {
    if (time === 0) return;

    setTimerRunning((prev) => !prev);
  }

  function resetTimer() {
    setTimerRunning(false);
    setTime(60);
  }
 

  return (
    <div className="modal">

      {/* DARK OVERLAY */}
      <div
        className="modal__overlay"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="modal__box">

        {/* =========================
            TOP
        ========================= */}

        <div className="modal__top">

          {/* POINTS */}

          <div className="modal__points">
            {question.points}
          </div>


          {/* TIMER */}

          <div
            className={`timer ${
              time === 0
                ? "is-done"
                : ""
            }`}
          >

            <div className="timer__display">

              <span className="timer__icon">
                ◷
              </span>

              {minutes}:{seconds}

            </div>


            <div className="timer__controls">

              {/* RESET */}

              <button
                type="button"
                className="timer-btn timer-btn--icon"
                onClick={resetTimer}
              >
                ↻
              </button>


              {/* START / PAUSE / RESUME */}

              <button
                type="button"
                className={`timer-btn timer-btn--start ${
                  timerRunning
                    ? "is-running"
                    : time < 60
                    ? "is-paused"
                    : ""
                }`}
                onClick={toggleTimer}
              >

                {timerRunning
                  ? "إيقاف المؤقت"
                  : time < 60
                  ? "استئناف"
                  : "ابدأ المؤقت"}

                <span className="timer-btn__icon">
                  {timerRunning
                    ? "❚❚"
                    : "▶"}
                </span>

              </button>

            </div>

          </div>


          {/* CATEGORY */}

          <div className="modal__category">
            {categoryName}
          </div>

        </div>


        {/* =========================
            TURN
        ========================= */}

        <div className="modal__turn">
  دور{" "}
  <span>
    {currentTurn === "teamOne"
      ? teamOne
      : teamTwo}
  </span>
</div>


        {/* =========================
            HELPERS
        ========================= */}

        <div className="modal-helpers">
<button
  type="button"
  className={`helper-btn ${
    doubleNextActive
      ? "is-active"
      : doubleNextUsed
      ? "is-used"
      : ""
  }`}
  disabled={
    doubleNextActive ||
    doubleNextUsed
  }
  onClick={onUseDoubleNext}
>
   <span className="helper-text"> مضاعفة
النقاط
القادمة✨
   
   </span>
 
</button>

          <button
  type="button"
  className={`helper-btn ${
    twoAnswersActive || twoAnswersUsed
      ? "is-used"
      : ""
  }`}
  disabled={
    twoAnswersActive ||
    twoAnswersUsed
  }
  onClick={onUseTwoAnswers}
>
  <span className="helper-icon">
    ✌️
  </span>

  <span className="helper-text">
    إجابتين
    
    بدل إجابة
  </span>
</button>

          <button
            type="button"
            className="helper-btn"
          >
            ⚽
          </button>

        </div>


        {/* =========================
            QUESTION
        ========================= */}

        {/* =========================
    QUESTION MEDIA
========================= */}

{question.type === "image" && question.mediaUrl && (
  <div className="modal__media modal__media--image">
    <img
      src={question.mediaUrl}
      alt="صورة السؤال"
    />
  </div>
)}

{question.type === "audio" && question.mediaUrl && (
  <div className="modal__media modal__media--audio">
    <audio
      controls
      src={question.mediaUrl}
    >
      متصفحك لا يدعم تشغيل الصوت.
    </audio>
  </div>
)}

{question.type === "video" && question.mediaUrl && (
  <div className="modal__media modal__media--video">
    <video
      controls
      src={question.mediaUrl}
    >
      متصفحك لا يدعم تشغيل الفيديو.
    </video>
  </div>
)}


{/* =========================
    QUESTION TEXT
========================= */}

{question.question && (
  <div className="modal__question">
    {question.question}
  </div>
)}


        {/* =========================
            ANSWER
        ========================= */}

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


        {/* =========================
            ACTIONS
        ========================= */}
       


        <div className="modal__actions">

          {/* REVEAL */}

          <button
            type="button"
            className="qbtn qbtn--reveal"
            onClick={() =>
              setShowAnswer(
                (prev) => !prev
              )
            }
          >
            {showAnswer
              ? "إخفاء الإجابة"
              : "اكشف الإجابة"}

            <span className="qbtn__icon">
              👁
            </span>
          </button>


          {/* TEAM ONE */}

          <button
            type="button"
            className="qbtn qbtn--wrong"
          onClick={() =>
  onFinish("teamOne")
}
          >
            {teamOne}
          </button>


          {/* TEAM TWO */}

          <button
            type="button"
            className="qbtn qbtn--right"
            onClick={() =>
  onFinish("teamTwo")
}
          >
            {teamTwo}
          </button>


          {/* NO ONE */}

          <button
            type="button"
            className="qbtn qbtn--skip"
            onClick={() =>
              onFinish(null)
            }
          >
            لا أحد
          </button>

        </div>


        {/* BACK */}

        <button
          type="button"
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