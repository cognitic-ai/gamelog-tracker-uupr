import { Redirect } from "expo-router";
import { useUserContext } from "@/contexts/user-context";
import { View, ActivityIndicator } from "react-native";
import * as AC from "@bacons/apple-colors";

export default function Index() {
  const { currentUser, loading } = useUserContext();

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

  if (!currentUser) {
    return <Redirect href="/users" />;
  }

  return <Redirect href="/(library)" />;
}
