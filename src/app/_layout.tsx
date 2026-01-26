import { ThemeProvider } from "@/components/theme-provider";
import { GamesProvider } from "@/contexts/games-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  const { width } = useWindowDimensions();

  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <ThemeProvider>
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
            <Label>Library</Label>
            <Icon
              {...Platform.select({
                ios: { sf: { default: "books.vertical", selected: "books.vertical.fill" } },
                default: {
                  src: <VectorIcon family={MaterialIcons} name="library-books" />,
                },
              })}
            />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(backlog)">
            <Label>Backlog</Label>
            <Icon
              {...Platform.select({
                ios: { sf: { default: "clock", selected: "clock.fill" } },
                default: {
                  src: <VectorIcon family={MaterialIcons} name="queue" />,
                },
              })}
            />
          </NativeTabs.Trigger>
        </NativeTabs>
      )}
      </GamesProvider>
    </ThemeProvider>
  );
}
