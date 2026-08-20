import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GameContext } from "../context/GameContext";
import { useAuth } from "../context/AuthContext";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import logo from "../assets/images/logo-1-06.png";

import "../styles/WinnerPage.css";
import winnerMusic from "../assets/audio/winner.mp3";
import winnerTrophy from "../assets/images/winner-trophy.png";


function WinnerPage() {

  const { gameData } = useContext(GameContext);

  const navigate = useNavigate();

  const { currentUser } = useAuth();


  /*
   * =========================
   * GAMES REMAINING
   * =========================
   */

  const [gamesRemaining, setGamesRemaining] =
    useState(0);
    const [isMusicPlaying, setIsMusicPlaying] =
  useState(false);
  const [audio] = useState(() => {
  const music = new Audio(winnerMusic);

  music.loop = true;
  music.volume = 0.5;

  return music;
});


  useEffect(() => {

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

          const userData =
            userSnap.data();

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

  }, [currentUser]);

  useEffect(() => {

  audio
    .play()
    .then(() => {
      setIsMusicPlaying(true);
    })
    .catch(() => {
      // المتصفح قد يمنع التشغيل التلقائي
      setIsMusicPlaying(false);
    });

  return () => {

    audio.pause();
    audio.currentTime = 0;

  };

}, [audio]);


  /*
   * =========================
   * GAME DATA
   * =========================
   */

  const {
    teamOne,
    teamTwo,
    scoreTeamOne,
    scoreTeamTwo,
  } = gameData;


  /*
   * =========================
   * WINNER
   * =========================
   */

  let winner = "تعادل";

  if (scoreTeamOne > scoreTeamTwo) {

    winner = teamOne;

  } else if (scoreTeamTwo > scoreTeamOne) {

    winner = teamTwo;

  }


  /*
   * =========================
   * HOME
   * =========================
   */

  function playAgain() {

    navigate("/");

  }
  function toggleMusic() {

  if (isMusicPlaying) {

    audio.pause();

    setIsMusicPlaying(false);

  } else {

    audio
      .play()
      .then(() => {
        setIsMusicPlaying(true);
      })
      .catch((error) => {
        console.error(
          "Music playback failed:",
          error
        );
      });

  }

}


  return (

    <div className="winner-page">


      {/* =====================================
          GLOBAL HUD
      ====================================== */}

      <header className="hud winner-hud">

        <div className="hud__inner">


          {/* =========================
              LEFT
          ========================= */}

          <div className="hud__group hud__group--start">


            {/* OPTIONS */}

            <button
              type="button"
              className="hud-btn hud-btn--ghost"
            >

              <span className="hud-btn__icon">
                ⚙
              </span>

              <span className="hud-btn__label">
                الخيارات
              </span>

            </button>


            {/* PREVIOUS GAMES */}

            <button
              type="button"
              className="hud-btn hud-btn--ghost"
            >

              <span className="hud-btn__icon">
                ↶
              </span>

              <span className="hud-btn__label">
                العابي السابقة
              </span>

            </button>


          </div>


          {/* =========================
              LOGO
          ========================= */}

          <div className="hud__logo">

            <img
              src={logo}
              alt="KICKOUT"
              className="kickout-logo"
            />

          </div>


          {/* =========================
              RIGHT
          ========================= */}

          <div className="hud__group hud__group--end">


            {/* GAMES REMAINING */}

            <div className="hud-stat">

              <span className="hud-stat__value">
                {gamesRemaining}
              </span>

              <span className="hud-stat__label">
                الألعاب المتبقية
              </span>

              <span className="hud-stat__icon">
                🏆
              </span>

            </div>


            {/* HOME */}

            <button
              type="button"
              className="hud-btn hud-btn--ghost"
              onClick={playAgain}
            >

              <span className="hud-btn__label">
                الصفحة الرئيسية
              </span>

              <span className="hud-btn__icon">
                ⇥
              </span>

            </button>


          </div>

        </div>

      </header>


      {/* =====================================
          CONFETTI
      ====================================== */}

      <div className="winner-confetti">

        {Array.from({ length: 60 }).map(
          (_, index) => (

            <span
              key={index}
              className={`confetti confetti--${index % 5}`}
              style={{
                "--confetti-x":
                  `${(index * 17) % 96}%`,

                "--confetti-delay":
                  `${(index % 15) * 0.25}s`,

                "--confetti-duration":
                  `${4 + (index % 6) * 0.5}s`,
              }}
            />

          )
        )}

      </div>


      {/* =====================================
          WINNER CONTENT
      ====================================== */}

      <main className="winner-content">


        {/* =========================
            CHAMPION LABEL
        ========================= */}

        <div className="winner-badge">
          بطل النزال
        </div>


        {/* =========================
            TROPHY
        ========================= */}

        <div className="winner-trophy">
  <img
    src={winnerTrophy}
    alt="كأس الفائز"
  />
</div>


        {/* =========================
            WINNER NAME
        ========================= */}

        <h1 className="winner-name">
          {winner}
        </h1>


        {/* =========================
            CHAMPION TITLE
        ========================= */}

        <div className="winner-subtitle">
          بطل حلبة كيك أوت
        </div>


        {/* =========================
            SCORES
        ========================= */}

        <div className="winner-scores">


          {/* TEAM ONE */}

          <div
            className={`winner-score-card ${
              scoreTeamOne > scoreTeamTwo
                ? "is-winner"
                : ""
            }`}
          >

            <span className="winner-team-name">
              {teamOne}
            </span>

            <strong className="winner-team-score">
              {scoreTeamOne}
            </strong>

          </div>


          {/* TEAM TWO */}

          <div
            className={`winner-score-card ${
              scoreTeamTwo > scoreTeamOne
                ? "is-winner"
                : ""
            }`}
          >

            <span className="winner-team-name">
              {teamTwo}
            </span>

            <strong className="winner-team-score">
              {scoreTeamTwo}
            </strong>

          </div>


        </div>


        {/* =========================
            ACTIONS
        ========================= */}

        <div className="winner-actions">


          {/* HOME */}

          <button
            type="button"
            className="winner-home-btn"
            onClick={playAgain}
          >
            الصفحة الرئيسية
          </button>


          {/* MUSIC */}

          <button
  type="button"
  className="winner-sound-btn"
  onClick={toggleMusic}
  aria-label={
    isMusicPlaying
      ? "كتم الموسيقى"
      : "تشغيل الموسيقى"
  }
>
  {isMusicPlaying ? "🔊" : "🔇"}
</button>


        </div>


      </main>


    </div>

  );

}


export default WinnerPage;