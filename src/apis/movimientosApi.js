import axios from "axios";

const movimientosApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/movimientos`
});

movimientosApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default movimientosApi;
