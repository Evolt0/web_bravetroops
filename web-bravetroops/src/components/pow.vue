<template>
  <div class="pow">
    <v-header :name='name'></v-header>
    <el-main class="pow_main">
      <el-card class="box-card">
        <div class="text item blog_card_text">
          <el-form ref="tForm" :model="tForm" label-width="80px">
            <el-form-item label="公钥">
              <el-input type="textarea" v-model="tForm.pub"></el-input>
            </el-form-item>
            <el-form-item label="私钥">
              <el-input type="textarea" v-model="tForm.pri"></el-input>
            </el-form-item>
            <el-form-item label="计算机结果hash">
              <el-input v-model="tForm.hash"></el-input>
            </el-form-item>
            <el-form-item label="计算机结果">
              <el-input v-model="tForm.result"></el-input>
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
  import header from './common/header'
  import JSEncrypt from 'jsencrypt';
  import CryptoJs from 'crypto-js';
  import Base64 from "crypto-js/enc-base64";
  import sha256 from "crypto-js/sha256";

  export default {
    data() {
      return {
        name: '',
        tForm: {
          pub: '',
          pri: '',
          hash: '',
          result: '',
        },
        data: {
          id: "",
          result: "",
          resultHash: "",
          timestamp: 0,
        },
        pow: {
          id: "",
          result: "",
          resultHash: "",
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
        _this.data.id = Base64.stringify(sha256(_this.tForm.pub));
        _this.data.result = _this.tForm.result
        _this.data.resultHash = _this.tForm.hash
        _this.data.timestamp = timestamp;
        console.log(JSON.stringify(this.data))
        let sign = new JSEncrypt();
        sign.setPrivateKey(_this.tForm.pri);
        let signature = sign.sign(JSON.stringify(this.data), CryptoJs.SHA256, "sha256");
        _this.pow.id = _this.data.id
        _this.pow.result = _this.tForm.result
        _this.pow.resultHash = _this.tForm.hash
        _this.pow.sign = signature
        _this.pow.timestamp = _this.data.timestamp
        console.log(JSON.stringify(this.pow))
        /* this.$http.post('/ledger/transfer', JSON.stringify(this.transfer), {headers: {'Content-Type': 'application/json'}}).then(response => {
           if (response.data.code === 200) {
             this.$message({
               message: response.data.message,
               type: 'success',
               center: true
             })
           } else {
             this.$message({
               message: response.data.message,
               type: 'error',
               center: true
             })
           }
         })*/
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
  .pow {
    height: 100%;
  }
  .pow_main{
    width: 100%;
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
