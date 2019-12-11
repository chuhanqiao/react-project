class MUtil {
    request(params) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    method: params.method || "GET",
                    dataType: params.dataType || "json",
                    url: params.url || '',
                    data: params.data || null,
                    success: res => {
                        // 数据请求成功
                        if (0 === res.status) {
                            typeof resolve === 'function' && resolve(res.data, res.msg);
                            // 没有登录状态，强制登录
                        } else if (10 === res.status) {
                            this.doLogin();
                        } else {
                            typeof reject === 'function' && reject(res.msg || res.data);
                        }
                    },
                    error: err => {
                        typeof reject === 'function' && reject(err.statusText);
                    }
                })
            })
        }
        // 跳转登录页
    doLogin() {
        window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname);
    }
    getUrlParam(name) {
        // ?param=xxx&param1=xxx
        let queryString = window.location.search.split("?")[1] || '';
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;


    }
    errorTips(errMsg) {
        alert(errMsg || "好像哪里不对");
    }
}
export default MUtil;