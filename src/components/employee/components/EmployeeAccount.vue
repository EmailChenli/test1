<template>
      <el-main>
        <el-form :model="QueryForm" ref="QueryForm" label-width="100px" class="demo-ruleForm" size="mini">
            <el-row>
              
                <el-col style="width: 250px;">
                    <el-form-item label="账号ID">
                        <el-input v-model="QueryForm.accountId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 250px;">
                    <el-form-item label="账号名">
                        <el-input v-model="QueryForm.accountName"></el-input>
                    </el-form-item>
                </el-col>
                
                <el-col :span="5">
                    <el-button type="primary" @click="accountfindlike" icon="el-icon-search">查询</el-button>
                    <el-button type="primary" plain @click="QueryForm.addButton= true;" icon="el-icon-edit">添加</el-button>
                </el-col>
            </el-row>
        </el-form>

        <el-header style="background-color:#C0C0C0"></el-header>

        <div v-if="QueryForm.requestResult">

             <el-table @row-click="handleEdit" :data="QueryForm.employeeaccount" style="width: 100%">
               
                <el-table-column prop="accountId" label="员工账号ID" width="180"></el-table-column>
                <el-table-column prop="accountName" label="员工账号" width="180"></el-table-column>
                <el-table-column prop="accountPassword" label="账号密码" width="180"></el-table-column>
                <el-table-column prop="employeeId" label="员工ID" width="180"></el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="180"></el-table-column>
                <el-table-column prop="modifyTime" label="修改日期" width="180"></el-table-column>
                <el-table-column label="操作" fixed="right" width="200px" style="float=left">
		                      <el-col :span="10">
			                      <el-tooltip effect="dark" content="编辑当前行" placement="top">
				                      <el-button size="mini"  type="primary" @click="QueryForm.updateButton = true" icon="el-icon-edit">编辑</el-button>
			                      </el-tooltip>
		                      </el-col>
                          <el-col :span="10">
                             <el-tooltip effect="dark" content="删除当前行" placement="top">
				                       <el-button size="mini"  type="danger"  @click="QueryForm.deleteButton = true" icon="el-icon-delete">删除</el-button>
			                       </el-tooltip>
                          </el-col>
	              </el-table-column>
            </el-table>
        </div>       
        <div v-else>
            请求失败！
        </div>
        <div style="margin-top: 5px;"></div><!--这个只是为了在页面上显示间隔-->
        <el-dialog title="添加员工账号" :visible.sync="QueryForm.addButton">
	             
                 <el-form :model="addForm">
                   <el-form-item  label="账号名" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.accountName" auto-complete="off"></el-input>
		            </el-form-item>
		             <el-form-item  label="账号密码" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.accountPassword" auto-complete="off"></el-input>
		            </el-form-item>
                     <el-form-item  label="账号ID" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.accountId" auto-complete="off"></el-input>
		            </el-form-item>
		             <el-form-item  label="创建时间" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.createTime" auto-complete="off"></el-input>
		            </el-form-item>
                    <el-form-item  label="员工ID" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.employeeId" auto-complete="off"></el-input>
		            </el-form-item>
		             <el-form-item  label="更改时间" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.modifyTime" auto-complete="off"></el-input>
		            </el-form-item>
	             </el-form>      
	         <div slot="footer" class="dialog-footer">
		          <el-button type="primary" @click="QueryForm.addButton = false">取 消</el-button>
		          <el-button type="denger"  @click="accountadd">确 定</el-button>
	         </div>
        </el-dialog>

        <div style="margin-top: 5px;"></div><!--这个只是为了在页面上显示间隔-->
        <el-dialog title="编辑账号" :visible.sync="QueryForm.updateButton">
	            <el-form :model="modifyForm">
		       
                     <el-form-item  label="账号名" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.accountName" auto-complete="off"></el-input>
		            </el-form-item>
		             <el-form-item  label="账号密码" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.accountPassword" auto-complete="off"></el-input>
		            </el-form-item>
                     <el-form-item  label="账号ID" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.accountId" auto-complete="off"></el-input>
		            </el-form-item>
		             <el-form-item  label="创建时间" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.createTime" auto-complete="off"></el-input>
		            </el-form-item>
                    <el-form-item  label="员工ID" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.employeeId" auto-complete="off"></el-input>
		            </el-form-item>
		             <el-form-item  label="更改时间" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.modifyTime" auto-complete="off"></el-input>
		            </el-form-item>
	            </el-form>
	         <div slot="footer" class="dialog-footer">
		          <el-button type="primary" @click="QueryForm.updateButton = false">取 消</el-button>
		          <el-button type="denger"  @click="accountupdate">确 定</el-button>
	         </div>
        </el-dialog>

         <el-dialog title="提示框" :visible.sync="QueryForm.deleteButton">   
              <p>是否永久删除该职位！！！</p>
           <div slot="footer" class="dialog-footer">
		          <el-button type="primary" @click="QueryForm.deleteButton = false">取 消</el-button>
		          <el-button type="denger"  @click="accountdelete">确 定</el-button>
	         </div>
        </el-dialog>
        <el-dialog title="提示框" :visible.sync="QueryForm.msgButton">   
              <p>操作成功！！！</p>
        </el-dialog>
      </el-main>
