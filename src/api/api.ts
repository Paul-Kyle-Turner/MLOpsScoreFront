/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface UseApiResult<T> extends ApiResponse<T> {
    execute: (endpoint: string, options?: RequestInit) => Promise<T | null>;
    reset: () => void;
}

// Generic API hook
export function useApi<T = any>(): UseApiResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (endpoint: string, options?: RequestInit): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: T = await response.json();
            setData(result);
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return { data, loading, error, execute, reset };
}

// Generic API service class
export class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'GET',
            headers,
        });
    }

    async post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
            headers,
        });
    }

    async put<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
            headers,
        });
    }

    async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
            headers,
        });
    }
}

// Default API instance
export const api = new ApiService();

// Utility types for common API responses
export interface ApiError {
    message: string;
    code?: string;
    details?: any;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}