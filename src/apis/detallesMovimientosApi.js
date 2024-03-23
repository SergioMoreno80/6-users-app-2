import axios from "axios";

const detallesMovimientosApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/detalles`
});

detallesMovimientosApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    console.log('URL:', config.url); // Imprimir la URL antes de enviar la solicitud
    return config;
});

export default detallesMovimientosApi;
