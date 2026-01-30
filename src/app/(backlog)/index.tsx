import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { GameCard } from "@/components/game-card";
import { useGamesContext } from "@/contexts/games-context";
import { useUserContext } from "@/contexts/user-context";

export default function BacklogRoute() {
  const router = useRouter();
  const { backlogGames } = useGamesContext();
  const { currentUser } = useUserContext();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
        backgroundColor: AC.systemGroupedBackground,
      }}
    >
      <View style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            marginTop: 8,
          }}
        >
          <Text
            style={{
              fontSize: 34,
              fontWeight: "700",
              color: AC.label,
            }}
          >
            Backlog
          </Text>
          <Pressable
            onPress={() => router.push("/users")}
            style={({ pressed }) => ({
              backgroundColor: AC.secondarySystemGroupedBackground,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              borderCurve: "continuous",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: AC.systemBlue,
              }}
            >
              {currentUser?.name || "User"}
            </Text>
          </Pressable>
        </View>
        {backlogGames.length === 0 ? (
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
              No games in your backlog
            </Text>
            <Pressable
              onPress={() => router.push("/(backlog)/add-game")}
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
                Add a Game
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
                  fontVariant: ["tabular-nums"],
                }}
                selectable
              >
                {backlogGames.length} {backlogGames.length === 1 ? "game" : "games"} to play
              </Text>
              <Pressable
                onPress={() => router.push("/(backlog)/add-game")}
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
            {backlogGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onPress={() => router.push(`/(backlog)/${game.id}`)}
              />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}
