import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { useUserContext } from "@/contexts/user-context";

export default function UsersRoute() {
  const router = useRouter();
  const { users, loading, selectUser, addUser, currentUser } = useUserContext();
  const [newUserName, setNewUserName] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);

  const handleSelectUser = async (user: any) => {
    await selectUser(user);
    router.replace("/(library)");
  };

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    const user = await addUser(newUserName.trim());
    setNewUserName("");
    setShowAddUser(false);
    await selectUser(user);
    router.replace("/(library)");
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: AC.systemGroupedBackground,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={AC.systemBlue} />
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
        backgroundColor: AC.systemGroupedBackground,
      }}
    >
      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 34,
            fontWeight: "700",
            color: AC.label,
            marginBottom: 8,
            marginTop: 8,
          }}
        >
          Select User
        </Text>

        <Text
          style={{
            fontSize: 17,
            color: AC.secondaryLabel,
            marginBottom: 24,
          }}
        >
          Choose your profile to view your game library
        </Text>

        {users.map((user) => (
          <Pressable
            key={user.id}
            onPress={() => handleSelectUser(user)}
            style={({ pressed }) => ({
              backgroundColor: AC.secondarySystemGroupedBackground,
              borderRadius: 12,
              borderCurve: "continuous",
              padding: 20,
              marginBottom: 12,
              opacity: pressed ? 0.7 : 1,
              borderWidth: currentUser?.id === user.id ? 2 : 0,
              borderColor: AC.systemBlue,
            })}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: AC.label,
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: AC.secondaryLabel,
                marginTop: 4,
              }}
            >
              Created {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </Pressable>
        ))}

        {showAddUser ? (
          <View
            style={{
              backgroundColor: AC.secondarySystemGroupedBackground,
              borderRadius: 12,
              borderCurve: "continuous",
              padding: 16,
              marginTop: 12,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: AC.label,
                marginBottom: 12,
              }}
            >
              New User
            </Text>
            <TextInput
              value={newUserName}
              onChangeText={setNewUserName}
              placeholder="Enter name"
              placeholderTextColor={AC.placeholderText}
              style={{
                backgroundColor: AC.systemGroupedBackground,
                borderRadius: 8,
                borderCurve: "continuous",
                padding: 12,
                fontSize: 17,
                color: AC.label,
                marginBottom: 12,
              }}
              autoFocus
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={() => {
                  setShowAddUser(false);
                  setNewUserName("");
                }}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: AC.systemGroupedBackground,
                  padding: 12,
                  borderRadius: 8,
                  borderCurve: "continuous",
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text style={{ fontSize: 17, fontWeight: "600", color: AC.label }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleAddUser}
                disabled={!newUserName.trim()}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: newUserName.trim()
                    ? AC.systemBlue
                    : AC.tertiarySystemGroupedBackground,
                  padding: 12,
                  borderRadius: 8,
                  borderCurve: "continuous",
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    color: newUserName.trim() ? "white" : AC.tertiaryLabel,
                  }}
                >
                  Create
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable
            onPress={() => setShowAddUser(true)}
            style={({ pressed }) => ({
              backgroundColor: AC.systemBlue,
              borderRadius: 12,
              borderCurve: "continuous",
              padding: 20,
              marginTop: 12,
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "white",
              }}
            >
              Add New User
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}
