<template>
    <div class="hello-contanier">
        <h1 class="hello-msg">
            {{msg}}
        </h1>
        <p v-if="name ? true : false">
            <span>name: </span>
            <span class="hello-name">
                {{name}}
            </span>
        </p>
        <p v-else>
            <span class="hello-warning">passed name is empty!</span>
        </p>
        <button
            @click="clickSayHello(name)">
            say hello
        </button>
    </div>
</template>

<script>
export default {
    name: "HuiDemo",
    props: {
        // msg: String,
        // name: String,
        msg: {
            value: "ufo",
            type: String,
        },
        name: {
            value: "admin",
            type: String,
        },
    },
    data() {
        return {
            // msg: "",
            // name: "",
        };
    },
    methods: {
        clickSayHello(name = ``) {
            if (name) {
                alert(`😄 your name is ${name}!`);
            } else {
                alert(`❌ your name is empty!`);
            }
        },
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
.hello-container {
    box-sizing: border-box;
}
.hello-msg {
    color: #abcdef;
}
.hello-name {
    color: #42b983;
}
.hello-warning {
    color: red;
}
</style>
