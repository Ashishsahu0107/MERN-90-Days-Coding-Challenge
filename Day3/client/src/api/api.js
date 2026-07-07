import axios from "axios";

const API = "http://localhost:5000/api/users";

export const getUsers = () => axios.get(API);

export const addUser = (data) => axios.post(API, data);