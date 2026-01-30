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
    coverImage: "https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg",
    rawgId: 22511,
  },
  {
    id: "2",
    title: "Elden Ring",
    platform: "PlayStation 5",
    status: "backlog",
    dateAdded: Date.now() - 10 * 24 * 60 * 60 * 1000,
    coverImage: "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e348.jpg",
    rawgId: 326243,
  },
  {
    id: "3",
    title: "Hollow Knight",
    platform: "PC",
    status: "played",
    rating: 5,
    dateAdded: Date.now() - 60 * 24 * 60 * 60 * 1000,
    dateCompleted: Date.now() - 45 * 24 * 60 * 60 * 1000,
    coverImage: "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
    rawgId: 41494,
  },
  {
    id: "4",
    title: "Cyberpunk 2077",
    platform: "PC",
    status: "backlog",
    dateAdded: Date.now() - 5 * 24 * 60 * 60 * 1000,
    coverImage: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
    rawgId: 41494,
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
