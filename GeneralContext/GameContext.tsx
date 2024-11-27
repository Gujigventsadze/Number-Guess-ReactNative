import React, { createContext, useState, ReactNode } from "react";

interface GameHistory {
  attempts: number;
  correctNum: number;
}

interface GameContextType {
  gameHistory: GameHistory[];
  addGameHistory: (attempts: number, correctNum: number) => void;
}

const defaultValue: GameContextType = {
  gameHistory: [],
  addGameHistory: () => {
    throw new Error(
      "addGameHistory function must be used within a GameProvider"
    );
  },
};

export const GameContext = createContext<GameContextType>(defaultValue);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);

  const addGameHistory = (attempts: number, correctNum: number) => {
    setGameHistory((prevHistory) => [...prevHistory, { attempts, correctNum }]);
  };

  return (
    <GameContext.Provider value={{ gameHistory, addGameHistory }}>
      {children}
    </GameContext.Provider>
  );
};
