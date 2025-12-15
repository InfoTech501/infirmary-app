import { Card } from '@/components/Card';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ThemedText } from '@/components/ThemedText';
import { fetchCurrentUser } from '@/services/api/auth/user/current/CurrentUserService';
import { fetchStudentClinicVisitHistoryByLRN } from '@/services/api/student/clinic/visit/history/StudentClinicVisitHistoryService';
import { ClinicVisitHistoryInterface } from '@/types/student/clinic/visit/history/StudentClinicVisitHistoryInterface';
import { Authenticated } from '@/types/user/AuthenticatedInterface';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Homepage() {
    const [clinicVisits, setClinicVisits] = useState<
        ClinicVisitHistoryInterface[]
    >([]);
    const [currentUser, setCurrentUser] = useState<Authenticated | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                const user = await fetchCurrentUser();
                setCurrentUser(user);

                if (user.student) {
                    const visits = await fetchStudentClinicVisitHistoryByLRN(
                        user.student.lrn
                    );
                    setClinicVisits(visits);
                }
            } catch (err: any) {
                setError(`Failed to load data: ${err.message || err}`);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <ScreenWrapper>
                <ActivityIndicator
                    size="large"
                    style={{ flex: 1, justifyContent: 'center' }}
                />
            </ScreenWrapper>
        );
    }

    if (error || !currentUser?.student) {
        return (
            <ScreenWrapper>
                <ThemedText
                    type="paragraph"
                    style={{ color: 'red', textAlign: 'center' }}
                >
                    {error ||
                        'Unable to load user profile. Please log in again.'}
                </ThemedText>
            </ScreenWrapper>
        );
    }

    const student = currentUser.student;
    const person = student.person;
    const section = student.section;
    const fullName =
        `${person.firstName} ${person.middleName || ''} ${person.lastName}`.trim();
    const gradeSection = `${section.gradeLevel} - ${section.section}`;

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <ThemedText
                    type="title"
                    style={{ fontSize: 28, marginBottom: 10 }}
                >
                    Welcome to your Personal Healthcare Profile
                </ThemedText>
                <ThemedText type="paragraph">{fullName}</ThemedText>
                <ThemedText type="paragraph">{gradeSection}</ThemedText>
            </View>

            <Card
                title="Basic Information"
                icon={
                    <Ionicons
                        name="information-circle-outline"
                        size={44}
                        color="#265b34ff"
                    />
                }
            >
                <ThemedText type="paragraph">LRN: {student.lrn}</ThemedText>
                <ThemedText type="paragraph">
                    Contact: {person.contactNumber || 'Not provided'}
                </ThemedText>
                <ThemedText type="paragraph">
                    Gender: {person.gender}
                </ThemedText>
                <ThemedText type="paragraph">Age: {person.age}</ThemedText>
                <ThemedText type="paragraph">
                    Birthday: {new Date(person.birthdate).toLocaleDateString()}
                </ThemedText>
                <ThemedText type="paragraph">
                    Address: {person.address || 'Not provided'}
                </ThemedText>
                <ThemedText type="paragraph">Email: {person.email}</ThemedText>
            </Card>

            {/*<Card
                title="Health Information"
                icon={
                    <Ionicons
                        name="heart-outline"
                        size={44}
                        color="#265b34ff"
                    />
                }
            ></Card>*/}

            <Card
                title="Clinic Visits"
                icon={
                    <Ionicons name="time-outline" size={44} color="#265b34ff" />
                }
            >
                {loading ? (
                    <ActivityIndicator />
                ) : error ? (
                    <ThemedText type="paragraph" style={{ color: 'red' }}>
                        {error}
                    </ThemedText>
                ) : clinicVisits.length === 0 ? (
                    <ThemedText type="paragraph">
                        No visit history available.
                    </ThemedText>
                ) : (
                    <>
                        <ThemedText type="paragraph">Recent:</ThemedText>
                        {clinicVisits
                            .slice(-3)
                            .reverse()
                            .map((visit) => (
                                <View
                                    key={visit.id}
                                    style={{ marginBottom: 8 }}
                                >
                                    <ThemedText type="paragraph">
                                        • {visit.visitDate.split('T')[0]} -{' '}
                                        {visit.ailment}
                                    </ThemedText>
                                </View>
                            ))}
                    </>
                )}
            </Card>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 70,
    },
});
