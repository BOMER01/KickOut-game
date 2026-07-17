import { createContext, useState } from "react";

export const GameContext = createContext();

function GameProvider({ children }) {
  const [gameData, setGameData] = useState({
    gameName: "",
    teamOne: "",
    teamTwo: "",
    scoreTeamOne: 0,
    scoreTeamTwo: 0,
    categories: [],
    usedQuestions: [],
  });

  return (
    <GameContext.Provider
      value={{
        gameData,
        setGameData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;