
export const API_BASE_URL = (() => {
    if (import.meta.env.MODE === 'production') {
        return 'https://api.mlopsplatformscores.com';
    } else if (import.meta.env.MODE === 'staging') {
        return 'https://api.mlopsplatformscores.com';
    } else {
        return 'http://127.0.0.1:8000'; // must be http for local development
    }
})();
