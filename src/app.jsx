import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link,Switch,Redirect } from 'react-router-dom';
import Home from "page/home/index.jsx";
import Layout from "component/layout/index.jsx";
class App extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path = "/" component = {Home}/>
                        <Route path = "/product" component = {Home}/>
                        <Route path = "/product-category" component = {Home}/>
                    </Switch>
                </Layout>
            </Router>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);