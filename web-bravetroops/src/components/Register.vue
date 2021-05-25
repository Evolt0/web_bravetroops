<template>
  <div id="Register">
    <v-BackHeader></v-BackHeader>
    <section class="wrap">
      <el-card class="box-card-1">
        <div slot="header" class="clearfix">
          <span>注册</span>
        </div>
        <el-form action="/register" ref="register_form" :model="register_form" method="post" label-width="80px"
                 label-position="left">
          <el-button type="primary" :loading="loading" @click="generate()"
                     class="form_register">Generate
          </el-button>
          <el-form-item label="私钥">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 28}" :disabled="true"
                      v-model="register_form.priKey"></el-input>
          </el-form-item>
          <el-form-item label="公钥" prop="pubKey">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 9}" :disabled="true"
                      v-model="register_form.pubKey"></el-input>
          </el-form-item>
          <el-form-item label="name" prop="name">
            <el-input v-model="register_form.name"></el-input>
          </el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="register('register_form')"
                     class="form_register">Register
          </el-button>
        </el-form>
      </el-card>

    </section>
  </div>
</template>

<script>
  import BackHeader from './common/BackHeader';
  import sha256 from 'crypto-js/sha256';
  import Base64 from 'crypto-js/enc-base64';
  export default {
    name: 'register',
    data() {
      return {
        register_form: {
          id: '',
          pubKey: '',
          priKey: '',
          name: ''
        },
        gen: {},
        loading: false,
      }
    },
    methods: {
      generate: function () {
        let that = this;
        let reqUrl = "user/gen";
        that.$http.post(reqUrl).then((response) => {
          this.gen = response.data.data
          this.register_form.priKey = this.gen.pri
          this.register_form.pubKey = this.gen.pub
        }, function (err) {
          console.log(err);
        })
      },
      register(formName) {
        let _this = this
        _this.register_form.id = Base64.stringify(sha256(_this.register_form.pubKey))
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('user/', JSON.stringify(_this.register_form), {headers: {'Content-Type': 'application/json'}}).then(response => {
              if (response.data.code === 200) {
                this.$message({
                  message: response.data.msg,
                  type: 'success',
                  center: true
                })
                setTimeout(() => {
                  _this.$router.push({
                    path: '/index'
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
                    path: '/register'
                  })
                }, 1500)
              }
            })
          }
        })
      }
      ,

    },
    components: {
      "v-BackHeader": BackHeader,
    },
  }
</script>

<style scoped>
  #Register {
    width: 100%;
  }

  .wrap {
    position: absolute;
    width: 50%;
    top: 30%;
    left: 25%;
  }


  .form_register {
    width: 100%;
    height: 10%;
    text-align: center;
    margin-bottom: 5%;
  }

  .box-card-1 {
    border: 1px solid #EBEEF5;
    background-color: #FFF;
  }
</style>
