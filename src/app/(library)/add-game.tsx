import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { useGamesContext } from "@/contexts/games-context";
import { GameStatus } from "@/types/game";

export default function AddGameRoute() {
  const router = useRouter();
  const { addGame } = useGamesContext();

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState<GameStatus>("played");
  const [rating, setRating] = useState<number>(0);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;

    addGame({
      title: title.trim(),
      platform: platform.trim() || undefined,
      status,
      rating: status === "played" && rating > 0 ? rating : undefined,
      notes: notes.trim() || undefined,
      dateCompleted: status === "played" ? Date.now() : undefined,
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
                backgroundColor: title.trim() ? AC.systemBlue : AC.tertiarySystemGroupedBackground,
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
