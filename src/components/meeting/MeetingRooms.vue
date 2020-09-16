<template>
  <div>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入会议室号" v-model="keyWord" clearable @clear="getRoomList">
            <el-button slot="append" icon="el-icon-search" @click="selectRoom"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加会议室</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getTableInfo">查找</el-button>
        </el-col>
      </el-row>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="roomId" label="会议室编号" width="100"></el-table-column>
        <el-table-column prop="roomName" label="名称"></el-table-column>
        <el-table-column prop="roomSize" label="可容纳人数" width="100"></el-table-column>
        <el-table-column prop="roomStatus" label="状态" width="80"></el-table-column>
        <el-table-column prop="description" label="详情"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="最近修改时间"></el-table-column>
        <el-table-column prop="updateTime" label="最近修改时间"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip class="item" effect="dark" content="修改会议室信息" placement="top" :enterable="false">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.roomId)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip class="item" effect="dark" content="删除会议室" placement="top" :enterable="false">
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRoomById(scope.row.roomId)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>


    </el-card>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        tableData : {}
      }
    }/*,
    created(){
      this.getTableInfo();
    }*/,
    methods: {
      getTableInfo(){
        let that = this;
        axios.get('', {
        }).then(function(response){
          console.log(response);
          console.log(response.data.data.meetingRoom);
          console.log(that.tableData);
          that.tableData = response.data.data.meetingRoom;
          console.log(that.tableData);

          /*console.log(response.data.data.meetingRoom);
          console.log(that.tableData);
          let table = [];
          for(let i in response.data.data.meetingRoom){
            table.push(response.data.data.meetingRoom[i]);
          }
          that.tableData = table;
          console.log(that.tableData);*/
        }).catch(function(response){
          console.log(response);
        })
      },
      showEditDialog(){

      },
      removeRoomById(){

      }
    }
  }
</script>
