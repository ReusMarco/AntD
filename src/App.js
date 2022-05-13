import "antd/dist/antd.css";
import "./App.css";
import {Button, Table, Modal, Form, Input} from "antd";
import {useState} from "react";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import CollectionCreateForm from "./CollectionCreateForm";

function App() {
    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [dataSource, setDataSource] = useState([{
        id: 1,
        title: 'ToDo App',
        duedate: '20/05/2022',
        eventdate: '25/05/2022',
        assignedto: 'Develeper',
        status: 'Not Completed',
        priority: 'Urgent',
        category: 'Program',
        detailedinfo: 'Must be completed by the end of current month!'
    },

    ]);
    const columns = [{
        key: "1", title: "ID", dataIndex: "id",
    }, {
        key: "2", title: "Title", dataIndex: "title",
    }, {
        key: "3", title: "Due Date", dataIndex: "duedate",
    }, {
        key: "4", title: "Event Date", dataIndex: "eventdate",
    }, {
        key: "5", title: "Assigned To", dataIndex: "assignedto",
    }, {
        key: "6", title: "Status", dataIndex: "status",
    }, {
        key: "7", title: "Priority", dataIndex: "priority",
    }, {
        key: "8", title: "Category", dataIndex: "category",
    }, {
        key: "9", title: "Detailed Info", dataIndex: "detailedinfo",
    }, {
        key: "8", title: "Actions", render: (record) => {
            return (<>
                <EditOutlined
                    onClick={() => {
                        onEditStudent(record);
                    }}
                />
                <DeleteOutlined
                    onClick={() => {
                        onDeleteStudent(record);
                    }}
                    style={{color: "red", marginLeft: 12}}
                />
            </>);
        },
    },];


    /*------------------------------------------------------------------------------------------------------------------*/
    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };
    /*------------------------------------------------------------------------------------------------------------------*/


    const onAddStudent = () => {
        const randomNumber = parseInt(Math.random() * 1000);
        const newStudent = {
            id: randomNumber,
            name: "Name " + randomNumber,
            email: randomNumber + "@gmail.com",
            address: "Address " + randomNumber,
        };
        setDataSource((pre) => {
            return [...pre, newStudent];
        });
    };
    const onDeleteStudent = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this task record?", okText: "Yes", okType: "danger", onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((student) => student.id !== record.id);
                });
            },
        });
    };
    const onEditStudent = (record) => {
        setIsEditing(true);
        setEditingStudent({...record});
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingStudent(null);
    };


    return (<div className="App">
            <header className="App-header">

                <Button type="primary" onClick={() => {
                    setVisible(true);
                }}>
                    New Task
                </Button>

                <CollectionCreateForm visible={visible} onCreate={onCreate} onCancel={() => {
                    setVisible(false);
                }}/>

                <Button onClick={onAddStudent}>Add Task</Button>

                <Table columns={columns} dataSource={dataSource}></Table>

                <Modal
                    title="Edit Task"
                    visible={isEditing}
                    okText="Save"
                    onCancel={() => {
                        resetEditing();
                    }}
                    onOk={() => {
                        setDataSource((pre) => {
                            return pre.map((student) => {
                                if (student.id === editingStudent.id) {
                                    return editingStudent;
                                } else {
                                    return student;
                                }
                            });
                        });
                        resetEditing();
                    }}
                >
                    <Input
                        value={editingStudent?.title}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, title: e.target.value};
                            });
                        }}
                    />
                    <Input
                        value={editingStudent?.duedate}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, duedate: e.target.value};
                            });
                        }}
                    />
                    <Input
                        value={editingStudent?.eventdate}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, eventdate: e.target.value};
                            });
                        }}
                    />
                    <Input
                        value={editingStudent?.assignedto}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, assignedto: e.target.value};
                            });
                        }}
                    />
                    <Input
                        value={editingStudent?.status}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, status: e.target.value};
                            });
                        }}
                    />
                    <Input
                        value={editingStudent?.priority}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, priority: e.target.value};
                            });
                        }}
                    />
                    <Input
                        value={editingStudent?.category}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, category: e.target.value};
                            });
                        }}
                    />
                    <Input
                        value={editingStudent?.detailedinfo}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, detailedinfo: e.target.value};
                            });
                        }}
                    />
                </Modal>
            </header>
        </div>
    )
        ;
}

export default App;
