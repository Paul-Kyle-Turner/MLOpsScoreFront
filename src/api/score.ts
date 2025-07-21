import type { MLOpsPlatformEvaluation } from "../model/score";
import { API_BASE_URL } from "./constants";


export const postScores = async (platform_id: string, scores: MLOpsPlatformEvaluation): Promise<MLOpsPlatformEvaluation> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/scores/${platform_id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scores)
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Platform not found');
            }
            throw new Error(`Failed to fetch platform: ${response.statusText}`);
        }

        const data = await response.json();
        return data as MLOpsPlatformEvaluation;
    } catch (error) {
        console.error('Error fetching platform:', error);
        throw error;
    }
};

