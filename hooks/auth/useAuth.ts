import { logout } from '@/services/api/auth/user/logout/LogoutService';
import { showAlert, confirmAction } from '@/utils/alerts';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useAuth = () => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const performLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
            router.replace('/(auth)/LoginScreen');
        } catch (error: any) {
            console.error('Logout error:', error);
            showAlert(
                'Error',
                `Failed to log out. Please try again. ${error?.message || error}`
            );
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleLogout = () => {
        confirmAction(
            'Log out',
            'Are you sure you want to log out?',
            performLogout,
            'Log out',
            true
        );
    };

    return {
        handleLogout,
        isLoggingOut,
    };
};
