<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header-text">
        <span>资产信息列表</span>
      </div>
      <!--查询表单-->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="form-item-layout">
          <el-input
            v-model="searchData"
            name="searchCom"
            placeholder="资产编号/生产厂商/购买人.."
            autocomplete="off"
          />
        </el-form-item>
        <!--资产类型下拉框-->
        <el-form-item class="form-item-layout select-box">
          <el-select name="assetType" v-model="searchAssetType">
            <el-option
              v-for="(item,key) in assetTypeOptions"
              :key="key"
              :label="item.assetTypeName"
              v-bind:value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item-layout">
          <el-button type="primary" icon="el-icon-search" @click="getAssetList()">查询</el-button>
        </el-form-item>
        <el-form-item class="form-item-layout" style="float: right; margin-right: 0;">
          <el-button type="primary" @click="addDialogVisible=true">添加电脑</el-button>
        </el-form-item>
      </el-form>

      <!-- 电脑信息列表 -->
      <el-table
        :data="list"
        border
        style="width: 100%;"
        fit
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        :show-header="total > 0"
        empty-text="No Data"
      >
        <!--<el-table-column prop="id" label="序号" width="100" :resizable="false"></el-table-column>-->
        <el-table-column prop="assetNum" label="资产编号" width="150" :resizable="false"></el-table-column>
        <el-table-column prop="assetName" label="资产名称" :resizable="false"></el-table-column>
        <el-table-column prop="unitPrice" label="单价" :resizable="false"></el-table-column>
        <el-table-column prop="producer" label="生产厂商" :resizable="false"></el-table-column>
        <el-table-column prop="productionDate" label="生产日期" :resizable="false"></el-table-column>
        <el-table-column prop="storageTime" label="入库时间" :resizable="false"></el-table-column>
        <el-table-column prop="purchaser" label="购买人" :resizable="false"></el-table-column>
        <el-table-column prop="assetTypeName" label="资产类型" :resizable="false"></el-table-column>
        <el-table-column label="操作" width="176" :resizable="false">
          <template slot-scope="scope">
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
              @click="removeComputerById(scope.row.sid)"
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
        <el-form-item label="资产编号" prop="assetNum">
          <el-input v-model="addForm.assetNum"></el-input>
        </el-form-item>
        <el-form-item label="资产名称" prop="assetName">
          <el-input v-model="addForm.assetName"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="addForm.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="生产厂商" prop="producer">
          <el-input v-model="addForm.producer"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" prop="productionData">
          <el-input v-model="addForm.productionData"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" prop="storageTime">
          <el-input v-model="addForm.storageTime"></el-input>
        </el-form-item>
        <el-form-item label="购买人" prop="purchaser">
          <el-input v-model="addForm.purchaser"></el-input>
        </el-form-item>
        <el-form-item label="资产类型" prop="assetType">
          <el-select name="assetType" v-model="addForm.currentAssetType">
            <el-option
              v-for="(item,key) in assetTypeList"
              :key="key"
              :label="item.assetTypeName"
              v-bind:value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="addDialogVisible">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComputer">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改电脑信息对话框-->
    <el-dialog
      title="修改资产信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="资产编号" prop="assetNum">
          <el-input v-model="editForm.assetNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="资产名称" prop="assetName">
          <el-input v-model="editForm.assetName"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="editForm.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="生产厂商" prop="producer">
          <el-input v-model="editForm.producer"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" prop="productionData">
          <el-input v-model="editForm.productionData"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" prop="storageTime">
          <el-input v-model="editForm.storageTime"></el-input>
        </el-form-item>
        <el-form-item label="购买人" prop="purchaser">
          <el-input v-model="editForm.purchaser"></el-input>
        </el-form-item>
        <el-form-item label="资产类型" prop="assetType">
          <el-input v-model="editForm.assetType"></el-input>
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
// import axios from "axios";
import asset from "@/api/property/asset.js";

