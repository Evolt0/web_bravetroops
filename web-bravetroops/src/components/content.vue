<template>
  <div class="content">
    <v-header :name='name'></v-header>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix blog_card_article_title">
          <span class="blog_card_title">{{this.name}}</span>
        </div>
        <div class="text item blog_card_text">
          <el-form ref="tForm" :model="tForm" label-width="80px">
            <el-form-item label="公钥">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 9}" v-model="tForm.pub"></el-input>
            </el-form-item>
            <el-form-item label="私钥">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 28}" v-model="tForm.pri"></el-input>
            </el-form-item>
            <el-form-item label="转帐金额">
              <el-input v-model.number="tForm.change" type="number"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('tForm')">转账</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
  import header from './header'
  import JSEncrypt from 'jsencrypt';
  import CryptoJs from 'crypto-js';
  import Base64 from "crypto-js/enc-base64";
  import sha256 from "crypto-js/sha256";

  export default {
    data() {
      return {
        art_id: '',
        name: '',
        tForm: {
          pub: '',
          pri: '',
          change: 0.0,
        },
        data: {
          change: 0.0,
          id: "",
          rID: "",
          timestamp: 0,
        },
        transfer: {
          change: 0.0,
          id: "",
          rID: "",
          sign: "",
          timestamp: 0,
        },
      };
    },
    components: {
      "v-header": header
    },
    methods: {
      onSubmit: function (formName) {
        let _this = this
        let timestamp = Date.parse(new Date()) / 1000;
        _this.data.rID = this.art_id;
        _this.data.change = _this.tForm.change;
        _this.data.id = Base64.stringify(sha256(_this.tForm.pub));
        _this.data.timestamp = timestamp;
        console.log(JSON.stringify(this.data))
        let sign = new JSEncrypt();
        sign.setPrivateKey(_this.tForm.pri);
        let signature = sign.sign(JSON.stringify(this.data), CryptoJs.SHA256, "sha256");
        _this.transfer.change = _this.data.change
        _this.transfer.id = _this.data.id
        _this.transfer.rID = this.art_id
        _this.transfer.sign = signature
        _this.transfer.timestamp = _this.data.timestamp
        console.log(JSON.stringify(this.transfer))
        this.$http.post('/ledger/transfer', JSON.stringify(this.transfer), {headers: {'Content-Type': 'application/json'}}).then(response => {
          if (response.data.code === 200) {
            this.$message({
              message: response.data.msg,
              type: 'success',
              center: true
            })
            setTimeout(() => {
              _this.$router.push({
                path: '/index/main/ledger'
              })
            }, 1500)
          } else {
            this.$message({
              message: response.data.msg,
              type: 'error',
              center: true
            })
            setTimeout(() => {
              _this.$router.push({
                path: '/content'
              })
            }, 1500)
          }
        }).catch((err) => {
          this.$message({
            message: err.msg,
            type: 'error',
            center: true
          })
        })
      }
    },
    //进入页面后请求的初始数据
    created() {
      this.art_id = decodeURIComponent(this.$route.query.id);
      this.name = this.$route.query.name;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    height: 100%;
  }

  .blog_card_title {
    font-size: 18px;
  }

  .blog_card_text {
    font-size: 14px;
    margin-bottom: 18px;
  }

  .blog_card_content {
    text-indent: 2em;
    text-align: left;
    line-height: initial;
  }
</style>
