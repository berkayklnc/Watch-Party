import axios from "axios";
console.log(import.meta.env.VITE_SERVER_HOST)
const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_HOST,
    timeout: 15 * 1000,
});
console.log(instance)

export default instance;
