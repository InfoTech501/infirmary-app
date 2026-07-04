import { Alert, Platform } from 'react-native';

/**
 * Cross-platform alert. React Native's Alert.alert() is a no-op on web
 * (react-native-web just logs it to the console instead of rendering
 * anything), so this falls back to the browser's native window.alert()
 * when running on web.
 */
export function showAlert(title: string, message?: string) {
    if (Platform.OS === 'web') {
        window.alert(message ? `${title}\n\n${message}` : title);
        return;
    }
    Alert.alert(title, message);
}

/**
 * Cross-platform confirm dialog. Alert.alert() with a button array is a
 * no-op on web, so this falls back to window.confirm() on web, which
 * returns a boolean synchronously.
 */
export function confirmAction(
    title: string,
    message: string,
    onConfirm: () => void,
    confirmLabel: string = 'OK',
    destructive: boolean = false
) {
    if (Platform.OS === 'web') {
        const confirmed = window.confirm(`${title}\n\n${message}`);
        if (confirmed) {
            onConfirm();
        }
        return;
    }

    Alert.alert(
        title,
        message,
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: confirmLabel,
                style: destructive ? 'destructive' : 'default',
                onPress: onConfirm,
            },
        ],
        { cancelable: true }
    );
}
