import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
// import './index.css';
import { Form, Input, Button, Checkbox, Row, Col, Space, Alert, Radio, message } from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, ChromeOutlined, VerifiedOutlined, MacCommandOutlined } from '@ant-design/icons';
import { LogoutContext } from '../Contexts';

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

const CreateLocation = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    const [tenkhuvuc, setTenkhuvuc] = useState('');
    const [tendangnhap, setTendangnhap] = useState('');
    const [password, setPassword] = useState('');
    const { doLogout  } = useContext(LogoutContext);

    const handleTenKhuVucChange = (e) => {
        setTenkhuvuc(e.target.value);
    }

    const handleTendangnhapChange = (e) => {
        setTendangnhap(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }


    const handleSubmit = () => {
        setIsSubmitting(true);
        let data = {
            tenkhuvuc,
            tendangnhap,
            password,
        }
        fetch('/api/khuvuc', {
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
                if(success) {
                    message.success('Tạo thông tin huyện thành công!');
                }
            })
            .catch((error) => {
                if (error.status == 401) {
                    if (localStorage.getItem("token") !== null) {
                        localStorage.removeItem("token");
                    }
                    doLogout();
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
                        name="tenkhuvuc"
                        rules={[
                            {
                                required: true,
                                message: 'Tên huyện không được bỏ trống!',
                            },
                        ]}
                        onChange={handleTenKhuVucChange}
                    >
                        <Input prefix={<VerifiedOutlined className="site-form-item-icon" />} placeholder="Tên huyện" />
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
                    {errorMessage && !!errorMessage.length && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: '10px' }} />}
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmit} block loading={isSubmitting}>
                            Tạo Huyện
                     </Button>
                    </Form.Item>
                    {/* </Form> */}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateLocation;