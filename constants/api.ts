// backend local host
export const API_BASE_URL = "http://localhost:8080";

// backend login controller endpoint
export const LOGIN_ENDPOINT = `${API_BASE_URL}/user/login`;

// Homepage
export const HOMEPAGE_API_ENDPOINTS = {
  GET_STUDENT_CLINIC_VISIT_HISTORY_ENDPOINT: (lrn: number) =>
    `${API_BASE_URL}student/clinic/visit?lrn=${lrn}`,
};
