import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../AuthenTication/UseAuth/UseAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = UseAuth();

    useEffect(() => {
        axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("access-token");
                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    await logOut();
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;


