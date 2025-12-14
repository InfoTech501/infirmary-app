import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_ENDPOINT } from "../../../../../constants/api";

const JWT_TOKEN_HEADER = "Jwt-Token";

export async function login(
  username: string,
  password: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const token = response.headers.get(JWT_TOKEN_HEADER);
      if (token) {
        console.log("login successful");
        await AsyncStorage.setItem("authToken", token);
        return { success: true };
      } else {
        return { success: false, message: "token is missing" };
      }
    } else {
      let errorMessage = "Invalid credentials";
      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch (e) {
        console.log("Error parsing error response", e);
      }
      console.log("login failed", response.status);
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.log("Network error", error);
    return { success: false, message: "Network error. Please try again." };
  }
}
