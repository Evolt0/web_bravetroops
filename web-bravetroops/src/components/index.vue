<template>
  <div class="index">
    <el-container>
      <v-header :name='name'></v-header>
      <router-view></router-view>
      <el-footer>
        <el-card class="box-card footer—card" shadow="none" style="height: auto;">
          <h2><i class="el-icon-info"></i>Evolt0 Studio</h2>
          <p>Copyright © 2021 V.1.5.0</p>
          <div class="block">
            <el-rate
              v-model="value"
              :colors="colors">
            </el-rate>
          </div>
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
        id: 0,
        value: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      };
    },
    components: {
      "v-header": header,
    },
  }
</script>

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
