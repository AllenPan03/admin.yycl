/*
 * 后台数据与前台数据转化
 */
export default {
    //启动/停用
    operateStatus: {
        '0':  '停用'
        ,'1': '启用'
    }
    //启动/停用（banner）
    ,bannerStatus: {
        '1':  '停用'
        ,'0': '启用'
    }
    //优惠券适用状态
    ,markStatus: {
        '0':  '未使用'
        ,'1': '已使用'
        ,'2': '已过期'
    }
    //发标类型 天/月
    ,termType: {
        '0': '天'
        ,'1': '个月'
    }
    //是否
    ,isOrNot: {
        '0': '否'
        ,'1': '是'
        ,'2' :'已过期'
    }
    //绑卡状态
    ,isBank: {
        '-2': '未绑卡'
        ,'-1': '已绑卡'
        ,'0' :'需确认绑卡'
        ,'1': '未绑卡'
        ,'2': '未激活'
        ,'3': '未绑卡'
        ,'4': '需线下解绑'
    }
    // 借款状态 & 贷后信息
    ,loanStatus: {
        '0': '审核中'
        ,'1': '审核未通过'
        ,'2': '放款中'
        ,'3': '还款中'
        ,'4': '逾期'
        ,'5': '已结清'
        ,'6': '放款失败'
        ,'7':'续贷处理中'
        ,'8':'已续贷'
    }
    // 借款状态 & 贷后信息(2)
    ,statusList: {
        '0': '审核中'
        ,'1': '审核未通过'
        ,'2': '放款中'
        ,'3': '还款中'
        ,'4': '逾期'
        ,'5': '已结清'
        ,'6': '放款失败'
        ,'7':'续贷处理中'
        ,'8':'已续贷'
    }
    // 逾期状态
    ,delayStatus: {
        '0': '未结清'
        ,'1': '已结清'
    }
    //还款方式
    ,paymentmethod: {
        '0': '一次性还本付息'
        ,'1': '等额本息'
        ,'2': '月还息到期还本'
    }
    ,infotype: {
        '7': '京东'
        ,'2': '芝麻信用'
        ,'3': '运营商'
        ,'5': '支付宝'
        ,'6': '淘宝'
        ,'1': '个人信息'
        ,'4': '紧急联系人'
        ,'8': '通讯录'
        ,'9': '定位授权'
    }
    ,planStatus:{
        '0': '待还'
        ,'1': '已还'
    }
    ,repaytype:{
        '0': '主动还款'
        ,'1': '自动还款'
    }
    ,loanuse:{
        '0': '资金周转'
        ,'1': '购物消费'
        ,'2': '住房装修'
        ,'3': '个人助学'
        ,'4': '个人旅游'
        ,'5': '汽车消费'
        ,'6': '其他'
    }
    ,mobilesysterm:{
        '1': 'IOS'
        ,'2': 'android'
    }
    //产品类型
    ,prdtypeValue:{
        '1': '随想贷'
        ,'2': '微米贷'
        ,'3': '车贷'
        ,'4': '多米贷'
        ,'8': '好想贷'
    }
    //学历
    ,education: {
        '0':  '高中/中专及以下'
        ,'1': '大学专科'
        ,'2': '大学本科'
        ,'3': '研究生及以上'
    }
    ,unit:{
        '0':  '日'
        ,'1': '月'
    }
    ,palceValue:{
        '1': '顶部'
        ,'2': '中间'
        ,'3': '发现模块'
    }
    //标的状态
    ,bidStatus: {
        '0': '未发标'
        ,'1': '募集中'
        ,'2': '已满标复审'
        ,'3': '袋鼠已撤标'
        ,'4': '已确认撤标'
        ,'5': '已补标'
    }
    //自动预打款状态
    ,autopayStatus: {
        '0': '未打款'
        ,'1': '已打款'
        ,'2': '打款失败'
    }
    //优惠券类型
    ,ticketType:{
        '1': '急速审核券'
        ,'4': '优惠券'
    }
    //婚姻状态
    ,marryStatus:{
        '0': '未婚'
        ,'1': '已婚'
        ,'2': '离异'
        ,'3': '丧偶'
    }
    ,ivrStatus:{
        '0': '已完成'
        ,'1': '未接听'
        ,'2': '中途挂断'
    }
    ,callStatus:{
        '0':'成功'
        ,'1': '中途挂断'
        ,'2': '未接听'
        ,'3': '呼叫受限'
        ,'4': '线路忙'
    }
}