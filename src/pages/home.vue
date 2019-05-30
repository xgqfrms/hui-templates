<template>
    <div class="home-contanier">
        <h1 class="home-msg">
            {{msg}}
        </h1>
    </div>
</template>

<script>
export default {
    name: "Home",
    // props: {
    //     // msg: {
    //     //     value: "",
    //     //     type: String,
    //     // },
    // },
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
