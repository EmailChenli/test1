<template>
  <div class="login_container">
<<<<<<< HEAD
    <div>
      <span class="font">东信门户管理系统</span>
    </div>
    <div class="login_box">
      <el-form class="login_form" :rules="loginRules" ref="loginFormRef" :model="loginForm" label-width="8px" auto-complete="on">
        <el-form-item prop="username">
          <el-input class="input" v-model="loginForm.username" prefix-icon="el-icon-user" auto-complete="on" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="input" v-model="loginForm.password" :type="passwordType" auto-complete="on" placeholder="请输入密码" prefix-icon="el-icon-lock" @keyup.enter.native="login">
            <i slot="suffix" class="el-icon-view el-input__icon" @click="showPassword"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-row :span="24">
                <el-col :span="13">
                    <el-input class="code" v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" size="min" @keyup.enter.native="login"></el-input>
                </el-col>
                <el-col :span="11">
                    <div class="login-code" @click="refreshCode">
                        <!--验证码组件-->
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="btns" type="primary" @click.native.prevent="login">登 录</el-button>
=======
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
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            auto-complete="on"
            placeholder="username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :type="passwordType"
            auto-complete="on"
            placeholder="username"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="login"
          >
            <i slot="suffix" class="el-icon-view el-input__icon" @click="showPassword"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btns" type="primary" @click.native.prevent="login">登录</el-button>
>>>>>>> 员工管理
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import SIdentify from '../components/login/SIdentify.vue'
export default {
  name: "userLogin",
  components: { SIdentify },
=======

export default {
  name: "userLogin",
>>>>>>> 员工管理
  data() {
  
    return {
      // 表单数据对象
      loginForm: {
        username: "admin",
        password: "123456",
<<<<<<< HEAD
        code:''
      },
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
      // 验证码
      identifyCode: '',
=======
      },
>>>>>>> 员工管理
      // 表单验证规则对象
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15个字符", trigger: "blur" },
        ],
<<<<<<< HEAD
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4个字符", trigger: "blur" },
        ],
=======
>>>>>>> 员工管理
      },
      passwordType: "password",
    };
  },
<<<<<<< HEAD
  created(){
      this.refreshCode()
  },
  mounted () {
    // 初始化验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 显示密码
=======
  methods: {
>>>>>>> 员工管理
    showPassword() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
<<<<<<< HEAD
     // 重置验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成验证码
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    // 生成随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 登录
    login() {
      if (this.identifyCode !== this.loginForm.code) {
        this.code = '';
        this.$message.error('请填写正确验证码')
        this.refreshCode()
        return
      }
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        // 通过编程式导航跳转到后台主页，路由地址是/home
=======
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        // const { data: res } = await this.$http.post("login", this.loginForm);
        // if (res.meta.status !== 200) return this.$message.error("登录失败!");
        // this.$message.success("登陆成功");
        // // 1.将登陆成功后的token，保存到客户端的sessionStorage中
        // // 1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        // // 1.2 token 只应子当前网站打开期间生效，所以讲token保存在sessionStorage中
        // window.sessionStorage.setItem("token", res.data.token);
        // // 2.通过编程式导航跳转到后台主页，路由地址是/home
>>>>>>> 员工管理
         this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
<<<<<<< HEAD
  background-image: url('../assets/img/bg.png');
  background-size: cover;
=======
  background-color: #2b4b6b;
>>>>>>> 员工管理
  height: 100%;
}

.login_box {
  height: 300px;
  width: 400px;
<<<<<<< HEAD
  background:rgba(255, 255, 255, 0.7);
  position: absolute;
  left: 50%;
  top: 60%;
=======
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
>>>>>>> 员工管理
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
<<<<<<< HEAD
  bottom: 18px;
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}

 /*输入框样式*/
 .input{
  width: 270px;
 }

 /*验证码样式*/
.code{
    width:120px;
    height:25px;
    border:0px;
}
.login-code{
    width:120px;
    cursor: pointer;
}

/*登录按钮样式*/
=======
  bottom: 30px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

>>>>>>> 员工管理
.btns {
  width: 60%;
  border: 0px;
  align-self: center;
<<<<<<< HEAD
  background-color: #336699;
}

.font{
    position: relative;
    top: 120px;
    font-size: 60px;
    font-weight:bold;
    font-family: 'Times New Roman', Times, serif;
    color: #003366;
}
</style>

=======
}
</style>
>>>>>>> 员工管理
