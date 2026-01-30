import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/user";
import { getUsers, getCurrentUser, setCurrentUser, createUser, deleteUser } from "@/utils/storage";

type UserContextType = {
  currentUser: User | null;
  users: User[];
  loading: boolean;
  selectUser: (user: User) => Promise<void>;
  addUser: (name: string) => Promise<User>;
  removeUser: (userId: string) => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const [loadedUsers, loadedCurrentUser] = await Promise.all([
        getUsers(),
        getCurrentUser(),
      ]);
      setUsers(loadedUsers);
      setCurrentUserState(loadedCurrentUser);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectUser = async (user: User) => {
    await setCurrentUser(user);
    setCurrentUserState(user);
  };

  const addUser = async (name: string) => {
    const newUser = await createUser(name);
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const removeUser = async (userId: string) => {
    await deleteUser(userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (currentUser?.id === userId) {
      setCurrentUserState(null);
    }
  };

  const logout = async () => {
    await setCurrentUser(null);
    setCurrentUserState(null);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        loading,
        selectUser,
        addUser,
        removeUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
}
