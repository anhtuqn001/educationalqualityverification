import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, List, Typography, Select, Form } from 'antd';
import { LogoutContext } from '../Contexts.js';

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


const EvidenceReview = ({ nienkhoaId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [nhoms, setNhoms] = useState(true);
    const [currentNhomId, setCurrentNhomId] = useState(null);
    const [currentUsers, setCurrentUsers] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const { doLogout } = useContext(LogoutContext);

    useEffect(() => {
        fetch('/api/nhomswithuserminhchung/' + nienkhoaId, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { nhoms } = resData;
            if(nhoms && nhoms.length > 0) {
                setNhoms(nhoms);
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

    const handleNhomSelectChange = (value) => {
        setCurrentNhomId(value);
        let currentNhom = nhoms.find(i => i.id == value);
        let currentUsers = [...currentNhom.users];
        setCurrentUsers(currentUsers);
        setCurrentUser(null);
    }

    const handleUserData = (users) => {
        if (!users || users.length == 0) return [];
        return users.map(i => ({
            id: i.id,
            key: i.id,
            title: i.hoten,
            name: i.name
        }))
    }

    const handleMinhchungData = (user) => {
        if (!user || !user.minhchungs || user.minhchungs.length == 0) return [];
        let { minhchungs } = user;
        let tieuchiArr = [...new Set(minhchungs.map(i => i.tieuchi.tenchimuc))];
        let handledMinhchung = tieuchiArr.map((i, index) => {
            let belongedMinhChungs = [...minhchungs.filter(j => j.tieuchi.tenchimuc == i)
                .map(j => ({
                id: j.id,
                key: j.id,
                title: j.maminhchung,
                tenminhchung: j.tenminhchung,
            }))
            ];
            return {
                key: '0-' + index,
                title: i,
                children: belongedMinhChungs
            }
        })
        return handledMinhchung;
    }

    const getExpandedKeys = (user) => {
        if (!user || !user.minhchungs || user.minhchungs.length == 0) return [];
        let { minhchungs } = user;
        let tieuchiArr = [...new Set(minhchungs.map(i => i.tieuchi.tenchimuc))];
        return tieuchiArr.map((i, index) => '0-' + index)
    }

    const onUserSelect = (val) => {
        let userId = val[0];
        let currentUser = currentUsers.find(i => i.id == userId);
        if (currentUser) {
            setCurrentUser(currentUser);
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
            <Row gutter={8}>
                <Col span={10}>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}>
                    <Row style={{ background: 'white', display: 'flex', justifyContent: 'center', paddingTop: '5px', paddingBottom: '5px' }}>
                        <Form>
                            <Form.Item
                                label="Chọn nhóm"
                                style={{ marginBottom: 0 }}
                            >
                                <Select onChange={handleNhomSelectChange} value={currentNhomId} style={{ width: 150 }} >
                                    {nhoms && nhoms.length > 0 && nhoms.filter(i => i.loainhom != 1).map(i => <Select.Option key={i.id} value={i.id}>{i.tennhom}</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Row>
                    <Row style={{ background: 'white' }}>
                        <Col span={1}>
                        </Col>
                        <Col span={23}>
                            <Row style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                <Col span={8}>
                                    <Text strong>Mã thành viên</Text>
                                </Col>
                                <Col span={16}>
                                    <Text strong>Tên thành viên</Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Tree
                        onSelect={onUserSelect}
                        treeData={handleUserData(currentUsers)}
                        titleRender={(item) => <Row style={{ paddingTop: '10px', paddingBottom: '10px' }}><Col span={8}>{item.name}</Col><Col span={16}>{item.title}</Col></Row>}
                        blockNode={true}
                        height={550}
                    />
                </Col>
                <Col span={12}>
                    <Row style={{ background: 'white', display: 'flex', justifyContent: 'center' }}>
                        <Title level={4}>Danh sách minh chứng được phân công</Title>
                    </Row>
                    <Tree
                        expandedKeys={getExpandedKeys(currentUser)}
                        treeData={handleMinhchungData(currentUser)}
                        // titleRender={(item) => <Row style={{ paddingTop: '10px', paddingBottom: '10px' }}>{item.title + ' - ' + item.tenminhchung}</Row>}
                        blockNode={true}
                        height={550}
                        selectable={false}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default EvidenceReview;
