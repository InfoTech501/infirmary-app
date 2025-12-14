import AsyncStorage from "@react-native-async-storage/async-storage";

export async function logout(): Promise<void> {
  try {
    await AsyncStorage.removeItem("authToken");
    console.log("Logout successful");
  } catch (error) {
    console.error("Error during logout:", error);
  }
}
