import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://react-youtube-project.herokuapp.com/api/"
})