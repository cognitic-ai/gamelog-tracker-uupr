import { useState, useEffect } from "react";

const RAWG_API_KEY = "b19e11c0190048c5866734bb19fbcfaa";
const RAWG_BASE_URL = "https://api.rawg.io/api";

export interface RAWGGameDetails {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  background_image_additional: string;
  released: string;
  rating: number;
  ratings_count: number;
  metacritic: number | null;
  playtime: number;
  platforms: Array<{ platform: { name: string } }>;
  genres: Array<{ name: string }>;
  developers: Array<{ name: string }>;
  publishers: Array<{ name: string }>;
  esrb_rating: { name: string } | null;
  website: string;
}

export function useGameDetails(rawgId?: number) {
  const [details, setDetails] = useState<RAWGGameDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rawgId) {
      setDetails(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${RAWG_BASE_URL}/games/${rawgId}?key=${RAWG_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch game details");
        }

        const data = await response.json();
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [rawgId]);

  return { details, loading, error };
}
