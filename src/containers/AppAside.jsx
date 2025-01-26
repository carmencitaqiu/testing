import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import SideMenu from "@/components/SideMenu";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const AppAside = props => {
    let { menuToggle, menu } = props;
    return (
        <Sider className="aside" trigger={null} collapsible collapsed={menuToggle} theme="light">
            <Link to="/" replace>
                <div className="logo flex items-center justify-center">
                    <div className="text-lg font-semibold text-black-2">Favorite Projects</div>
                </div>
            </Link>
            <SideMenu menu={menu} collapsed={menuToggle}></SideMenu>
        </Sider>
    );
};

AppAside.propTypes = {
    menuToggle: PropTypes.bool,
    menu: PropTypes.array.isRequired
};

export default AppAside;
