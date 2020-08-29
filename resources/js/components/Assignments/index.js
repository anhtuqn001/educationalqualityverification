import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Transfer, Switch, Tree, Button, Spin, Row, Col, Select, Form, Typography, message } from 'antd';
import { handleChimucResult, reformatUserChiMucData } from './utils.js';
import { useHistory } from 'react-router-dom';
import TreeTransfer from './TreeTransfer.js'

const { Title, Text } = Typography;

const mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    });
}
// const antIcon = <ChromeOutlined style={{ fontSize: 20 }} spin />;
const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    }
}





const isChecked = (selectedKeys, eventKey) => selectedKeys.indexOf(eventKey) !== -1;






const Assignments = () => {
    const [chimucs, setChimucs] = useState([]);
    const [users, setUsers] = useState([]);
    const [nhoms, setNhoms] = useState([]);
    const [currentNhomId, setCurrentNhomId] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        fetch("/api/chimuc", {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        }).then((result) => {
            setChimucs([...handleChimucResult(result.chimucs, '0-')]);
            setNhoms([...result.nhoms]);
            setUsers([...result.users]);
            setCurrentNhomId(result.nhoms[0].id);
            let currentUserId = result.users.filter(i => i.iddonvi == result.nhoms[0].id)[0].id;
            setCurrentUserId(currentUserId);
            setIsLoading(false);
        }, (error) => {
            if (error.status == 401) {
                localStorage.removeItem("token");
                history.push('/dangnhap');
            }
        })
    }, [])

    useEffect(() => {
        let user = users.find(i => i.id == currentUserId);
        if(user) {
            let { chimucs } = user;
            handleUserChimucs(reformatUserChiMucData(chimucs));
        }
    }, [currentUserId]);

    function handleNhomSelectChange(value) {
        setCurrentNhomId(value);
        setCurrentUserId(null);
        let currentUserId = users.filter(i => i.iddonvi == value)[0].id
        setCurrentUserId(currentUserId);
    }

    function handleUserSelectChange(value) {
        setCurrentUserId(value);
        let user = users.find(i => i.id == value);
        if (user) {
            let { chimucs } = user;
            handleUserChimucs(reformatUserChiMucData(chimucs));
        }
    }

    function handleUserChimucs(userChimucs) {
        let targetKeys = [];
        let selectedKeys = [];
        let userChimucsId = userChimucs.map(i => i.id);
        let selectedUserChimucsId = userChimucs.filter(i => !i.isHalf).map(i => i.id);
        const loopThroughChiMucsSource = (chimucsArr) => {
            chimucsArr.forEach(i => {
                if (userChimucsId.includes(i.id)) {
                    targetKeys.push(i.key);
                }
                if (selectedUserChimucsId.includes(i.id)) {
                    selectedKeys.push(i.key);
                }
                if (i.children) {
                    loopThroughChiMucsSource(i.children);
                }
            })
        }
        loopThroughChiMucsSource(chimucs);
        setTargetKeys([...targetKeys]);
        setSelectedKeys([...selectedKeys]);
        console.log(chimucs);
    }



    function getTenUser() {
        if (!!currentUserId && !!users) {
            let index = users.findIndex(i => i.id == currentUserId)
            if (index != -1) {
                return users[index].hoten;
            }
            return 'Không tìm thấy thành viên';
        }
        return 'Chưa chọn thành viên';
    }

    function changeCurrentUserChiMucs(chimucs) {
        let userIndex = users.findIndex(i => i.id == currentUserId);
        users[userIndex].chimucs = [...chimucs];
        setUsers([...users]);
        handleUserChimucs(reformatUserChiMucData(users[userIndex].chimucs));
    }

    if (isLoading) {
        return <div style={styles.container}>
            <Spin
                size="large"
            />
        </div>
    }

    return (
        <React.Fragment>
            <Row style={{ backgroundColor: 'white' }} gutter={16}>
                <Col span={4} offset={14}>
                    {/* <Button type="primary">Expand All</Button> */}
                    <Form.Item label="Nhóm" style={{ marginBottom: '3px', marginTop: '3px' }}>
                        <Select onChange={handleNhomSelectChange} value={currentNhomId}>
                            {!!nhoms.length && nhoms.map(i =>
                                <Select.Option key={i.id} value={i.id}>{i.tennhom}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item label="Thành viên" style={{ marginBottom: '3px', marginTop: '3px' }}>
                        <Select onChange={handleUserSelectChange} value={currentUserId}>
                            {!!users.length && users.filter(i => i.iddonvi == currentNhomId).map(i =>
                                <Select.Option key={i.id} value={i.id}>{i.hoten}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <TreeTransfer chimucs={chimucs} nhoms={nhoms} tenUser={getTenUser()} targetsKeys={targetKeys} selectedsKeys={selectedKeys} userId={currentUserId} changeCurrentUserChiMucs={changeCurrentUserChiMucs} />
        </React.Fragment>
    );
};
export default Assignments;