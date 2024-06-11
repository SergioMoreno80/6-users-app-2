import axios from "axios";

const proveedorApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/proveedores`
});

proveedorApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default proveedorApi;