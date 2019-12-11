import React from "react";
import Util from "util/mm.jsx";
import User from "service/user-service.jsx";
import "./index.css";
const _mm = new Util();
const _user = new User();
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            redirect:_mm.getUrlParam("redirect")||''
        }
    }
    onInputChange(e){
        var key = e.target.name,
        val = e.target.value;
        this.setState({
            [key]:val
        })
    }
    onsubmit(e){
        let loginInfo = {
            username:this.state.username,
            password:this.state.password
        },
        checkInfo = this.checkLogin(loginInfo);
        if(checkInfo.status){
            _user.login(loginInfo).then((res)=>{
                this.props.history.push(this.state.redirect);
            },(errMsg)=>{
                _mm.errorTips(errMsg);
            })
        }else{
            _mm.errorTips(checkInfo.msg);
        }
     
    }
    checkLogin(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
            if(typeof username !== "string" || username.length === 0){
                return {
                    status:false,
                    msg:"用户名不能为空"
                }
            }
            if(typeof password !== "string" || password.length === 0){
                return {
                    status:false,
                    msg:"密码不能为空"
                }
            }
            return {
                status:true,
                msg:"验证通过"
            }
    }
    render(){
        return (
            <div className="col-xs-4 col-xs-offset-4">
                <div className="panel panel-default">
                    <div className="panel-heading">欢迎登陆MMALL管理系统</div>
                    <div className="panel-body">
                       <form action="">
                            <div className="form-group">
                                <input type="text" 
                                name = "username"
                                className="form-control" 
                                placeholder="请输入用户名"
                                autoComplete="off"
                                onChange={(e)=>{this.onInputChange(e)}}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                name="password"
                                className="form-control" 
                                placeholder="请输入密码"
                                autoComplete="off"
                                onChange={(e)=>{this.onInputChange(e)}}
                                />
                            </div>
                            <button onClick={(e)=>{this.onsubmit(e)}} type="button" className="btn btn-primary btn-block">登录</button>
                       </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;