import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 24,
        resizeMode: 'contain',
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingInline: 24,
        paddingBlock: 42,
        maxWidth: 400,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 11,
        marginVertical: 48,
        gap: 12,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default styles;
