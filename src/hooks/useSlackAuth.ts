import { useContext } from 'react';
import { SlackAuthContext } from '../contexts/SlackAuthContext';
import type { SlackAuthContextType } from '../contexts/SlackAuthContext';

export const useSlackAuth = (): SlackAuthContextType => {
    const context = useContext(SlackAuthContext);
    if (context === undefined) {
        throw new Error('useSlackAuth must be used within a SlackAuthProvider');
    }
    return context;
};