</template>

<style>
.el-header {
  background-color: #c1cbd8;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>

import {accountfindall} from '../api/employeeaccount'
import {accountupdate}  from '../api/employeeaccount'
import {accountfindlike}  from '../api/employeeaccount'
import {accountadd}  from '../api/employeeaccount'
import {accountdelete}  from '../api/employeeaccount'

export default {
  name: 'EmployeeAccount',
  data() {
        return {
          msg:'',
          code:'',
          // 定义一个数据集合
          QueryForm: {
                 msgButton:false,
				 deleteButton: false,
                 updateButton: false,
                 addButton: false,
                    accountId: '',
                    accountName: '',
                    accountPassword: '',
                    createTime: '',
                    employeeId: '',
                    modifyTime: '',
                 employeeaccount: [{
                    accountId: '',
                    accountName: '',
                    accountPassword: '',
                    createTime: '',
                    employeeId: '',
                    modifyTime: '',
                 }],
                 requestResult: false
          },modifyForm:{
				    formLabelWidth:'120px',
			        accountId: '',
                    accountName: '',
                    accountPassword: '',
                    createTime: '',
                    employeeId: '',
                    modifyTime: '',
          },findlikeForm:{
				    formLabelWidth:'120px',
				    accountId: '',
                    accountName: '',
                    accountPassword: '',
                    createTime: '',
                    employeeId: '',
                    modifyTime: '',
          },
          addForm:{
				    formLabelWidth:'120px',
				    accountId: '',
                    accountName: '',
                    accountPassword: '',
                    createTime: '',
                    employeeId: '',
                    modifyTime: '',
          }
        }
  },created(){
    this.accountall()
  },methods:{
      accountall() {
            accountfindall().then((res) => {
              //console.log(res);
              //console.log(this.department)
              this.QueryForm.employeeaccount = res.data.data;
              //console.log(this.QueryForm.department);
              //this.msg = res.data.msg;
              this.QueryForm.requestResult=true;
              //console.log(res.data);
            });
      },
      accountupdate(){
          console.log(this.modifyForm);
          //console.log(this.QueryForm.job);
            accountupdate(this.modifyForm).then((res)=>{
              this.QueryForm.updateButton= false;
              this.QueryForm.msgButton=true;
              console.log(res);
            });
      },
      handleEdit(currentrow) {
        this.modifyForm=currentrow;
      },
      accountfindlike(){
         this.findlikeForm.accountId=this.QueryForm.accountId;
         this.findlikeForm.accountName=this.QueryForm.accountName;
         console.log(this.findlikeForm);
        accountfindlike(this.findlikeForm).then((res)=>{
            this.QueryForm.employeeaccount= res.data.data;
            this.QueryForm.msgButton=true;
            console.log(res);
        });
      },
      accountdelete(){
         console.log(this.modifyForm);
         this.QueryForm.deleteButton = false;
        
      },
      accountadd(){
         console.log(this.modifyForm);
         this.QueryForm.addButton = false
      }
  }
}
</script>
