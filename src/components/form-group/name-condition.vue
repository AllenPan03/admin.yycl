<style lang="scss">
    @import "./form-group.scss";
</style>
<template>
    <div class="form-group col-md-3">
        <label class="control-label col-md-4">客户姓名：</label>
        <div class="col-md-8">
            <input type="text" :name="qName" class="form-control" :placeholder="placeholder" :value="value" @input="onInput"/>
        </div>
    </div>
</template>
<script>
/*
 * 姓名查询条件，H5默认时间样式
 * param: {qName,value,placeholder}
 */
    export default {
        props: ['qName', 'value', 'placeholder']
        ,methods: {
            onInput: function (e) {
                console.log(e)
                e = e || event;
                this.$emit('input', e.target.value)
            }
        }
    }
</script>