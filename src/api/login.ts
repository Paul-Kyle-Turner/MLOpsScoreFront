import { api } from './api';

export const handleSlackLogin = async (slackCode: string) => {
    await api.post('/v1/slack/login', {
        headers: {
            'Content-Type': 'application/json',
            'Slack-Code': slackCode
        }
    });
};
