import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Header from "@/components/Header";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/hooks/auth/useLogout";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Account() {
  const { handleLogout, isLoggingOut } = useAuth();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="MY ACCOUNT" />

        <Card
          icon={<Ionicons name="person-outline" size={44} color="#265b34ff" />}
        >
          <ThemedText type="title">John Peter Pan</ThemedText>
          <ThemedText type="paragraph">username</ThemedText>
          <ThemedText type="paragraph">john.peter@example.com</ThemedText>
        </Card>

        <View style={styles.bottomSection}>
          <ThemedText type="default">ACCOUNT SETTINGS</ThemedText>
          <Button
            title="RESET PASSWORD"
            onPress={() => {
              console.log("RESET Password pressed");
            }}
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
    justifyContent: "space-between",
  },
  bottomSection: {
    gap: 10,
    paddingBottom: 20,
  },
});
