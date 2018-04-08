<template>
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="goBack"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">{{edit?'编辑':'新增'}}</h4>
          </div>
          <div class="modal-body">
            <form id="addList" class="regForm ">
              <div class="col-xs-12 form-inline group-left validateModal">
                <div class="form-group col-xs-12">
                  <label class="control-label">
                    布料名称/型号：
                  </label>
                  <input class="form-control input-sm input-normal" type="text" name="name" v-model="detail.name" required>
                </div>
                <div class="form-group col-xs-12 hideP">
                  <label class="control-label">
                    货源：
                  </label>
                  <input class="form-control input-sm input-normal" name="source" v-model="detail.source" type="text">
                </div>
                <div class="form-group col-xs-12 hideP">
                  <label class="control-label">
                    联系方式：
                  </label>
                  <input class="form-control input-sm input-normal" name="mobile" v-model="detail.mobile"  type="text" required>
                </div>
                <div class="form-group col-xs-12 hideP">
                  <label class="control-label">
                    户名：
                  </label>
                  <input class="form-control input-sm input-normal" name="uname" v-model="detail.uname" required type="text">
                </div>
                <div class="form-group col-xs-12 hideP">
                  <label class="control-label">
                    银行卡号：
                  </label>
                  <input class="form-control input-sm input-normal" name="bankCard" v-model="detail.bankCard" required type="text">
                </div>
                <div class="form-group col-xs-12 hideP">
                  <label class="control-label">
                    单价：
                  </label>
                  <input class="form-control input-sm input-normal" name="price" v-model="detail.price" required type="text">
                  <span>元/米</span>
                </div>
                <div class="form-group col-xs-12 hideP">
                  <label class="control-label">
                    长度：
                  </label>
                  <input class="form-control input-sm input-normal" name="length" v-model="detail.length" required type="text">
                  <span>米</span>
                </div>
                <div class="form-group col-xs-12 hideP">
                  <label class="control-label">
                    进货时间：
                  </label>
                  <date-condition q-name="deliveryTime" name="deliveryTime" q-class="form-control" :value="detail.deliveryTime" v-model="detail.deliveryTime"></date-condition>
                </div>
                <div class="form-group col-xs-12">
                  <label>备注：</label>
                  <textarea class="note"  name="remark" v-model="detail.remark"></textarea>
                </div>
            </div></form>
          </div>
          <div class="modal-footer">
            <save-back-btn></save-back-btn>
            </div>
          <!-- /.modal-content -->
        </div>
</template>
<script>
/*
 * 新增&编辑布料
 */
import action from "../../action/interface.js";
import mixins from "../mixin.js";

import saveBackBtn from "../query-btn-group/save-back-btn.vue";
import dateCondition from "../form-group/date-condition.vue";

let addUrl = action.rootPath + action.interface.clothAdd;
let updateUrl = action.rootPath + action.interface.clothUpdate;
export default {
  components: { saveBackBtn, dateCondition },
  props: ["modalProps"],
  data() {
    return {
      detail: {
        name: "",
        source: "",
        mobile: "",
        bankCard: "",
        uname: "",
        price: "",
        length: "",
        deliveryTime: ""
      },
      edit: false
    };
  },
  computed: {
    params: function() {
      let vm = this;
      return {
        name: this.detail.name,
        source: this.detail.source,
        mobile: this.detail.mobile,
        bankCard: this.detail.bankCard,
        uname: this.detail.uname,
        price: this.detail.price,
        length: this.detail.length,
        deliveryTime: this.detail.deliveryTime
      };
    }
  },
  created() {
    this.edit = !!this.modalProps.item;
    if (this.edit) {
      this.detail = this.modalProps.item;
    }
  },
  mounted() {
    eventHub.$on("do-save", this.doSave);
    eventHub.$on("go-back", this.goBack);
    let vm = this;
    $('input[name="deliveryTime"]')
      .datetimepicker()
      .on("changeDate", function(ev) {
        vm.detail.deliveryTime = vm.fDate(ev.date.valueOf(), "yyyy-MM-dd");
      });
  },
  mixins: [mixins],
  methods: {
    //保存
    doSave() {
      if ($("#addList").valid()) {
        let _params = this.params;
        if (this.edit) {
          _params.id = this.detail._id;
        }
        let url = this.edit ? updateUrl : addUrl;
        this.post(url, _params, function(res) {
          if (res.code == 0) {
            eventHub.$emit("show-alert", "保存成功！", "refresh");
            $("#addList")[0].reset();
          } else {
            eventHub.$emit("show-alert", res.message);
          }
        });
      }
    },
    goBack() {
      //返回
      eventHub.$emit("close-modal");
    }
  }
};
</script>