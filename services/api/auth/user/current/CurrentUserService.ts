import { authFetch } from '@/services/api/utilities/AuthenticatedUserUtility';
import { GET_CURRENT_USER_ENDPOINT } from '@/constants/api';
import { Authenticated } from '@/types/user/AuthenticatedInterface';

export async function fetchCurrentUser(): Promise<Authenticated> {
    const url = GET_CURRENT_USER_ENDPOINT;

    try {
        const response = await authFetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to retrieve the current user: ${response.status}`
            );
        }
        const data: Authenticated = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
}
