
export const API_BASE_URL = (() => {
    if (import.meta.env.MODE === 'production') {
        return 'https://mlopsscoreback-720438592859.us-central1.run.app';
    } else if (import.meta.env.MODE === 'staging') {
        return 'https://mlopsscoreback-720438592859.us-central1.run.app';
    } else {
        return 'http://127.0.0.1:8000'; // must be http for local development
    }
})();
