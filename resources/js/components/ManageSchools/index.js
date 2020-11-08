import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, Form, Select, Card, Typography } from 'antd';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import FileViewer from 'react-file-viewer';
import { PrinterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const styles = {
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
}
const { Text, Title } = Typography;
const ManageSchools = ({ khuvucId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [truongs, setTruongs] = useState(null);
    const { doLogout } = useContext(LogoutContext);
    const [nam, setNam] = useState(null);
    const [loaitruong, setLoaitruong] = useState(null);

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/khuvuc/' + khuvucId, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        }).then((resData) => {
            let { khuvuc } = resData;
            let { truongs } = khuvuc;
            setTruongs(truongs);
            setIsLoading(false);
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
    }, [khuvucId])

    const handleNamChange = (val) => {
        setNam(val);
    }

    const handleLoaitruongChange = (val) => {
        setLoaitruong(val);
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
            <Row style={{ background: 'white' }} gutter={32}>
                <Col span={6} offset={1}>
                    <Form.Item
                        label="Niên khóa"
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    >
                        <Select
                            value={nam}
                            onChange={handleNamChange}
                        >
                            {/* {truongs.map(i => <Option value={i.id}>{i.tentruong}</Option>)} */}
                            <Option value={2019}>2019-2020</Option>
                            <Option value={2020}>2020-2021</Option>
                            <Option value={2021}>2021-2022</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Hệ đào tạo"
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    >
                        <Select
                            value={loaitruong}
                            onChange={handleLoaitruongChange}
                        >
                            {/* {truongs.map(i => <Option value={i.id}>{i.tentruong}</Option>)} */}
                            <Option value={1}>Mầm non</Option>
                            <Option value={2}>Tiểu học</Option>
                            <Option value={3}>Trung học</Option>
                            <Option value={4}>Trung học 2 cấp</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={32} style={{ marginTop: '10px', background: 'white' }}>
                {(!loaitruong || !nam) ?
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Title level={4} style={{ color: 'red' }}>Vui lòng chọn niên khóa và hệ đào tạo</Title>
                    </Col> : truongs && truongs.length > 0 && truongs.filter(i => i.loaitruong == loaitruong && i.nienkhoas.some((j) => j.nam == nam)).map(i => {
                        let nienkhoa = i.nienkhoas.find(j => j.nam == nam);
                        let nienkhoaId = null;
                        if(nienkhoa) {
                            nienkhoaId = nienkhoa.id;
                        }
                        return (
                            <Col span={6}>
                                <Link to={`/schoolreports/${nienkhoaId}`} >
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src="/public/images/school.png" />}
                                        bordered={true}
                                        style={{ textAlign: 'center' }}
                                        bodyStyle={{ background: '#91d5ff' }}
                                    >
                                        <Text strong>{i.tentruong}</Text>
                                    </Card>
                                </Link>
                            </Col>
                        );
                    }
                    )}

            </Row>
        </React.Fragment>
    )
}

export default ManageSchools;
