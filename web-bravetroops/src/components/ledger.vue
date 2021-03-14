<template>
  <div class="ledger">
    <div class="blog_card_article">
      <el-card v-for="(amount,index) in data.data.list" :key="index" class="box-card" shadow="never"
               style="margin:10px 0">
        <div class="text item blog_card_text">
          <p class="blog_card_describes">发送方ID：{{amount.sID}}</p>
          <p class="blog_card_describes">发送方：{{amount.sName}}</p>
          <p class="blog_card_describes">接收方ID：{{amount.rID}}</p>
          <p class="blog_card_describes">接收方：{{amount.rName}}</p>
          <p class="blog_card_describes">金额：{{amount.change}}</p>
          <p class="blog_card_describes">创建时间：{{amount.createAt}}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          code: 0,
          data: {
            list: [],
          },
          msg: "",
        },
      };
    },
    methods: {},
    //进入页面后请求的初始数据
    created() {
      let that = this;
      let reqUrl = "ledger/list";
      that.$http.post(reqUrl).then((response) => {
        console.log(response.data)
        this.data = response.data;
      }, function (err) {
        console.log(err);
      })
    },
  }
</script>
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
</style>
