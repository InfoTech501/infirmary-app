import { Button } from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { login } from '@/services/api/auth/user/login/LoginService';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ImageBackground, Text, TextInput, TouchableOpacity, View  } from 'react-native';
import styles from './LoginScreen.styles';
import { useConfirmation } from '@/hooks/auth/useConfirmation';
import forgetPassword from '@/services/api/auth/user/password/ForgetPasswordService';

const LoginScreen = () => {
    const [username, setLrn] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const { displayForgetPasswordConfirmation } = useConfirmation();
    const router = useRouter();

    const handleLogin = async () => {
        const result = await login(username, password);
        if (result.success) {
            router.replace('/homepage');
        } else {
            Alert.alert(
                'Login failed',
                result.message || 'Invalid credentials'
            );
        }
    };

   const handleForgetPassword = async () => {
    try {
        setIsLoading(true);
        const result = await forgetPassword(username.trim());

        if (result.message?.includes("TO MANY REQUEST")) {
            Alert.alert("Too Many Attempts", "Please try again later.");
            return;
        }

        if (result.success) {
            Alert.alert("Check your email",
                result.message || "Check your email for the password reset link!"
            );
            return;
        }

        Alert.alert('Unable to send reset link',
            result.message || 'Failed to send password reset email.'
        );

    } finally {
        setIsLoading(false);
    }
};

const confirmForgetPassword = () => {
    if (!username) {
        Alert.alert("Username is required", "Please provide a username.");
        return;
    }

    displayForgetPasswordConfirmation(handleForgetPassword, () => {});
};

    return (
        <ImageBackground
            source={require('../../assets/images/loginscreen-bg.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/main-logo.png')}
                    style={styles.logo}
                />
                <View style={styles.header}>
                    <ThemedText type="title">STUDENT HEALTH PROFILE</ThemedText>
                    <ThemedText type="default">LOG IN</ThemedText>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Parent Email or Student LRN"
                    value={username}
                    onChangeText={setLrn}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title="LOG IN" onPress={handleLogin} />
                <TouchableOpacity onPress={isLoading ? undefined : confirmForgetPassword}
                    disabled= {isLoading} 
                    style={{ opacity: isLoading ? 0.5 : 1 }}> 
                     <Text style={styles.forgetPassword}>Forget password?</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;
