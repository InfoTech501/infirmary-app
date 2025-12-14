import { ClinicVisitHistory } from "@/types/ClinicVisitHistoryInterface";
import { authFetch } from "@/services/authenticatedUserFetch";
import { HOMEPAGE_API_ENDPOINTS } from "@/constants/api";

/**
 * Fetch clinic visit history for a student using their LRN with authFetch
 *
 * @param lrn - The student's unique Learner Reference Number
 * @returns A promise resolving to an array of ClinicVisitHistory
 */
export async function fetchClinicVisitHistory(
  lrn: number,
): Promise<ClinicVisitHistory[]> {
  const url =
    HOMEPAGE_API_ENDPOINTS.GET_STUDENT_CLINIC_VISIT_HISTORY_ENDPOINT(lrn);

  try {
    const response = await authFetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch clinic visit history: ${response.status}`,
      );
    }

    const data: ClinicVisitHistory[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clinic visit history:", error);
    throw error;
  }
}
