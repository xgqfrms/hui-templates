<template>
    <div class="about-contanier">
        <h1 class="about-msg">
            {{msg}}
        </h1>
    </div>
</template>

<script>
export default {
    name: "About",
    // props: {
    //     // msg: {
    //     //     value: "",
    //     //     type: String,
    //     // },
    // },
    data() {
        return {
            msg: "About Page",
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
.about-container {
    box-sizing: border-box;
}
.about-msg {
    color: #abcdef;
}
.about-name {
    color: #42b983;
}
.about-warning {
    color: red;
}
</style>
