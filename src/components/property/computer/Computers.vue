<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header-text">
        <span>电脑信息列表</span>
      </div>
      <!--查询表单-->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="form-item-layout">
          <el-input
            v-model="searchData"
            placeholder="资产编号/电脑名称/类型.."
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item class="form-item-layout select-box">
          <el-select v-model="searchStatus">
            <el-option
              v-for="(item,index) in statusOptions"
              :key="index+''"
              :label="item.name"
              v-bind:value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item-layout">
          <el-button type="primary" icon="el-icon-search" @click="getComputerList()">查询</el-button>
        </el-form-item>
        <el-form-item class="form-item-layout" style="float: right; margin-right: 0;">
          <el-button type="primary" @click="addDialogVisible=true">添加电脑</el-button>
        </el-form-item>
      </el-form>

      <!-- 电脑信息列表 -->
      <el-table
        :data="computerList"
        border
        style="width: 100%;"
        fit
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        :show-header="total > 0"
        empty-text="No Data"
      >
        <!-- <el-table-column type="index" label="序号"></el-table-column> -->
        <el-table-column prop="comSn" label="电脑SN码" width="150" :resizable="false"></el-table-column>
        <el-table-column prop="assetNum" label="资产编号" :resizable="false"></el-table-column>
        <el-table-column prop="comType" label="电脑类型" :resizable="false"></el-table-column>
        <el-table-column prop="comName" label="电脑名称" :resizable="false"></el-table-column>
        <el-table-column prop="comCpu" label="电脑处理器" :resizable="false"></el-table-column>
        <el-table-column prop="comMemory" label="电脑内存" :resizable="false"></el-table-column>
        <el-table-column prop="holderName" label="持有人" :formatter="holderNameFormat" :resizable="false"></el-table-column>
        <el-table-column prop="comStatus" label="状态" :formatter="statusFormat" :resizable="false"></el-table-column>
        <el-table-column label="操作" width="176" :resizable="false">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              style="font-size: 10px"
              @click="showEditDialog(scope.row)"
            >修改</el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              style="margin-left: 3px; font-size: 10px"
              @click="removeComputerById(scope.row.comSn)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        :page-sizes="[5,10,12,15]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        v-show="total>0"
      ></el-pagination>
    </el-card>

    <!--添加电脑对话框-->
    <el-dialog title="添加电脑" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="电脑SN码" prop="comSn">
          <el-input v-model="addForm.comSn"></el-input>
        </el-form-item>
        <el-form-item label="资产编号" prop="assetNum">
          <el-input v-model="addForm.assetNum"></el-input>
        </el-form-item>
        <el-form-item label="电脑类型" prop="comType">
          <el-input v-model="addForm.comType"></el-input>
        </el-form-item>
        <el-form-item label="电脑名称" prop="comName">
          <el-input v-model="addForm.comName"></el-input>
        </el-form-item>
        <el-form-item label="电脑处理器" prop="comCpu">
          <el-input v-model="addForm.comCpu"></el-input>
        </el-form-item>
        <el-form-item label="电脑内存" prop="comMemory">
          <el-input v-model="addForm.comMemory"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="addDialogVisible">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComputer">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改电脑信息对话框-->
    <el-dialog
      title="修改电脑信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="电脑SN码">
          <el-input v-model="editForm.comSn" disabled></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="editForm.assetNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="电脑类型" prop="comType">
          <el-input v-model="editForm.comType"></el-input>
        </el-form-item>
        <el-form-item label="电脑名称" prop="comName">
          <el-input v-model="editForm.comName"></el-input>
        </el-form-item>
        <el-form-item label="电脑处理器" prop="comCpu">
          <el-input v-model="editForm.comCpu"></el-input>
        </el-form-item>
        <el-form-item label="电脑内存" prop="comMemory">
          <el-input v-model="editForm.comMemory"></el-input>
        </el-form-item>
        <el-form-item label="持有人" prop="employeeName">
          <el-input v-model="editForm.employeeName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editComputerInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  //引入电脑api
  import computer from "@/api/property/computer.js";
  export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页记录数
      total: 1, //总记录数
      computerList: [], //查询之后接口返回集合
      searchData: "",
      searchStatus: "-1", //状态栏被选中的值，默认为all
      statusOptions: [
        { name: "全部", value: "-1" },
        { name: "空闲", value: "0" },
        { name: "被拥有", value: "1" },
      ],
      //控制添加电脑对话框的显示与隐藏
      addDialogVisible: false,
      // 添加电脑表单数据对象
      addForm: {
        comSn: "",
        assetNum: "",
        comType: "",
        comName: "",
        comCpu: "",
        comMemory: "",
      },
      // 添加电脑表单验证规则
      addFormRules: {
        comSn: [
          { required: true, message: "电脑SN码不能为空", trigger: 'blur' },
        ],
        assetNum: [
          { required: true, message: "资产编号不能为空", trigger: "blur" },
        ],
      },
      // 控制修改电脑信息对话框的现实与隐藏
      editDialogVisible: false,
      // 查询到的电脑信息
      editForm: {
        comSn: "",
        assetNum: "",
        comType: "",
        comName: "",
        comCpu: "",
        comMemory: "",
        employeeName: "",
      },
      // 修改电脑信息表单规则
      editFormRules: {},
    };
  },
  created() {
    //获取电脑列表
    this.getComputerList();
  },
  methods: {
    //电脑信息列表
    async getComputerList() {
      let _this = this;
      //用于做请求参数的query
      let query = {
        keyword: this.searchData,
        comStatus: this.searchStatus,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      //console.log(query);
      computer
        .getComputer(query)
        .then((response) => {
          if (response.data.code == 400) {
            //请求错误
            this.$message.error(response.data.message);
          } else {
            let result = response.data.data;
            console.log(result);
            _this.computerList = result.list;
            _this.total = result.total;
            //打印结果信息
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error); //异常
        });
    },
    //分页监听事件
    // 监听每页记录数pageSize改变的时间
    handleSizeChange(newSize) {
      console.log(newSize);
      this.pageSize = newSize;
      this.getComputerList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.currentPage = newPage;
      this.getComputerList();
    },
    //展示修改电脑信息对话框
    async showEditDialog(row) {
      this.editForm.comSn = row.comSn;
      this.editForm.assetNum = row.assetNum;
      this.editForm.comType = row.comType;
      this.editForm.comName = row.comName;
      this.editForm.comCpu = row.comCpu;
      this.editForm.comMemory = row.comMemory;
      this.editForm.employeeName = row.employeeName;
      this.editDialogVisible = true;
    },
    //对状态进行格式化输出处理
    statusFormat(row, column) {
      if (row.comStatus === 1) {
        return '被拥有'
      } else if(row.comStatus === 0) {
        return '空闲'
      }
    },
    //对持有人进行格式化输出处理
    holderNameFormat(row, column) {
      if (row.holderName === null) {
        return '无'
      }else {
        return row.holderName;
      }
    },
    // 监听添加电脑对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击确定按钮，添加电脑
    addComputer() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起添加用户的网络请求
        // const { data: res } = await this.$http.post("users", this.addForm);
        // console.log(res);
        // if (res.meta.status !== 201) {
        //   this.$message("添加用户失败！");
        // }
        this.$message("添加电脑成功");
        //隐藏添加用户的对话框
        this.addDialogVisible = false;
        // 重新获取用户表单数据
        this.getrList();
      });
    },
    // 监听修改电脑对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改电脑信息并提交
    editComputerInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改电脑信息的网络请求
        // const { data: res } = await this.$http.put(
        //   "users/" + this.editForm.id,
        //   {
        //     email: this.editForm.email,
        //     mobile: this.editForm.mobile,
        //   }
        // );
        // console.log(res);
        // if (res.meta.status !== 200) {
        //   return this.$message.error("更新电脑信息失败！");
        // }
        //隐藏修改电脑信息的对话框
        this.editDialogVisible = false;
        // 刷新数据列表
        this.getList();
        this.$message.success("更新电脑信息成功");
      });
    },
    // 根据电脑sn码删除电脑
    async removeComputerById(comSN) {
      console.log(comSN);
      //询问用户是否删除数据
      const confirmRusult = await this.$confirm(
        "此操作将永久删除该电脑信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmRusult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      // const { data: res } = await this.$http.delete("users/" + id);
      // if (res.meta.status !== 200) {
      //   return this.$message.error("删除用户失败！");
      // }
      this.$message.success("删除用户成功！");
      this.getList();
    },
    //修改表头样式
    headerCellStyle() {
      return "text-align: center; font-weight: 500; font-size: 14px";
    },
    //修改表格数据样式
    cellStyle() {
      return "text-align: center; font-weight: 500; font-size: 14px";
    },
  },
};
</script>

<style lang="less" scoped>
/* 查询表单布局 */
.form-item-layout {
  float: left;
  margin-bottom: 15px;
}
/* 下拉框 */
.select-box {
  width: 100px;
}
/* 表格 */
.el-table {
  margin-top: 0;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  width: 98%;
  margin: 15px auto;
}

.card-header-text {
  text-align: left;
}
</style>

