<template>
  <div id="Register">
    <v-BackHeader></v-BackHeader>
    <section class="wrap">
      <el-card class="box-card-1">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <el-form action="/register" ref="register_form" :model="register_form" method="post" label-width="80px"
                 label-position="left">
          <el-form-item label="pubKey" prop="pubKey">
            <el-input type="textarea" v-model="register_form.pubKey"></el-input>
          </el-form-item>
          <el-form-item label="name" prop="name">
            <el-input v-model="register_form.name"></el-input>
          </el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="register('register_form')"
                     class="form_register">register
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
          name: ''
        },
        loading: false,
      }
    },
    methods: {
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
                // alert("账号或密码错误！")
              }
            })
          }
        })
      },

    },
    components: {
      "v-BackHeader": BackHeader,
    },
  }
</script>

<style scoped>
  #Login {
    width: 100%;
  }

  .wrap {
    position: absolute;
    width: 25%;
    top: 30%;
    left: 35%;
  }

  .formCodeInp {
    width: 50%;
    float: left;
  }

  .form_register {
    text-align: right;
  }

  .form_Login {
    width: 100%;
    margin-top: 10px;
  }

  .el-link.el-link--default {
    text-decoration: none;
  }

  .box-card-1 {
    border: 1px solid #EBEEF5;
    background-color: #FFF;
  }
</style>
