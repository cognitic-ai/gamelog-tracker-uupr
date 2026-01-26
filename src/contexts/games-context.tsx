import { createContext, useContext } from "react";
import { useGames } from "@/hooks/use-games";
import { Game } from "@/types/game";

type GamesContextType = {
  games: Game[];
  playedGames: Game[];
  backlogGames: Game[];
  addGame: (game: Omit<Game, "id" | "dateAdded">) => void;
  updateGame: (id: string, updates: Partial<Game>) => void;
  deleteGame: (id: string) => void;
  moveToBacklog: (id: string) => void;
  moveToPlayed: (id: string) => void;
};

const GamesContext = createContext<GamesContextType | null>(null);

export function GamesProvider({ children }: { children: React.ReactNode }) {
  const gamesData = useGames();

  return (
    <GamesContext.Provider value={gamesData}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGamesContext() {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGamesContext must be used within GamesProvider");
  }
  return context;
}
