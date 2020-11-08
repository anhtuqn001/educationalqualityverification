import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, List, Typography, Select, Form, Table } from 'antd';
// import UnassignedMinhChungTable from './UnassignedMinhchungTable.js';
import { LogoutContext } from '../Contexts.js';
import { StopOutlined } from '@ant-design/icons';

const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    }
}

const { TreeNode } = Tree;
const { Text, Title } = Typography;
const { Option } = Select;

const minhchungColumns = [{
    title: 'Minh chứng chưa được phân công',
    dataIndex: 'maminhchung'
}]



const EvidenceAssignment = ({ nienkhoaId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [nhoms, setNhoms] = useState(true);
    const [currentNhomId, setCurrentNhomId] = useState(null);
    const [currentUsers, setCurrentUsers] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [unassignedMinhchungs, setUnassignedMinhchungs] = useState(null);
    const [minhchungSelectedRowKeys, setMinhchungSelectedRowKeys] = useState([]);
    const [nhomsSelectedRowKeys, setNhomsSelectedRowKeys] = useState(null);
    const [hasMinhchungSelected, setHasMinhchungSelected] = useState(false);
    const [hasUserSelected, setHasUserSelected] = useState(false);
    const { doLogout } = useContext(LogoutContext);
    const [isAssigning, setIsAssigning] = useState(false);

    useEffect(() => {
        fetch('/api/getunassignedminhchungs/' + nienkhoaId, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { minhchungs, nhoms } = resData;
            if (minhchungs && minhchungs.length > 0) {
                minhchungs = minhchungs.map(i => ({
                    ...i,
                    key: i.id
                })) // add key to Minh chung
                setUnassignedMinhchungs(minhchungs);
            }
            if (nhoms && nhoms.length > 0) {
                nhoms = nhoms.map(i => {
                    let { users } = i;
                    users = users.map(u => ({
                        ...u,
                        key: u.id
                    }))
                    return {
                        ...i,
                        users: [...users]
                    };
                }) //add key to users
                let nhomsSelectedRowKeys = {};
                nhoms.forEach(i => {
                    nhomsSelectedRowKeys[i.id] = [];
                })
                setNhoms(nhoms);
                setNhomsSelectedRowKeys(nhomsSelectedRowKeys);
                setCurrentNhomId(nhoms[0].id);
                setCurrentUsers(nhoms[0].users);
            }
        }).catch((error) => {
            if (error.status == 401) {
                if (localStorage.getItem("token") !== null) {
                    localStorage.removeItem("token");
                }
                doLogout();
            } else {
                message.error("Lỗi hệ thống");
            }
        }).then(() => {
            setIsLoading(false);
        });
    }, [])

    if (isLoading) {
        return <div style={styles.container}>
            <Spin
                size="large"
            />
        </div>
    }

    const userColumns = [{
        title: 'Mã thành viên',
        dataIndex: 'name'
    },
    {
        title: 'Tên thành viên',
        dataIndex: 'hoten'
    }]

    const handleNhomSelectChange = (value) => {
        setCurrentNhomId(value);
        let currentNhom = nhoms.find(i => i.id == value);
        let currentUsers = [...currentNhom.users];
        setCurrentUsers(currentUsers);
        // setCurrentUser(null);
    }

    const onUnassignedMinhchungSelectChange = (selectedRowKeys) => {
        if (selectedRowKeys.length > 0) {
            setHasMinhchungSelected(true);
        } else {
            setHasMinhchungSelected(false);
        }
        setMinhchungSelectedRowKeys(selectedRowKeys);
    }

    const unassignedMinhchungRowSelection = {
        onChange: onUnassignedMinhchungSelectChange,
        selectionType: 'checkbox',
        selectedRowKeys: minhchungSelectedRowKeys,
    }

    const onUserSelectChange = (selectedRowKey) => {
        nhomsSelectedRowKeys[currentNhomId] = selectedRowKey
        setNhomsSelectedRowKeys({ ...nhomsSelectedRowKeys });
        if (getflattenUsers(nhomsSelectedRowKeys).length > 0) {
            setHasUserSelected(true);
        } else {
            setHasUserSelected(false);
        }
    }

    const userRowSelection = {
        onChange: onUserSelectChange,
        selectionType: 'checkbox',
        selectedRowKeys: nhomsSelectedRowKeys[currentNhomId],
    }

    const getflattenUsers = (nhomsSelectedRowKeys) => {
        let userIds = [];
        let nhomIds = Object.keys(nhomsSelectedRowKeys);
        nhomIds.forEach(id => {
            if (nhomsSelectedRowKeys[id].length > 0) {
                userIds = [...userIds, ...nhomsSelectedRowKeys[id]];
            }
        });
        return userIds;
    }

    const assignMinhchungs = () => {
        setIsAssigning(true);
        let data = {
            minhchungs: minhchungSelectedRowKeys.map(i => ({
                id: i,
                users: getflattenUsers(nhomsSelectedRowKeys)
            }))
        }
        fetch('/api/assignminhchungs', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { success } = resData;
            if (success) {
                message.success('Phân công minh chứng thành công!!');
                // removeAssignedMinhChungs(minhchungSelectedRowKeys);
                let remainingUnassignedMinhchungs = getRemainingUnassignedMinhChungs(minhchungSelectedRowKeys, unassignedMinhchungs)
                setUnassignedMinhchungs([...remainingUnassignedMinhchungs]);
                resetSelectedItems();
                setIsAssigning(false);
            }
        }).catch((error) => {
            if (error.status == 401) {
                if (localStorage.getItem("token") !== null) {
                    localStorage.removeItem("token");
                }
                doLogout();
            } else {
                message.error("Lỗi hệ thống");
            }
        }).then(() => {
            setIsLoading(false);
        });
    }

    const getRemainingUnassignedMinhChungs = (assignedMinhChungIds, unassignedMinhchungs) => {
        if (assignedMinhChungIds.length > 0) {
            return unassignedMinhchungs.filter(i => {
                return !assignedMinhChungIds.includes(i.id);
            })
        };
    }

    const resetSelectedItems = () => {
        setMinhchungSelectedRowKeys([]);
        let keys = Object.keys(nhomsSelectedRowKeys);
        keys.forEach(key => {
            nhomsSelectedRowKeys[key] = []
        })
        setNhomsSelectedRowKeys({ ...nhomsSelectedRowKeys });
        setHasMinhchungSelected(false);
        setHasUserSelected(false);
    }
    return (
        <React.Fragment>
            <Row style={{ background: 'white', padding: '5px' }}>
                <Col span={6}>
                    <span
                    >
                        {minhchungSelectedRowKeys.length > 0 && `Đã chọn ${minhchungSelectedRowKeys.length} minh chứng`}
                    </span>
                </Col>
                <Col span={4} offset={4} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" disabled={!hasUserSelected || !hasMinhchungSelected} onClick={assignMinhchungs} loading={isAssigning}>Phân công</Button>
                </Col>
                <Col span={5} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form>
                        <Form.Item
                            label="Chọn nhóm"
                            style={{ marginBottom: 0 }}
                        >
                            <Select
                                onChange={handleNhomSelectChange}
                                value={currentNhomId}
                                style={{ width: 150 }}
                            >
                                {nhoms && nhoms.length > 0 && nhoms.filter(i => i.loainhom != 1).map(i => <Select.Option key={i.id} value={i.id}>{i.tennhom}</Select.Option>)}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {getflattenUsers(nhomsSelectedRowKeys).length > 0 && `Đã chọn ${getflattenUsers(nhomsSelectedRowKeys).length} thành viên`}
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}>
                    <Table
                        rowSelection={unassignedMinhchungRowSelection}
                        columns={minhchungColumns}
                        dataSource={unassignedMinhchungs}
                        pagination={false}
                        scroll={{ y: 500 }}
                        locale={{emptyText: <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '23px', paddingBottom: '23px'}}><StopOutlined style={{ fontSize: 30, marginRight: '10px'}}/> Không có minh chứng nào</div>}}
                    />
                </Col>
                <Col span={12}>
                    <Table
                        rowSelection={userRowSelection}
                        columns={userColumns}
                        dataSource={currentUsers}
                        pagination={false}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default EvidenceAssignment;
