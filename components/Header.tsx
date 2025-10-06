import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface HeaderProps {
  title?: string;
}

const NavBar: React.FC<HeaderProps> = ({ title = "header_title" }) => (
  <View style={styles.headerBackground}>
    <ThemedText type="title">{title}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  headerBackground: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NavBar;
