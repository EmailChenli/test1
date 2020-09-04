<template>
  <div class="app-container">
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资产管理</el-breadcrumb-item>
      <el-breadcrumb-item>电脑管理</el-breadcrumb-item>
      <el-breadcrumb-item>电脑信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--查询表单-->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="form-item-layout">
          <el-input v-model="searchData" name="searchCom" placeholder="电脑编号/品牌/持有人.." autocomplete="off" />
        </el-form-item>
        <el-form-item class="form-item-layout select-box">
            <el-select name="comStatus" v-model="searchStatus">
              <el-option v-for="(item,key) in statusOptions" :key="key" :label="item.name" v-bind:value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="form-item-layout">
          <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        </el-form-item>
        <el-form-item class="form-item-layout" style="float: right; margin-right: 0;">
          <el-button type="primary">添加</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="list" border style="width: 100%;" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
        <el-table-column prop="comSn" label="电脑编号" width="175" :resizable="false">
        </el-table-column>
        <el-table-column prop="comNum" label="电脑编号" :resizable="false">
        </el-table-column>
        <el-table-column prop="comBrand" label="电脑品牌" :resizable="false">
        </el-table-column>
        <el-table-column prop="comModel" label="电脑型号" :resizable="false">
        </el-table-column>
        <el-table-column prop="comCpu" label="电脑处理器" :resizable="false">
        </el-table-column>
        <el-table-column prop="comMemory" label="电脑内存" :resizable="false">
        </el-table-column>
        <el-table-column prop="employeeName" label="持有人" :resizable="false">
        </el-table-column>
        <el-table-column prop="comStatus" label="状态" :resizable="false">
        </el-table-column>
        <el-table-column label="操作" width="176" :resizable="false">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" style="font-size: 10px">修改</el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              style="margin-left: 3px; font-size: 10px"
              @click="removeDataById(scope.row.sid)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getList"
      />-->
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="limit"
        :page-sizes="[5, 10, 12,15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
  export default {
    //写核心代码位置
    // data:{
    // },
    data() {
      //定义变量和初始值
      return {
        page: 1, //当前页
        limit: 10, //每页记录数
        shopQuery: {}, //条件封装对象
        list: [], //查询之后接口返回集合
        total: 0, //总记录数
        src: "",
        searchData:"",
        searchStatus:"all", //状态栏被选中的值，默认为all
        statusOptions: [
          {"name": '全部', "value": "all"},
          {"name": '空闲', "value": "free"},
          {"name": '被拥有', "value": "owned"}
          ]
      };
    },
    created() {
      //页面渲染之前执行，一般调用methods定义的方法
      //调用

      this.getList();
    },
    methods: {
      //创建具体的方法，调用shop.js定义的方法
      //商家列表的方法
      async getList(page=1) {
        // console.log(this.searchStatus);
        this.page=page;
        this.list= [{
          comSn: 'sijij',
          comNum: '东信123',
          comBrand: '戴尔',
          comModel: '12312',
          comCpu: 'i7',
          comMemory: '16G',
          employeeName: 'bb'!= null?'小白':'无',
          comStatus: '被拥有'
        }];
        //console.log('1233');
        // const { data: res } = await this.$http.post(
        //   "/orderingSystem/shop/pageShop/${page}/${limit}", {
        //     page,limit,shopQuery
        //   });
        // if (res.meta.status !== 200)
        //   return this.$message.error("获取用户表单失败！");
        // this.list = response.data.rows;
        // this.total = response.data.total;
        // this.src = response.data.rows.cover;
        // console.log(this.list);
        // console.log(this.total);
      },
      // 监听pagesize改变
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.page = newSize;
        this.getList();
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        console.log(newPage);
        this.limit = newPage;
        this.getList();
      },
      // 删除商家的方法
      async removeDataById(sid) {
        const comfirmResult = this.$confirm(
          "此操作将永久删除该商家, 是否继续?",
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
        const { data: res } = await this.$http.delete(
          "/orderingSystem/shop/deleteShop/" + id
        );
        if (res.meta.status !== 200) {
          return this.$message.error("删除用户失败！");
        }
        this.$message.success("删除用户成功！");
        this.getList();
      },
      //修改表头样式
      headerCellStyle() {
        return 'text-align: center; font-weight: 500; font-size: 14px';
      },
      //修改表格数据样式
      cellStyle() {
        return 'text-align: center; font-weight: 500; font-size: 14px'
      }
    },
  };
</script>

<style lang="less" scoped>
  /* 查询表单布局 */
  .form-item-layout{
    float: left;
    margin-bottom: 15px;
  }
  /* 下拉框 */
  .select-box{
    width: 100px;
  }
  /* 表格 */
  .el-table{
    margin-top: 0;
  }
</style>

