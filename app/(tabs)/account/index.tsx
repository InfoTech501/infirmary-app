import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import Header from '@/components/Header';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { useConfirmation } from '@/hooks/auth/useConfirmation';
import { useAuth } from '@/hooks/auth/useAuth';
import { fetchCurrentUser } from '@/services/api/auth/user/current/CurrentUserService';
import forgetPassword from '@/services/api/auth/user/password/ForgetPasswordService';
import { showAlert } from '@/utils/alerts';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface ProfileInfo {
    fullName: string;
    username: string;
    email: string;
    lrn: string | number;
    gradeLevel: string;
    strand: string;
    section: string;
    age: number | null;
    gender: string | null;
    contactNumber: string | null;
    address: string | null;
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.detailRow}>
            <ThemedText type="paragraph" style={styles.detailLabel}>
                {label}
            </ThemedText>
            <ThemedText type="paragraph" style={styles.detailValue}>
                {value}
            </ThemedText>
        </View>
    );
}

interface ProfileInfo {
    fullName: string;
    username: string;
    email: string;
    lrn: string | number;
    gradeLevel: string;
    strand: string;
    section: string;
    age: number | null;
    gender: string | null;
    contactNumber: string | null;
    address: string | null;
}

export default function Account() {
    const { handleLogout, isLoggingOut } = useAuth();
    const { displayResetPasswordConfirmation } = useConfirmation();
    const [profile, setProfile] = useState<ProfileInfo | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isSendingReset, setIsSendingReset] = useState(false);
    const [userLoadError, setUserLoadError] = useState<string | null>(null);

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                setIsLoadingUser(true);

                const user = await fetchCurrentUser();
                const student = user.student;
                const person = student?.person;
                const account = student?.user;
                const section = student?.section;

                if (person && account) {
                    const fullName = [
                        person.firstName,
                        person.middleName,
                        person.lastName,
                    ]
                        .filter(Boolean)
                        .join(' ');

                    setProfile({
                        fullName,
                        username: account.username,
                        email: person.email,
                        lrn: student.lrn,
                        gradeLevel: section?.gradeLevel || '—',
                        strand: section?.strand || '—',
                        section: section?.section || '—',
                        age: person.age,
                        gender: person.gender,
                        contactNumber: person.contactNumber,
                        address: person.address,
                    });
                } else {
                    setProfile(null);
                }

                setUserLoadError(null);
            } catch (error: any) {
                setUserLoadError(
                    `Failed to load account details: ${error.message || error}`
                );
            } finally {
                setIsLoadingUser(false);
            }
        };

        loadCurrentUser();
    }, []);

    const handleResetPassword = async () => {
        if (!profile?.username) {
            showAlert('Unable to send reset link', 'Username does not exist.');
            return;
        }

        try {
            setIsSendingReset(true);
            const result = await forgetPassword(profile.username);

            if (result.message?.includes('TO MANY REQUEST')) {
                showAlert('Too Many Attempts', 'Please try again later.');
                return;
            }

            if (result.success) {
                showAlert(
                    'Check your email',
                    result.message ||
                        'Check your email for the password reset link.'
                );
                return;
            }

            showAlert(
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
            showAlert('Unable to send reset link', userLoadError);
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
                    <ThemedText type="title">
                        {isLoadingUser
                            ? 'Loading...'
                            : profile?.fullName || 'Unknown User'}
                    </ThemedText>
                    <ThemedText type="paragraph">
                        {isLoadingUser ? '' : profile?.username || '—'}
                    </ThemedText>
                    <ThemedText type="paragraph">
                        {isLoadingUser ? '' : profile?.email || '—'}
                    </ThemedText>

                    {!isLoadingUser && profile && (
                        <View style={styles.detailsList}>
                            <DetailRow
                                label="LRN"
                                value={String(profile.lrn)}
                            />
                            <DetailRow
                                label="Grade & Section"
                                value={`${profile.gradeLevel} - ${profile.strand} (${profile.section})`}
                            />
                            <DetailRow
                                label="Age"
                                value={
                                    profile.age != null
                                        ? String(profile.age)
                                        : 'Not provided'
                                }
                            />
                            <DetailRow
                                label="Gender"
                                value={profile.gender || 'Not provided'}
                            />
                            <DetailRow
                                label="Contact Number"
                                value={profile.contactNumber || 'Not provided'}
                            />
                            <DetailRow
                                label="Address"
                                value={profile.address || 'Not provided'}
                            />
                        </View>
                    )}
                </Card>

                <View style={styles.bottomSection}>
                    <ThemedText type="default">ACCOUNT SETTINGS</ThemedText>
                    <Button
                        title="RESET PASSWORD"
                        onPress={confirmResetPassword}
                        loading={isSendingReset}
                        disabled={
                            isLoadingUser ||
                            isSendingReset ||
                            !profile?.username
                        }
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
    detailsList: {
        marginTop: 12,
        gap: 6,
        width: '100%',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailLabel: {
        opacity: 0.6,
    },
    detailValue: {
        textAlign: 'right',
        flexShrink: 1,
        marginLeft: 12,
    },
});
