import AsyncStorage from "@react-native-async-storage/async-storage";
import { Game } from "@/types/game";
import { User } from "@/types/user";

const STORAGE_KEYS = {
  USERS: "@game_tracker:users",
  CURRENT_USER: "@game_tracker:current_user",
  GAMES_PREFIX: "@game_tracker:games:",
};

// User Management
export const getUsers = async (): Promise<User[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
};

export const saveUsers = async (users: User[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Error loading current user:", error);
    return null;
  }
};

export const setCurrentUser = async (user: User | null): Promise<void> => {
  try {
    if (user) {
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  } catch (error) {
    console.error("Error setting current user:", error);
  }
};

export const createUser = async (name: string): Promise<User> => {
  const users = await getUsers();
  const newUser: User = {
    id: Date.now().toString(),
    name,
    createdAt: Date.now(),
  };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
};

export const deleteUser = async (userId: string): Promise<void> => {
  const users = await getUsers();
  const filteredUsers = users.filter((u) => u.id !== userId);
  await saveUsers(filteredUsers);

  // Delete user's games
  await AsyncStorage.removeItem(`${STORAGE_KEYS.GAMES_PREFIX}${userId}`);

  // Clear current user if it's the deleted user
  const currentUser = await getCurrentUser();
  if (currentUser?.id === userId) {
    await setCurrentUser(null);
  }
};

// Game Management
export const getGames = async (userId: string): Promise<Game[]> => {
  try {
    const json = await AsyncStorage.getItem(`${STORAGE_KEYS.GAMES_PREFIX}${userId}`);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error("Error loading games:", error);
    return [];
  }
};

export const saveGames = async (userId: string, games: Game[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      `${STORAGE_KEYS.GAMES_PREFIX}${userId}`,
      JSON.stringify(games)
    );
  } catch (error) {
    console.error("Error saving games:", error);
  }
};
