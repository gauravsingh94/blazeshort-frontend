import axios, { AxiosRequestConfig } from 'axios';

export const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString();
};

const getAuthToken = (): string | null => {
    return localStorage.getItem('auth_token');
};

const getHeaders = (): Record<string, string> => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const get = async (route: string) => {
    const config: AxiosRequestConfig = {
        headers: getHeaders(),
    };
    return axios.get(route, config);
};

export const post = async (route: string, body: any) => {
    const config: AxiosRequestConfig = {
        headers: getHeaders(),
    };
    return axios.post(route, body, config);
};

export const put = async (route: string, body: any) => {
    const config: AxiosRequestConfig = {
        headers: getHeaders(),
    };
    return axios.put(route, body, config);
};

export const del = async (route: string) => {
    const config: AxiosRequestConfig = {
        headers: getHeaders(),
    };
    return axios.delete(route, config);
};

export const patch = async (route: string, body?: any) => {
    const config: AxiosRequestConfig = {
        headers: getHeaders(),
    };
    return body ? axios.patch(route, body, config) : axios.patch(route, config);
};