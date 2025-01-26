import React, { useState, useEffect, useReducer } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Layout, message } from "antd";
import routes from "@/routes";
import menus from "@/routes/menus";
import "@/style/layout.less";

import AppHeader from "./AppHeader.jsx";
import AppAside from "./AppAside.jsx";

const { Content } = Layout;

const MENU_TOGGLE = "menuToggle";

const reducer = (state, action) => {
    switch (action.type) {
        case MENU_TOGGLE:
            return { ...state, menuToggle: !state.menuToggle };
        default:
            return state;
    }
};

const getMenu = menu => {
    return menu;
};

const DefaultLayout = props => {
    const [menu] = useState(prevState => {
        return getMenu(menus);
    });

    const [state, dispatch] = useReducer(reducer, { menuToggle: false });

    const menuClick = () => {
        dispatch({ type: "menuToggle" });
    };

    const loginOut = () => {
        localStorage.clear();
        props.history.replace("/login");
        message.success("登出成功!");
    };

    return (
        <Layout className="app">
            <AppAside menuToggle={state.menuToggle} menu={menu} />
            <Layout style={{ minHeight: "100vh", overflowY: "scroll", backgroundColor: "#fff", paddingLeft: "24px" }}>
                <AppHeader menuToggle={state.menuToggle} menuClick={menuClick} loginOut={loginOut} />
                <Content className="content">
                    <Switch>
                        {routes.map(item => {
                            return (
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    exact={item.exact}
                                    render={props =>
                                        (<item.component {...props} />)
                                    }></Route>
                            );
                        })}
                    </Switch>
                </Content>
                {/* <AppFooter /> */}
            </Layout>
        </Layout>
    );
};

export default withRouter(DefaultLayout);