export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //每页记录数
      list: [], //查询之后接口返回集合
      total: 0, //总记录数
      assetTypeList: null,
      searchData: "", //查询框的数据
      searchAssetType: "0", //资产类型栏被选中的值，默认为0，代表选择全部
      assetTypeOptions: [{ assetTypeName: "全部", typeId: "0" }],
      //控制添加电脑对话框的显示与隐藏
      addDialogVisible: false,
      // 添加电脑表单数据对象
      addForm: {
        currentAssetType: "请选择", // 当前选中的类型
        assetNum: "",
        assetName: "",
        unitPrice: "",
        producer: "",
        productionData: "",
        storageTime: "",
        purchaser: "",
        assetType: "",
      },
      // 添加电脑表单验证规则
      addFormRules: {
        comSn: [
          { required: true, message: "电脑SN码不能为空", trigger: "blur" },
        ],
        assetNum: [
          { required: true, message: "资产编号不能为空", trigger: "blur" },
        ],
      },
      // 控制修改电脑信息对话框的现实与隐藏
      editDialogVisible: false,
      // 查询到的电脑信息
      editForm: {
        id: "",
        assetNum: "",
        assetName: "",
        unitPrice: "",
        producer: "",
        productionData: "",
        storageTime: "",
        purchaser: "",
        assetType: "",
      },
      // 修改电脑信息表单规则
      editFormRules: {},
    };
  },
  created() {
    //获取资产类型
    this.getAssetTypeList();
    //获取资产列表
    this.getAssetList();
  },
  methods: {
    //获取所有资产类型
    getAssetTypeList() {
      let _this = this;
      asset
        .getAssetType()
        .then((response) => {
          console.log(response);
          if (response.data.code == 400) {
            //请求错误
            this.$message.error(response.data.message);
          } else {
            //将查出来的资产类型数组和assetTypeOptions合并
            _this.assetTypeOptions = _this.assetTypeOptions.concat(
              response.data.data
            );
            _this.assetTypeList = response.data.data;
          }
        })
        .catch((error) => {
          console.log(error); //异常
        });
    },
    //获取资产列表
    async getAssetList() {
      //用于做请求参数的query
      let query = {
        keyword: this.searchData,
        assetType: this.searchAssetType,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      let _this = this;
      console.log(query);
      asset
        .getAsset(query)
        .then((response) => {
          if (response.data.code == 400) {
            //请求错误
            this.$message.error(response.data.message);
          } else {
            let result = response.data.data;
            _this.list = result.list;
            _this.total = result.total;
            console.log(response.data.message);
            console.log(response.data.data);
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
      this.getAssetList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.currentPage = newPage;
      this.getAssetList();
    },

    //展示修改电脑信息对话框
    async showEditDialog(row) {
      this.editForm.assetNum = row.assetNum;
      this.editForm.assetName = row.assetName;
      this.editForm.unitPrice = row.unitPrice;
      this.editForm.producer = row.producer;
      this.editForm.productionData = row.productionData;
      this.editForm.storageTime = row.storageTime;
      this.editForm.purchaser = row.purchaser;
      this.editForm.assetType = row.assetType;
      this.editDialogVisible = true;
    },
    // 监听添加电脑对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击确定按钮，添加电脑
    addComputer() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        asset
          .addAsset(this.addForm)
          .then((response) => {
            if (response.data.code == 400) {
              this.$message.error(response.data.message);
            } else {
              this.$message.success(response.data.message);
              this.addDialogVisible = false;
              this.getAssetList();
            }
          })
          .catch((error) => {
          console.log(error); //异常
        });
      });
    },
    // 监听修改电脑对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改电脑信息并提交
    editComputerInfo() {
      asset
        .updateAsset({
          unitPrice: this.editForm.unitPrice,
          producer: this.editForm.producer,
          productionData: this.editForm.productionData,
          storageTime: this.editForm.storageTime,
          purchaser: this.editForm.purchaser,
          assetType: this.editForm.assetType,
        })
        .then((response) => {
          if (response.data.code == 400) {
            return this.$message.error("修改失败：" + response.data.message);
          }
          this.$message.success("修改成功");
          this.editDialogVisible = false;
          this.getAssetList();
        })
        .catch((error) => {
          console.log(error); //异常
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

