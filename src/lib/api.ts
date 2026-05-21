
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

function apiRequest(path: string, options: RequestInit = {}) {
    // path starts with / -> ex /auth/login
    const url = API_BASE_URL + path;
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    return fetch(url, { ...options, headers }).then(async (res) => {
        if (res.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.clear();
                window.location.href = '/login';
            }
            return;
        }

        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: 'An error occurred' }));
            throw error;
        }

        return res.json();
    });
}

export const api = {
    get: (path: string) => apiRequest(path, { method: 'GET' }),
    post: (path: string, body: object) => apiRequest(path, { method: 'POST', body: JSON.stringify(body) }),
    delete: (path: string) => apiRequest(path, { method: 'DELETE' }),
    loginUser: (username: string, password: string) => api.post(`/auth/login/`, { username, password }),
    registerUser: (username: string, password: string, email: string) => api.post(`/auth/register/`, { username, password, email }),
}

