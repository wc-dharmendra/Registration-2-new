import Utils from "@/Utils/Utils";

// Create an AbortController and associate its signal with the fetch options
// const abortController = new AbortController();

const getAccessToken = () => {
    return Utils?.getCookie("accessToken")?.replace(/"/g, '')?.replace(/\\/g, '') || Utils?.getCookie("tempAccessToken")?.replace(/"/g, '')?.replace(/\\/g, '');
};

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

const fetchWithAuth = async (url, options) => {
    const accessToken = getAccessToken();
    options.headers = {
        ...defaultHeaders,
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
    };
    // options.signal = abortController.signal;
    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        return error;
    }
};

const AuthInstance = {
    get: (url, config = {}) => {
        const options = {
            method: 'GET',
            ...config,
        };
        return fetchWithAuth(`${apiUrl}${url}`, options);
    },
    post: (url, data, config = {}) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            ...config,
        };
        return fetchWithAuth(`${apiUrl}${url}`, options);
    },
    put: (url, data, config = {}) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            ...config,
        };
        return fetchWithAuth(`${apiUrl}${url}`, options);
    },
    delete: (url, config = {}) => {
        const options = {
            method: 'DELETE',
            ...config,
        };
        return fetchWithAuth(`${apiUrl}${url}`, options);
    },
};

const abortFetch = () => {
    abortController.abort();
};

export { fetchWithAuth, abortFetch };

export default AuthInstance;
