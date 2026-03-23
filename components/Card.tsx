import React from 'react';
import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { ThemedText } from './ThemedText';

interface CardProps {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
    onPress?: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
    icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    children,
    onPress,
    style,
    icon,
}) => {
    const Container = onPress ? TouchableOpacity : View;
    const hasHeaderText = title || subtitle;

    return (
        <Container onPress={onPress} style={[styles.card, style]}>
            {(hasHeaderText || icon) && (
                <View style={styles.header}>
                    {hasHeaderText && (
                        <View style={styles.headerText}>
                            {title && (
                                <ThemedText type="title">{title}</ThemedText>
                            )}
                            {subtitle && (
                                <ThemedText
                                    type="paragraph"
                                    style={styles.subtitle}
                                >
                                    {subtitle}
                                </ThemedText>
                            )}
                        </View>
                    )}
                    {icon && (
                        <View
                            style={[
                                styles.iconContainer,
                                !hasHeaderText && styles.iconOnly,
                            ]}
                        >
                            {icon}
                        </View>
                    )}
                </View>
            )}

            {children && (
                <View style={hasHeaderText && styles.bodyDivider}>
                    {children}
                </View>
            )}
        </Container>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#CAF0C1',
        borderRadius: 11,
        padding: 14,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerText: {
        flex: 1,
        gap: 2,
    },
    subtitle: {
        opacity: 0.65,
    },
    iconContainer: {
        marginLeft: 8,
    },
    iconOnly: {
        marginLeft: 'auto',
    },
    bodyDivider: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0,0,0,0.12)',
    },
});
