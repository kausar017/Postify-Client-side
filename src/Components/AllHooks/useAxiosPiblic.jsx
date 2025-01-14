import axios from "axios";

const axiosPiblic = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const useAxiosPiblic = () => {
    return axiosPiblic;
};

export default useAxiosPiblic;