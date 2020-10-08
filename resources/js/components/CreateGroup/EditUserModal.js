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

const EditUserModal = ({ user, isOpen, handleCloseEditUserModal, changeEditedUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [hoten, setHoten] = useState('');
    const [chucvu, setChucvu] = useState('');
    const [nhiemvu, setNhiemvu] = useState('');
    const [password, setPassword] = useState('');
    const [isMale, setIsMale] = useState(false);
    const [isTimkiemminhchung, setIsTimkiemminhchung] = useState(false);
    const [isTruongnhom, setIsTruongnhom] = useState(false);
    const history = useHistory();
    const { doLogout } = useContext(LogoutContext);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        setName(user.name);
        setHoten(user.hoten);
        setChucvu(user.chucvu);
        setNhiemvu(user.nhiemvu);
        setIsMale(user.isMale == "Nam");
        setIsTruongnhom(user.isTruongnhom == 1);
        setIsTimkiemminhchung(user.isTimkiemminhchung == 1);
        setError(null);
    }, [JSON.stringify(user)])

    function handleSubmit() {
        if (false) {

        }
        setIsLoading(true);
        let data = {
            id: user.id,
            tendangnhap: name,
            hoten,
            chucvu,
            nhiemvu,
            password,
            isMale,
            isTimkiemminhchung,
            isTruongnhom,
            nhomid: user.iddonvi,
            _method: 'PUT'
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
                message.success("Cập nhật thành viên thành công!")
                changeEditedUser(result.user);
            })
            .catch((error) => {
                if (error.status == 401) {
                    if (localStorage.getItem("token") !== null) {
                        localStorage.removeItem("token");
                    }
                    // history.push('/dangnhap');
                    doLogout();
                } else if (error.status == 422) {
                    setError('Tên đăng nhập đã tồn tại, vui lòng chọn tên khác!');
                } else {
                    message.error("Lỗi hệ thống");
                }
                setIsLoading(false);
            });
    }

    const handleClose = () => {
        handleCloseEditUserModal();
        setError(null)
    }
    return (
        <Modal
            title={`Cập nhật thành viên : ${user.hoten}`}
            visible={isOpen}
            onCancel={handleClose}
            width={600}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    loading={isLoading}
                    style={{ background: "#096dd9", borderColor: "#096dd9" }}
                    onClick={handleSubmit}
                >
                    Thay đổi
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
                            initialValue={name}
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
                            initialValue={hoten}
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
                            initialValue={chucvu}
                        >
                            <Input />
                        </Form.Item> */}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
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
                            initialValue={hoten}
                        >
                            <Input />
                        </Form.Item> */}
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
                            initialValue={chucvu}
                        >
                            <Input />
                        </Form.Item>
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
                            initialValue={nhiemvu}
                        >
                            <Input />
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
                            <Input type="password"  autoComplete="new-password"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={4}>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: '5px' }}>
                            <Checkbox
                                checked={isMale}
                                onChange={onIsMaleCheckboxChange}
                            >
                                Nam
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: '5px' }}>
                            <Checkbox
                                checked={isTruongnhom}
                                onChange={onIsTruongnhomCheckboxChange}
                            >
                                Trưởng nhóm
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: '5px' }}>
                            <Checkbox
                                checked={isTimkiemminhchung}
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

export default EditUserModal;