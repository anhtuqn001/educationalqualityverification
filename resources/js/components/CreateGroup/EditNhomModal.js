import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Form, Input, Button, Modal, message } from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, PlusCircleFilled } from '@ant-design/icons';

const layout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 17,
    },
};

const EditNhomModal = ({ nhom, isOpen, handleCloseEditNhomModal, changeEditedNhom }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(nhom.id);
    const [manhom, setManhom] = useState(nhom.manhom);
    const [tennhom, setTennhom] = useState(nhom.tennhom);
    const [ghichu, setGhichu] = useState(nhom.ghichu);
    const history = useHistory();

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

    useEffect(() => {
        setId(nhom.id);
        setManhom(nhom.manhom);
        setTennhom(nhom.tennhom);
        setGhichu(nhom.ghichu);
        setIsLoading(false);
    }, [JSON.stringify(nhom)]) 

    function handleSubmit() {
        if(false) {

        }
        setIsLoading(true);
        let data = {
            id,
            manhom,
            tennhom,
            ghichu,
            truongid: 1,
            _method: 'PUT'
        }
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
              handleCloseEditNhomModal();
              message.success("Chỉnh sửa nhóm thành công!");
              changeEditedNhom(result.nhom);
            })
            .catch((error) => {
              if(error.status == 401) {
                if(localStorage.getItem("token") !== null){
                localStorage.removeItem("token");
                }
                history.push('/dangnhap');
              } else {
                console.log(error);
                message.error("Lỗi hệ thống");
              }
              setIsLoading(false);
            });
    }
    return (
        <Modal
            title="Chỉnh sửa nhóm"
            visible={isOpen}
            onCancel={handleCloseEditNhomModal}
            width={350}
            footer={[
                <Button key="submit" type="primary" loading={isLoading} style={{ background: "#096dd9", borderColor: "#096dd9" }} onClick={handleSubmit}>
                    Thay đổi
                </Button>,
                <Button key="back" onClick={handleCloseEditNhomModal}>
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
                    initialValue={manhom}
                >
                    <Input/>
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
                    initialValue={tennhom}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="ghichu"
                label="Ghi chú"
                style={{marginBottom:'5px'}}
                onChange={handleGhichuInputChange}
                initialValue={ghichu}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditNhomModal;