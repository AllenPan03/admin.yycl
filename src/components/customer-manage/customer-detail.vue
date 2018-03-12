<template>
    <div class="white-list">
        <div class="clearfix x-space-top">
            <a type="button" class="btn btn-default btn-outline x-space" @click="addWhitelist">新增</a>
            <a type="button" class="btn btn-default btn-outline x-space" @click="goBack">返回上一页</a>
        </div>
        <div class="x-space-top">
          <table class="table table-bordered ">
            <thead>
            <tr>
              <th>窗名称</th>
              <th>高（米）</th>
              <th>宽（米）</th>
              <th>布名称</th>
              <th>纱名称</th>
              <th>布袋</th>
              <th>丝带</th>
              <th>圈（个）</th>
              <th>珠子（个）</th>
              <th>绑带</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                  <td>主卧</td>
                  <td>2.6</td>
                  <td>3</td>
                  <td>韩式田园</td>
                  <td>韩式田园</td>
                  <td>金色</td>
                  <td>金色</td>
                  <td>20</td>
                  <td>20</td>
                  <td>金色</td>
                  <td>
                      <a href="javascript:;" @click="updateWhitelist(item._id)">修改</a>  |
                      <a href="javascript:;" @click="updateWhitelist(item._id)">删除</a> 
                  </td>
                </tr>
                <tr>
                  <td>客厅</td>
                  <td>3.2</td>
                  <td>4.3</td>
                  <td>中式古典</td>
                  <td>中式古典</td>
                  <td>黄色</td>
                  <td>黄色</td>
                  <td>10</td>
                  <td>30</td>
                  <td>黄色</td>
                  <td>
                      <a href="javascript:;" @click="updateWhitelist(item._id)">修改</a>  |
                      <a href="javascript:;" @click="updateWhitelist(item._id)">删除</a> 
                  </td>
                </tr>
                <tr>
                  <td>次卧</td>
                  <td>1.6</td>
                  <td>2</td>
                  <td>现代简约</td>
                  <td>现代简约</td>
                  <td>红色</td>
                  <td>红色</td>
                  <td>13</td>
                  <td>13</td>
                  <td>红色</td>
                  <td>
                      <a href="javascript:;" @click="updateWhitelist(item._id)">修改</a>  |
                      <a href="javascript:;" @click="updateWhitelist(item._id)">删除</a> 
                  </td>
                </tr>
            </tbody>
          </table>
          <!--暂无数据 start-->
            <div class="noData">
                {{errorInfo}}
            </div>
          <!--暂无数据 end-->
    </div>
    <page :page-info="pageInfo" :total="total"></page>
    </div>

</template>
<script>
/*
 * 客户管理页面
 */
import action from "../../action/interface.js";
import mixins from "../mixin.js";
import Vue from "vue";

import queryBtnGroup from "../query-btn-group/query-btn-group.vue";
import nameCondition from "../form-group/name-condition.vue";
import mobileCondition from "../form-group/mobile-condition.vue";
import formGroup from "../form-group/form-group.vue";
import page from "../basic/page/page.vue";

import addWhitelist from "./add-white-list.vue";
import removeWhitelist from "./remove-white-list.vue";
import updateWhitelist from "./update-white-list.vue";

var pagesize = 8;
export default {
  data() {
    //uidList: 保存选择的用户ID
    return {
      uname: "",
      mobile: "",
      pageNum: 1,
      total: 0,
      uidList: [],
      reDataList: [],
      errorInfo: "",
      ssoId: ""
    };
  },
  computed: {
    //分页用
    pageInfo: function() {
      return { pageSize: pagesize, currentpage: this.pageNum };
    },
    qParams: function() {
      let _offset = this.cptOffset(this.pageNum, pagesize);
      return {
        uname: this.uname,
        mobile: this.mobile,
        offset: _offset,
        pagesize: pagesize
      };
    },
    url: function() {
      //请求地址
      return action.rootPath + action.interface.whiteQuery;
    }
  },
  components: {
    queryBtnGroup,
    nameCondition,
    mobileCondition,
    formGroup,
    page,
    addWhitelist,
    removeWhitelist,
    updateWhitelist
  },
  mixins: [mixins],
  created() {
    this.doQuery();
  },
  activated() {
    eventHub.$on("do-reload", this.doReload);
  },
  deactivated() {
    eventHub.$off("do-reload", this.doReload);
  },
  methods: {
    //新增客户
    addWhitelist() {
      eventHub.$emit("open-modal", addWhitelist);
      //eventHub.$emit('show-alert', 'test');
    },
    //执行跳转
    doReload() {
      this.doQuery();
    },
    //移除名单
    removeWhitelist(id) {
      eventHub.$emit("open-modal", removeWhitelist, { id: id });
    },
    //更新名单
    updateWhitelist(id) {
      eventHub.$emit("open-modal", updateWhitelist, { id: id });
    },
    //导入excel
    addExcel() {
      eventHub.$emit("open-modal", addExcel, { ssoId: this.ssoId });
    },
    //批量修改额度
    editCredit() {
      eventHub.$emit("open-modal", editCreditExcel, { ssoId: this.ssoId });
    },
    //批量移除Excel
    removeExcel() {
      eventHub.$emit("open-modal", removeWhiteExcel, { ssoId: this.ssoId });
    },
    //打开历史授信
    goBack(uid) {
      history.go(-1);
    }
  },
  beforeDestroy() {
    //注销组件前，关闭所有弹窗
    eventHub.$emit("close-all-modal");
  }
};
</script>