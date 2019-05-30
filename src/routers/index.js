import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// route components
import Home  from "../pages/home";
import About from "../pages/about";
import Index from "../pages/index";


const routes = [
    {
        path: "/index",
        component: Index,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/about",
        component: About,
    },
];


const routers = new VueRouter({
    routes,
});

export default routers;
export {routers};
