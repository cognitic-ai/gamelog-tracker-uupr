import { useState, useCallback } from "react";
import { Game, GameStatus } from "@/types/game";

const SAMPLE_GAMES: Game[] = [
  {
    id: "1",
    title: "The Legend of Zelda: Breath of the Wild",
    platform: "Nintendo Switch",
    status: "played",
    rating: 5,
    dateAdded: Date.now() - 30 * 24 * 60 * 60 * 1000,
    dateCompleted: Date.now() - 15 * 24 * 60 * 60 * 1000,
  },
  {
    id: "2",
    title: "Elden Ring",
    platform: "PlayStation 5",
    status: "backlog",
    dateAdded: Date.now() - 10 * 24 * 60 * 60 * 1000,
  },
  {
    id: "3",
    title: "Hollow Knight",
    platform: "PC",
    status: "played",
    rating: 5,
    dateAdded: Date.now() - 60 * 24 * 60 * 60 * 1000,
    dateCompleted: Date.now() - 45 * 24 * 60 * 60 * 1000,
  },
  {
    id: "4",
    title: "Cyberpunk 2077",
    platform: "PC",
    status: "backlog",
    dateAdded: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
];

export function useGames() {
  const [games, setGames] = useState<Game[]>(SAMPLE_GAMES);

  const addGame = useCallback((game: Omit<Game, "id" | "dateAdded">) => {
    const newGame: Game = {
      ...game,
      id: Date.now().toString(),
      dateAdded: Date.now(),
    };
    setGames((prev) => [newGame, ...prev]);
  }, []);

  const updateGame = useCallback((id: string, updates: Partial<Game>) => {
    setGames((prev) =>
      prev.map((game) => (game.id === id ? { ...game, ...updates } : game))
    );
  }, []);

  const deleteGame = useCallback((id: string) => {
    setGames((prev) => prev.filter((game) => game.id !== id));
  }, []);

  const moveToBacklog = useCallback((id: string) => {
    setGames((prev) =>
      prev.map((game) =>
        game.id === id
          ? { ...game, status: "backlog" as GameStatus, dateCompleted: undefined, rating: undefined }
          : game
      )
    );
  }, []);

  const moveToPlayed = useCallback((id: string) => {
    setGames((prev) =>
      prev.map((game) =>
        game.id === id
          ? { ...game, status: "played" as GameStatus, dateCompleted: Date.now() }
          : game
      )
    );
  }, []);

  const playedGames = games.filter((game) => game.status === "played");
  const backlogGames = games.filter((game) => game.status === "backlog");

  return {
    games,
    playedGames,
    backlogGames,
    addGame,
    updateGame,
    deleteGame,
    moveToBacklog,
    moveToPlayed,
  };
}
