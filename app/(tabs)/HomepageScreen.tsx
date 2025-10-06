import { Card } from "@/components/Card";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HomepageScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <ThemedText type="title" style={{ fontSize: 28, marginBottom: 10 }}>
          Welcome to your Personal Healthcare Profile
        </ThemedText>
        <ThemedText type="paragraph">John Peter Pan</ThemedText>
        <ThemedText type="paragraph">Grade 12 - Gumamela</ThemedText>
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
        <ThemedText type="paragraph">0123456789</ThemedText>
        <ThemedText type="paragraph">Male</ThemedText>
        <ThemedText type="paragraph">Age</ThemedText>
        <ThemedText type="paragraph">Birthday</ThemedText>
        <ThemedText type="paragraph">Tagaytay City</ThemedText>
        <ThemedText type="paragraph">john.peter@example.com</ThemedText>
      </Card>

      <Card
        title="Health Information"
        icon={<Ionicons name="heart-outline" size={44} color="#265b34ff" />}
      >
        <ThemedText type="paragraph">Allergies</ThemedText>
        <ThemedText type="paragraph">Others</ThemedText>
      </Card>

      <Card
        title="Clinic Visits"
        icon={<Ionicons name="time-outline" size={44} color="#265b34ff" />}
      >
        <ThemedText type="paragraph">Recent:</ThemedText>
      </Card>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 70,
  },
});
