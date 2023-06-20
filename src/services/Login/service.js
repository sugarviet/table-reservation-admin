import { useMutation } from "@tanstack/react-query";
import { loginWithStaff } from "./caller";
import {  notification } from "antd";
import { useNavigate } from "react-router-dom";

export const useLoginWithStaff = () => {
    const navigate = useNavigate();
    return useMutation(loginWithStaff, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        notification.success({
          message: "Login successfully",
        });
        navigate('/')
      },
      onError: () => {
        notification.error({
          message: "Login failed",
        });
      }
    });
  };