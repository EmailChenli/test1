<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img style="width: 50px;
        height: 50px;
        left:10px" src="../assets/img/east.png" alt />
        <span>东信门户管理系统</span>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
        <img src="../assets/logo.png" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="loginout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 页面主题区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          style="text-algin:left"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!--一级菜单-->
          <template v-for="item in menulist">
            <el-submenu
              v-if="item.children && item.children.length"
              :index="item.path"
              :key="item.path"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <!--二级菜单-->
              <template v-for="itemChild in item.children">
                <el-submenu
                  v-if="itemChild.children && itemChild.children.length"
                  :index="itemChild.path"
                  :key="itemChild.path"
                >
                  <template slot="title">
                    <i :class="itemChild.icon"></i>
                    <span>{{itemChild.name}}</span>
                  </template>
                  <!-- 三级菜单 -->
                  <el-menu-item
                    v-for="itemChild_Child in itemChild.children"
                    :index="itemChild_Child .path"
                    :key="itemChild_Child.path"
                  >
                    <i :class="itemChild_Child.icon"></i>
                    <span slot="title">{{itemChild_Child.name}}</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="itemChild.path" :key="itemChild.path">
                  <i :class="itemChild.icon"></i>
                  <span slot="title">{{itemChild.name}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :index="item.path" :key="item.path">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <!-- 右侧主题区 -->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //左侧菜单数据
      menulist: [
        {
          path: "/user",
          name: "用户管理",
          icon: "el-icon-s-custom",
          children: [
            {
              path: "/user/list",
              name: "用户列表",
              icon: "el-icon-menu",
            },
            {
              path: "/user/resign",
              name: "离职信息",
              icon: "el-icon-menu",
            },
            {
              path: "/user/rights",
              name: "权限管理",
              icon: "el-icon-menu",
            },
          ],
        },
        {
          path: "/meeting",
          name: "会议室管理",
          icon: "el-icon-s-cooperation",
          children: [
            {
              path: "/meeting/list",
              name: "会议室列表",
              icon: "el-icon-menu",
            },
            {
              path: "/meeting/apply",
              name: "申请列表",
              icon: "el-icon-menu",
              children: [
                {
                  path: "/meeting/apply/approved",
                  name: "已审批",
                  icon: "el-icon-menu",
                },
                {
                  path: "/meeting/apply/notapproved",
                  name: "未审批",
                  icon: "el-icon-menu",
                }
              ]
            },
            {
              path: "/meeting/reserve",
              name: "预定记录",
              icon: "el-icon-menu",
            },
            {
              path: "/meeting/history",
              name: "历史记录",
              icon: "el-icon-menu",
              children: [
                {
                  path: "/meeting/history/reserve",
                  name: "预订记录",
                  icon: "el-icon-menu",
                },
                {
                  path: "/meeting/history/reservetimes",
                  name: "预订次数统计",
                  icon: "el-icon-menu",
                }
              ]
            },
          ],
        },
        {
          path: "/property",
          name: "资产管理",
          icon: "el-icon-s-finance",
          children: [
            {
              path: "/property/computer",
              name: "电脑管理",
              icon: "el-icon-menu",
              children: [
                {
                  path: "/property/computer/list",
                  name: "电脑信息",
                  icon: "el-icon-menu",
                },
                {
                  path: "/property/computer/rent",
                  name: "放还管理",
                  icon: "el-icon-menu",
                },
                {
                  path: "/property/computer/history",
                  name: "历史记录",
                  icon: "el-icon-menu",
                },
              ],
            },
            {
              path: "/property/book",
              name: "图书管理",
              icon: "el-icon-menu",
              children: [
                {
                  path: "/property/book/list",
                  name: "图书列表",
                  icon: "el-icon-menu",
                },
                {
                  path: "/property/book/rent",
                  name: "借用情况",
                  icon: "el-icon-menu",
                },
                {
                  path: "/property/book/history",
                  name: "历史记录",
                  icon: "el-icon-menu",
                },
              ],
            },
          ],
        },
        {
          path: "/order",
          name: "订餐管理",
          icon: "el-icon-s-order",
          children: [
            {
              path: "/order/shop",
              name: "商家管理",
              icon: "el-icon-menu",
              children: [
                {
                  path: "/order/shop/list",
                  name: "商家列表",
                  icon: "el-icon-menu",
                },
                {
                  path: "/order/shop/add",
                  name: "添加商家",
                  icon: "el-icon-menu",
                },
              ],
            },
            {
              path: "/order/food",
              name: "食品分类管理",
              icon: "el-icon-menu",
              children: [
                {
                  path: "/order/food/list",
                  name: "食品分类列表",
                  icon: "el-icon-menu",
                },
                {
                  path: "/order/food/add",
                  name: "添加食品分类",
                  icon: "el-icon-menu",
                },
              ],
            },
            {
              path: "/order/foodType",
              name: "食品管理",
              icon: "el-icon-menu",
              children: [
                {
                  path: "/order/foodType/list",
                  name: "食品列表",
                  icon: "el-icon-menu",
                },
                {
                  path: "/order/foodType/add",
                  name: "添加食品",
                  icon: "el-icon-menu",
                },
              ],
            },
            {
              path: "/order/order",
              name: "订单列表",
              icon: "el-icon-menu",
            },
          ],
        },
        {
          path: "/network",
          name: "网络管理",
          icon: "el-icon-s-platform",
          children: [
            {
              path: "/network/ip",
              name: "IP管理",
              icon: "el-icon-s-platform",
            },
          ],
        },
      ],
      //是否被折叠
      isCollapse: false,
      // 被激活的连接地址
      activePath: "",
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 退出登录
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存连接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
    text-align: left;
  }
}

.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 25px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 45px;
        height: 45px;
        background-color: #fff;
        border-radius: 50px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
</style>
