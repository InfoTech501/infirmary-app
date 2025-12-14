import { logout } from "@/services/api/auth/user/logout/LogoutService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useAuth = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log out",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoggingOut(true);
              await logout();
              router.replace("/(auth)/LoginScreen");
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert(
                "Error",
                "Failed to log out. Please try again." + error,
              );
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return {
    handleLogout,
    isLoggingOut,
  };
};
