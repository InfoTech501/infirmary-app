import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { login } from "@/services/api/auth/user/login/LoginService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ImageBackground, TextInput, View } from "react-native";
import styles from "./LoginScreen.styles";

const LoginScreen = () => {
  const [username, setLrn] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const result = await login(username, password);
    if (result.success) {
      router.replace("/(tabs)/HomepageScreen");
    } else {
      Alert.alert("Login failed", result.message || "Invalid credentials");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/loginscreen-bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/main-logo.png")}
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
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
