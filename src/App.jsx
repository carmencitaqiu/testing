import React from "react";
import {
    /* BrowserRouter as Router,*/
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import AsyncLoadable from "@/utils/AsyncLoadable";
import "animate.css";
import "./style/base.less";
import "./style/global.css";
// 公共模块
const DefaultLayout = AsyncLoadable(() => import(/* webpackChunkName: 'default' */ "./containers"));

// 基础页面

const App = () => (
    <Router>
        <Switch>
            <Route path="/" exact render={() => <Redirect to="/project/projectlist" />} />
            <Route component={DefaultLayout} />
        </Switch>
    </Router>
);

export default App;
