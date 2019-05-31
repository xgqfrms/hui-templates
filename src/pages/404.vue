<template>
    <div class="error-contanier">
        <!-- <h1 class="error-msg">
            {{msg}}
        </h1> -->
        <div class="app-box">
            <h1>404 page</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "Error",
    data() {
        return {
            msg: "Error Page",
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
.app-box > h1{
    color: #f00;
}
</style>

<style scoped>
.error-container {
    box-sizing: border-box;
}
.error-msg {
    color: #abcdef;
}
.error-name {
    color: #42b983;
}
.error-warning {
    color: red;
}
</style>
