import { View, Text, Pressable } from "react-native";
import * as AC from "@bacons/apple-colors";
import { Game } from "@/types/game";

interface GameCardProps {
  game: Game;
  onPress?: () => void;
  onMoveToBacklog?: () => void;
  onMoveToPlayed?: () => void;
  onDelete?: () => void;
}

export function GameCard({
  game,
  onPress,
  onMoveToBacklog,
  onMoveToPlayed,
  onDelete,
}: GameCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: AC.secondarySystemGroupedBackground,
        borderRadius: 12,
        borderCurve: "continuous",
        padding: 16,
        marginBottom: 12,
        opacity: pressed ? 0.7 : 1,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      })}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: AC.label,
              marginBottom: 4,
            }}
            selectable
          >
            {game.title}
          </Text>
          {game.platform && (
            <Text
              style={{
                fontSize: 15,
                color: AC.secondaryLabel,
                marginBottom: 4,
              }}
              selectable
            >
              {game.platform}
            </Text>
          )}
          {game.status === "played" && game.rating && (
            <Text
              style={{
                fontSize: 15,
                color: AC.secondaryLabel,
              }}
              selectable
            >
              {"★".repeat(game.rating)}{"☆".repeat(5 - game.rating)}
            </Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: game.status === "played" ? AC.systemGreen : AC.systemOrange,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
            borderCurve: "continuous",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: "white",
            }}
          >
            {game.status === "played" ? "Played" : "Backlog"}
          </Text>
        </View>
      </View>
      {game.notes && (
        <Text
          style={{
            fontSize: 15,
            color: AC.tertiaryLabel,
            marginTop: 8,
          }}
          numberOfLines={2}
          selectable
        >
          {game.notes}
        </Text>
      )}
    </Pressable>
  );
}
