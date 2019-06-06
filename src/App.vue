<template>
    <!-- <div id="app">
        <img
            alt="Vue logo"
            src="./assets/logo.png"
            class="app-logo"
        />
        <hr />
        <span class="link-box">
            <router-link to="/index">Index</router-link>
        </span>
        <span class="link-box">
            <router-link to="/index/1">Index/1</router-link>
        </span>
        <span class="link-box">
            <router-link to="/index/3">Index/3</router-link>
        </span>
        <span class="link-box">
            <router-link to="/home">Home</router-link>
        </span>
        <span class="link-box">
            <router-link to="/about">About</router-link>
        </span>
        <router-view></router-view>
    </div> -->
        <div class="layout">
        <h-row name="flex">
            <h-col span="5" class="layout-menu-left">
                <h-menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                    <div class="layout-logo-left">
                        <img
                            alt="logo"
                            src="./assets/gildata.png"
                            class="gildata-logo"
                        />
                    </div>
                    <h-submenu name="1">
                        <template slot="title">
                            <h-icon name="android-home"></h-icon>
                            导航一
                        </template>
                        <h-menu-item name="1-1">
                            <router-link to="/index">Index</router-link>
                        </h-menu-item>
                        <h-menu-item name="1-2">
                            <router-link to="/index/1">Index/1</router-link>
                        </h-menu-item>
                        <h-menu-item name="1-3">
                            <router-link to="/index/3">Index/3</router-link>
                        </h-menu-item>
                    </h-submenu>
                    <h-submenu name="2">
                        <template slot="title">
                            <h-icon name="businesscard"></h-icon>
                            导航二
                        </template>
                        <h-menu-item name="2-1">
                            <router-link to="/home">Home</router-link>
                        </h-menu-item>
                        <!-- <h-menu-item name="2-2">
                            <router-link to="/home">Home</router-link>
                        </h-menu-item> -->
                    </h-submenu>
                    <h-submenu name="3">
                        <template slot="title">
                            <h-icon name="ios-keypad"></h-icon>
                            导航三
                        </template>
                        <h-menu-item name="3-1">
                            <router-link to="/about">About</router-link>
                        </h-menu-item>
                        <!-- <h-menu-item name="3-2">
                            <router-link to="/about">About</router-link>
                        </h-menu-item> -->
                    </h-submenu>
                </h-menu>
            </h-col>
            <h-col span="19">
                <div class="layout-header">
                    <div class="layout-breadcrumb">
                    <h-breadcrumb>
                        <h-breadcrumb-item href="#">首页</h-breadcrumb-item>
                        <h-breadcrumb-item href="#">应用中心</h-breadcrumb-item>
                        <h-breadcrumb-item>
                            {{path.substr(1)}}
                        </h-breadcrumb-item>
                    </h-breadcrumb>
                </div>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <!-- 内容区域 -->
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2019-2020 &copy; gildata
                </div>
            </h-col>
        </h-row>
    </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// import HuiDemo from "./components/hui-demo";
// import HuiDatepicker from "./components/hui-datepicker";
const log = console.log;

export default {
    name: "app",
    components: {
        // HelloWorld,
        // HuiDemo,
        // HuiDatepicker,
    },
    data() {
        return {
            path: this.$route.path,
        };
    },
    methods: {
        //
    },
    mounted() {
        // console.log(`this.$route`, this.$route);
        console.log(`this.$route.fullPath`, this.$route.fullPath);
        console.log(`this.$route.path`, this.$route.path);
        // console.log(`this.$route.params`, this.$route.params);
    },
    watch: {
        "$route" (to, from) {
            let to_path = to.path;
            let from_path = from.path;
            log(`watch to =`, to_path);
            log(`watch from =`, from_path);
            // if (to_path !== "/index") {
            //     this.isShowId = true;
            // } else {
            //     this.isShowId = false;
            // }
        },
    },
};
</script>

<style>
* {
    box-sizing: border-box;
    /* margin: 0; */
    /* padding: 0; */
}
html{
    /* font-size: 16px; */
    /* default 16px === 1rem */
    font-size: 62.5%;
    /* 10px === 1rem */
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    font-size: 1.6rem;
}
.app-logo {
    width: 10rem;
    height: 10rem;
}

.app-box {
    margin: 0.5rem;
    padding: 1rem;
    border: 1px solid #666;
    border-radius: 1rem;
    box-shadow: .3rem 0.3rem #ccc;
}
.link-box {
    display: inline-block;
    margin: 5px;
}
</style>


<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: calc(100vh - 150px);
        /* min-height: 200px; */
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
        min-height: calc(100vh - 2px);
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        /* width: 90%; */
        width: 70px;
        /* width: 4rem; */
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .gildata-logo {
        /* width: 5rem; */
        height: 4rem;
        border-radius: 3px;
    }
</style>


<style>

.h-menu-item >a {
    width: 100%;
    display: inline-block;
    /* background: #f0f !important; */
    height: 25px;
    transform: translateX(-15px);
    /* text-align: center; */
    text-indent: 30%;
    /* color: #fff !important; */
}

.h-menu-item-active > a,
.h-menu-item-selected > a{
    color: #fff !important;
}

</style>
