import axios from "axios";

const axiosPiblic = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosPiblic = () => {
    return axiosPiblic;
};

export default useAxiosPiblic;