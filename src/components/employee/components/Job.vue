<template>
      <el-main>
        <el-form :model="QueryForm" ref="QueryForm" label-width="100px" class="demo-ruleForm" size="mini">
            <el-row>
              <el-col v-show="false" style="width: 250px;">
                    <el-form-item label="部门ID">
                        <el-input v-model="QueryForm.departmentId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 250px;">
                    <el-form-item label="职位ID">
                        <el-input v-model="QueryForm.jobId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 250px;">
                    <el-form-item label="职位名">
                        <el-input v-model="QueryForm.jobName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-show="false"  style="width: 250px;">
                    <el-form-item label="职位创建时间">
                        <el-input v-model="QueryForm.createTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-show="false"  style="width: 250px;">
                    <el-form-item label="职位更新时间">
                        <el-input v-model="QueryForm.modifyTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-show="false"  style="width: 250px;">
                    <el-form-item label="职位简介">
                        <el-input v-model="QueryForm.jobMsg"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="jobfindlike" icon="el-icon-search">查询</el-button>
                    <el-button type="primary" plain @click="QueryForm.addButton= true;" icon="el-icon-edit">添加</el-button>
                </el-col>
            </el-row>
        </el-form>

        <el-header style="background-color:#C0C0C0"></el-header>

        <div v-if="QueryForm.requestResult">
             <el-table @row-click="handleEdit" :data="QueryForm.job" style="width: 100%">
                <el-table-column prop="jobId" label="职位ID" width="180"></el-table-column>
                <el-table-column prop="jobName" label="职位名" width="180"></el-table-column>
                <el-table-column prop="jobMsg" label="职位简介" width="180"></el-table-column>
                <el-table-column prop="departmentId" label="部门ID" width="180"></el-table-column>
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
        <el-dialog title="编辑职位" :visible.sync="QueryForm.updateButton">
	            <el-form :model="modifyForm">
		              <el-form-item v-show="false" label="职位ID" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.jobId" auto-complete="off"></el-input>
		              </el-form-item>
                   <el-form-item  label="职位名" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.jobName" auto-complete="off"></el-input>
		              </el-form-item>
		              <el-form-item  label="职位简介" :label-width="modifyForm.formLabelWidth">
			                <el-input v-model="modifyForm.jobMsg" auto-complete="off"></el-input>
		              </el-form-item>
                  <el-form-item  label="部门ID" :label-width="modifyForm.formLabelWidth">
			                <el-input v-model="modifyForm.departmentId" auto-complete="off"></el-input>
		              </el-form-item>
                  <el-form-item v-show="false" label="创建时间" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.createTime" auto-complete="off"></el-input>
		              </el-form-item>
                  <el-form-item v-show="false" label="修改时间" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.updateTime" auto-complete="off"></el-input>
		              </el-form-item>
	            </el-form>
	         <div slot="footer" class="dialog-footer">
		          <el-button type="primary" @click="QueryForm.updateButton = false">取 消</el-button>
		          <el-button type="denger"  @click="jobupdate">确 定</el-button>
	         </div>
        </el-dialog>

         <el-dialog title="提示框" :visible.sync="QueryForm.deleteButton">   
              <p>是否永久删除该职位！！！</p>
           <div slot="footer" class="dialog-footer">
		          <el-button type="primary" @click="QueryForm.deleteButton = false">取 消</el-button>
		          <el-button type="denger"  @click="QueryForm.deleteButton = false">确 定</el-button>
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

import {jobfindall} from '../api/job'
import {jobupdate}  from '../api/job'
import {jobfindlike}  from '../api/job'
import {jobadd}  from '../api/job'

export default {
  name: 'Job',
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
                 jobId:'',
                 jobName:'',
                 jobMsg:'',
                 departmentId:'',
                 createTime:'',
                 modifyTime:'',
                 job: [{
                       jobId:'',
                       jobName:'',
                       jobMsg:'',
                       departmentId:'',
                       createTime:'',
                       modifyTime:''
                 }],
                 requestResult: false
          },modifyForm:{
				        formLabelWidth:'120px',
				         jobId:'',
                 jobName:'',
                 jobMsg:'',
                 departmentId:'',
                 createTime:'',
                 modifyTime:''
          },findlikeForm:{
				        formLabelWidth:'120px',
				         jobId:'',
                 jobName:'',
                 jobMsg:'',
                 departmentId:'',
                 createTime:'',
                 modifyTime:''
          }
        }
  },created(){
    this.joball()
  },methods:{
      joball() {
            jobfindall().then((res) => {
              //console.log(res);
              //console.log(this.department)
              this.QueryForm.job = res.data.data;
              //console.log(this.QueryForm.department);
              //this.msg = res.data.msg;
              this.QueryForm.requestResult=true;
              //console.log(res.data);
            });
      },
      jobupdate(){
          console.log(this.modifyForm);
          //console.log(this.QueryForm.job);
            jobupdate(this.modifyForm).then((res)=>{
              this.QueryForm.updateButton= false;
              this.QueryForm.msgButton=true;
              console.log(res);
            });
      },
      handleEdit(currentrow) {
        this.modifyForm=currentrow;
          // this.modifyForm.departmentId=currentrow.departmentId;
          // this.modifyForm.jobId=currentrow.jobId;
          // this.modifyForm.jobName=currentrow.jobName;
          // this.modifyForm.jobMsg=currentrow.jobMsg;
          // this.modifyForm.createTime=currentrow.createTime;
          // this.modifyForm.modifyTime=currentrow.modifyTime;
      },
      jobfindlike(){
         this.findlikeForm.jobId=this.QueryForm.jobId;
         this.findlikeForm.jobName=this.QueryForm.jobName;
        console.log(this.findlikeForm);
        jobfindlike(this.findlikeForm).then((res)=>{
            this.QueryForm.job = res.data.data;
            this.QueryForm.msgButton=true;
            console.log(res);
        });
      }
  }
}
</script>
