import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * Centralized API client for all HTTP requests
 * 
 * Features:
 * - Automatic JWT token injection from cookies
 * - Automatic 401 redirect to login on token expiry
 * - Consistent error handling across all requests
 * - Environment-based configuration
 * 
 * Usage:
 * ```
 * import apiClient from './lib/api';
 * 
 * // GET request
 * const response = await apiClient.get('/endpoint');
 * 
 * // POST request
 * const response = await apiClient.post('/endpoint', data);
 * 
 * // DELETE request
 * const response = await apiClient.delete('/endpoint/id');
 * ```
 */

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Create axios instance with defaults
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
    },
});

/**
 * Request interceptor
 * Injects JWT token from cookies into Authorization header
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * Handles common error scenarios:
 * - 401 Unauthorized: Clear session and redirect to login
 * - Other errors: Pass through for component-level handling
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            Cookies.remove('jwt_token');
            localStorage.removeItem('sessionUser');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
