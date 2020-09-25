<template>
  <div class="login_container">
    <div>
      <span class="font">东信门户管理系统</span>
    </div>
    <div class="login_box">
      <el-form class="login_form" :rules="loginRules" ref="loginFormRef" :model="loginForm" label-width="8px" auto-complete="on">
        <el-form-item prop="sysuserAccount">
          <el-input class="input" v-model="loginForm.sysuserAccount" prefix-icon="el-icon-user" auto-complete="on" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="sysuserPassword">
          <el-input class="input" v-model="loginForm.sysuserPassword" show-password auto-complete="on" placeholder="请输入密码" prefix-icon="el-icon-lock" @keyup.enter.native="login">
            
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
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from '../components/login/SIdentify.vue'
import { login } from '@/components/employee/api/login'




export default {
  name: "userLogin",
  components: { SIdentify },
  data() {
  
    return {
      // 表单数据对象
      loginForm: {
        sysuserAccount: '',
        sysuserPassword: '',
        code:''
      },
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
      // 验证码
      identifyCode: '',
      // 表单验证规则对象
      loginRules: {
        sysuserAccount: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" },
        ],
        sysuserPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15个字符", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4个字符", trigger: "blur" },
        ],
      }
    };
  },
  created(){
      this.refreshCode()
  },
  mounted () {
    // 初始化验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    
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
      //ref数组，包括多个验证对象；
      this.$refs.loginFormRef.validate((valid) => {
        var bcrypt = require('../../node_modules/bcryptjs/dist/bcrypt')
        //var salt = bcrypt.getSaltSync(12);
        var hash = bcrypt.hashSync("123456",12);
        //console.log(hash);
        if (!valid){ return;}       
         // 通过编程式导航跳转到后台主页，路由地址是/home
        login(this.loginForm).then((res)=>{
          //每个人,生成是不同的，不可以通过访问；
          localStorage.setItem('token',res.data.data.token);
          localStorage.setItem('info',res.data.data.data.sysuserAccount);
          this.$router.push("/home");
        })

      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-image: url('../assets/img/bg.png');
  background-size: cover;
  height: 100%;
}

.login_box {
  height: 300px;
  width: 400px;
  background:rgba(255, 255, 255, 0.7);
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
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
.btns {
  width: 60%;
  border: 0px;
  align-self: center;
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

