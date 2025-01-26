import React, { useState, useEffect } from "react";
import { Input, Select, Checkbox, Button, Form, Modal, Tag, Layout, DatePicker, message } from "antd";
const { TextArea } = Input;
const ProjectDetail = props => {

    const [form] = Form.useForm();

    const handleSubmitFinish = values => {}

    const handleSubmitFinishFailed = errorInfo => {};

    const handleFormValuesChange = (changedValues, allValues) => {}

    const formItemLayout = {
        labelCol: {
            span: 6,
          },
          wrapperCol: {
            span: 12,
          },
    };

    const formTailLayout = {
        labelCol: {
            span: 6,
          },
          wrapperCol: {
            span: 12,
            offset: 6,
          },
    };


    return (
        <Layout className="index animated fadeIn relative">
            <div className="w-full h-screen">
                <div className="pt-2 w-1/2">
                    <Form
                        name="export_data_form"
                        form={form}
                        layout="horizontal"
                        onFinish={handleSubmitFinish}
                        onFinishFailed={handleSubmitFinishFailed}
                        onValuesChange={handleFormValuesChange}>
                            <Form.Item
                                {...formItemLayout}
                                name="projectId"
                                label={<span>Project ID</span>}
                                >
                                <div>project_a</div>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="exportName"
                                label={<span>Project Name</span>}
                                >
                                <Input
                                    placeholder={"Please input project name"}
                                />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="description"
                                label={<span>Description</span>}
                                >
                                <TextArea
                                    placeholder={"Please input description"}
                                />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="startDate"
                                label={<span>Start Date</span>}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="endDate"
                                label={<span>End Date</span>}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="projectManager"
                                label={<span>Project Manager</span>}
                                >
                                 <Input
                                    placeholder={"Please input project manager"}
                                />
                            </Form.Item>
                            <Form.Item shouldUpdate {...formTailLayout}>
                                {() => (
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        style={{ marginTop: 'auto' }} // 添加此行以确保按钮与输入框底部对齐
                                        >
                                        Update
                                    </Button>
                                )}
                            </Form.Item>
                        </Form>
                </div>
            </div>
        </Layout>
    );
};

export default ProjectDetail;
