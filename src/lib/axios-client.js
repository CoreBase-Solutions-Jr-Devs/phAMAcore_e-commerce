import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
	baseURL,
	withCredentials: true,
	timeout: 10000,
};

const API = axios.create(options);

API.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Access Key Middleware
API.interceptors.request.use(
	(config) => {
		const accessKey = import.meta.env.VITE_CLIENT_ACCESS_KEY;

		if (accessKey) {
			config.headers['accesskey'] = accessKey;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// ✅ Handles Response Issues
API.interceptors.response.use(
	(response) => response,
	async (error) => {
		const { response } = error;

		if (response) {
			const { data, status } = response;

			if (data === 'Unauthorized' && status === 401) {
				window.location.href = '/';
			}

			return Promise.reject({ ...data });
		}

		return Promise.reject({
			message: 'Network error or server did not respond.',
			originalError: error,
		});
	}
);

export default API;