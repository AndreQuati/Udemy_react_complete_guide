// Instance file that will be used to intermediate all connections to a specific URL.
// If other URLs are necessary (e.g.: other APIs), other instance files can be createdd.
import axios from 'axios';

const instance = axios.create({baseURL: 'https://jsonplaceholder.typicode.com'});

// Authorization token (if used in the application)
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Interceptors
instance.interceptors.request.use(request => {
    console.log(request);
    // The request Must always be returned in this method, otherwise it'll block it
    // when intercepted and not completed. 
    // May not be returned if intended to conditionally block the request "eg: authentication". 
    return request;
}, error => {
    // This is only for errors related to sending the request. Doesn't log error responses.
    console.log(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    // This logs error responses. Doesn't log request errors
    console.log(error);
    return Promise.reject(error);
});

export default instance;