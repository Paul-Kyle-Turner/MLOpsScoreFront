import type { PlatformInformation } from "../model/platform";
import { API_BASE_URL } from "./constants";

export const checkPlatformExists = async (platformName: string): Promise<boolean> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/platform/exists/${encodeURIComponent(platformName)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Platform exists check failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error('Error checking if platform exists:', error);
        throw error;
    }
};

export const createPlatform = async (platformData: PlatformInformation): Promise<PlatformInformation> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/platform`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(platformData)
            }
        );

        if (!response.ok) {
            throw new Error(`Platform creation failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data as PlatformInformation;
    } catch (error) {
        console.error('Error creating platform:', error);
        throw error;
    }
};