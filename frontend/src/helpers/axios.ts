import axios from "axios";
console.log(process.env)
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_HOST,
    timeout: 15 * 1000,
});
console.log(instance)

export default instance;
