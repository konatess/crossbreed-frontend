import axios from "axios";

export default {
    getTest: () => {
        return axios.get("https://crossbreed-backend.herokuapp.com/test")
    },
    getUser: () => {
        return axios.get("https://crossbreed-backend.herokuapp.com/auth/user")
    },
    savePet: (petObj, userId) => {
        return axios.post("https://crossbreed-backend.herokuapp.com/api/pet/" + userId, petObj)
    },
    getUserPets: (userId) => {
        return axios.get("https://crossbreed-backend.herokuapp.com/api/pet/" + userId)
    }
}

