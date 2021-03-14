<template>
  <div class="main">
    <el-main>
      <el-card>
        <router-view :key="key"></router-view>
        <el-card class="blog_card_collapse">
          <div class="blog_card_collapse_button">
            <el-button type="primary" @click="POW()" plain>最新POW</el-button>
            <el-button type="primary" plain>
              <el-link href="/#/pow" target="_blank">获取货币</el-link>
            </el-button>
            <!-- <el-button type="primary" plain>最新评论</el-button> -->
          </div>
          <el-collapse>
            <el-collapse-item title="安全性 Safety" name="1">
              <div>网络传输安全：数据传输使用用户私钥签名，实现请求不可以篡改和伪造；</div>
              <div>货币安全：除了用户私钥谁也不能操作用户货币。</div>
            </el-collapse-item>
            <el-collapse-item title="抗抵赖性 Non-repudiation" name="2">
              <div>区块链多账本：多账本实现是交易一旦达成边不可修改；</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
              <div>联盟可控：区块链组件都是可控添加的；</div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-card>
    </el-main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        target: {}
      };
    },
    methods: {
      POW: function () {
        let that = this;
        let reqUrl = "mining/getTarget";
        that.$http.post(reqUrl).then((response) => {
          that.target = response.data.data
          this.$notify({
            title: 'POW题目',
            dangerouslyUseHTMLString: true,
            message: '前缀：' + that.target.prefix + '<br>零数：' + that.target.numZero,
            type: 'success'
          });
        }, function (err) {
          console.log(err);
        })
      },
    },
    computed: {
      key() {
        return this.$route.path + Math.random();
      }
    }

    //进入页面后请求的初始数据

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #blog_button_person {
    width: 100%;
    height: 100%;
  }

  .blog_card_article {
    width: 65%;
    float: left;
    margin-left: 4%;
  }

  .blog_card_article_title {
    line-height: 2em;
  }

  .blog_card_collapse {
    width: 20%;
    float: left;
    margin: 5%;

  }

  .blog_card_title {
    font-size: 18px;
  }

  .blog_card_text {
    font-size: 14px;
    margin-bottom: 18px;
  }

  .blog_card_describes {
    text-indent: 2em;
    text-align: left;
    line-height: initial;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
