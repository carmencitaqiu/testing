import axios from "axios";

import { BASEURL } from "@/api/config";
import { message } from "antd";
const request = axios.create({
    baseURL: BASEURL,
    timeout: 15000
});

// 设置post请求头
request.defaults.headers.post["Content-Type"] = "application/json";

// 添加请求拦截器
request.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        // 相应错误处理
        // 比如： token 过期， 无权限访问， 路径不存在， 服务器问题等
        if (error.response && error.response.status) {
            message.error(error.response.data.enMessage);
            switch (error.response.status) {
                case 401:
                case 20012:
                    localStorage.clear();
                    window.location.href = "/#/";
                    break;
                case 403:
                    break;
                case 404:
                    break;
                case 500:
                    break;
                default:
                    console.log("其他错误信息");
            }
        }
        return Promise.reject(error);
    }
);

export default request;
