<template>
  <div>
    <el-card>
      <div slot="header" class="card-header-text">
        <span>预订次数记录</span>
      </div>
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
              this.timesList = response.data.data.list
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
<style lang="less" scoped>
.el-card{
    box-shadow: 0 1px 1px rgba(0,0, 0, 0.15)!important;
    width: 98%;
    margin:15px auto;
  }

.card-header-text{
      text-align: left;
  }
</style>