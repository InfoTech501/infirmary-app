import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="HomepageScreen"
        options={{
          title: "Homepage",
          tabBarIcon: ({ color }) => (
            <Ionicons name="medical-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="QRParentsPortalScreen"
        options={{
          title: "Parent's Portal",
          tabBarIcon: ({ color }) => (
            <Ionicons name="qr-code-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="NotificationsScreen"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AccountScreen"
        options={{
          title: "My Account",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
