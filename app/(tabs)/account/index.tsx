import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import Header from '@/components/Header';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { useConfirmation } from '@/hooks/auth/useConfirmation';
import { useAuth } from '@/hooks/auth/useLogout';
import { fetchCurrentUser } from '@/services/api/auth/user/current/CurrentUserService';
import forgetPassword from '@/services/api/auth/user/password/ForgetPasswordService';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function Account() {
    const { handleLogout, isLoggingOut } = useAuth();
    const { displayResetPasswordConfirmation } = useConfirmation();
    const [username, setUsername] = useState<string | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isSendingReset, setIsSendingReset] = useState(false);
    const [userLoadError, setUserLoadError] = useState<string | null>(null);

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                setIsLoadingUser(true);

                const user = await fetchCurrentUser();
                setUsername(user.student?.user?.username || null);
                
                setUserLoadError(null);

            } catch (error: any) {
                setUserLoadError(`Failed to load account details : ' ${error.message | error}`);
            } finally {
                setIsLoadingUser(false);
            }
        };

        loadCurrentUser();

    }, []);

    const handleResetPassword = async () => {
        
        if (!username) {
            Alert.alert(
                'Unable to send reset link',
                'Username does not exist .'
            );
            return;
        }

        try {
            setIsSendingReset(true);
            const result = await forgetPassword(username);

            if(result.message?.includes("TO MANY REQUEST")) {
                Alert.alert("Too Many Attempts" , "Please try again later.")
                return;
            }

            if (result.success) {
                Alert.alert(
                    'Check your email',
                    result.message ||
                        'Check your email for the password reset link.'
                );
                return;
            }

            Alert.alert(
                'Unable to send reset link',
                 result.message || 'Failed to send password reset email.'
            );

            return;

        } finally {
            setIsSendingReset(false);
        }
    };

    const confirmResetPassword = () => {
        if (userLoadError) {
            Alert.alert('Unable to send reset link', userLoadError);
            return;
        }

        displayResetPasswordConfirmation(handleResetPassword, () => {});
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Header title="MY ACCOUNT" />

                <Card
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={44}
                            color="#265b34ff"
                        />
                    }
                >
                    <ThemedText type="title">John Peter Pan</ThemedText>
                    <ThemedText type="paragraph">username</ThemedText>
                    <ThemedText type="paragraph">
                        john.peter@example.com
                    </ThemedText>
                </Card>

                <View style={styles.bottomSection}>
                    <ThemedText type="default">ACCOUNT SETTINGS</ThemedText>
                    <Button
                        title="RESET PASSWORD"
                        onPress={confirmResetPassword}
                        loading={isSendingReset}
                        disabled={isLoadingUser || isSendingReset || !username}
                    />

                    <Button
                        title="LOG OUT"
                        onPress={handleLogout}
                        backgroundColor="transparent"
                        textColor="#000000ff"
                        borderColor="#000000"
                        borderWidth={1}
                        loading={isLoggingOut}
                        disabled={isLoggingOut}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    bottomSection: {
        gap: 10,
        paddingBottom: 20,
    },
});
