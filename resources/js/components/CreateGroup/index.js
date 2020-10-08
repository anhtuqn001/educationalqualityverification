import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../../../../node_modules/antd/dist/antd.css';
// import './index.css';
import { Form, Input, Button, Checkbox, Row, Col, Space, Alert, Table, Modal, Popconfirm, message } from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, DeleteOutlined, PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import CreateNhomModal from './CreateNhomModal.js';
import CreateUserModal from './CreateUserModal';
import EditNhomModal from './EditNhomModal.js';
import EditUserModal from './EditUserModal.js';
import DeleteNhomButton from './DeleteNhomButton.js'
import NhomTable from './NhomTable.js';
import { LogoutContext } from '../Contexts.js';
const styles = {
    container: {
        padding: '0 100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#389e0d',
    },
    createun: {
        fontSize: 20,
        cursor: "pointer",
    },
    plusIconContainer: {
        flexGrow: 1,
        alignSelf: "flex-start",
        paddingLeft: '5px'
    },
    showCreateModalButton: {
        color: 'white',
        backgroundColor: '#389e0d',
        borderColor: '#389e0d',
        marginRight: '5px'
    },
    showEditModalButton: {
        color: 'white',
        backgroundColor: '#096dd9',
        borderColor: '#096dd9',
        marginRight: '5px'
    }
}

