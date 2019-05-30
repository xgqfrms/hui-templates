import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


// route components
// import { App } from "../App.vue";

import Home  from "../pages/home.vue";
import About from "../pages/about.vue";

// default export bug
// import { Home } from "../pages/home.vue";
// import { About } from "../pages/about.vue";


const routes = [
    // {
    //     path: "/index",
    //     component: App,
    // },
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

// export default routers;
export {routers};
// export default routes;
// export {routes};
