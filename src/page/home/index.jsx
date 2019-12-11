import React from "react";
import PageTitle from "component/page-title/index.jsx";
class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title = "首页">
                    <h2>this is test</h2>
                </PageTitle>
            </div>
        )
    }
}

export default Home;