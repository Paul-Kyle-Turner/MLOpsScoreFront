import type { PlatformInformation } from "../model/platform";
import { API_BASE_URL } from "./constants";

export const searchPlatform = async (query: string, page: number, pageSize: number): Promise<PlatformInformation[]> => {
    const response = await fetch(
        `${API_BASE_URL}/platform/search`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                page,
                pageSize
            })
        }
    );

    if (!response.ok) {
        throw new Error(`Search API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Search API response:', data);

    return data as PlatformInformation[];
}
