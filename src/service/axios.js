import axios from "axios";

if(global.axios === undefined) {
  global.axios = axios.create({
    baseURL: "http://localhost:3001/",
    //baseURL: "http://192.168.151.218:3001/",
  });

  global.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authInfo')}`; 
}

export default global.axios;