import React from "react";
import { useRoutes } from "react-router-dom";
// import WrapComps from "./NavigateRouter";
import routeList from "./routerList";
// import publicRouterList from './publicRouterList'


export default function ReactRouter() {
  return useRoutes(routeList);

}
