<template>
    <div class="white-list">
        <form-group>
            <temp-condition slot="input" s-name="布料名称/型号：">
                <input type="text" class="form-control" v-model="name" />
            </temp-condition>
            <query-btn-group slot="btn"></query-btn-group>
        </form-group>
        <div class="clearfix">
            <a type="button" class="btn btn-default btn-outline x-space" @click="editCloth('')">新增</a>
        </div>
        <div class="x-space-top">
          <table class="table table-bordered ">
            <thead>
            <tr>
              <th>布料名称/型号</th>
              <th>货源</th>
              <th>联系方式</th>
              <th>银行卡号</th>
              <th>户名</th>
              <th>单价（元/米）</th>
              <th>长度（米）</th>
              <th>进货时间</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
                 <tr v-for="(item, index) in reDataList">
                  <td>{{item.name}}</td>
                  <td>{{item.source}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.bankCard}}</td>
                  <td>{{item.uname}}</td>
                  <td>{{item.price}}</td>
                  <td>{{item.length}}</td>
                  <td>{{item.deliveryTime}}</td>
                  <td>
                      <a href="javascript:;" @click="editCloth(item)">修改</a>  |
                      <a href="javascript:;" @click="onDelet(item._id)">删除</a> 
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
 * 布料管理页面
 */
import action from "../../action/interface.js";
import mixins from "../mixin.js";
import Vue from "vue";

import queryBtnGroup from "../query-btn-group/query-btn-group.vue";
import nameCondition from "../form-group/name-condition.vue";
import mobileCondition from "../form-group/mobile-condition.vue";
import tempCondition from "../form-group/temp-condition.vue";
import alertPrompt from "../basic/alert/alert-prompt.vue";
import formGroup from "../form-group/form-group.vue";
import page from "../basic/page/page.vue";
import clothEdit from "./cloth-edit.vue";

var pagesize = 8;
export default {
  data() {
    return {
      name: "",
      pageNum: 1,
      total: 0,
      reDataList: [],
      errorInfo: "",
      id: ""
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
        name: $.trim(this.name),
        offset: _offset,
        pagesize: pagesize
      };
    },
    url: function() {
      //请求地址
      return action.rootPath + action.interface.clothQuery;
    }
  },
  components: {
    queryBtnGroup,
    nameCondition,
    mobileCondition,
    tempCondition,
    formGroup,
    page,
    clothEdit
  },
  mixins: [mixins],
  created() {
    this.doQuery();
  },
  activated() {
    eventHub.$on("do-reload", this.doReload);
    eventHub.$on("make-true", this.doDelete);
  },
  deactivated() {
    eventHub.$off("do-reload", this.doReload);
  },
  methods: {
    //新增&编辑客户
    editCloth(item) {
      eventHub.$emit("open-modal", clothEdit, { item: item });
    },
    //执行跳转
    doReload() {
      this.doQuery();
    },
    //删除操作
    onDelet(id) {
      eventHub.$emit("open-modal", alertPrompt, {
        msg: "确认删除该款布料吗？",
        id: id
      });
      this.id = id;
    },
    doDelete() {
      let deleteUrl = action.rootPath + action.interface.clothDelete;
      this.post(deleteUrl, { id: this.id }, function(res) {
        if (res.code == 0) {
          eventHub.$emit("show-alert", "删除成功！", "refresh");
        } else {
          eventHub.$emit("show-alert", res.message);
        }
      });
    }
  },
  beforeDestroy() {
    //注销组件前，关闭所有弹窗
    eventHub.$emit("close-all-modal");
    eventHub.$off("make-true", this.doDelete);
  }
};
</script>