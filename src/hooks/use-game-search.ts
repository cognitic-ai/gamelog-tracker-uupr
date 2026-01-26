import { useState, useCallback } from "react";
import { RAWGGame } from "@/types/game";

// Get your free API key from https://rawg.io/apidocs
// Free tier includes 20,000 requests per month
const RAWG_API_KEY = "YOUR_API_KEY_HERE";
const RAWG_BASE_URL = "https://api.rawg.io/api";

export function useGameSearch() {
  const [results, setResults] = useState<RAWGGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchGames = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (RAWG_API_KEY === "YOUR_API_KEY_HERE") {
      setError("API key not configured");
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(
          query
        )}&page_size=10`
      );

      if (!response.ok) {
        const data = await response.json();
        if (data.error === "The API key is not found") {
          throw new Error("Invalid API key");
        }
        throw new Error("Failed to search games");
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    searchGames,
    clearResults,
  };
}
