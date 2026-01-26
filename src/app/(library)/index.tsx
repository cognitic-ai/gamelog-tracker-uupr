import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { GameCard } from "@/components/game-card";
import { useGamesContext } from "@/contexts/games-context";

export default function LibraryRoute() {
  const router = useRouter();
  const { playedGames, moveToBacklog, deleteGame } = useGamesContext();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
        backgroundColor: AC.systemGroupedBackground,
      }}
    >
      <View style={{ padding: 16 }}>
        {playedGames.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 60,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: AC.secondaryLabel,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              No games in your library yet
            </Text>
            <Pressable
              onPress={() => router.push("/(library)/add-game")}
              style={({ pressed }) => ({
                backgroundColor: AC.systemBlue,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 12,
                borderCurve: "continuous",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                Add Your First Game
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: AC.secondaryLabel,
                  fontVariant: "tabular-nums",
                }}
                selectable
              >
                {playedGames.length} {playedGames.length === 1 ? "game" : "games"} played
              </Text>
              <Pressable
                onPress={() => router.push("/(library)/add-game")}
                style={({ pressed }) => ({
                  backgroundColor: AC.systemBlue,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                  borderCurve: "continuous",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  Add Game
                </Text>
              </Pressable>
            </View>
            {playedGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onMoveToBacklog={() => moveToBacklog(game.id)}
                onDelete={() => deleteGame(game.id)}
              />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}
