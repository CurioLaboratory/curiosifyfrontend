import axios from "axios";

//const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";
 const baseURL ="http://localhost:5000/api";

const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add token to headers
instance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            config.headers.authToken = `${user.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

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
