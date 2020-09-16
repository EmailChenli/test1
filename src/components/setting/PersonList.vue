<template>
  <div>
    <el-card>
      <div slot="header" class="card-header-text">
        <span>个人信息</span>
      </div>
      <!-- 个人信息表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
             <el-form-item label="姓名" prop="name"><el-input v-model="form.password"></el-input></el-form-item> 
          </el-col>
          <el-col :span="12">
             <el-form-item label="头像" prop="avatar"><el-input v-model="form.password"></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
             <el-form-item label="工号" prop="id"><el-input v-model="form.password"></el-input></el-form-item> 
          </el-col>
          <el-col :span="12">
             <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="form.sex">
                    <el-radio class="radio" label="1">男</el-radio>
                    <el-radio class="radio" label="0">女</el-radio>
            </el-radio-group>
             </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
             <el-form-item label="部门" prop="department"><el-input v-model="form.department"></el-input></el-form-item> 
          </el-col>
          <el-col :span="12">
             <el-form-item label="职位" prop="job"><el-input v-model="form.job"></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
             <el-form-item label="电话" prop="phone"><el-input v-model="form.phone"></el-input></el-form-item> 
          </el-col>
          <el-col :span="12">
             <el-form-item label="邮箱" prop="email"><el-input v-model="form.email"></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
             <el-form-item label="学历" prop="education"><el-input v-model="form.education" disabled></el-input></el-form-item> 
          </el-col>
          <el-col :span="12">
             <el-form-item label="身份证号" prop="personID"><el-input v-model="form.personID" disabled></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="居住地址" prop="address"><span>{{form.address}}</span></el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="onSubmit(form)">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            // 表单数据
            form:{}
        }
    },
    methods:{
        // 保存修改
        save(){

        }
    }
};
</script>

<style lang="less" scoped>

.el-form{
    width: 70%;
    margin: 0 auto;
}

.btn{
    width:120px;
    
}
.el-card{
    box-shadow: 0 1px 1px rgba(0,0, 0, 0.15)!important;
    width: 98%;
    margin:15px auto;
  }

.card-header-text{
      text-align: left;
  }
</style>
