import { LOGIN_ENDPOINT } from "../../constants/api";

export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: data.message || "Invalid credentials" };
    }
  } catch (error) {
    return { success: false, message: "Network error. Please try again." };
  }
}
