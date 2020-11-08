import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
// import './index.css';
import { Form, Input, Button, Checkbox, Row, Col, Space, Alert, Radio, message, Select } from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, ChromeOutlined, VerifiedOutlined, MacCommandOutlined } from '@ant-design/icons';
import { getChiMucsData } from '../utils.js';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '50px'
    }
}

const { Option } = Select;

const CreateSchool = ({ khuvucs }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    const [tentruong, setTentruong] = useState('');
    const [huyen, setHuyen] = useState('');
    const [tendangnhap, setTendangnhap] = useState('');
    const [loaitruong, setLoaitruong] = useState(0);
    const [password, setPassword] = useState('');
    const [khuvuc, setKhuvuc] = useState(null)

    const handleTentruongChange = (e) => {
        setTentruong(e.target.value);
    }

    const handleHuyenChange = (e) => {
        setHuyen(e.target.value);
    }

    const handleTendangnhapChange = (e) => {
        setTendangnhap(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLoaitruongChange = (e) => {
        setLoaitruong(e.target.value);
    }

    const handleKhuvucChange = (value) => {
        let khuvuc = khuvucs.find(i => i.id == value);
        if (khuvuc) {
            setKhuvuc(khuvuc);
        }
    }

    const handleSubmit = () => {
        setIsSubmitting(true);
        let data = {
            tentruong,
            huyen,
            loaitruong,
            tendangnhap,
            password,
            khuvucid: khuvuc.id
        }
        fetch('/api/truong', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json();
        })
            .then((resData) => {
                let { success } = resData;
                if (success) {
                    message.success('Tạo thông tin trường thành công!');
                }
            })
            .catch((error) => {
                if (error.status == 401) {
                    setErrorMessage('Sai tên đăng nhập hoặc mật khẩu');
                } else {
                    setErrorMessage('Lỗi hệ thống')
                }

            }).then(() => {
                setIsSubmitting(false);
            });
    }

    return (
        <React.Fragment>
            <Row
                style={styles.container}
            >
                <Col span={18}>
                    {/* <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    > */}
                    <Form.Item
                        name="tentruong"
                        rules={[
                            {
                                required: true,
                                message: 'Tên trường không được bỏ trống!',
                            },
                        ]}
                        onChange={handleTentruongChange}
                    >
                        <Input prefix={<VerifiedOutlined className="site-form-item-icon" />} placeholder="Tên trường" />
                    </Form.Item>
                    <Form.Item
                        name="huyen"
                        rules={[
                            {
                                required: true,
                                message: 'Tên huyện không được bỏ trống!',
                            },
                        ]}
                        onChange={handleHuyenChange}
                    >
                        <Input prefix={<MacCommandOutlined className="site-form-item-icon" />} placeholder="Tên huyện" />
                    </Form.Item>
                    <Form.Item
                        name="tendangnhap"
                        rules={[
                            {
                                required: true,
                                message: 'Tên đăng nhập không được bỏ trống!',
                            },
                        ]}
                        onChange={handleTendangnhapChange}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được bỏ trống!',
                            },
                        ]}
                        onChange={handlePasswordChange}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    {khuvucs && khuvucs.length > 0 &&
                        <Form.Item>
                            <Select
                                value={khuvuc ? khuvuc.id : null}
                                onChange={handleKhuvucChange}>
                                {khuvucs.map(i => <Option value={i.id}>{i.tenkhuvuc}</Option>)}
                            </Select>
                        </Form.Item>}
                    <Row style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                        <Radio.Group value={loaitruong} onChange={handleLoaitruongChange}>
                            <Radio value={1}>Mẫu giáo</Radio>
                            <Radio value={2}>Tiểu học</Radio>
                            <Radio value={3}>THCS</Radio>
                            <Radio value={4}>TH 2 cấp</Radio>
                        </Radio.Group>
                    </Row>
                    {errorMessage && !!errorMessage.length && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: '10px' }} />}
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmit} block loading={isSubmitting}>
                            Tạo trường học
                     </Button>
                    </Form.Item>
                    {/* </Form> */}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateSchool;