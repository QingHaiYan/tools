<template>
    <div class=''>
        <el-menu 
        :default-active="activeIndex" 
        class="el-menu-demo" 
        mode="horizontal" 
        @select="handleSelect"
        :router="booleans"
        background-color="transparent"
        text-color="#fff"
        font-weight="bold"
        active-text-color="#4c89f2"
        >
        <el-submenu index="1">
            <template slot="title">关于我们</template>
            <el-menu-item index="2-1">企业介绍</el-menu-item>
            <el-menu-item index="2-2">荣誉资质</el-menu-item>
            <el-menu-item index="2-3">科技实力</el-menu-item>
            <el-menu-item index="2-4">企业环境</el-menu-item>
            <el-menu-item index="2-5">企业文化</el-menu-item>
            <el-menu-item index="2-6">企业视频</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">走进润一</template>
            <el-menu-item index="4"><a href="http://www.raonetech.com/" target="_blank">润一官网</a></el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">政策文件</template>
            <el-menu-item index="2-1">国家政策</el-menu-item>
            <el-menu-item index="2-2">行业标准</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">产品应用</template>
            <el-menu-item index="2-1">医卓通客户</el-menu-item>
            <el-menu-item index="2-2">易卓通客户</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title">产品资料</template>
            <el-menu-item index="2-1">医卓通</el-menu-item>
            <el-menu-item index="2-2">易卓通</el-menu-item>
            <el-menu-item index="2-3">标准图集</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
            <template slot="title">润一自研</template>
            <el-menu-item index="2-1">专利奖项</el-menu-item>
            <el-menu-item index="2-2">硬件产品</el-menu-item>
            <el-menu-item index="2-3">润一生态圈</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
            <template slot="title">专家风采</template>
            <el-menu-item index="2-1">院士简介</el-menu-item>
            <el-menu-item index="2-2">项目团队</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
            <template slot="title">案例短片</template>
            <el-menu-item index="2-1">电梯事故</el-menu-item>
            <el-menu-item index="2-2">电气事故</el-menu-item>
            <el-menu-item index="2-3">废水处理</el-menu-item>
        </el-submenu>
        </el-menu>
    </div>
</template>

<script>

export default {
    name:'Navigation',
    components: {},
    data() {
        return {
            activeIndex: '1',
            booleans:true,
        };
    },
    computed: {},
    watch: {},
    methods: {
        //1.跳转路由
        handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created() {

    },
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>

</style>