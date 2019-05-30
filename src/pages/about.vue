<template>
    <div class="about-contanier">
        <h1 class="about-msg">
            {{msg}}
        </h1>
        <div class="app-box">
            <HuiDatepicker
                title="hui datepicker"
            />
        </div>
    </div>
</template>

<script>
import HuiDatepicker from "../components/hui-datepicker";

export default {
    name: "About",
    components: {
        HuiDatepicker,
    },
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
