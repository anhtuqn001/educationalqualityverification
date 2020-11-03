import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tree, Row, Col, message, Spin, Button, Modal } from 'antd';
import { LogoutContext } from '../Contexts';
import { WindowsOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { PrinterOutlined } from '@ant-design/icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfiguration = {
    toolbar: ['bold', 'italic']
};

const EditModal = ({ isOpen, hideModal, tieuchi, dataIndex, updateTieuchi }) => {
    const [value, setValue] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    let { doLogout } = useContext(LogoutContext);

    useEffect(() => {
        if (tieuchi && dataIndex) {
            setValue(tieuchi[dataIndex]);
        }
    }, [tieuchi])

    useEffect(() => {
        if (tieuchi && dataIndex) {
            setValue(tieuchi[dataIndex]);
        }
    }, [dataIndex])

    const handleEditorChange = (event, editor) => {
        let data = editor.getData();
        setValue(data);
    }
 
    const handleClose = () => {
        hideModal();
        setValue(null);
    }

    const handleSubmit = () => {
        setIsSubmitting(true);
        let data = {
            id: tieuchi.id,
            dataIndex,
            value,
            _method: 'PUT'
        }
        fetch('/api/tieuchimuc4', {
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
                let { tieuchi } = result;
                updateTieuchi(tieuchi, dataIndex);
                handleClose();
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
                
            }).then(() => { setIsSubmitting(false); });
    }



    return (
        <Modal
            title="Chỉnh sửa nội dung"
            visible={isOpen}
            onCancel={handleClose}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    loading={isSubmitting}
                    style={{ background: "#096dd9", borderColor: "#096dd9" }}
                    onClick={handleSubmit}
                >
                    Lưu
                </Button>,
                <Button
                    key="back"
                    onClick={handleClose}
                >
                    Hủy
                </Button>,
            ]}
        >
            <CKEditor
                editor={ClassicEditor}
                data={value ? value : ''}
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                config={editorConfiguration}
                onChange={handleEditorChange}
            />
        </Modal>
    );
}

export default EditModal;