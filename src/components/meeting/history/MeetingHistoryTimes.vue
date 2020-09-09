<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会议室管理</el-breadcrumb-item>
      <el-breadcrumb-item>历史记录</el-breadcrumb-item>
      <el-breadcrumb-item>预订次数统计</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="timesList" border style="width: 100%">
        <el-table-column prop="userName" label="账号" width="100"></el-table-column>
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话" width="100"></el-table-column>
        <el-table-column prop="email" label="电子邮件"></el-table-column>
        <el-table-column prop="totaltimes" label="总申请次数"></el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        queryInfo: {
          page: 1,
          rows: 5
        },
        timesList: [],
        total: 0,
        keyWord: ''
      }
    },
    created(){
      this.getTimesList();
    },
    methods: {
      getTimesList() {
        axios.post('http://localhost:8080/user/findAllTimes', {
          page: this.queryInfo.page,
          rows: this.queryInfo.rows
        })
          .then((response) => {
            if (response.data.code == 400) {
              this.$message.error("获取数据失败")
            } else {
              this.timesList = response.data.data.rows
              this.total = response.data.data.count
            }
          }).catch((response) => {
          console.log(response)
        })
      },
      // 监听pageSize改变的事情
      handleSizeChange (newSize) {
        this.queryInfo.rows = newSize
        this.getTimesList()
      },
      // 监听页码值改变的事件
      handleCurrentChange (newPage) {
        this.queryInfo.page = newPage
        this.getTimesList()
      },
    }
  }
</script>
