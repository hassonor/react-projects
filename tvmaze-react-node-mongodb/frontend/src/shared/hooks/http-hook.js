import { useState, useCallback,useEffect } from 'react';
import axios from "axios";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const source = axios.CancelToken.source()
    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    cancelToken: source.token,
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                return responseData;
            } catch (err) {
                if (axios.isCancel(error)) {
                } else {
                    throw error
                }
                setError(err.message);
                setIsLoading(false);
                throw err;
            }
        },
        [error] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            source.cancel()
        }
    }, [source]);

    return { isLoading, error, sendRequest, clearError };
};
