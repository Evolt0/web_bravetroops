<template>
  <div class="articleList">
    <div class="blog_card_article">
      <el-card v-for="(article,index) in data.data.list" :key="index" class="box-card" shadow="never"
               style="margin:10px 0">
        <div slot="header" class="clearfix blog_card_article_title">
          <span class="blog_card_title">{{article.name}}</span>
          <router-link :to="'/content?id='+encodeURIComponent(article.id)+'&name='+article.name">
            <el-button style="float: right; padding: 3px 0" type="text">转账</el-button>
          </router-link>
        </div>
        <div class="text item blog_card_text">
          <p class="blog_card_describes">账户：{{article.id}}</p>
          <p class="blog_card_describes">余额：{{article.banlance}}</p>
          <p class="blog_card_describes">创建时间：{{article.createAt}}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeNames: ['1'],
        data: {
          code: 0,
          data: {
            list: []
          },
          msg: "",
        },
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    },
    //进入页面后请求的初始数据
    created() {
      let that = this;
      let reqUrl = "user/list";
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
</style>
