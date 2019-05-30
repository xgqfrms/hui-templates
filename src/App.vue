<template>
    <div id="app">
        <img
            alt="Vue logo"
            src="./assets/logo.png"
            class="app-logo"
        />
        <!-- <div class="app-box">
            <HuiDatepicker
                title="hui datepicker"
            />
        </div>
        <div class="app-box">
            <HelloWorld
                msg="Welcome to hui App"
            />
        </div>
        <div class="app-box">
            <HuiDemo
                msg="hui app"
                name="xgqfrms"
            />
        </div> -->
        <hr />
        <span class="link-box">
            <router-link to="/index">Index</router-link>
        </span>
        <span class="link-box">
            <router-link to="/home">Home</router-link>
        </span>
        <span class="link-box">
            <router-link to="/about">About</router-link>
        </span>
        <router-view>
        </router-view>
    </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// import HuiDemo from "./components/hui-demo";
// import HuiDatepicker from "./components/hui-datepicker";

export default {
    name: "app",
    components: {
        // HelloWorld,
        // HuiDemo,
        // HuiDatepicker,
    }
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
