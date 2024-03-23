import axios from "axios";

const activosApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/activos`
});

activosApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default activosApi;