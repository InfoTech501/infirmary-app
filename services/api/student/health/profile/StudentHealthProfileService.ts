import { ClinicVisitHistoryInterface } from "@/types/student/clinic/visit/history/StudentClinicVisitHistoryInterface";
import { authFetch } from "@/services/api/utilities/AuthenticatedUserUtility";
import { HOMEPAGE_API_ENDPOINTS } from "@/constants/api";

export async function fetchStudentHealthProfileByLRN(
  lrn: number,
): Promise<ClinicVisitHistoryInterface[]> {
  const url =
    HOMEPAGE_API_ENDPOINTS.GET_STUDENT_HEALTH_PROFILE_BY_LRN_ENDPOINT(lrn);

  try {
    const response = await authFetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to retrive student health profile: ${response.status}`,
      );
    }

    const data: ClinicVisitHistoryInterface[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clinic visit history:", error);
    throw error;
  }
}
