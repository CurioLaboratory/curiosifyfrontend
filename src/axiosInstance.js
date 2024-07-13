import axios from "axios";

const baseURL = "http://localhost:5000/api";

const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add token to headers
// instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// Create interceptor for handling expired tokens
// instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (
//             error.response &&
//             (error.response.status === 401 || error.response.status === 403)
//         ) {
//             localStorage.removeItem("token");
//             window.alert("Session expired! Login again!");
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     }
// );

export default instance;
