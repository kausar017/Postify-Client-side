// import axios from "axios";
// import UseAuth from "../../AuthenTication/UseAuth/UseAuth";
// import { useNavigate } from "react-router-dom";



// const axiosSecure = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true,
// })

// const UseAxiosSecure = () => {

//     const navigate = useNavigate()
//     const { handalLogout } = UseAuth()
//     axiosSecure.interceptors.request.use(function (config) {
//         // ToDo something before request is sent
//         const token = localStorage.getItem('token');
//         // console.log(' this is a bearer tken ', token);
//         config.headers.authorization = `Bearer ${token}`
//         return config;
//     }, function (error) {
//         // Do something with request error
//         return Promise.reject(error);
//     });

//     // Add a response interceptor 404/401

//     axiosSecure .interceptors.response.use(function (response) {

//         return response;
//     }, async (error) => {
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // Do something with response error
//         console.log('error 401 || 403', error);
//         const status = error.response.status;
//         if(status === 401 || status === 403 ){
//           handalLogout()
//             navigate('/login')
//         }
//         return Promise.reject(error);
//     });
//     return axiosSecure
// };

// export default UseAxiosSecure;

import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../AuthenTication/UseAuth/UseAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
    const navigate = useNavigate(); 
    const { logOut } = UseAuth();

    // Request interceptor
    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );

    // Response interceptor
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

    return axiosSecure;
};

export default useAxiosSecure;


