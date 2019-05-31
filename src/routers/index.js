import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// route components
import Home  from "../pages/home";
import About from "../pages/about";
import Index from "../pages/index";

import ErrorPage from "../pages/404";


const routes = [
    {
        path: "/index",
        component: Index,
        props: true,
    },
    {
        // path: "/index:id",
        path: "/index/:id",
        component: Index,
        props: true,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/about",
        component: About,
    },
    {
        path: "*",
        component: ErrorPage,
    },
];


const routers = new VueRouter({
    mode: "history",
    routes,
});

export default routers;
export {routers};
