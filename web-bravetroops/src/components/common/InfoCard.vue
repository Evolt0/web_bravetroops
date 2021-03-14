<template>
  <div id="InfoCard">
    <section class="container-1">
      <el-card class="box-card info_card" shadow="none">
        <div class="clearfix">
          <span><h1>Studio</h1></span>
        </div>
        <div class="text item infocard_text">
          <p>{{"学习交流"}}</p>
          <p>{{"目前使用语言、框架及组件Java,GO，Spring Boot，GIN，Fabric，vue，element-ui"}}</p>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'InfoCard',
  }
</script>
<style scoped>
  .container-1 {
    position: relative;
    width: 50%;
    top: 35%;
    left: 15%;
  }

  .info_card {
    border: none;
    background-color: #fff0;
    width: 100%;
    height: 300px;
  }

  .infocard_text {
    font-size: 18px;
    text-align: left;
    margin-bottom: 18px;
  }

  .clearfix {
    text-align: left;
    margin-bottom: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
