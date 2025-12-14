import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { ThemedText } from './ThemedText';

type ButtonProps = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderWidth?: number;
};

export const Button = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
    backgroundColor = '#066C3D',
    textColor = '#fff',
    borderColor,
    borderWidth = 0,
}: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: disabled ? '#999' : backgroundColor,
                    borderColor: borderColor,
                    borderWidth: borderWidth,
                },
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <ThemedText type="default" style={{ color: textColor }}>
                    {title}
                </ThemedText>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
});
