export type GameStatus = "backlog" | "played";

export interface Game {
  id: string;
  title: string;
  platform?: string;
  status: GameStatus;
  rating?: number;
  notes?: string;
  dateAdded: number;
  dateCompleted?: number;
  coverImage?: string;
  rawgId?: number;
}

export interface RAWGGame {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
  platforms: Array<{ platform: { name: string } }>;
  genres: Array<{ name: string }>;
}
