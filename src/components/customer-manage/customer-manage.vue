<template>
    <div class="white-list">
        <form-group>
            <name-condition slot="input" q-name="uname" v-model="uname"></name-condition>
            <mobile-condition slot="input" q-name="mobile" v-model="mobile"></mobile-condition>
            <query-btn-group slot="btn"></query-btn-group>
        </form-group>
        <div class="clearfix">
            <a type="button" class="btn btn-default btn-outline x-space" @click="addWhitelist">新增客户</a>
        </div>
        <div class="x-space-top">
          <table class="table table-bordered ">
            <thead>
            <tr>
              <th>客户姓名</th>
              <th>电话号码</th>
              <th>窗（数量）</th>
              <!-- <th>交易金额</th> -->
              <th>客户地址</th>
              <th>详情</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in reDataList">
                  <td>{{item.uname}}</td>
                  <td>{{item.mobile}}</td>
                  <td>4</td>
                  <!-- <td>{{fMoney(item.amount)}}</td> -->
                  <td>{{item.address}}</td>
                  <td>
                    <a href="javascript:;" @click="goDetail(item._id)">查看</a> 
                  </td>
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
    goDetail(uid) {
      this.$router.push({ name: "customerDetail" });
    }
  },
  beforeDestroy() {
    //注销组件前，关闭所有弹窗
    eventHub.$emit("close-all-modal");
  }
};
</script>