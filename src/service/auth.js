import axios from './axios'
import broadcastChannels from './broadcast';

const authService = (function() {    
    const authChannel = broadcastChannels.getChannel('auth');
    authChannel.onmessage = function(e) {
        switch(e.data.event) {
            case "login":
                localStorage.setItem("authInfo", e.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${e.data.token}`;  
                break;
            case "logout":
                delete axios.defaults.headers.common.Authorization;
                localStorage.removeItem('authInfo');
                break;
            case "sync":
                if(axios.defaults.headers.common['Authorization'] !== undefined) {
                    e.data.callback(axios.defaults.headers.common['Authorization']);
                }
                else {
                    e.data.callback();
                }
                break;
            default:
        }
    }

    return {
        login: async function(userName, password) {
            try {
                const res = await axios.post('login', {userName, password})
                console.log(res.data.accessToken)
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
                localStorage.setItem("authInfo", res.data.accessToken);
                
                authChannel.postMessage({
                    event: "login",
                    token: res.data.accessToken
                });        
            } 
            catch(err) {
                console.error(err);   
                throw err;  
            }
        },

        logout: function() {
            delete axios.defaults.headers.common.Authorization;
            localStorage.removeItem("authInfo");
            authChannel.postMessage({
                event: "logout"
            })
        },

        getRoles: async function() {

        },

        logged: function() {
            
            return (axios.defaults.headers.common['Authorization'] !== undefined
                && axios.defaults.headers.common['Authorization'].length > 15)||
                !!localStorage.getItem('authInfo') 
                
            ;    
            
        },

        sync: function() {
            console.log('auth sync')
            let firstCallback = true;
            const callback = (token) => {
                if(firstCallback && !!token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    firstCallback = false;
                }
            }
            authChannel.postMessage({
                event: "sync",
                callback: callback
            });
        }
    }
})();

export default authService;