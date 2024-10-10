import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameSelected, setGameSelected] = useState("");
  return (
    <GameContext.Provider value={{ gameSelected, setGameSelected }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