const CreateGroup = ({ truongId }) => {
    const [nhoms, setNhoms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateNhomModalOpen, setIsCreateNhomModalOpen] = useState(false);
    const [isEditNhomModalOpen, setIsEditNhomModalOpen] = useState(false);
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [currentNhom, setCurrentNhom] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [selectedThanhvienRowKey, setSelectedThanhvienRowKey] = useState([]);
    const { doLogout } = useContext(LogoutContext);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/nhom/" + truongId, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                if (!res.ok) return Promise.reject(res);
                return res.json();
            })
            .then((result) => {
                console.log(result);
                setNhoms([...result.nhoms]);
                setIsLoading(false);
            }, (error) => {
                if (error.status == 401) {
                    localStorage.removeItem("token");
                    // history.push('/dangnhap');
                    doLogout();
                }
            })
    }, [])

    function handleOpenCreateModal() {
        if (JSON.stringify(currentNhom) == '{}' && JSON.stringify(currentUser) == '{}') {
            setIsCreateNhomModalOpen(true);
        } else if(JSON.stringify(currentUser) == '{}') {
            setIsCreateUserModalOpen(true);
        } else {
            message.warning("Vui lòng chọn nhóm để thêm mới");
        }
    }

    function handleCloseCreateNhomModal() {
        setIsCreateNhomModalOpen(false);
    }

    function handleCloseCreateUserModal() {
        setIsCreateUserModalOpen(false);
    }

    function handleOpenEditNhomModal() {
        if (JSON.stringify(currentNhom) == '{}' && JSON.stringify(currentUser) == '{}') {
            message.warning("Vui lòng chọn đối tượng để chỉnh sửa!");
        } else if (JSON.stringify(currentUser) == '{}') {
            setIsEditNhomModalOpen(true);
        } else {
            setIsEditUserModalOpen(true);
        }
    }

    function handleCloseEditNhomModal() {
        setIsEditNhomModalOpen(false);
    }

    function handleCloseEditUserModal() {
        setIsEditUserModalOpen(false);
    }

    function appendNhom(nhom) {
        setNhoms([...nhoms, nhom]);
    }

    function setCurrentNhomFunc(nhom) {
        setCurrentNhom({ ...nhom });
        setCurrentUser({});
    }

    function setCurrentUserFunc(user) {
        setCurrentUser({ ...user });
        removeCurrentNhom();
    }

    function changeEditedNhom(updatedNhom) {
        if (updatedNhom != null) {
            let nhomtoBeUpdated = nhoms.find(i => i.id == updatedNhom.id);
            Object.keys(nhomtoBeUpdated).forEach(i => {
                nhomtoBeUpdated[i] = Array.isArray(updatedNhom[i]) ? [...updatedNhom[i]] : updatedNhom[i];
            });
            setNhoms([...nhoms]);
            return;
        }
        message.error('Lỗi hệ thống');
    }

    function removeNhomItem(id) {
        let filteredNhoms = nhoms.filter(i => i.id !== id);
        setNhoms([...filteredNhoms]);
    }

    function removeCurrentNhom() {
        setCurrentNhom({});
    }
    function removeCurrentUser() {
        setCurrentUser({});
    }

    function appendUser(user) {
        if (user != null && user.iddonvi != null) {
            let nhomIndex = nhoms.findIndex(i => i.id == user.iddonvi);
            if (nhomIndex >= 0) {
                nhoms[nhomIndex].users = [...nhoms[nhomIndex].users, user];
                setNhoms([...nhoms]);
                return;
            }
        }
        message.error('Lỗi hệ thống');
    }

    function changeEditedUser(user) {
        if (user != null && user.iddonvi != null) {
            let nhomIndex = nhoms.findIndex(i => i.id == user.iddonvi);
            if (nhomIndex >= 0) {  
                let userIndex = nhoms[nhomIndex].users.findIndex(i => i.id == user.id);
                if (userIndex >= 0) {
                    let userToBeEdited = nhoms[nhomIndex].users[userIndex]
                    Object.keys(userToBeEdited).forEach(i => {
                        userToBeEdited[i] = Array.isArray(user[i]) ? [...user[i]] : user[i];
                    });
                    setNhoms([...nhoms]);
                    return;
                }
            }
        }
        message.error('Lỗi hệ thống');
    }

    function removeUserItem(user) {
        let nhomIndex = nhoms.findIndex(i => i.id == user.iddonvi);
        if(nhomIndex >= 0) {
            let userIndex = nhoms[nhomIndex].users.findIndex(i => i.id == user.id);
            if(userIndex >= 0) {
                nhoms[nhomIndex].users.splice(userIndex, 1); 
                setNhoms([...nhoms]);
                return;
            }
        }
        message.error('Lỗi hệ thống');
    }

    return (
        <div style={styles.container}>
            <div style={{ backgroundColor: 'white' }}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={handleOpenCreateModal} style={styles.showCreateModalButton}>Thêm mới</Button>
                <Button type="primary" icon={<EditOutlined />} onClick={handleOpenEditNhomModal} style={styles.showEditModalButton}>Chỉnh sửa</Button>
                <DeleteNhomButton currentNhom={currentNhom} currentUser={currentUser} removeNhomItem={removeNhomItem} removeUserItem={removeUserItem}/>
                {/* <Button type="primary" onClick={createUser}>Test Button</Button> */}
            </div>
            <NhomTable nhoms={nhoms} isLoading={isLoading} setCurrentNhomFunc={setCurrentNhomFunc} removeCurrentNhom={removeCurrentNhom} removeCurrentUser={removeCurrentUser} setCurrentUserFunc={setCurrentUserFunc} />
            <div style={styles.plusIconContainer}>
            </div>
            <CreateNhomModal isOpen={isCreateNhomModalOpen} handleCloseCreateNhomModal={handleCloseCreateNhomModal} appendNhom={appendNhom} truongId={truongId}/>
            <EditNhomModal nhom={currentNhom} isOpen={isEditNhomModalOpen} handleCloseEditNhomModal={handleCloseEditNhomModal} changeEditedNhom={changeEditedNhom}/>
            <CreateUserModal isOpen={isCreateUserModalOpen} handleCloseCreateUserModal={handleCloseCreateUserModal} currentNhom={currentNhom} appendUser={appendUser} />
            <EditUserModal isOpen={isEditUserModalOpen} user={currentUser} handleCloseEditUserModal={handleCloseEditUserModal} changeEditedUser={changeEditedUser} />
        </div>
    );
};

export default CreateGroup;