import { ScrollView, Text, View, Pressable, ActivityIndicator, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";
import { useGamesContext } from "@/contexts/games-context";
import { useGameDetails } from "@/hooks/use-game-details";

export default function GameDetailsRoute() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { games, deleteGame, moveToBacklog, moveToPlayed } = useGamesContext();

  const game = games.find((g) => g.id === id);
  const { details, loading } = useGameDetails(game?.rawgId);

  if (!game) {
    return (
      <View style={{ flex: 1, backgroundColor: AC.systemGroupedBackground, alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Text style={{ fontSize: 17, color: AC.secondaryLabel, textAlign: "center" }}>
          Game not found
        </Text>
      </View>
    );
  }

  const handleDelete = () => {
    deleteGame(game.id);
    router.back();
  };

  const handleToggleStatus = () => {
    if (game.status === "played") {
      moveToBacklog(game.id);
    } else {
      moveToPlayed(game.id);
    }
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
        backgroundColor: AC.systemGroupedBackground,
      }}
    >
      {game.coverImage && (
        <Image
          source={{ uri: game.coverImage }}
          style={{
            width: "100%",
            height: 300,
          }}
          contentFit="cover"
        />
      )}

      <View style={{ padding: 16, gap: 20 }}>
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: AC.label,
              marginBottom: 8,
            }}
            selectable
          >
            {game.title}
          </Text>

          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <View
              style={{
                backgroundColor: game.status === "played" ? AC.systemGreen : AC.systemOrange,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
                borderCurve: "continuous",
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "600", color: "white" }}>
                {game.status === "played" ? "Played" : "Backlog"}
              </Text>
            </View>

            {game.platform && (
              <View
                style={{
                  backgroundColor: AC.secondarySystemGroupedBackground,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 12,
                  borderCurve: "continuous",
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: "600", color: AC.label }}>
                  {game.platform}
                </Text>
              </View>
            )}
          </View>

          {game.status === "played" && game.rating && (
            <Text
              style={{
                fontSize: 24,
                color: AC.secondaryLabel,
                marginBottom: 8,
              }}
              selectable
            >
              {"★".repeat(game.rating)}{"☆".repeat(5 - game.rating)}
            </Text>
          )}
        </View>

        {game.notes && (
          <View
            style={{
              backgroundColor: AC.secondarySystemGroupedBackground,
              borderRadius: 12,
              borderCurve: "continuous",
              padding: 16,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: AC.label,
                marginBottom: 8,
              }}
            >
              My Notes
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: AC.label,
                lineHeight: 22,
              }}
              selectable
            >
              {game.notes}
            </Text>
          </View>
        )}

        {loading && (
          <View style={{ alignItems: "center", padding: 20 }}>
            <ActivityIndicator size="large" color={AC.systemBlue} />
          </View>
        )}

        {details && (
          <>
            {details.description_raw && (
              <View
                style={{
                  backgroundColor: AC.secondarySystemGroupedBackground,
                  borderRadius: 12,
                  borderCurve: "continuous",
                  padding: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: AC.label,
                    marginBottom: 8,
                  }}
                >
                  About
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: AC.label,
                    lineHeight: 22,
                  }}
                  selectable
                >
                  {details.description_raw}
                </Text>
              </View>
            )}

            <View
              style={{
                backgroundColor: AC.secondarySystemGroupedBackground,
                borderRadius: 12,
                borderCurve: "continuous",
                padding: 16,
                gap: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: AC.label,
                }}
              >
                Game Info
              </Text>

              {details.released && (
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>Released</Text>
                  <Text style={{ fontSize: 15, color: AC.label }} selectable>
                    {new Date(details.released).toLocaleDateString()}
                  </Text>
                </View>
              )}

              {details.developers && details.developers.length > 0 && (
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>Developer</Text>
                  <Text style={{ fontSize: 15, color: AC.label, textAlign: "right", flex: 1, marginLeft: 16 }} selectable>
                    {details.developers.map((d) => d.name).join(", ")}
                  </Text>
                </View>
              )}

              {details.publishers && details.publishers.length > 0 && (
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>Publisher</Text>
                  <Text style={{ fontSize: 15, color: AC.label, textAlign: "right", flex: 1, marginLeft: 16 }} selectable>
                    {details.publishers.map((p) => p.name).join(", ")}
                  </Text>
                </View>
              )}

              {details.genres && details.genres.length > 0 && (
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>Genres</Text>
                  <Text style={{ fontSize: 15, color: AC.label, textAlign: "right", flex: 1, marginLeft: 16 }} selectable>
                    {details.genres.map((g) => g.name).join(", ")}
                  </Text>
                </View>
              )}

              {details.metacritic && (
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>Metacritic</Text>
                  <Text style={{ fontSize: 15, color: AC.label, fontWeight: "600" }} selectable>
                    {details.metacritic}
                  </Text>
                </View>
              )}

              {details.rating > 0 && (
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>RAWG Rating</Text>
                  <Text style={{ fontSize: 15, color: AC.label, fontWeight: "600" }} selectable>
                    {details.rating.toFixed(1)} / 5
                  </Text>
                </View>
              )}

              {details.esrb_rating && (
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>ESRB Rating</Text>
                  <Text style={{ fontSize: 15, color: AC.label }} selectable>
                    {details.esrb_rating.name}
                  </Text>
                </View>
              )}
            </View>

            {details.website && (
              <Pressable
                onPress={() => Linking.openURL(details.website)}
                style={({ pressed }) => ({
                  backgroundColor: AC.systemBlue,
                  padding: 16,
                  borderRadius: 12,
                  borderCurve: "continuous",
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                  Visit Website
                </Text>
              </Pressable>
            )}
          </>
        )}

        <View style={{ gap: 12 }}>
          <Pressable
            onPress={handleToggleStatus}
            style={({ pressed }) => ({
              backgroundColor: AC.systemBlue,
              padding: 16,
              borderRadius: 12,
              borderCurve: "continuous",
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {game.status === "played" ? "Move to Backlog" : "Mark as Played"}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => ({
              backgroundColor: AC.systemRed,
              padding: 16,
              borderRadius: 12,
              borderCurve: "continuous",
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Delete Game
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
