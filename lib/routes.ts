const BASE_URL = 'http://localhost:8080';

export const routes = {
    auth: {
        signup: `${BASE_URL}/api/auth/signup`,
        login: `${BASE_URL}/api/auth/login`,
    },
    url: {
        create: `${BASE_URL}/api/url`,
        myUrls: `${BASE_URL}/url/my`,
        disable: (id: string) => `${BASE_URL}/api/urls/${id}/disable`,
        redirectUrl: (code: string) => `${BASE_URL}/${code}`,
    },
    dashboard: {
        analytics: `${BASE_URL}/api/dashboard/analytics`,
    },
};