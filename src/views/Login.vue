<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        class="login_form"
        :rules="loginRules"
        ref="loginFormRef"
        :model="loginForm"
        label-width="8px"
        auto-complete="on" 
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" 
          prefix-icon="el-icon-user"
          auto-complete="on" 
          placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" 
          :type="passwordType" 
          auto-complete="on" 
          placeholder="username"
          prefix-icon="el-icon-lock"
          @keyup.enter.native="login">
            <i slot="suffix" class="el-icon-view el-input__icon" @click="showPassword"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btns" type="primary" 
          @click.native.prevent="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import{ isValidUsername }from '../utils/validate.js'

export default {
  name: "userLogin",
  data() {
    // 验证用户名
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    // 验证密码
    const validatePassword = (rule, value, callback) => {
      if (value<6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 表单验证规则对象
      loginRules: {
        username: [{ required: true, trigger: "blur", validator: validateUsername }],
        password: [{ required: true, trigger: "blur", validator: validatePassword }],
        
      },
      passwordType: "password",
    };
  },
  methods:{
    showPassword(){
      if(this.passwordType === 'password'){
        this.passwordType = ''
      }else{
        this.passwordType = 'password'
      }
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return;
        // const { data: res } = await this.$http.post("login", this.loginForm);
        // if (res.meta.status !== 200) return this.$message.error("登录失败!");
        // this.$message.success("登陆成功");
        // // 1.将登陆成功后的token，保存到客户端的sessionStorage中
        // // 1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        // // 1.2 token 只应子当前网站打开期间生效，所以讲token保存在sessionStorage中
        // window.sessionStorage.setItem("token", res.data.token);
        // // 2.通过编程式导航跳转到后台主页，路由地址是/home
        // this.$router.push("/home");
      });
      this.$router.push("/home");
    }
  }
}
   
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  height: 300px;
  width: 400px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  width: 60%;
  border: 0px;
  align-self: center;
}
</style>
