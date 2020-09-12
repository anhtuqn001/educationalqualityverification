import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
// import './index.css';
import { Form, Input, Button, Modal, message } from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, PlusCircleFilled } from '@ant-design/icons';
import { LogoutContext } from '../Contexts';

const layout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 17,
    },
};

const CreateNhomModal = ({ isOpen, handleCloseCreateNhomModal, appendNhom }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [manhom, setManhom] = useState('');
    const [tennhom, setTennhom] = useState('');
    const [ghichu, setGhichu] = useState('');
    const history = useHistory();
    const { doLogout } = useContext(LogoutContext);

    function handleManhomInputChange(e) {
        e.preventDefault();
        setManhom(e.target.value);
    }

    function handleTennhomInputChange(e) {
        e.preventDefault();
        setTennhom(e.target.value);
    }

    function handleGhichuInputChange(e) {
        e.preventDefault();
        setGhichu(e.target.value);
    }

    function handleSubmit() {
        if(false) {

        }
        setIsLoading(true);
        let data = {
            manhom,
            tennhom,
            ghichu,
            truongid: 1
        }
        console.log(data);
        fetch('/api/nhom', {
            method: 'post',
            headers: {
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then((response) => {
                if(!response.ok) return Promise.reject(response);
                return response.json();
            })
            .then((result) => {
              setIsLoading(false);
              handleCloseCreateNhomModal();
            //   showSuccess("Tạo nhóm thành công!");
              message.success("Tạo nhóm thành công!")
              appendNhom(result.nhom);
            })
            .catch((error) => {
              if(error.status == 401) {
                if(localStorage.getItem("token") !== null){
                localStorage.removeItem("token");
                }
                // history.push('/dangnhap');
                doLogout();
              } else {
                console.log(error);
                message.error("Lỗi hệ thống");
              }
              setIsLoading(false);
              
        });

    }
    return (
        <Modal
            title="Tạo nhóm"
            visible={isOpen}
            onCancel={handleCloseCreateNhomModal}
            width={350}
            footer={[
                <Button key="submit" type="primary" loading={isLoading} style={{ background: "#389e0d", borderColor: "green" }} onClick={handleSubmit}>
                    Tạo
                </Button>,
                <Button key="back" onClick={handleCloseCreateNhomModal}>
                    Hủy
                </Button>,
            ]}
            destroyOnClose={true}
        >
            <Form
                {...layout}
            >
                <Form.Item
                    label="Mã nhóm"
                    name="manhom"
                    rules={[
                        {
                            required: true,
                            message: 'Mã nhóm không được để trống',
                        },
                    ]}
                    style={{marginBottom:'5px'}}
                    onChange={handleManhomInputChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên nhóm"
                    name="tennhom"
                    rules={[
                        {
                            required: true,
                            message: 'Tên nhóm không được để trống',
                        },
                    ]}
                    style={{marginBottom:'5px'}}
                    onChange={handleTennhomInputChange}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="ghichu" label="Ghi chú" style={{marginBottom:'5px'}} onChange={handleGhichuInputChange}>
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateNhomModal;