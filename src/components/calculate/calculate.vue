<style lang="scss">
@import "./calculate.scss";
</style>
<template>
        <div>
          <div >
            <form id="addList" class="regForm x-space-top calculate">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>数量（米）</th>
                            <th>单价</th>
                            <th>金额（元）</th>
                            <th>总金额（元）</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>布</td>
                            <td><input value="" v-model="item1"/></td>
                            <td><input value="" v-model="item2"/></td>
                            <td>{{(item1*item2).toFixed(2)}}</td>
                            <td rowspan="6" style="vertical-align: middle;text-align: center; ">{{result}}</td>
                        </tr>
                        <tr>
                            <td>罗马轨</td>
                            <td><input value="" v-model="item3"/></td>
                            <td><input value="" v-model="item4"/></td>
                            <td>{{(item3*item4).toFixed(2)}}</td>
                        </tr>
                        <tr>
                            <td>布带</td>
                            <td><input value="" v-model="item5"/></td>
                            <td><input value="" v-model="item6"/></td>
                            <td>{{(item5*item6).toFixed(2)}}</td>
                        </tr>
                        <tr>
                            <td>丝带</td>
                            <td><input value="" v-model="item7"/></td>
                            <td><input value="" v-model="item8"/></td>
                            <td>{{(item7*item8).toFixed(2)}}</td>
                        </tr>
                        <tr>
                            <td>艺术圈</td>
                            <td><input value="" v-model="item9"/></td>
                            <td><input value="" v-model="item10"/></td>
                            <td>{{(item9*item10).toFixed(2)}}</td>
                        </tr>
                        <tr>
                            <td>绑带</td>
                            <td><input value="" v-model="item11"/></td>
                            <td><input value="" v-model="item12"/></td>
                            <td>{{(item11*item12).toFixed(2)}}</td>
                        </tr>
                    </tbody>
                </table>
              <!-- <div class="col-xs-12 form-inline group-left validateModal">
                <div class="form-group col-xs-6">
                  <label class="control-label">
                    布长度：
                  </label>
                  <input class="form-control input-sm input-normal" type="text" v-model="item1"> 米
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    布单价：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item2" type="text"> 元/米
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    罗马轨长度：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item3"  type="text"> 米
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    罗马轨单价：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item4" type="text"> 元/米
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    布袋长度：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item5" type="text"> 米
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    布袋单价：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item6" type="text"> 元/米
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    丝带长度：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item7" type="text"> 米
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    丝带单价：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item8" type="text"> 元/米
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    艺术圈个数：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item9" type="text"> 只
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    艺术圈单价：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item10" type="text"> 元/只
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    绑带：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item11" type="text"> 付
                </div>
                <div class="form-group col-xs-6 hideP">
                  <label class="control-label">
                    绑带：
                  </label>
                  <input class="form-control input-sm input-normal" v-model="item12" type="text"> 元/付
                </div>
                </div> -->
            </form>
          </div>
          <!-- <div> 
              <label style="width:133px;text-align:right;">总金额：</label>{{result}} 元
          </div> -->
          <!-- <div class="form-group col-xs-12 x-space-top">
            <button style="margin-left:144px;" type="button" class="btn btn-default" @click="clickSave">计算</button>
          </div> -->
          <!-- <div class="x-sapce-top"><label>总金额：</label>{{result}}</div> -->
        </div>
</template>
<script>
/*
 * 计算器
 */
import action from "../../action/interface.js";
import mixins from "../mixin.js";

export default {
  components: {},
  data() {
    return {
      item1: "",
      item2: "",
      item3: "",
      item4: "",
      item5: "",
      item6: "",
      item7: "",
      item8: "",
      item9: "",
      item10: "",
      item11: "",
      item12: ""
    };
  },
  computed: {
    result: function() {
      let sum =
        Number(this.item1) * Number(this.item2) +
        Number(this.item3) * Number(this.item4) +
        Number(this.item5) * Number(this.item6) +
        Number(this.item7) * Number(this.item8) +
        Number(this.item9) * Number(this.item10) +
        Number(this.item11) * Number(this.item12);
      sum = sum.toFixed(2);
      return sum;
    }
  },
  mounted() {
    eventHub.$on("do-save", this.doSave);
    eventHub.$on("go-back", this.goBack);
  },
  mixins: [mixins],
  methods: {
    //计算
    clickSave() {
      this.result =
        Number(this.item1) * Number(this.item2) +
        Number(this.item3) * Number(this.item4) +
        Number(this.item5) * Number(this.item6) +
        Number(this.item7) * Number(this.item8) +
        Number(this.item9) * Number(this.item10) +
        Number(this.item11) * Number(this.item12);
      this.result = this.result.toFixed(2);
    },
    goBack() {
      //返回
      eventHub.$emit("close-modal");
    }
  }
};
</script>