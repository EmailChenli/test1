<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header-text">
        <span>历史记录</span>
      </div>
      <!--查询表单-->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="form-item-layout">
          <el-input v-model="searchData" name="searchCom" placeholder="请输入电脑编号/员工名" autocomplete="off" />
        </el-form-item>
        <el-form-item class="form-item-layout">
          <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 电脑信息列表 -->
      <el-table :data="list" border style="width: 100%;" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="comSn" label="电脑SN码" width="175" :resizable="false">
        </el-table-column>
        <el-table-column prop="assetNum" label="资产编号" :resizable="false">
        </el-table-column>
        <el-table-column prop="comType" label="电脑类型" :resizable="false">
        </el-table-column>
        <el-table-column prop="employeeId" label="工号" :resizable="false">
        </el-table-column>
        <el-table-column prop="employeeName" label="员工姓名" :resizable="false">
        </el-table-column>
        <el-table-column prop="getTime" label="得到时间" :resizable="false">
        </el-table-column>
        <el-table-column prop="returnTime" label="归还时间" :resizable="false">
        </el-table-column>
      </el-table>
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
    data() {
      return {
        page: 1, //当前页
        limit: 10, //每页记录数
        shopQuery: {}, //条件封装对象
        list: [], //查询之后接口返回集合
        total: 0, //总记录数
        src: "",
        searchData:"",
      };
    },
    created() {
      this.getList();
    },
    methods: {
      //电脑信息列表
      async getList(page=1) {
        // console.log(this.searchStatus);
        this.page=page;
        this.list= [{
          comSn: 'sijij',
          assetNum: '东信123',
          comType: '笔记本',
          employeeId: '18101',
          employeeName: 'bb'!= null?'小白':'无',
          getTime: '2020-09-07 16:40:44',
          returnTime: '2020-09-14 10:30:44',
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

.el-card{
    box-shadow: 0 1px 1px rgba(0,0, 0, 0.15)!important;
    width: 98%;
    margin:15px auto;
  }

.card-header-text{
      text-align: left;
  }
</style>

