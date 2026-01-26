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
}
