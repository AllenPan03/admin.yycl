import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
//入口组件
// import App from './App'

import main from './main.vue'
import welcome from './components/welcome/welcome.vue'
import login from './components/login/login.vue'
import customerList from './components/customer-manage/customer-manage.vue' 
import whiteList from './components/white-list-manage/white-list-manage.vue' 
import customerDetail from './components/customer-manage/customer-detail.vue' 
import clothManage from './components/cloth-manage/cloth-manage.vue' 
import stockManage from './components/stock-manage/stock-manage.vue' 
import calculate from './components/calculate/calculate.vue' 

//安装路由
Vue.use(VueRouter)
Vue.use(VueResource)
//配置组件和路由映射
const routes = [
    { path: '/', redirect: 'welcome'}
    ,{ path: '/welcome', component: welcome, name: 'welcome'}
    //客户
    ,{ path: '/customerList', component: customerList, name: 'customerList'}
    //客户详情
    ,{ path: '/customerDetail', component: customerDetail, name: 'customerDetail'}
    //布料管理
    ,{ path: '/clothManage', component: clothManage, name: '布料管理'}
    //进货单管理
    ,{ path: '/stockManage', component: stockManage, name: '进货单管理'}
    //价格计算器
    ,{ path: '/calculate', component: calculate, name: '进货单管理'}
    
]
const router = new VueRouter({
    routes
})

const eventHub = new Vue()
//设置全局变量
window.eventHub = eventHub
new Vue({
    el: "#main"
    ,router
    ,render: h => h(main)
})

