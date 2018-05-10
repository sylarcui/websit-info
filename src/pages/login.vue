<template>
  <div class="login-wrapper">
    <div class="login-decoration">
      <div class="login-decoration-text">
        <h3 class="login-h3">欢迎登录</h3>
        <h2 class="login-h2">政企信息化管理平台</h2>
        <h4 class="login-h4">陕西省西安市地方税务局</h4>
        <div class="login-icon-list">
          <span class="login-icon">
            <div class="login-icon-c"><icon :icon="['fas', 'question']"></icon></div>
            <span class="login-icon-tit">帮助中心</span>
          </span>
          <span class="login-icon">
            <div class="login-icon-c"><icon :icon="['fas', 'phone-volume']"></icon></div>
            <span class="login-icon-tit">联系我们</span>
          </span>
        </div>
      </div>
      <div class="login-form">
        <div class="form-tit">登录<small>LOGIN</small></div>
        <div class="login-form-list">
          <el-input v-model="userName" placeholder="用户名" size="small"></el-input>
        </div>
        <div class="login-form-list">
          <el-input v-model="passWord" type="password" placeholder="密码" size="small"></el-input>
        </div>
        <div class="login-form-list">
          <el-button type="primary"  size="small" @click="goLogin">登录</el-button>
          <el-button type="info"   size="small">取消</el-button>
          <small><a href="#"> 忘记密码？</a></small>
        </div>
        <div class="copyright">
          上海华扬联众数字技术有限公司<br/>
          陕ICP：2348910-4
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      passWord: ''
    }
  },
  methods: {
    goLogin () {
      this.$router.push({ name: 'main' })
    }
  }
}
</script>

<style scoped lang="scss">
  .login-wrapper {
    width: 100%;
    height: 100%;
    background: url("../assets/images/login-bg.jpg") no-repeat center;
    background-size: cover;
    .login-decoration {
      width: rem(800);
      height: rem(300);
      background: url("../assets/images/login-bg2.jpg") no-repeat center;
      background-size: cover;
      position: absolute;
      top: 50%;
      margin-top: rem(-150);
      left: 50%;
      margin-left: rem(-400);
      .login-decoration-text {
        position: relative;
        height: 100%;
        width: 100%;
        background-color: rgba(37, 50, 69, 0.8);
        color: white;
        font-weight: normal;
        padding-top: rem(50);
        padding-left: rem(40);
        line-height: 1.8;
        h2,h3,h4 {
          font-weight: 100;
        }
        .login-icon-list {
          padding-top: rem(30);
          line-height: 1;
          .login-icon {
            width: rem(80);
            height: rem(80);
            display: inline-block;
            .login-icon-c {
              width: rem(50);
              height: rem(50);
              margin: 0 auto;
              line-height: rem(50);
              text-align: center;
              font-size: rem(30);
              border: rem(1) solid #ffffff;
              border-radius: 100%;
            }
            .login-icon-tit {
              text-align: center;
              display: block;
              line-height: rem(26);
              font-size: rem(12);
            }
          }
        }
      }
      .login-form {
        width: rem(300);
        height: rem(360);
        background-color: rgba(255,255,255,1);
        position: absolute;
        right: rem(50);
        top: rem(-30);
        padding: rem(50);
        color: rgba(37, 50, 69, 1);
        .login-form-list {
          margin:rem(20) 0;
          .el-button {
            width: 46.2%;
          }
          small {
            font-size: rem(12);
            line-height: rem(30);
            a {
              color: #999999;
            }
          }
        }
        .copyright {
          text-align: center;
          font-size: rem(12);
          color: #999999;
          line-height: rem(30);
        }
      }
    }
  }
</style>
