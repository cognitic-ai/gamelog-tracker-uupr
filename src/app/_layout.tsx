import { ThemeProvider } from "@/components/theme-provider";
import { GamesProvider } from "@/contexts/games-context";
import { UserProvider } from "@/contexts/user-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useWindowDimensions } from "react-native";

export default function Layout() {
  const { width } = useWindowDimensions();

  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <ThemeProvider>
      <UserProvider>
        <GamesProvider>
          {process.env.EXPO_OS === "web" ? (
        <WebTabs
          screenOptions={{
            headerShown: false,
            ...(isMd
              ? {
                  tabBarPosition: "left",
                  tabBarVariant: "material",
                  tabBarLabelPosition: isLg ? undefined : "below-icon",
                }
              : {
                  tabBarPosition: "bottom",
                }),
          }}
        >
          <WebTabs.Screen
            name="(library)"
            options={{
              title: "Library",
              tabBarIcon: (props) => <MaterialIcons {...props} name="library-books" />,
            }}
          />
          <WebTabs.Screen
            name="(backlog)"
            options={{
              title: "Backlog",
              tabBarIcon: (props) => <MaterialIcons {...props} name="queue" />,
            }}
          />
        </WebTabs>
      ) : (
        <NativeTabs>
          <NativeTabs.Trigger name="(library)">
            <NativeTabs.Trigger.Label>Library</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon sf="books.vertical.fill" md="library_books" />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(backlog)">
            <NativeTabs.Trigger.Label>Backlog</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon sf="clock.fill" md="schedule" />
          </NativeTabs.Trigger>
        </NativeTabs>
      )}
        </GamesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
