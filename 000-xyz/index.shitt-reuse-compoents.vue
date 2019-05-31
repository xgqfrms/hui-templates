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

// alias / shortcut / shorthand
const log = console.log;

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
            let to_path = to.path;
            let from_path = from.path;
            log(`watch to =`, to_path);
            log(`watch from =`, from_path);
            if (to_path !== "/index") {
                this.isShowId = true;
            } else {
                this.isShowId = false;
            }
        },
    },
    beforeRouteUpdate (to, from, next) {
        // eslint-disable-next-line
        log(`Update to =`, to);
        log(`Update from =`, from);
        let id = to.params.id;
        log(`to uid=`, id);
        this.uid = to.params.id;
        let path = to.path;
        // this.$route.push(path);
        next();
    },
    beforeRouteLeave (to, from, next) {
        log(`Leave to =`, to);
        log(`Leave from =`, from);
        next();
    },
    beforeRouteEnter (to, from, next) {
        log(`Leave to =`, to);
        log(`Leave from =`, from);
        next(vm => {
            // 通过 `vm` 访问组件实例
            log(`Enter vm`, vm);
        });
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
