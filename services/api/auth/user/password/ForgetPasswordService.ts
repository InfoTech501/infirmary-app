import { FORGET_PASSWORD_ENDPOINT } from "@/constants/api";

export default async function forgetPassword(
  username: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${FORGET_PASSWORD_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    });


    const text = await response.text();


    if (!response.ok) {
      return {
        success: false,
        message: text || 'Failed to send password reset email.'
      };
    }

    return {
      success: true,
      message: text || 'Password reset email sent successfully.'
    };

  } catch (error){
    return { success: false, message:  'Network error. Please try again.' };
  }
}