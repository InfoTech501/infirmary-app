import { authFetch } from '@/services/api/utilities/AuthenticatedUserUtility';
import { GET_GENERATED_QR_CODE } from '@/constants/api';

export async function fetchStudentQrCode(): Promise<string> {
    const response = await authFetch(GET_GENERATED_QR_CODE, {
        headers: {
            'Content-Type': '',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch QR code: ${response.status}`);
    }

    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
