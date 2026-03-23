import { fetchStudentQrCode } from '@/services/api/qr/QrCodeService';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

export function QrCodeCard() {
    const [qrUri, setQrUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStudentQrCode()
            .then(setQrUri)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Card
            title="PARENT QR CODE"
            subtitle="Let your parent scan this to view your health profile"
            icon={
                <Ionicons name="qr-code-outline" size={44} color="#265b34ff" />
            }
        >
            {loading ? (
                <ActivityIndicator style={styles.center} />
            ) : error ? (
                <ThemedText type="paragraph" style={styles.error}>
                    {error}
                </ThemedText>
            ) : (
                <View style={styles.qrWrapper}>
                    <Image
                        source={{ uri: qrUri! }}
                        style={styles.qrImage}
                        resizeMode="contain"
                    />
                </View>
            )}
        </Card>
    );
}

const styles = StyleSheet.create({
    center: {
        marginVertical: 24,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    qrWrapper: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    qrImage: {
        width: 200,
        height: 200,
    },
});
