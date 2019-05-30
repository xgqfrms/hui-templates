<template>
    <div class="index-contanier">
        <h1 class="index-msg">
            {{msg}}
        </h1>
        <div class="app-box">
            <HelloWorld
                msg="Welcome to hui App"
            />
        </div>
    </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
    name: "app",
    components: {
        HelloWorld,
    },
    data() {
        return {
            msg: "Index Page",
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
};
</script>

<style>

.app-box {
    margin: 0.5rem;
    padding: 1rem;
    border: 1px solid #666;
    border-radius: 1rem;
    box-shadow: .3rem 0.3rem #ccc;
}

</style>

<style scoped>
.index-container {
    box-sizing: border-box;
}
.index-msg {
    color: #abcdef;
}
.index-name {
    color: #42b983;
}
.index-warning {
    color: red;
}
</style>
