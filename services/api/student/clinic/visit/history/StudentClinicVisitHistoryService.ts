import { ClinicVisitHistoryInterface } from "@/types/student/clinic/visit/history/StudentClinicVisitHistoryInterface";
import { authFetch } from "@/services/api/utilities/AuthenticatedUserUtility";
import { HOMEPAGE_API_ENDPOINTS } from "@/constants/api";

/**
 * Fetch clinic visit history for a student using their LRN with authFetch
 *
 * @param lrn - The student's unique Learner Reference Number
 * @returns A promise resolving to an array of ClinicVisitHistory
 */
export async function fetchStudentClinicVisitHistoryByLRN(
  lrn: number,
): Promise<ClinicVisitHistoryInterface[]> {
  const url =
    HOMEPAGE_API_ENDPOINTS.GET_STUDENT_CLINIC_VISIT_HISTORY_BY_LRN_ENDPOINT(
      lrn,
    );

  try {
    const response = await authFetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch clinic visit history: ${response.status}`,
      );
    }

    const data: ClinicVisitHistoryInterface[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clinic visit history:", error);
    throw error;
  }
}
