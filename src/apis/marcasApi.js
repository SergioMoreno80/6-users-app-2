import axios from "axios";

const marcasApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/fabricantes`
});

marcasApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default marcasApi;