import React, { useState, useEffect } from "react";
import { Layout, Table, Dropdown, Checkbox, message, Button } from "antd";
import { useHistory } from "react-router-dom";
import { DEFAULT_PAGE_SIZE } from "@/api/config";
import axios from "@/api";


const PROJECT_CONSTANTS = [{
    projectId: 'project_a',
    projectName: 'Project A',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    projectManager: 'John Doe'
},{
    projectId: 'project_b',
    projectName: 'Project B',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    projectManager: 'John Doe'
},{
    projectId: 'project_c',
    projectName: 'Project C',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    projectManager: 'John Doe'
}]

const ProjectManagement = props => {
    const [hasData, setHasData] = useState(true);

    const [selectedView, setSelectedView] = useState("table");

    const [createDeviceModal, setCreateDeviceModal] = useState(false);

    const [deviceList, setDeviceList] = useState(PROJECT_CONSTANTS);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const [totalCount, setTotalCount] = useState(0);

    const [deviceObj, setDeviceObj] = useState(null);

    const [deviceUId, setDeviceUId] = useState("");

    const history = useHistory();

    const DEFAULT_COLUMNS = [
        {
            title: "Project ID",
            dataIndex: "projectId",
            key: "projectId",
            width: 250,
            fixed: "left",
            render: (value, record) => {
                return (
                    <div className="w-full flex items-center space-x-1 justify-between">
                        <div className="text-sm font-semibold text-black-2">{value}</div>
                    </div>
                );
            }
        },
        {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
            width: 180,
            render: (value, record) => {
                return (
                    <div className="w-full flex items-center space-x-1 justify-between">
                        <div className="text-sm font-semibold text-black-2">{value}</div>
                    </div>
                );
            }
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
            width: 150,
            render: (value, record) => (
                <div className="w-full flex items-center space-x-1 justify-between">
                    <div className="text-sm font-semibold text-black-2">{value}</div>
                </div>
            )
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
            width: 150,
            render: (value, record) => (
                <div className="w-full flex items-center space-x-1 justify-between">
                    <div className="text-sm font-semibold text-black-2">{value}</div>
                </div>
            )
        },
        {
            title: "Project Manager",
            dataIndex: "projectManager",
            key: "projectManager",
            width: 150,
            render: (value, record) => (
                <div className="w-full flex items-center space-x-1 justify-between">
                    <div className="text-sm font-semibold text-black-2">{value}</div>
                </div>
            )
        },
        {
            render: (value, record) => {
                return (
                    <Button type="primary" onClick={() => {
                        history.push("/project/project-detail");
                    }}>Edit</Button>
                );
            }
        }
    ];
    const [dynamicColumn, setDynamicColumn] = useState(DEFAULT_COLUMNS);



    const handleTableChange = value => {
        const { current, pageSize } = value;
        setCurrentPage(current);
        setPageSize(pageSize);
    };

    const fetchDeviceList = () => {
        axios
            .post(`/device/list`, {
                pageNo: currentPage,
                pageSize
            })
            .then(res => {
                if (res.data.code === 200 && res.data.success) {
                    if (res.data.data) {
                        const sortedList = res.data.data.sort((a, b) => {
                            return b.deviceStatus - a.deviceStatus;
                        });
                        setDeviceList(sortedList);
                        setTotalCount(res.data.total);
                    }
                } else {
                    message.error(res.data.enMessage);
                }
            })
            .catch(err => {
                message.error(err.data.enMessage);
            });
    };


    useEffect(() => {
        // fetchDeviceList();
    }, [currentPage, pageSize]);


    const handleWheel = event => {
        event.stopPropagation();
    };

    return (
        <Layout className="index animated fadeIn relative">
            {hasData ? (
                <div
                    style={{ minHeight: "calc(100vh - 64px)" }}
                    className="overflow-y-scroll shadow-shadow-1 border border-solid border-white-1 rounded-xl"
                    onWheel={handleWheel}>
                    <Table
                            className="!bg-white border border-solid border-white-1 shadow-shadow-1 rounded-lg"
                            rowKey="projectId"
                            dataSource={deviceList}
                            columns={dynamicColumn}
                            onChange={handleTableChange}
                            pagination={{
                                current: currentPage,
                                pageSize,
                                total: totalCount
                            }}
                        />
                </div>
            ) : (
                <div
                    style={{ height: "calc(100vh - 64px)" }}
                    className="flex flex-col items-center justify-center w-full h-screen">
                    <div className="text-2xl font-semibold text-black">{t("device.nodata.title")}</div>
                    <p className="text-sm font-normal text-black opacity-50 mt-3 w-1/4 text-center">
                        {t("device.nodata.description")}
                    </p>
                    <div className="mt-4">
                        <div className="bg-white-1 rounded-lg h-12 w-[230px] flex items-center justify-center text-black-2 text-base font-semibold cursor-pointer mt-2">
                            {t("device.addDevice")}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ProjectManagement;
