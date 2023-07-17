import { request } from "../../utils/request";
import { API } from "./api_path";

export const loginWithStaff = async (data) => {
  console.log("dataLogin", data);
  const res = await request.post(API.LOGIN, data);
  return res.data;
};
