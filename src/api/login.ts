import { useCallback } from 'react';
import { API_BASE_URL } from './constants';

interface SlackOAuthResponse {
    redirectUrl?: string;
    redirect_url?: string;
    url?: string;
}

interface SlackAuthenticationResponse {
    ok: boolean;
    url: string | null;
    team: string | null;
    user: string | null;
    team_id: string | null;
    user_id: string | null;
    code: string | null;
}

export const getSlackOAuthUrl = async (): Promise<SlackOAuthResponse> => {
    const response = await fetch(
        API_BASE_URL + '/v1/slack/oauth',
        {
            method: 'GET',
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to get Slack OAuth URL: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Raw API response:', data);
    
    // Handle different possible response structures
    const redirectUrl = data.redirectUrl || data.redirect_url || data.url;
    
    if (!redirectUrl || typeof redirectUrl !== 'string') {
        console.error('Invalid response structure:', data);
        throw new Error(`Invalid response from Slack OAuth API. Expected redirectUrl but got: ${JSON.stringify(data)}`);
    }

    return { redirectUrl } as SlackOAuthResponse;
};

export const useSlackLogin = () => {
    return useCallback(async (slackCode: string): Promise<SlackAuthenticationResponse> => {
        const response = await fetch(
            API_BASE_URL + '/v1/slack/login',
            {
                method: 'POST',
                headers: {
                    'Slack-Code': slackCode
                }
            }
        );
        return response.json() as Promise<SlackAuthenticationResponse>;
    }, []);
};

