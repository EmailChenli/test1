import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
// 员工管理
import Department from '../components/employee/components/Department'
import Job from '../components/employee/components/Job'

import Employee from '../components/employee/components/Employee'
import EmployeeAccount from '../components/employee/components/EmployeeAccount'
import EmployeeDistribute from '../components/employee/components/EmployeeDistribute'
import EmployeeDimission from '../components/employee/components/EmployeeDimission'

import SystemRole from '../components/employee/components/SystemRole'
import SystemChangePass from '../components/employee/components/SystemChangePass'
import SystemAccount from '../components/employee/components/SystemAccount'
//会议管理
import MeetingHistory from '../components/meeting/history/MeetingHistory.vue'
import MeetingHistoryTimes from '../components/meeting/history/MeetingHistoryTimes.vue'
import MeetingRooms from '../components/meeting/MeetingRooms.vue'
import Approved from '../components/meeting/apply/Approved.vue'
import NotApproved from '../components/meeting/apply/NotApproved.vue'
import Books from '../components/property/book/Books.vue'
import BookHistory from '../components/property/book/BookHistory.vue'
import BookRent from '../components/property/book/BookRent.vue'
import Computers from '../components/property/computer/Computers.vue'
import History from '../components/property/computer/History.vue'
import Rent from '../components/property/computer/Rent.vue'
import Food from '../components/order/food/Food.vue'
import FoodSave from '../components/order/food/FoodSave.vue'
import FoodType from '../components/order/foodType/FoodType.vue'
import FoodTypeSave from '../components/order/foodType/FoodTypeSave.vue'
import Orders from '../components/order/order/Orders.vue'
import Shops from '../components/order/shop/Shops.vue'
import ShopSave from '../components/order/shop/ShopSave.vue'
import IP from '../components/network/IP.vue'

Vue.use(VueRouter);

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children:[
      {path:'/welcome',component:Welcome},
      //员工管理
      {path:'/employee/company/deparment',component:Department},
      {path:'/employee/company/job',component:Job},

      {path:'/employee/list/employee',component:Employee},
      {path:'/employee/list/employeeaccount',component:EmployeeAccount},
      {path:'/employee/list/employeedistribute',component:EmployeeDistribute},
      {path:'/employee/list/employeedimission',component:EmployeeDimission},

      {path:'/employee/system/role',component:SystemRole},
      {path:'/employee/system/systemaccount',component:SystemAccount},
      {path:'/employee/system/updatepassword',component:SystemChangePass},
      //会议室管理
      {path:'/meeting/list',component:MeetingRooms},
      {path:'/meeting/history/reserve',component:MeetingHistory},
      {path:'/meeting/history/reservetimes',component:MeetingHistoryTimes},
      {path:'/meeting/apply/approved',component:Approved},
      {path:'/meeting/apply/notapproved',component:NotApproved},
      {path:'/property/book/list',component:Books},
      {path:'/property/book/history',component:BookHistory},
      {path:'/property/book/rent',component:BookRent},
      {path:'/property/computer/list',component:Computers},
      {path:'/property/computer/history',component:History},
      {path:'/property/computer/rent',component:Rent},
      {path:'/order/food/list',component:Food},
      {path:'/order/food/add',component:FoodSave},
      {path:'/order/foodType/list',component:FoodType},
      {path:'/order/foodType/add',component:FoodTypeSave},
      {path:'/order/orders',component:Orders},
      {path:'/order/shop/list',component:Shops},
      {path:'/order/shop/add',component:ShopSave},
      {path:'/network/ip',component:IP}
    ]
  }
];

//创建路由
const router = new VueRouter({
  routes,
  //路径不带#符号
  mode: 'history'
});
//挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 代表将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，代表放行：1.next()直接放行 2.next('/login')强制跳转
//   if (to.path === '/login') return next()
//   //获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

//暴露路由
export default router;
