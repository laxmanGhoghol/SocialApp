import axios from "axios"


axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        else {
            console.log("not loged in")
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);


//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios.post('http://localhost:8100/api/auth/token', { token: refreshToken }).then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    console.log("Access token refreshed!");
                    return axios(originalRequest);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        return Promise.reject(error);
    }
);
const api = {
    login: (userdata, dispatch) => {
        loginCall(userdata, dispatch)
    },
    register: (userdata) => {
        registerCall(userdata)
    },
    getUser: async () => {
        const res = await axios.get("http://localhost:8800/api/users/");
        return res.data.data;
    },
    getProfile: async (userid) => {
        try {
            const res = await axios.get("http://localhost:8800/api/users/" + userid);
            return res.data.data;
        } catch (err) {
            console.log(err)
        }
    },
    getPosts: async () => {
        try {
            const res = await axios.get("http://localhost:8800/api/posts/timeline/data")
            return res.data.data;
        } catch (err) {
            console.log(err)
        }
    },
    likePost: async (postId) => {
        try {
            await axios.put("http://localhost:8800/api/posts/" + postId + "/like");
        } catch (err) {
            console.log(err)
        }
    },
    disLikePost: async (postId) => {
        try {
            await axios.put("http://localhost:8800/api/posts/" + postId + "/like");
        } catch (err) {
            console.log(err)
        }
    },
    sharePost: async (postdata, filedata) => {
        try {
            if (filedata) {
                await axios.post("http://localhost:8800/api/upload", filedata);
            }
            return await axios.post("http://localhost:8800/api/posts/", postdata)
        } catch (err) {
            console.log(err)
        }
    },
    logout: async (dispatch) => {
        try {
            const token = localStorage.getItem("refreshToken");
            await axios.delete("http://localhost:8100/api/auth/logout", { 'token': token }); //dekete token from database
            dispatch({ type: "LOGIN_FAILURE", payload: "loged out" }); // set context to null
            localStorage.setItem("refreshToken", null) // remove token from localstorage
            localStorage.setItem("accessToken", null)
            console.log('loged out')
        } catch (err) {
            console.log(err)
        }
    },
    getFriends: async () => {
        try {
            const friends = await axios.get("http://localhost:8800/api/users/friends/get")
            return friends.data.data;
        } catch (err) {
            console.log(err);
        }
    },
    searchUsers: async (key) => {
        try {
            const users = await axios.get("http://localhost:8800/api/users/search/" + key)
            return users.data.data;
        } catch (err) {
            console.log(err)
        }
    },
    getUserPosts: async (pid) => {
        try {
            const res = await axios.get("http://localhost:8800/api/posts/userPosts/" + pid);
            return res.data.data;
        } catch (err) {
            console.log(err)
        }
    },
    followUser: async (uid) => {
        try {
            await axios.put("http://localhost:8800/api/users/" + uid + "/follow")
        } catch (err) {
            console.log(err)
        }
    },
    unfollowUser: async (uid) => {
        try {
            await axios.put("http://localhost:8800/api/users/" + uid + "/unfollow")
        } catch (err) {
            console.log(err)
        }
    },
    updateUserProfile: async (uid, updateData, filedata = null) => {
        try {
            if (filedata != null) {
                await axios.post("http://localhost:8800/api/upload", filedata);
            }
            await axios.put("http://localhost:8800/api/users/" + uid, updateData);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    getConversations: async () => {
        try {
            const res = await axios.get("http://localhost:8800/api/conversation/");
            return res.data.data;
        } catch (err) {
            console.log(err)
        }
    },
    getMessages: async (convId) => {
        try {
            const res = await axios.get("http://localhost:8800/api/conversation/" + convId);
            return res.data.data;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    sendMessage: async (msgdata) => {
        try {
            await axios.post("http://localhost:8800/api/message/", msgdata);
            return true;
        } catch (err) {
            console.log(err)
            return err;
        }
    },
    getConversationWithTwoId: async (firstId, secondId) =>{
        try {
            const conv = await axios.get("http://localhost:8800/api/conversation/find/" + firstId + "/" + secondId);
            if(!conv.data.ok){
             const createConvRes =  await axios.post("http://localhost:8800/api/conversation/create", {receiverId: secondId});
             return createConvRes.data.data;
            }
            return conv.data.data;
        } catch (err) {
            console.log(err)
        }
    }


}
export default api;

const registerCall = async (userCredentials) => {
    try {
        await axios.post("http://localhost:8100/api/auth/register", userCredentials)
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post("http://localhost:8100/api/auth/login", userCredentials)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        localStorage.setItem('accessToken', res.data.accessToken)
        const userdata = await axios.get("http://localhost:8800/api/users/")
        dispatch({ type: "LOGIN_SUCCESS", payload: userdata.data.data });

    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};