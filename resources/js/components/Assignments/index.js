import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
import './index.css';
import { Transfer, Switch, Tree, Button, Spin, Row, Col, Select, Form, Typography, message } from 'antd';
import { handleChimucResult, reformatUserChiMucData } from '../utils.js';
import { useHistory } from 'react-router-dom';
import TreeTransfer from './TreeTransfer.js';
import { LogoutContext } from '../Contexts.js';

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
    },
    toolBar: {
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: 'white'
    },
    colContent: {
        marginBottom: '3px',
        marginTop: '3px'
    }
}





const isChecked = (selectedKeys, eventKey) => selectedKeys.indexOf(eventKey) !== -1;






const Assignments = ({ truongId }) => {
    const [chimucs, setChimucs] = useState([]);
    const [users, setUsers] = useState([]);
    const [nhoms, setNhoms] = useState([]);
    const [currentNhomId, setCurrentNhomId] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const { doLogout } = useContext(LogoutContext);
    const [expandRightKeys, setExpandRightKeys] = useState([]);

    useEffect(() => {
        fetch("/api/chimuc/" + truongId, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        }).then((result) => {
            let handledChiMucResult = [...handleChimucResult(result.chimucs, '0-')];
            setChimucs(handledChiMucResult);
            onExpandAll(handledChiMucResult);
            setNhoms([...result.nhoms]);
            setUsers([...result.users]);
            setCurrentNhomId(result.nhoms[0].id);
            if (result.users.length > 0 && result.users.filter(i => i.iddonvi == result.nhoms[0].id)[0] != null) {
                let currentUser = result.users.filter(i => i.iddonvi == result.nhoms[0].id)[0];
                setCurrentUser(currentUser);
                setCurrentUserId(currentUser.id);
            }
            // let currentUser = result.users.filter(i => i.iddonvi == result.nhoms[0].id)[0];
            // setCurrentUser(currentUser);
            setIsLoading(false);
        }, (error) => {
            if (error.status == 401) {
                localStorage.removeItem("token");
                // history.push('/dangnhap');
                doLogout();
            }
        });
    }, [])


    useEffect(() => {
        let user = users.find(i => i.id == currentUserId);
        if (user) {
            let { chimucs } = user;
            handleUserChimucs(reformatUserChiMucData(chimucs));
        }
    }, [currentUserId, chimucs]);

    function handleNhomSelectChange(value) {
        setCurrentNhomId(value);
        setCurrentUserId(null);
        let currentUserId = users.filter(i => i.iddonvi == value)[0].id
        setCurrentUserId(currentUserId);
        let currentUser = users.filter(i => i.iddonvi == value)[0]
        setCurrentUser(currentUser);
    }

    function handleUserSelectChange(value) {
        setCurrentUserId(value);
        let user = users.find(i => i.id == value);
        setCurrentUser(user);
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

    const onExpandAll = (chimucs) => {
        const expandedKeys = [];
        const expandMethod = arr => {
            arr.forEach(data => {
                expandedKeys.push(data.key);
                if (data.children) {
                    expandMethod(data.children);
                }
            });
        };
        expandMethod(chimucs);
        setExpandRightKeys(expandedKeys);
    };

    const onCollapseAll = () => {
        setExpandRightKeys([]);
    }

    function setExpandRightKeysFunc(expandedKeys) {
        setExpandRightKeys(expandedKeys);
    }

    function handleExpandSwitchChange(checked) {
        if (checked) {
            onExpandAll(chimucs);
        } else {
            onCollapseAll();
        }
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
            <Row style={styles.toolBar} gutter={16}>
                <Col span={2} offset={12} style={{ paddingTop: '5px' }}>
                    <Switch defaultChecked onChange={handleExpandSwitchChange}></Switch>
                </Col>
                <Col span={4}>
                    {/* <Button type="primary">Expand All</Button> */}
                    <Form.Item label="Nhóm" style={styles.colContent}>
                        <Select onChange={handleNhomSelectChange} value={currentNhomId} style={{ paddingRight: 0 }}>
                            {!!nhoms.length && nhoms.filter(i => i.loainhom != 1).map(i =>
                                <Select.Option key={i.id} value={i.id}>{i.tennhom}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Thành viên" style={styles.colContent}>
                        <Select onChange={handleUserSelectChange} value={currentUserId}>
                            {!!users.length && users.filter(i => i.iddonvi == currentNhomId).map(i =>
                                <Select.Option key={i.id} value={i.id}>{i.hoten}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <TreeTransfer chimucs={chimucs} nhoms={nhoms} tenUser={getTenUser()} targetsKeys={targetKeys} selectedsKeys={selectedKeys} userId={currentUserId} changeCurrentUserChiMucs={changeCurrentUserChiMucs} expandRightKeys={expandRightKeys} setExpandRightKeysFunc={setExpandRightKeysFunc} />
        </React.Fragment>
    );
};
export default Assignments;