interface User {
    id: string;
    email: string;
    name: string;
    role: 'patient' | 'doctor' | 'admin';
}

export const getStoredUser = (): User | null => {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;

    try {
        return JSON.parse(userJson) as User;
    } catch (error) {
        console.error('Error parsing stored user:', error);
        return null;
    }
};

export const setStoredUser = (user: User): void => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const removeStoredUser = (): void => {
    localStorage.removeItem('user');
};

// Token management
export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

export const setAccessToken = (token: string): void => {
    localStorage.setItem('accessToken', token);
};

export const removeAccessToken = (): void => {
    localStorage.removeItem('accessToken');
};

export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken');
};

export const setRefreshToken = (token: string): void => {
    localStorage.setItem('refreshToken', token);
};

export const removeRefreshToken = (): void => {
    localStorage.removeItem('refreshToken');
};

// Clear all auth data
export const clearAuth = (): void => {
    removeStoredUser();
    removeAccessToken();
    removeRefreshToken();
}; 