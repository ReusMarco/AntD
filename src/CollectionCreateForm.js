import React, {useState} from 'react';
import {Button, Modal, Form, Input, DatePicker, Space, Select, Upload, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";

const CollectionCreateForm = ({visible, onCreate, onCancel}) => {
    const [form] = Form.useForm();

    const { Option } = Select;

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Modal
            visible={visible}
            title="Add new Task"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Space direction="vertical">

                </Space>

                <Form.Item name="title" rules={[{required: true, message: 'Please input the title of Task!',},]}>
                    <Input placeholder="Enter Task Title:" style={{ width: '85%' }} />
                </Form.Item>

                <Form.Item name="duedate">
                    <DatePicker placeholder="Due Date:" style={{ width: '40%', marginRight: '5%' }} />
                    <DatePicker placeholder="Event Date:" style={{ width: '40%' }} />
                </Form.Item>

                <Form.Item name="assignedto" rules={[{required: true, message: 'Please select responsible person!',},]}>
                    <Select mode="multiple" style={{width: '85%'}} placeholder="Assigned To" onChange={handleChange} optionLabelProp="label">
                        <Option value="coordinator" label="Coordinator">
                            <div className="demo-option-label-item">Coordinator</div>
                        </Option>
                        <Option value="developer" label="Developer">
                            <div className="demo-option-label-item">Developer</div>
                        </Option>
                        <Option value="organizer" label="Organizer">
                            <div className="demo-option-label-item">Organizer</div>
                        </Option>
                    </Select>
                </Form.Item>

                <Form.Item name="status&priority">
                    <Select defaultValue={['Status']} style={{width: '40%', marginRight: '5%'}} placeholder="Status" onChange={handleChange} optionLabelProp="label" >
                        <Option value="Under review">
                            <div className="demo-option-label-item">Under review</div>
                        </Option>
                        <Option value="Rejected">
                            <div className="demo-option-label-item">Rejected</div>
                        </Option>
                        <Option value="Completed">
                            <div className="demo-option-label-item">Completed</div>
                        </Option>
                    </Select>

                    <Select defaultValue={['Priority']} style={{width: '40%'}} placeholder="Priority" onChange={handleChange} optionLabelProp="label" >
                        <Option value="Low">
                            <div className="demo-option-label-item">Low</div>
                        </Option>
                        <Option value="Normal">
                            <div className="demo-option-label-item">Normal</div>
                        </Option>
                        <Option value="Important">
                            <div className="demo-option-label-item">Important</div>
                        </Option>
                        <Option value="Critical">
                            <div className="demo-option-label-item">Critical</div>
                        </Option>
                    </Select>
                </Form.Item>

                <Form.Item name="category&attachment">
                    <Select defaultValue={['Category']} style={{width: '40%', marginRight: '5%'}} placeholder="Status" onChange={handleChange} optionLabelProp="label" >
                        <Option value="Global">
                            <div className="demo-option-label-item">Global</div>
                        </Option>
                        <Option value="Local">
                            <div className="demo-option-label-item">Local</div>
                        </Option>
                        <Option value="Private">
                            <div className="demo-option-label-item">Private</div>
                        </Option>
                        <Option value="Public">
                            <div className="demo-option-label-item">Public</div>
                        </Option>
                    </Select>

                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Attach a file:</Button>
                    </Upload>
                </Form.Item>

                <Form.Item name="detailedinfo">
                    <TextArea placeholder='Detailed Info:' style={{ height: 100 }}></TextArea>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CollectionCreateForm;