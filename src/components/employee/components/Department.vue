<template>
      <el-main>
        <div  style="height=800px;">
            <el-form :model="QueryForm" ref="QueryForm" label-width="100px" class="demo-ruleForm" size="mini">
            <el-row>
                <el-col style="width: 250px;">
                    <el-form-item label="部门ID">
                        <el-input v-model="QueryForm.departmentId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 250px;">
                    <el-form-item label="部门名">
                        <el-input v-model="QueryForm.departmentName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-show="false"  style="width: 250px;">
                    <el-form-item label="部门创建时间">
                        <el-input v-model="QueryForm.createTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-show="false"  style="width: 250px;">
                    <el-form-item label="部门更新时间">
                        <el-input v-model="QueryForm.modifyTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-show="false"  style="width: 250px;">
                    <el-form-item label="部门简介">
                        <el-input v-model="QueryForm.departmentMsg"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="departmentfindlike" icon="el-icon-search">查询</el-button>
                    <el-button type="primary" plain @click="QueryForm.addButton= true;" icon="el-icon-edit">添加</el-button>
                </el-col>
            </el-row>
        </el-form>


        <el-header style="background-color:#C0C0C0"></el-header>
          <!-- v-for="item in department" -->
            <div v-if="QueryForm.requestResult" >
             <el-table @row-click="handleEdit" :data="QueryForm.department"  style="width: 100%; height=800px;" >
                <el-table-column prop="departmentId" label="部门ID" width="180"></el-table-column>
                <el-table-column prop="departmentName" label="部门名" width="180"></el-table-column>
                <el-table-column prop="departmentMsg" label="部门简介" width="180"></el-table-column>
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
                <!-- <el-table-column label="当前行打印">
                    <template slot-scope="scope">
                        <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column> -->
               
            </el-table>
            </div>
            <div v-else>
              请求失败！
            </div>
        </div>
        
        <div style="margin-top: 5px;"></div><!--这个只是为了在页面上显示间隔-->
        <el-dialog title="编辑部门" :visible.sync="QueryForm.updateButton">
	            <el-form :model="modifyForm">
		              <el-form-item v-show="false" label="部门ID" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.departmentId" auto-complete="off"></el-input>
		              </el-form-item>
                   <el-form-item  label="部门名" :label-width="modifyForm.formLabelWidth">
			               <el-input v-model="modifyForm.departmentName" auto-complete="off"></el-input>
		              </el-form-item>
		              <el-form-item  label="部门简介" :label-width="modifyForm.formLabelWidth">
			                <el-input v-model="modifyForm.departmentMsg" auto-complete="off"></el-input>
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
		          <el-button type="denger"  @click="departmentupdate">确 定</el-button>
	         </div>
        </el-dialog>

        <el-dialog title="添加部门" :visible.sync="QueryForm.addButton">
	            <el-form :model="addForm">
		              <el-form-item v-show="false" label="部门ID" :label-width="addForm.formLabelWidth">
			               <el-input v-model="addForm.departmentId" auto-complete="off"></el-input>
		              </el-form-item>
                   <el-form-item  label="部门名" :label-width="addForm.formLabelWidth">
			               <el-input v-model="addForm.departmentName" auto-complete="off"></el-input>
		              </el-form-item>
		              <el-form-item  label="部门简介" :label-width="addForm.formLabelWidth">
			                <el-input v-model="addForm.departmentMsg" auto-complete="off"></el-input>
		              </el-form-item>
                  <el-form-item v-show="false" label="创建时间" :label-width="addForm.formLabelWidth">
			               <el-input v-model="addForm.createTime" auto-complete="off"></el-input>
		              </el-form-item>
                  <el-form-item v-show="false" label="修改时间" :label-width="addForm.formLabelWidth">
			               <el-input v-model="addForm.updateTime" auto-complete="off"></el-input>
		              </el-form-item>
	            </el-form>
	         <div slot="footer" class="dialog-footer">
		          <el-button type="primary" @click="QueryForm.addButton = false">取 消</el-button>
		          <el-button type="denger"  @click="adddepartment">确 定</el-button>
	         </div>
        </el-dialog>

         <el-dialog title="提示框" :visible.sync="QueryForm.deleteButton">   
              <p>是否永久删除该部门！！！</p>
           <div slot="footer" class="dialog-footer">
		          <el-button type="primary" @click="QueryForm.deleteButton = false">取 消</el-button>
		          <el-button type="denger"  @click="QueryForm.deleteButton = false">确 定</el-button>
	         </div>
        </el-dialog>


        <el-dialog title="提示框" :visible.sync="QueryForm.msgButton">   
              <p>操作成功！！！</p>
        </el-dialog>
        <el-footer>
           <div style="margin-top: 5px;"></div>
                <!-- total总共有多少条 -->
                <el-pagination
                  prev-text="上一页"
                  next-text="下一页"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="QueryForm.currentPage"
                  :page-sizes="[15, 30, 50, 100]"
                  :page-size="15"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="QueryForm.department.length">

                </el-pagination>
        </el-footer>
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
import {departmentfindall} from '../api/department'
import {departmentfindbyid} from '../api/department'
import {departmentupdate}  from '../api/department'
import {departmentfindlike}  from '../api/department'
import {departmentadd}  from '../api/department'
export default {
  name: 'Department',
  data() {
        return {
          msg:'',
          code:'',
           // 定义一个数据集合
          QueryForm: {
            // 分页数据集
                 currentPage: 1, //初始页
            //增删改查数据集
                 msgButton:false,
				         deleteButton: false,
                 updateButton: false,
                 addButton: false,
                 departmentId:'',
                 departmentName:'',
                 departmentMsg:'',
                 createTime:'',
                 modifyTime:'',
				         department: [{
                       departmentId:'',
                       departmentName:'',
                       departmentMsg:'',
                       createTime:'',
                       modifyTime:''
                       }],
                 requestResult: false
          },
          modifyForm:{
				        formLabelWidth:'120px',
				        departmentId:'',
                departmentName:'',
                departmentMsg:'',
                createTime:'',
                modifyTime:''
          },
          addForm:{
				        formLabelWidth:'120px',
				        departmentId:'',
                departmentName:'',
                departmentMsg:'',
                createTime:'',
                modifyTime:''
			    }
        }
  },created() {
      this.departmentall()
    },
   methods: {
        departmentall() {
            departmentfindall().then((res) => {
              //console.log(res);
              //console.log(this.department)
               this.QueryForm.department = res.data.data;
               //console.log(this.QueryForm.department);
               this.msg = res.data.msg;
               this.QueryForm.requestResult=true;
              //console.log(res.data);
            });
        },
        departmentupdate(){
          //console.log(this.modifyForm);
            departmentupdate(this.modifyForm).then((res)=>{
              this.QueryForm.updateButton= false;
              this.QueryForm.msgButton=true;
              console.log(res);
            });
        },
        departmentfindlike(){
            //console.log(this.QueryForm);
            //console.log(this.modifyForm);
            this.modifyForm.departmentId=this.QueryForm.departmentId;
            this.modifyForm.departmentName=this.QueryForm.departmentName;
            departmentfindlike(this.modifyForm).then((res)=>{
              //console.log(res);
              this.QueryForm.department = res.data.data;
              this.QueryForm.msgButton=true;
            });
        },
        adddepartment(){
            departmentadd(this.addForm).then((res)=>{
                    console.log(this.addForm);
                    console.log(res);
                    this.QueryForm.addButton= false;
            });
        },
        departmentlimitfind(){

        },
        handleEdit(row) {
			    //this.dengmiQueryForm.deleteShow = row.mimian + "(" + row.mimu + ")" + row.midi + "/" + row.zuozhe;
          this.modifyForm.departmentId=row.departmentId;
          this.modifyForm.departmentName=row.departmentName;
          this.modifyForm.departmentMsg=row.departmentMsg;
          this.modifyForm.createTime=row.createTime;
          this.modifyForm.modifyTime=row.modifyTime;
        },
        handleSizeChange(val) {
            console.log('每页 '+val +'条');
        },
        handleCurrentChange(val) {
            console.log('当前页: '+val);
        }
        
        // 行数据打印方法
        // checkDetail(val){
        //   console.log(val)
        // }
    }
}
</script>



