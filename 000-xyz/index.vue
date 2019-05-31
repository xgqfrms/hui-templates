<template>
    <div class="index-contanier">
        <h1 class="index-msg">
            {{msg}}
        </h1>
        <div v-if="isShowId">
            <span>props id:{{id}}</span>
            <br/>
            <span>route.params id: {{uid}}</span>
        </div>
        <div class="app-box">
            <HelloWorld
                msg="Welcome to hui App"
            />
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import HelloWorld from "../components/HelloWorld";

export default {
    name: "Index",
    props: [
        "id",
    ],
    components: {
        HelloWorld,
    },
    data() {
        return {
            msg: "Index Page",
            uid: "",
            isShowId: false,
        };
    },
    methods: {
        //
    },
    mounted() {
        let id = this.$route.params.id;
        if (id) {
            this.isShowId = true;
            this.uid = id;
        } else {
            this.isShowId = false;
            this.uid = "";
        }
    },
    activated() {
        //
    },
    watch: {
        "$route" (to, from) {
            // 对路由变化作出响应...
            let to_path = to.path;
            let from_path = from.path;
            console.log(`to =`, to_path);
            console.log(`from =`, from_path);
            if (to_path !== "/index") {
                this.isShowId = true;
            } else {
                this.isShowId = false;
            }
            // console.log(`to =`, to);
            // console.log(`from =`, from);
        },
    },
    // beforeRouteUpdate (to, from, next) {
    //     console.log(`to =`, to);
    //     console.log(`from =`, from);
    //     // react to route changes...
    //     // don't forget to call next()
    //     // this.name = to.params.name;
    //     let name = to.params.name;
    //     // eslint-disable-next-line
    //     console.log(`to name=`, name);
    //     // this.$route.push();
    //     next();
    // },
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
