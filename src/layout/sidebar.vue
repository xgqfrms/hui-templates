<template>
    <div class="layout">
        <h-row name="flex">
            <h-col span="5" class="layout-menu-left">
                <h-menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                    <div class="layout-logo-left"></div>
                    <h-submenu name="1">
                        <template slot="title">
                            <h-icon name="ios-navigate"></h-icon>
                            导航一
                        </template>
                        <h-menu-item name="1-1">
                            <router-link to="/index">Index</router-link>
                        </h-menu-item>
                        <h-menu-item name="1-2">选项 2</h-menu-item>
                        <h-menu-item name="1-3">选项 3</h-menu-item>
                    </h-submenu>
                    <h-submenu name="2">
                        <template slot="title">
                            <h-icon name="ios-keypad"></h-icon>
                            导航二
                        </template>
                        <h-menu-item name="2-1">选项 1</h-menu-item>
                        <h-menu-item name="2-2">选项 2</h-menu-item>
                    </h-submenu>
                    <h-submenu name="3">
                        <template slot="title">
                            <h-icon name="ios-analytics"></h-icon>
                            导航三
                        </template>
                        <h-menu-item name="3-1">选项 1</h-menu-item>
                        <h-menu-item name="3-2">选项 2</h-menu-item>
                    </h-submenu>
                </h-menu>
            </h-col>
            <h-col span="19">
                <div class="layout-header"></div>
                <!-- <div class="layout-breadcrumb">
                    <h-breadcrumb>
                        <h-breadcrumb-item href="#">首页</h-breadcrumb-item>
                        <h-breadcrumb-item href="#">应用中心</h-breadcrumb-item>
                        <h-breadcrumb-item>某应用</h-breadcrumb-item>
                    </h-breadcrumb>
                </div> -->
                <div class="layout-content">
                    <div class="layout-content-main">
                        <!-- 内容区域 -->
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2019-2020 &copy; gildata
                </div>
            </h-col>
        </h-row>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>
