import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Popconfirm, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { LogoutContext } from '../Contexts.js';

const styles = {
    deleteButton: {
        color: 'white',
        backgroundColor: '#f5222d',
        borderColor: '#f5222d'
    }
}

const DeleteNhomButton = ({ currentNhom, currentUser, removeUserItem, removeNhomItem }) => {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { doLogout } = useContext(LogoutContext);

    function handleVisibleChange(visible) {
        if (!visible) {
            setVisible(visible);
            return;
        }

        if (JSON.stringify(currentNhom) == '{}' && JSON.stringify(currentUser) == '{}') {
            message.warning('Vui lòng chọn đối tượng để xóa!');
        } else {
            setVisible(visible);
        }
    }

    function handleCancel() {
        setVisible(false);
    }

    function handleNhomConfirm() {
        setIsLoading(true);
        let data = {
            _method: 'DELETE'
        }
        fetch('/api/nhom/' + currentNhom.id, {
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
                setVisible(false);
                message.success("Xóa nhóm thành công!");
                removeNhomItem(currentNhom.id);
            })
            .catch((error) => {
                if (error.status == 401) {
                    if (localStorage.getItem("token") !== null) {
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

    function isChosingNhom() {
        return (!(JSON.stringify(currentNhom) == '{}')) && (JSON.stringify(currentUser) == '{}');
    }

    function handleUserConfirm() {
        setIsLoading(true);
        let data = {
            _method: 'DELETE'
        }
        fetch('/api/user/' + currentUser.id, {
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
                setVisible(false);
                message.success("Xóa thành viên thành công!");
                removeUserItem(currentUser);
            })
            .catch((error) => {
                if (error.status == 401) {
                    if (localStorage.getItem("token") !== null) {
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
        <Popconfirm
            placement="right"
            title={isChosingNhom() ? `Chắc chắn xóa nhóm ${currentNhom.tennhom}?` : `Chắc chắn xóa thành viên ${currentUser.hoten}?`}
            visible={visible}
            onConfirm={isChosingNhom() ? handleNhomConfirm : handleUserConfirm}
            onCancel={handleCancel}
            okButtonProps={{ style: styles.deleteButton, loading: isLoading }}
            cancelButtonProps={{ disabled: isLoading }}
            onVisibleChange={handleVisibleChange}
            okText={isLoading ? "\xa0\xa0\xa0\xa0" : "Xóa"}
            cancelText="Không"
        >
            <Button type="primary" icon={<DeleteOutlined />} style={styles.deleteButton}>Xóa bỏ</Button>
        </Popconfirm>
    )
}

export default DeleteNhomButton;