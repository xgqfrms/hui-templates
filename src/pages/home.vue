<template>
    <div class="home-contanier">
        <h1 class="home-msg">
            {{msg}}
        </h1>
        <div class="app-box">
            <HuiDemo
                msg="hui app"
                name="xgqfrms"
            />
        </div>
    </div>
</template>


<script>
import HuiDemo from "../components/hui-demo";

export default {
    name: "Home",
    components: {
        HuiDemo,
    },
    data() {
        return {
            msg: "Home Page",
        };
    },
    methods: {
        //
    },
    mounted() {
        //
    },
    activated() {
        //
    },
}
</script>

<style scoped>
.home-container {
    box-sizing: border-box;
}
.home-msg {
    color: #abcdef;
}
.home-name {
    color: #42b983;
}
.home-warning {
    color: red;
}
</style>
