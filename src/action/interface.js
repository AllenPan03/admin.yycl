/**
 * 获取当前环境。
 */
const env = getEnv();
/**
 * 获取地址中指定的查询参数值。
 * @param name 查询参数名。
 * @param url 原地址。
 * @return 返回查询参数值。如果找不到则返回 null。
 * @example getQuery("foo", "?foo=1") // "1"
 * @example getQuery("goo", "?foo=1") // null
 */
function getQuery(name, url = location.href) {
    let match = /\?([^#]*)/.exec(url);
    if (match) {
        match = new RegExp("(?:^|&)" + encodeURIComponent(name).replace(/([\-.*+?^${}()|[\]\/\\])/g, "\\$1") + "=([^&]*)(?:&|$)", "i").exec(match[1]);
        if (match) {
            return decodeURIComponent(match[1]);
        }
    }
    return null;
}
function getEnv() {
    let r = "__ENV__";
    if (r.indexOf("_") >= 0) {
        r = getQuery("env") || (/jinlin\.com\.cn/.test(location.host) ? "prd" :
            /wdai\.com/.test(location.host) ? "uat" :
                /jinlin\.work|wdtest\./.test(location.host) ? "fat" :
                    /39|127|localhost/.test(location.host) ? "dev" : "prd");
    }
    return r ;
}
const apis = {
    prd: "http://192.168.92.229:3000/api/",
    // uat: "http://peraudit.wdai.com/api",
    // fat: "http://peraudit.wdai.com/api",
    dev: "http://192.168.92.229:3000/api/",
};
var action = {
    rootPath: apis[env],
    timeout: 2000,
    method: "post",
    interface: {
        //判断是否初始化
        initialized:'initialized',
        //初始化配置账号密码
        setup: 'setup',
        //登录
        login: 'login',
        //导航
        menu: 'log/index',
        //客户信息
        whiteQuery: 'white/query',
        //客户操作历史
        whiteQueryhistory: 'white/queryoperation',
        //客户新增接口
        whiteAdd: 'white/add',
        //查询单个客户详情
        whiteOne: 'white/query/one',
        //导入客户接口
        whiteUpload: 'white/upload',
        //删除客户接口
        whiteDelete: 'white/delete',
        //更新客户接口
        whiteUpdate: 'white/update',
    }
};
export default action