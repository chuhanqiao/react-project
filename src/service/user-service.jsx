import Util from "util/mm.jsx";
const _mm = new Util();
class User {
    login(loginInfo) {
        return _mm.request({
            method: "POST",
            url: "/manage/user/login.do",
            data: loginInfo
        })
    }
}
export default User;