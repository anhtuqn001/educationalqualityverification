import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
// import './index.css';
import { Form, Input, Button, Modal, message, Row, Col, Checkbox, Alert } from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, PlusCircleFilled } from '@ant-design/icons';
import { LogoutContext } from '../Contexts.js';

const layout = {
    labelCol: {
        span: 11,
    },
    wrapperCol: {
        span: 13,
    },
};

const CreateUserModal = ({ isOpen, handleCloseCreateUserModal, currentNhom, appendUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [hoten, setHoten] = useState('');
    const [chucvu, setChucvu] = useState('');
    const [nhiemvu, setNhiemvu] = useState('');
    const [password, setPassword] = useState('');
    const [isMale, setIsMale] = useState(false);
    const [isTimkiemminhchung, setIsTimkiemminhchung] = useState(true);
    const [isTruongnhom, setIsTruongnhom] = useState(false);
    const history = useHistory();
    const { doLogout } = useContext(LogoutContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('mounted');
    }, [])

    function handleNameInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleHotenInputChange(e) {
        e.preventDefault();
        setHoten(e.target.value);
    }

    function handleChucvuInputChange(e) {
        e.preventDefault();
        setChucvu(e.target.value);
    }

    function handleNhiemvuInputChange(e) {
        e.preventDefault();
        setNhiemvu(e.target.value);
    }

    function handlePasswordInputChange(e) {
        e.preventDefault();
        setPassword(e.target.value);
    }

    function onIsMaleCheckboxChange(e) {
        setIsMale(e.target.checked);
    }

    function onIsTruongnhomCheckboxChange(e) {
        setIsTruongnhom(e.target.checked);
    }

    function onIsTimkiemminhchungCheckboxChange(e) {
        setIsTimkiemminhchung(e.target.checked);
    }

    function handleClose() {
        handleCloseCreateUserModal();
        setIsMale(false);
        setIsTruongnhom(false);
        setIsTimkiemminhchung(true);
        setError(null);
    }

    // function clearInputs() {
    //     setName('');
    //     setHoten('');
    //     setChucvu('');
    //     setNhiemvu('');
    //     setPassword('');
    //     setIsMale(false);
    //     setIsTimkiemminhchung(false);
    //     setIsTruongnhom(false);
    //     console.log('cleared');
    // }

    function handleSubmit() {
        if (false) {

        }
        setIsLoading(true);
        let data = {
            tendangnhap: name,
            hoten,
            chucvu,
            nhiemvu,
            password,
            isMale,
            isTimkiemminhchung,
            isTruongnhom,
            nhomid: currentNhom.id
        }
        fetch('/api/user', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then((result) => {
                setIsLoading(false);
                handleClose();
                message.success("Tạo thành viên thành công!");
                appendUser(result.user);
            })
            .catch((error) => {
                if (error.status == 401) {
                    if (localStorage.getItem("token") !== null) {
                        localStorage.removeItem("token");
                    }
                    doLogout();
                }else if (error.status == 422) {
                    setError('Tên đăng nhập đã tồn tại, vui lòng chọn tên khác!');
                } else {
                    message.error("Lỗi hệ thống");
                }
                setIsLoading(false);
            });
    }
    return (
        <Modal
            title={`Tạo thành viên : ${currentNhom.tennhom}`}
            visible={isOpen}
            onCancel={handleClose}
            width={600}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    loading={isLoading}
                    style={{ background: "#389e0d", borderColor: "green" }}
                    onClick={handleSubmit}
                >
                    Tạo
                </Button>,
                <Button
                    key="back"
                    onClick={handleClose}
                >
                    Hủy
                </Button>,
            ]}
            destroyOnClose={true}
        >
            <Form
                {...layout}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Mã số đối tượng"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Mã số đối tượng không được để trống',
                                },
                            ]}
                            style={{ marginBottom: '5px' }}
                            onChange={handleNameInputChange}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Họ tên"
                            name="hoten"
                            rules={[
                                {
                                    required: true,
                                    message: 'Họ tên không được để trống',
                                },
                            ]}
                            style={{ marginBottom: '5px' }}
                            onChange={handleHotenInputChange}
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                            label="Chức vụ"
                            name="chucvu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chức vụ không được để trống',
                                },
                            ]}
                            style={{ marginBottom: '5px' }}
                            onChange={handleChucvuInputChange}
                        >
                            <Input />
                        </Form.Item> */}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Chức vụ"
                            name="chucvu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chức vụ không được để trống',
                                },
                            ]}
                            style={{ marginBottom: '5px' }}
                            onChange={handleChucvuInputChange}
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                            label="Họ tên"
                            name="hoten"
                            rules={[
                                {
                                    required: true,
                                    message: 'Họ tên không được để trống',
                                },
                            ]}
                            style={{ marginBottom: '5px' }}
                            onChange={handleHotenInputChange}
                        >
                            <Input />
                        </Form.Item> */}
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Nhiệm vụ"
                            name="nhiemvu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhiệm vụ không được để trống',
                                },
                            ]}
                            style={{ marginBottom: '5px' }}
                            onChange={handleNhiemvuInputChange}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Mật khẩu không được để trống',
                                },
                            ]}
                            style={{ marginBottom: '5px' }}
                            onChange={handlePasswordInputChange}
                        >
                            <Input type="password" autoComplete="new-password"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={4}>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: '5px' }}>
                            <Checkbox
                                // checked={isMale}
                                onChange={onIsMaleCheckboxChange}
                            >
                                Nam
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: '5px' }}>
                            <Checkbox
                                // checked={isTruongnhom}
                                onChange={onIsTruongnhomCheckboxChange}
                            >
                                Trưởng nhóm
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: '5px' }}>
                            <Checkbox
                                // checked={isTimkiemminhchung}
                                defaultChecked={true}
                                onChange={onIsTimkiemminhchungCheckboxChange}
                            >
                                Tìm kiếm minh chứng
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{display:'flex', justifyContent:'center'}}>
                    {error && !!error.length && <Alert message={error} type="error" showIcon style={{ marginBottom: '10px' }} />}
                </Row>
            </Form>
        </Modal>
    )
}

export default CreateUserModal;