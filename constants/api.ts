// backend local host
export const API_BASE_URL = 'http://localhost:8080';

// backend login controller endpoint
export const LOGIN_ENDPOINT = `${API_BASE_URL}/user/login`;

/**
 * get the autehnticated current user endpoint
 */
export const GET_CURRENT_USER_ENDPOINT = `${API_BASE_URL}/user/current-user`;

/**
 * HOMEPAGE ENDPOINTS
 */
export const HOMEPAGE_API_ENDPOINTS = {
    GET_STUDENT_HEALTH_PROFILE_BY_LRN_ENDPOINT: (lrn: number) =>
        `${API_BASE_URL}/student/clinic/visit?lrn=${lrn}`,
    GET_STUDENT_CLINIC_VISIT_HISTORY_BY_LRN_ENDPOINT: (lrn: number) =>
        `${API_BASE_URL}/student/health-profile?lrn=${lrn}`,
};
