import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import axios from 'axios';

// Setting defaul URL for requests. Componenets only need to add the route later
//axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// Setting up global interceptors for all HTTP requests. This can be useful for logging all
// all requests, authorization, etc.
// axios.interceptors.request.use(request => {
//     console.log(request);
//     // The request Must always be returned in this method, otherwise it'll block it
//     // when intercepted and not completed. 
//     // May not be returned if intended to conditionally block the request "eg: authentication". 
//     return request;
// }, error => {
//     // This is only for errors related to sending the request. Doesn't log error responses.
//     console.log(error);
//     return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
//     console.log(response);
//     return response;
// }, error => {
//     // This logs error responses. Doesn't log request errors
//     console.log(error);
//     return Promise.reject(error);
// });

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
