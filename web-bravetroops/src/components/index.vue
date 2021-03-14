<template>
  <div class="index">
    <el-container>
      <v-header :name='name'></v-header>
      <router-view></router-view>
      <el-footer>
        <el-card class="box-card footer—card" shadow="none" style="height: auto;">
          <h2><i class="el-icon-info"></i>Evolt0 Studio</h2>
          <p>Copyright © 2021 V.1.5.0</p>
        </el-card>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import header from './header'

  export default {
    data() {
      return {
        name: '',
        id: 0
      };
    },
    components: {
      "v-header": header,
    },
    created() {
      /*this.name = sessionStorage.getItem("name");
        this.id = sessionStorage.getItem("id");*/
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    height: 100%;
    width: 100%;
  }

  .el-container {
    height: 100%;
  }

  .el-footer {
    height: auto ! important;
    padding: 0 0px;
  }
</style>
