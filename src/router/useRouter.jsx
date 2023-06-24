import React, { useEffect } from "react";
import ReactRouter from "./routerControl";
import Login from "../view/login";
import Home from '../view/home'
// import { getWebViews } from '@/utils/buriedPoint/index'
import {
    Routes,
    Route,
    useLocation,
    Navigate,
    useNavigate,
    Location,
    NavigateFunction,
} from "react-router-dom";
// 跳转登录页组件
let RedirectLogin = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
};
let RedirectHome = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </>
    );
};

let location;
let navigate;
let token;

// 免token白名单
let whiteList = ["/login", "/register"];
export default function UseRoute(props) {
    location = useLocation();
    navigate = useNavigate();
    token = window.localStorage.getItem("token");


    return (
        <>
            <ElementRoute />
        </>
    );
}

/**
 *  路由重定向
 *  路由改变触发路由重新渲染  首先实现的功能是/ 重定向/home
 * @returns { ReactElement } 路由页面
 */
let ElementRoute = () => {
    if (!token && !whiteList.includes(location.pathname)) {
        return <RedirectLogin />;
    } else if (!whiteList.includes(location.pathname)) {
        if (location.pathname === "/") {
           return <RedirectHome />
        }

        // return <ReactRouter />;
    }
    return <ReactRouter />;
};



/**
 * 本组件作为全局的路由守卫
 * 鉴权   免密码登录等操作
 *
 *
 */
