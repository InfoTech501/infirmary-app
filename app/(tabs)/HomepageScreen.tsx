import { Card } from "@/components/Card";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { ThemedText } from "@/components/ThemedText";
import { fetchStudentClinicVisitHistoryByLRN } from "@/services/api/student/clinic/visit/history/StudentClinicVisitHistoryService";
import { ClinicVisitHistoryInterface } from "@/types/student/clinic/visit/history/StudentClinicVisitHistoryInterface";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function HomepageScreen() {
  const [clinicVisits, setClinicVisits] = useState<
    ClinicVisitHistoryInterface[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const lrn = 109152648294;

  useEffect(() => {
    const loadClinicVisits = async () => {
      try {
        const visits = await fetchStudentClinicVisitHistoryByLRN(lrn);
        setClinicVisits(visits);
      } catch (err) {
        setError("Failed to load clinic visit history" + err);
      } finally {
        setLoading(false);
      }
    };

    loadClinicVisits();
  }, []);

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
        {loading ? (
          <ActivityIndicator />
        ) : error ? (
          <ThemedText type="paragraph" style={{ color: "red" }}>
            {error}
          </ThemedText>
        ) : clinicVisits.length === 0 ? (
          <ThemedText type="paragraph">No visit history available.</ThemedText>
        ) : (
          <>
            <ThemedText type="paragraph">Recent:</ThemedText>
            {clinicVisits
              .slice(-3)
              .reverse()
              .map((visit) => (
                <View key={visit.id} style={{ marginBottom: 8 }}>
                  <ThemedText type="paragraph">
                    • {visit.visitDate.split("T")[0]} - {visit.ailment}
                  </ThemedText>
                </View>
              ))}
          </>
        )}
      </Card>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 70,
  },
});
