import { useCallback } from 'react';
import { API_BASE_URL } from './constants';

interface SlackOAuthResponse {
    redirectUrl?: string;
    redirect_url?: string;
    url?: string;
}

export interface SlackAuthenticationResponse {
    ok: boolean;
    team: string | null;
    user: string | null;
    team_id: string | null;
    user_id: string | null;
}

export const getSlackOAuthUrl = async (): Promise<SlackOAuthResponse> => {
    const response = await fetch(
        API_BASE_URL + '/v1/slack/oauth',
        {
            method: 'GET',
        },
    );

    if (!response.ok) {
        throw new Error(`Failed to get Slack OAuth URL: ${response.statusText}`);
    }

    const data = await response.json();

    // Handle different possible response structures
    const redirectUrl = data.redirectUrl || data.redirect_url || data.url;

    if (!redirectUrl || typeof redirectUrl !== 'string') {
        console.error('Invalid response structure:', data);
        throw new Error(`Invalid response from Slack OAuth API. Expected redirectUrl but got: ${JSON.stringify(data)}`);
    }

    return { redirectUrl } as SlackOAuthResponse;
};

export const useSlackAuthenticated = () => {
    return useCallback(async (): Promise<SlackAuthenticationResponse> => {
        const response = await fetch(
            API_BASE_URL + '/v1/slack/authenticated',
            {
                credentials: 'include',
                method: 'GET',
            }
        );
        return response.json() as Promise<SlackAuthenticationResponse>;
    }, []);
};

