import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";
import { useGamesContext } from "@/contexts/games-context";
import { GameStatus, RAWGGame } from "@/types/game";
import { useGameSearch } from "@/hooks/use-game-search";

export default function AddGameRoute() {
  const router = useRouter();
  const { addGame } = useGamesContext();
  const { results, loading, error, searchGames, clearResults } = useGameSearch();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState<RAWGGame | null>(null);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState<GameStatus>("backlog");
  const [rating, setRating] = useState<number>(0);
  const [notes, setNotes] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() && !selectedGame) {
        searchGames(searchQuery);
        setShowResults(true);
      } else if (!searchQuery.trim()) {
        clearResults();
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedGame, searchGames, clearResults]);

  const handleSelectGame = (game: RAWGGame) => {
    setSelectedGame(game);
    setTitle(game.name);
    setSearchQuery(game.name);
    setPlatform(game.platforms?.[0]?.platform?.name || "");
    setShowResults(false);
  };

  const handleClearSelection = () => {
    setSelectedGame(null);
    setTitle("");
    setSearchQuery("");
    setPlatform("");
  };

  const handleSave = () => {
    if (!title.trim()) return;

    addGame({
      title: title.trim(),
      platform: platform.trim() || undefined,
      status,
      rating: status === "played" && rating > 0 ? rating : undefined,
      notes: notes.trim() || undefined,
      dateCompleted: status === "played" ? Date.now() : undefined,
      coverImage: selectedGame?.background_image,
      rawgId: selectedGame?.id,
    });

    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          flex: 1,
          backgroundColor: AC.systemGroupedBackground,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ padding: 16, gap: 20 }}>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: AC.label,
                marginBottom: 8,
              }}
            >
              Search Game
            </Text>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search for a game..."
              placeholderTextColor={AC.placeholderText}
              editable={!selectedGame}
              style={{
                backgroundColor: AC.secondarySystemGroupedBackground,
                borderRadius: 12,
                borderCurve: "continuous",
                padding: 16,
                fontSize: 17,
                color: AC.label,
                opacity: selectedGame ? 0.6 : 1,
              }}
            />
            {selectedGame && (
              <Pressable
                onPress={handleClearSelection}
                style={({ pressed }) => ({
                  position: "absolute",
                  right: 12,
                  top: 40,
                  padding: 8,
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Text style={{ fontSize: 20, color: AC.systemBlue }}>✕</Text>
              </Pressable>
            )}
          </View>

          {loading && (
            <View style={{ alignItems: "center", padding: 20 }}>
              <ActivityIndicator size="large" color={AC.systemBlue} />
            </View>
          )}

          {error && (
            <View
              style={{
                backgroundColor: AC.systemOrange,
                borderRadius: 12,
                borderCurve: "continuous",
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  textAlign: "center",
                  marginBottom: 4,
                  fontWeight: "600",
                }}
              >
                {error === "API key not configured" || error === "Invalid API key"
                  ? "API Key Required"
                  : "Search unavailable"}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "white",
                  textAlign: "center",
                }}
              >
                {error === "API key not configured" || error === "Invalid API key"
                  ? "Get a free API key from rawg.io/apidocs and add it to src/hooks/use-game-search.ts to enable game search."
                  : "The game database is temporarily unavailable. Please enter game details manually below."}
              </Text>
            </View>
          )}

          {!loading && !error && searchQuery.trim() && results.length === 0 && !selectedGame && (
            <View
              style={{
                backgroundColor: AC.secondarySystemGroupedBackground,
                borderRadius: 12,
                borderCurve: "continuous",
                padding: 16,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: AC.secondaryLabel,
                  textAlign: "center",
                }}
              >
                No games found. Try a different search or enter details manually below.
              </Text>
            </View>
          )}

          {showResults && results.length > 0 && (
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: AC.secondaryLabel,
                  textTransform: "uppercase",
                }}
              >
                Search Results
              </Text>
              {results.map((game) => (
                <Pressable
                  key={game.id}
                  onPress={() => handleSelectGame(game)}
                  style={({ pressed }) => ({
                    backgroundColor: AC.secondarySystemGroupedBackground,
                    borderRadius: 12,
                    borderCurve: "continuous",
                    padding: 12,
                    flexDirection: "row",
                    gap: 12,
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  {game.background_image && (
                    <View
                      style={{
                        borderRadius: 8,
                        borderCurve: "continuous",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={{ uri: game.background_image }}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                        contentFit="cover"
                      />
                    </View>
                  )}
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "600",
                        color: AC.label,
                        marginBottom: 4,
                      }}
                      numberOfLines={1}
                    >
                      {game.name}
                    </Text>
                    <Text
                      style={{ fontSize: 13, color: AC.secondaryLabel }}
                      numberOfLines={1}
                    >
                      {game.platforms
                        ?.slice(0, 2)
                        .map((p) => p.platform.name)
                        .join(", ")}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}

          {selectedGame && (
            <View
              style={{
                backgroundColor: AC.secondarySystemGroupedBackground,
                borderRadius: 12,
                borderCurve: "continuous",
                padding: 16,
                gap: 12,
              }}
            >
              {selectedGame.background_image && (
                <View
                  style={{
                    borderRadius: 8,
                    borderCurve: "continuous",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{ uri: selectedGame.background_image }}
                    style={{
                      width: "100%",
                      height: 200,
                    }}
                    contentFit="cover"
                  />
                </View>
              )}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: AC.label,
                }}
              >
                {selectedGame.name}
              </Text>
            </View>
          )}

          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: AC.label,
                marginBottom: 8,
              }}
            >
              Game Title
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter game title"
              placeholderTextColor={AC.placeholderText}
              style={{
                backgroundColor: AC.secondarySystemGroupedBackground,
                borderRadius: 12,
                borderCurve: "continuous",
                padding: 16,
                fontSize: 17,
                color: AC.label,
              }}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: AC.label,
                marginBottom: 8,
              }}
            >
              Platform
            </Text>
            <TextInput
              value={platform}
              onChangeText={setPlatform}
              placeholder="e.g. PlayStation 5, PC, Nintendo Switch"
              placeholderTextColor={AC.placeholderText}
              style={{
                backgroundColor: AC.secondarySystemGroupedBackground,
                borderRadius: 12,
                borderCurve: "continuous",
                padding: 16,
                fontSize: 17,
                color: AC.label,
              }}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: AC.label,
                marginBottom: 8,
              }}
            >
              Status
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={() => setStatus("played")}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor:
                    status === "played"
                      ? AC.systemGreen
                      : AC.secondarySystemGroupedBackground,
                  padding: 16,
                  borderRadius: 12,
                  borderCurve: "continuous",
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    color: status === "played" ? "white" : AC.label,
                  }}
                >
                  Played
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setStatus("backlog");
                  setRating(0);
                }}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor:
                    status === "backlog"
                      ? AC.systemOrange
                      : AC.secondarySystemGroupedBackground,
                  padding: 16,
                  borderRadius: 12,
                  borderCurve: "continuous",
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    color: status === "backlog" ? "white" : AC.label,
                  }}
                >
                  Backlog
                </Text>
              </Pressable>
            </View>
          </View>

          {status === "played" && (
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: AC.label,
                  marginBottom: 8,
                }}
              >
                Rating
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Pressable
                    key={star}
                    onPress={() => setRating(star)}
                    style={({ pressed }) => ({
                      flex: 1,
                      backgroundColor: AC.secondarySystemGroupedBackground,
                      padding: 12,
                      borderRadius: 12,
                      borderCurve: "continuous",
                      alignItems: "center",
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <Text style={{ fontSize: 24 }}>
                      {star <= rating ? "★" : "☆"}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: AC.label,
                marginBottom: 8,
              }}
            >
              Notes
            </Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Add notes about the game"
              placeholderTextColor={AC.placeholderText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={{
                backgroundColor: AC.secondarySystemGroupedBackground,
                borderRadius: 12,
                borderCurve: "continuous",
                padding: 16,
                fontSize: 17,
                color: AC.label,
                minHeight: 100,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: AC.secondarySystemGroupedBackground,
                padding: 16,
                borderRadius: 12,
                borderCurve: "continuous",
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: AC.label,
                }}
              >
                Cancel
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              disabled={!title.trim()}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: title.trim()
                  ? AC.systemBlue
                  : AC.tertiarySystemGroupedBackground,
                padding: 16,
                borderRadius: 12,
                borderCurve: "continuous",
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: title.trim() ? "white" : AC.tertiaryLabel,
                }}
              >
                Save Game
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
