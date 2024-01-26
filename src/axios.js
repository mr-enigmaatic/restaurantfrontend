import axios from "axios";

const instance = axios.create({
    baseURL:"https://tasteofpalakkad-backend.onrender.com"
})

export default instance;