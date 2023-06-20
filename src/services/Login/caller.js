import axios from 'axios';
import { API } from './api_path';


export const loginWithStaff = async(data) => {
    console.log("dataLogin", data);
    const res = await axios.post(API.LOGIN, data);

    return res.data;
}