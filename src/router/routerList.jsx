import React, { lazy, ReactElement, Suspense } from "react";
// import { RouteObject } from 'react-router-dom' // hook导入
import Loading from "../view/Loading";
import Home from '../view/home'
import Login from '../view/login'
// 路由懒加载
const lazyComponent = (Element) => {
  return <Suspense fallback={<Loading />}>{Element}</Suspense>;
};
const routeList = [
  {
    name: "首批功能实现",
    path: "/",
    // element: lazyComponent(<Home />),
    children: [
      {
        name: "首页",
        path: "/home",
        index: true,
        element: lazyComponent(<Home />),
      },
      {
        name: "登录",
        path: "/login",
        element: lazyComponent(<Login />),
      }
    ],
  },
];

export default routeList;
