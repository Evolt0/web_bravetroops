<template>
  <div class="header">
    <el-header class="blog_header">
      <el-menu :default-active="$route.path" :router="true" class="el-menu-demo" menu-trigger="click" mode="horizontal">
        <el-menu-item><span><i class="el-icon-s-tools"></i></span></el-menu-item>
        <el-menu-item index="/index/main/articlelist">首页</el-menu-item>
        <el-menu-item index="/index/main/ledger">账本</el-menu-item>
        <el-menu-item index="/index/main/mining">货币产出</el-menu-item>
        <el-menu-item index="/index/about">关于</el-menu-item>
        <div class="header_login header_right" v-show="show">
          <el-menu-item index="/register">注册</el-menu-item>
        </div>
        <!-- <div class="header_user header_right"> -->
        <el-menu :default-active="$route.path" :router="true" class="el-menu-demo row header_user header_right"
                 mode="horizontal" menu-trigger="click" v-show="!show">
          <el-tag> {{name}}</el-tag>
        </el-menu>
      </el-menu>
    </el-header>
  </div>
</template>
<script>
  export default {
    name: 'Header',
    props: ['name'],
    data() {
      return {
        show: true
      };
    },
    methods: {
      checkUser(name) {
        if (name) {
          this.show = false;
        }
      }
    },
    created() {
      this.checkUser(this.name);
    },
  }
</script>
<style scoped>
  .header {
    width: 100%;
    z-index: 2;
  }

  .blog_header {
    padding: 0;
  }

  .header_login {
    display: flex;
  }

  .header_right {
    float: right;
    margin-right: 5%;
    margin-top: 0.5%;
  }
</style>
